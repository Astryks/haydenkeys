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
        CAPPluginMethod(name: "match", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "decodeAudio", returnType: CAPPluginReturnPromise)
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

// Reads the audio out of any file iOS can play (mp3, m4a, wav, aiff, caf,
// and the audio track of mov/mp4 videos) with AVFoundation, as mono 16-bit
// PCM at the requested sample rate. The web view's own decoder rejects some
// of these (iPhone videos and some m4a files), so the app decodes here
// first. The file stays on the device: it's written to a temporary file,
// read, and deleted.
extension SongRecognizerPlugin {
    @objc func decodeAudio(_ call: CAPPluginCall) {
        guard let b64 = call.getString("data"), let data = Data(base64Encoded: b64), !data.isEmpty else {
            call.reject("No file data")
            return
        }
        let ext = (call.getString("ext") ?? "m4a").lowercased().filter { $0.isLetter || $0.isNumber }
        let rate = Double(call.getInt("sampleRate") ?? 22050)
        let maxSeconds = Double(call.getInt("maxSeconds") ?? 600)
        DispatchQueue.global(qos: .userInitiated).async {
            let url = FileManager.default.temporaryDirectory.appendingPathComponent("hk-upload-\(UUID().uuidString).\(ext.isEmpty ? "m4a" : ext)")
            defer { try? FileManager.default.removeItem(at: url) }
            do {
                try data.write(to: url)
                let asset = AVURLAsset(url: url)
                let tracks = asset.tracks(withMediaType: .audio)
                guard !tracks.isEmpty else {
                    call.reject("There's no audio in this file")
                    return
                }
                let reader = try AVAssetReader(asset: asset)
                let settings: [String: Any] = [
                    AVFormatIDKey: kAudioFormatLinearPCM,
                    AVSampleRateKey: rate,
                    AVNumberOfChannelsKey: 1,
                    AVLinearPCMBitDepthKey: 16,
                    AVLinearPCMIsFloatKey: false,
                    AVLinearPCMIsBigEndianKey: false,
                    AVLinearPCMIsNonInterleaved: false,
                ]
                let output = AVAssetReaderAudioMixOutput(audioTracks: tracks, audioSettings: settings)
                reader.add(output)
                reader.timeRange = CMTimeRange(start: .zero, duration: CMTime(seconds: maxSeconds, preferredTimescale: 600))
                guard reader.startReading() else {
                    call.reject(reader.error?.localizedDescription ?? "Couldn't read the audio")
                    return
                }
                var pcm = Data()
                while let sample = output.copyNextSampleBuffer() {
                    if let block = CMSampleBufferGetDataBuffer(sample) {
                        let length = CMBlockBufferGetDataLength(block)
                        var chunk = Data(count: length)
                        chunk.withUnsafeMutableBytes { raw in
                            _ = CMBlockBufferCopyDataBytes(block, atOffset: 0, dataLength: length, destination: raw.baseAddress!)
                        }
                        pcm.append(chunk)
                    }
                }
                if reader.status == .failed {
                    call.reject(reader.error?.localizedDescription ?? "Couldn't read the audio")
                    return
                }
                guard pcm.count > 2 else {
                    call.reject("There's no audio in this file")
                    return
                }
                call.resolve(["pcm16": pcm.base64EncodedString(), "sampleRate": rate])
            } catch {
                call.reject(error.localizedDescription)
            }
        }
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
