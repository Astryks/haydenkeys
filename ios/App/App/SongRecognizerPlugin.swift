import Capacitor
import ShazamKit
import AVFoundation

// "Which song is this?" for uploaded songs, using Apple's ShazamKit.
// The web app sends a few seconds of mono 16-bit audio; we turn it into a
// ShazamKit signature (a fingerprint, not the audio itself) and ask
// Apple's catalog for a match. Only runs when the learner uploads a song.
@objc(SongRecognizerPlugin)
public class SongRecognizerPlugin: CAPPlugin, CAPBridgedPlugin {
    public let identifier = "SongRecognizerPlugin"
    public let jsName = "SongRecognizer"
    public let pluginMethods: [CAPPluginMethod] = [
        CAPPluginMethod(name: "match", returnType: CAPPluginReturnPromise)
    ]
    private var session: SHSession?
    private var matchDelegate: MatchDelegate?

    @objc func match(_ call: CAPPluginCall) {
        guard let b64 = call.getString("pcm16"), let data = Data(base64Encoded: b64), data.count > 2 else {
            call.reject("No audio")
            return
        }
        let rate = Double(call.getInt("sampleRate") ?? 44100)
        let count = data.count / 2
        guard let format = AVAudioFormat(commonFormat: .pcmFormatFloat32, sampleRate: rate, channels: 1, interleaved: false),
              let buffer = AVAudioPCMBuffer(pcmFormat: format, frameCapacity: AVAudioFrameCount(count)),
              let channel = buffer.floatChannelData?[0] else {
            call.reject("Unsupported audio format")
            return
        }
        buffer.frameLength = AVAudioFrameCount(count)
        data.withUnsafeBytes { raw in
            let src = raw.bindMemory(to: Int16.self)
            for i in 0..<count { channel[i] = Float(src[i]) / 32768.0 }
        }
        let generator = SHSignatureGenerator()
        do {
            try generator.append(buffer, at: nil)
        } catch {
            call.reject("Couldn't read the audio: \(error.localizedDescription)")
            return
        }
        let session = SHSession()
        let delegate = MatchDelegate(call: call) { [weak self] in
            self?.session = nil
            self?.matchDelegate = nil
        }
        session.delegate = delegate
        self.session = session
        self.matchDelegate = delegate
        session.match(generator.signature())
    }
}

final class MatchDelegate: NSObject, SHSessionDelegate {
    private let call: CAPPluginCall
    private let done: () -> Void
    private var answered = false

    init(call: CAPPluginCall, done: @escaping () -> Void) {
        self.call = call
        self.done = done
    }

    func session(_ session: SHSession, didFind match: SHMatch) {
        guard !answered else { return }
        answered = true
        if let item = match.mediaItems.first {
            call.resolve([
                "found": true,
                "title": item.title ?? "",
                "artist": item.artist ?? "",
                "appleMusicURL": item.appleMusicURL?.absoluteString ?? "",
                "artworkURL": item.artworkURL?.absoluteString ?? "",
            ])
        } else {
            call.resolve(["found": false])
        }
        done()
    }

    func session(_ session: SHSession, didNotFindMatchFor signature: SHSignature, error: Error?) {
        guard !answered else { return }
        answered = true
        call.resolve(["found": false, "error": error?.localizedDescription ?? ""])
        done()
    }
}
