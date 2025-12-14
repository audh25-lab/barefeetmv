export class GameEngine {
  enter(world: string, age: number) {
    return age < 10
      ? `Magical ${world}`
      : age < 18
      ? `Skill-based ${world}`
      : `Strategic ${world}`
  }
}