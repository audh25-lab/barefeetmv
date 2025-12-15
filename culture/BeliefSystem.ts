export type Belief = {
  name: string
  ethicsBoost: number
  knowledgeBias: number
}

export class BeliefSystem {
  beliefs: Belief[] = []

  introduce(b: Belief) {
    this.beliefs.push(b)
  }

  influence(world: any) {
    this.beliefs.forEach(b => {
      world.economy.earn("knowledge", b.knowledgeBias)
      world.civ.npcs.forEach((n:any) => {
        n.happiness += b.ethicsBoost * 0.01
      })
    })
  }
}