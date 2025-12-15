import { VoiceSense } from "@/ui-postscreen/VoiceSense"
import { EmotionLoop } from "./EmotionLoop"
import { worldState } from "./WorldState"

export class VoiceIntentBridge {
  voice = new VoiceSense()
  emotions = new EmotionLoop()

  start() {
    this.voice.start(text => {
      let intent = "neutral"

      if (text.includes("go") || text.includes("explore")) intent = "explore"
      if (text.includes("rest")) intent = "rest"
      if (text.includes("next")) intent = "advance"
      if (text.includes("think")) intent = "reflect"

      worldState.remember(`Voice intent: ${intent}`)
      this.emotions.react(intent)
    })
  }
}