import { Navigate } from 'react-router-dom'
import { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { useUsers } from '../hooks/useUsers'

export default function AdminLogin() {
  const { auth, login } = useAuth()
  const { users } = useUsers()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  if (auth.isAuthenticated && auth.role === 'admin') {
    return <Navigate to="/admin" replace />
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const admin = users.find((u) => u.role === 'admin' && (u.email === username || u.id === username))
    if (!admin) return setError('Admin not found')
    if (admin.password !== password) return setError('Incorrect password')
    login('admin', admin.email)
  }

  return (
    <div className="max-w-md mt-8">
      <h2 className="text-xl font-semibold mb-4">Admin Sign In</h2>
      <form onSubmit={handleSubmit} className="grid gap-3">
        <input
          className="px-3 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          className="px-3 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800"
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <p className="text-red-600 text-sm">{error}</p>}
        <button className="mt-2 px-4 py-2 rounded-md bg-gray-800 text-white hover:bg-black" type="submit">
          Sign In
        </button>
      </form>
    </div>
  )
}


