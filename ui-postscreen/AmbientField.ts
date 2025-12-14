export class AmbientField {
  private intensity = 0.5

  update(emotion: string) {
    if (emotion === "calm") this.intensity -= 0.05
    if (emotion === "curious") this.intensity += 0.1
  }

  state() {
    return {
      glow: this.intensity,
      motion: Math.sin(Date.now() / 1000) * this.intensity
    }
  }
}
