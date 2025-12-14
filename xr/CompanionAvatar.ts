export class CompanionAvatar {
  constructor(
    public name: string,
    public form: "light" | "human" | "creature"
  ) {}

  appear() {
    return `${this.name} manifests as ${this.form}`
  }

  guide(topic: string) {
    return `${this.name} guides you through ${topic}`
  }
}