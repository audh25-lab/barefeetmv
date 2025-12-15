"use client"
import { getSession } from "@/lib/session"
import { UserRole } from "@/lib/roles"

export function RoleGate({
  allow,
  children
}: {
  allow: UserRole[]
  children: React.ReactNode
}) {
  const session = getSession()
  if (!session || !allow.includes(session.role)) return null
  return <>{children}</>
}