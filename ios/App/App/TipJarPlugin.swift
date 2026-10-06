import Capacitor
import StoreKit

// The "Support us" tip jar: optional tips through Apple's In-App Purchase
// (consumable products that unlock nothing). The web side asks for the
// products (to show Apple's localized prices) and buys one.
@objc(TipJarPlugin)
public class TipJarPlugin: CAPPlugin, CAPBridgedPlugin {
    public let identifier = "TipJarPlugin"
    public let jsName = "TipJar"
    public let pluginMethods: [CAPPluginMethod] = [
        CAPPluginMethod(name: "getProducts", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "purchase", returnType: CAPPluginReturnPromise)
    ]
    private var updates: Task<Void, Never>?
    private var products: [String: Product] = [:]

    override public func load() {
        // Finish any purchase that completed while the app wasn't looking
        // (e.g. approved later by a parent with Ask to Buy).
        updates = Task.detached {
            for await result in Transaction.updates {
                if case .verified(let transaction) = result { await transaction.finish() }
            }
        }
    }

    @objc func getProducts(_ call: CAPPluginCall) {
        let ids = call.getArray("ids", String.self) ?? []
        Task {
            do {
                let found = try await Product.products(for: ids)
                found.forEach { self.products[$0.id] = $0 }
                let list = found.sorted { $0.price < $1.price }.map { ["id": $0.id, "title": $0.displayName, "price": $0.displayPrice] }
                call.resolve(["products": list])
            } catch {
                call.reject(error.localizedDescription)
            }
        }
    }

    @objc func purchase(_ call: CAPPluginCall) {
        guard let id = call.getString("id") else { call.reject("No product"); return }
        Task {
            do {
                var product = self.products[id]
                if product == nil { product = try await Product.products(for: [id]).first }
                guard let product = product else { call.reject("This tip isn't available right now"); return }
                let result = try await product.purchase()
                switch result {
                case .success(let verification):
                    if case .verified(let transaction) = verification {
                        await transaction.finish()
                        call.resolve(["status": "success"])
                    } else {
                        call.reject("The purchase couldn't be verified")
                    }
                case .userCancelled:
                    call.resolve(["status": "cancelled"])
                case .pending:
                    call.resolve(["status": "pending"])
                @unknown default:
                    call.resolve(["status": "cancelled"])
                }
            } catch {
                call.reject(error.localizedDescription)
            }
        }
    }
}
