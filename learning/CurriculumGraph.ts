export type TopicNode = {
  id: string
  difficulty: number
  unlocked: boolean
}

export class CurriculumGraph {
  nodes: TopicNode[] = [
    { id: "basics", difficulty: 1, unlocked: true },
    { id: "culture", difficulty: 2, unlocked: false },
    { id: "systems", difficulty: 3, unlocked: false }
  ]

  update(mastery: number) {
    for (const node of this.nodes) {
      if (mastery >= node.difficulty * 0.3) {
        node.unlocked = true
      }
    }
  }

  getAvailable() {
    return this.nodes.filter(n => n.unlocked)
  }
}