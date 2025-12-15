const KEY = "barefeetmv:stars"

export function getStars(): number {
  if (typeof window === "undefined") return 0
  return Number(localStorage.getItem(KEY) || 0)
}

export function addStar() {
  const stars = getStars() + 1
  localStorage.setItem(KEY, String(stars))
  return stars
}