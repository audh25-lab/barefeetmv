export type NPCRole =
  | "farmer"
  | "builder"
  | "scholar"
  | "merchant"

export class NPC {
  id = crypto.randomUUID()
  role: NPCRole
  happiness = 0.5
  knowledge = 0.1

  constructor(role: NPCRole) {
    this.role = role
  }

  act(economy: any) {
    switch (this.role) {
      case "farmer":
        economy.earn("food", 1)
        break
      case "builder":
        economy.earn("stone", 1)
        break
      case "scholar":
        economy.earn("knowledge", 1)
        this.knowledge += 0.05
        break
      case "merchant":
        economy.trade("food", "gold")
        break
    }
  }
}