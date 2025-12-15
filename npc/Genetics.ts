export type Traits = {
  intelligence: number
  curiosity: number
  resilience: number
}

export function inherit(parent: Traits): Traits {
  return {
    intelligence: parent.intelligence + (Math.random() - 0.5) * 0.1,
    curiosity: parent.curiosity + (Math.random() - 0.5) * 0.1,
    resilience: parent.resilience + (Math.random() - 0.5) * 0.1
  }
}

traits: Traits = {
  intelligence: Math.random(),
  curiosity: Math.random(),
  resilience: Math.random()
}