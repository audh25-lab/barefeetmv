export class SpaceAge {
  unlocked = false
  satellites = 0

  unlock(knowledge: number) {
    if (knowledge > 50) this.unlocked = true
  }

  launchSatellite() {
    if (this.unlocked) this.satellites++
  }
}