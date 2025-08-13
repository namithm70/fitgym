import { useUsers } from '../hooks/useUsers'

export default function AdminDashboard() {
  const { users, activate, remove } = useUsers()

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-semibold mb-4">Admin Dashboard</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm border border-gray-200 dark:border-gray-800 rounded-lg overflow-hidden">
          <thead className="bg-gray-100 dark:bg-gray-800">
            <tr>
              <th className="text-left p-2">Name</th>
              <th className="text-left p-2">Email</th>
              <th className="text-left p-2">Status</th>
              <th className="text-left p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 && (
              <tr>
                <td colSpan={4} className="p-3 text-center text-gray-500">
                  No users yet. Users appear after they sign up.
                </td>
              </tr>
            )}
            {users.map((u) => (
              <tr key={u.id} className="border-t border-gray-200 dark:border-gray-800">
                <td className="p-2">{u.name}</td>
                <td className="p-2">{u.email}</td>
                <td className="p-2">{u.role === 'admin' ? 'Admin' : (u.isActive ? 'Active' : 'Inactive')}</td>
                <td className="p-2 flex gap-2">
                  <button
                    className="px-3 py-1 rounded-md border border-gray-300 dark:border-gray-700"
                    disabled={u.role === 'admin'}
                    onClick={() => activate(u.id, !u.isActive)}
                  >
                    {u.isActive ? 'Deactivate' : 'Activate'}
                  </button>
                  <button
                    className="px-3 py-1 rounded-md border border-gray-300 dark:border-gray-700"
                    disabled={u.role === 'admin'}
                    onClick={() => remove(u.id)}
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}


