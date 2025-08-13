import { useEffect, useState } from 'react'
import type { GoogleUser } from '../services/googleAuth'

export type GymUser = {
  id: string
  email: string
  name: string
  password: string
  role: 'user' | 'admin'
  isActive: boolean
  googleId?: string
  picture?: string
}

export function useUsers() {
  const [users, setUsers] = useState<GymUser[]>(() => {
    try {
      const raw = localStorage.getItem('users')
      return raw ? JSON.parse(raw) : []
    } catch {
      return []
    }
  })

  useEffect(() => {
    localStorage.setItem('users', JSON.stringify(users))
  }, [users])

  const activate = (id: string, value: boolean) => {
    setUsers((prev) => prev.map((u) => (u.id === id ? { ...u, isActive: value } : u)))
  }

  const remove = (id: string) => {
    setUsers((prev) => prev.filter((u) => u.id !== id))
  }

  const upsert = (user: GymUser) => {
    setUsers((prev) => {
      const exists = prev.some((u) => u.id === user.id)
      return exists ? prev.map((u) => (u.id === user.id ? user : u)) : [...prev, user]
    })
  }

  const exists = (email: string) => users.some((u) => u.email.toLowerCase() === email.toLowerCase())

  const getByEmail = (email: string) => users.find((u) => u.email.toLowerCase() === email.toLowerCase())

  const getByGoogleId = (googleId: string) => users.find((u) => u.googleId === googleId)

  const create = (data: { name: string; email: string; password: string }) => {
    const newUser: GymUser = {
      id: data.email,
      email: data.email,
      name: data.name,
      password: data.password,
      role: 'user',
      isActive: false,
    }
    setUsers((prev) => [...prev, newUser])
    return newUser
  }

  const createGoogleUser = (googleUser: GoogleUser) => {
    const newUser: GymUser = {
      id: googleUser.email,
      email: googleUser.email,
      name: googleUser.name,
      password: '', // No password for Google users
      role: 'user',
      isActive: true, // Google users are auto-activated
      googleId: googleUser.id,
      picture: googleUser.picture,
    }
    setUsers((prev) => [...prev, newUser])
    return newUser
  }

  const validateCredentials = (email: string, password: string) => {
    const u = getByEmail(email)
    if (!u) return { ok: false as const, reason: 'not_found' as const }
    if (u.password !== password) return { ok: false as const, reason: 'wrong_password' as const }
    if (!u.isActive) return { ok: false as const, reason: 'inactive' as const }
    return { ok: true as const, user: u }
  }

  const validateGoogleUser = (googleUser: GoogleUser) => {
    // Check if user exists by Google ID
    let user = getByGoogleId(googleUser.id)
    
    if (!user) {
      // Check if user exists by email
      user = getByEmail(googleUser.email)
      
      if (user) {
        // Update existing user with Google ID
        const updatedUser = { ...user, googleId: googleUser.id, picture: googleUser.picture }
        upsert(updatedUser)
        return { ok: true as const, user: updatedUser }
      } else {
        // Create new Google user
        const newUser = createGoogleUser(googleUser)
        return { ok: true as const, user: newUser }
      }
    }
    
    return { ok: true as const, user }
  }

  return { 
    users, 
    activate, 
    remove, 
    upsert, 
    exists, 
    getByEmail, 
    getByGoogleId,
    create, 
    createGoogleUser,
    validateCredentials, 
    validateGoogleUser 
  }
}


