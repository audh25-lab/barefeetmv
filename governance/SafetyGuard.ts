export class SafetyGuard {
  allow(age: number, contentLevel: number) {
    return age >= contentLevel
  }
}
