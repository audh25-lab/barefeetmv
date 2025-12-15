export type Tenant = {
  id: string
  name: string
}

export function setTenant(t: Tenant) {
  localStorage.setItem("barefeetmv:tenant", JSON.stringify(t))
}

export function getTenant(): Tenant | null {
  return JSON.parse(localStorage.getItem("barefeetmv:tenant") || "null")
}