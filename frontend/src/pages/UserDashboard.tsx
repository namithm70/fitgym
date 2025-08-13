import { useEffect, useMemo } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { useUsers } from '../hooks/useUsers'

export default function UserDashboard() {
  const { auth } = useAuth()
  const { users, upsert } = useUsers()

  useEffect(() => {
    if (auth.userId && !users.some((u) => u.id === auth.userId)) {
      upsert({ id: auth.userId, email: auth.userId, name: auth.userId, password: '', role: 'user', isActive: true })
    }
  }, [auth.userId, users, upsert])

  const me = useMemo(() => users.find((u) => u.id === auth.userId), [users, auth.userId])

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-semibold">User Dashboard</h2>
      <p className="text-sm text-gray-600 dark:text-gray-300">Signed in as {auth.userId}</p>
      <div className="mt-4 p-4 rounded-lg border border-gray-200 dark:border-gray-800">
        <p>Status: {me?.isActive ? 'Active' : 'Inactive'}</p>
        {me?.role === 'admin' && (
          <p className="text-xs text-gray-500">You are logged in as an admin.</p>
        )}
        {!me?.isActive && (
          <p className="text-yellow-600">Your account is pending activation by an admin.</p>
        )}
      </div>
    </div>
  )
}


