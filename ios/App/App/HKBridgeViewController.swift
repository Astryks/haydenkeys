import Capacitor

// Registers the app's own native plugins (Capacitor 6+ needs local
// plugins registered here).
class HKBridgeViewController: CAPBridgeViewController {
    override open func capacitorDidLoad() {
        bridge?.registerPluginInstance(SongRecognizerPlugin())
    }
}
