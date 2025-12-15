import { XRWorld } from "./XRWorld"

export class XRBridge {
  enter() {
    return "xr" in navigator
      ? "Entered XR World"
      : "Fallback to Screen Mode"
  }
}