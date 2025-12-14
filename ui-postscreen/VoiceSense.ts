export class VoiceSense {
  private recognition?: SpeechRecognition

  start(onResult: (text: string) => void) {
    const Speech =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition

    if (!Speech) return

    this.recognition = new Speech()
    this.recognition.lang = "auto"
    this.recognition.onresult = e => {
      onResult(e.results[0][0].transcript)
    }
    this.recognition.start()
  }
}
