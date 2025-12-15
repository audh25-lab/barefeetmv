export type UserState = {
  age: number
  language: string
}

const KEY = "barefeetmv:user"

export function getUserState(): UserState {
  if (typeof window === "undefined") {
    return { age: 6, language: "en" }
  }

  const raw = localStorage.getItem(KEY)
  return raw ? JSON.parse(raw) : { age: 6, language: "en" }
}

export function setUserState(state: UserState) {
  localStorage.setItem(KEY, JSON.stringify(state))
}