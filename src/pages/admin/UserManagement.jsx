import React, { useState, useEffect } from 'react'
import DataTable from '../../components/admin/DataTable'
import api from '../../services/api'
import toast from '../../utils/toast'

const UserManagement = () => {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => { fetchUsers() }, [])

  const fetchUsers = async () => {
    try {
      const response = await api.get('/admin/users')
      if (response.data.success) setUsers(response.data.data.content || response.data.data)
    } catch (error) { toast.error('Error fetching users') }
    finally { setLoading(false) }
  }

  const handleDelete = async (user) => {
    if (!confirm(`Delete user "${user.name}"?`)) return
    try {
      await api.delete(`/v1/admin/users/${user.id}`)
      toast.success('User deleted')
      fetchUsers()
    } catch (error) { toast.error('Error deleting user') }
  }

  const columns = [
    { key: 'id', label: 'ID', sortable: true },
    { key: 'name', label: 'Name', sortable: true },
    { key: 'email', label: 'Email', sortable: true },
    { key: 'phone', label: 'Phone' },
    { key: 'createdAt', label: 'Joined', render: (v) => new Date(v).toLocaleDateString('vi-VN') },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div><h1 className="text-2xl font-bold text-gray-900">User Management</h1><p className="text-gray-600 mt-1">Manage system users</p></div>
        <button className="flex items-center gap-2 px-4 py-2 bg-mekong-blue text-white rounded-lg hover:bg-blue-700"><i className="fas fa-plus"></i><span>Add User</span></button>
      </div>
      <DataTable columns={columns} data={users} loading={loading} onDelete={handleDelete} />
    </div>
  )
}

export default UserManagement
