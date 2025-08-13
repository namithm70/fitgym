import { createContext, useContext, useEffect, useMemo, useState } from 'react'

export type Role = 'user' | 'admin'

export type AuthState = {
  isAuthenticated: boolean
  role: Role | null
  userId?: string
}

type AuthContextValue = {
  auth: AuthState
  login: (role: Role, userId?: string) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

function getInitialAuth(): AuthState {
  try {
    const raw = localStorage.getItem('auth')
    return raw ? JSON.parse(raw) : { isAuthenticated: false, role: null }
  } catch {
    return { isAuthenticated: false, role: null }
  }
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [auth, setAuth] = useState<AuthState>(() => getInitialAuth())
  // Seed a default admin account once if missing
  useEffect(() => {
    try {
      const raw = localStorage.getItem('users')
      const users = raw ? JSON.parse(raw) : []
      const hasAdmin = users.some((u: any) => u.role === 'admin')
      if (!hasAdmin) {
        const admin = {
          id: 'admin@local',
          email: 'admin@local',
          name: 'Gym Admin',
          password: 'admin123',
          role: 'admin',
          isActive: true,
        }
        localStorage.setItem('users', JSON.stringify([admin, ...users]))
      }
    } catch {}
  }, [])

  useEffect(() => {
    localStorage.setItem('auth', JSON.stringify(auth))
  }, [auth])

  const value = useMemo<AuthContextValue>(() => ({
    auth,
    login: (role: Role, userId?: string) => setAuth({ isAuthenticated: true, role, userId }),
    logout: () => setAuth({ isAuthenticated: false, role: null }),
  }), [auth])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return ctx
}


