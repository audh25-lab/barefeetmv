import { UserRole } from "./roles"

export type Session = {
  id: string
  role: UserRole
  name: string
}

const KEY = "barefeetmv:session"

export function getSession(): Session | null {
  if (typeof window === "undefined") return null
  const raw = localStorage.getItem(KEY)
  return raw ? JSON.parse(raw) : null
}

export function setSession(session: Session) {
  localStorage.setItem(KEY, JSON.stringify(session))
}

export function clearSession() {
  localStorage.removeItem(KEY)
}