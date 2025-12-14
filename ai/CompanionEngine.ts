export type CompanionPersona = {
  name: string
  tone: string
  intelligence: number
}

export class CompanionEngine {
  create(userId: string): CompanionPersona {
    return {
      name: `Kai-${userId.slice(0,4)}`,
      tone: "warm",
      intelligence: Math.random()
    }
  }
}