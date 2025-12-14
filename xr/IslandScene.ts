export type Island = {
  name: string
  theme: string
  learningFocus: string[]
}

export const MaldivesIslands: Island[] = [
  {
    name: "Baa Atoll",
    theme: "Ocean & Life",
    learningFocus: ["Biology", "Climate", "Math"]
  },
  {
    name: "Addu Atoll",
    theme: "History & Trade",
    learningFocus: ["World History", "Geography", "Languages"]
  }
]