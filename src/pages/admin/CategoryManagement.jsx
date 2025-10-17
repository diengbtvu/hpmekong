import React, { useState, useEffect } from 'react'
import DataTable from '../../components/admin/DataTable'
import api from '../../services/api'
import toast from '../../utils/toast'

const CategoryManagement = () => {
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => { fetchData() }, [])

  const fetchData = async () => {
    try {
      const response = await api.get('/categories')
      if (response.data.success) setCategories(response.data.data)
    } catch (error) { toast.error('Error fetching categories') }
    finally { setLoading(false) }
  }

  const columns = [
    { key: 'id', label: 'ID', sortable: true },
    { key: 'name', label: 'Name', sortable: true },
    { key: 'slug', label: 'Slug' },
    { key: 'courseCount', label: 'Courses', sortable: true },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div><h1 className="text-2xl font-bold text-gray-900">Category Management</h1><p className="text-gray-600 mt-1">Manage course categories</p></div>
        <button className="flex items-center gap-2 px-4 py-2 bg-mekong-blue text-white rounded-lg hover:bg-blue-700"><i className="fas fa-plus"></i><span>Add Category</span></button>
      </div>
      <DataTable columns={columns} data={categories} loading={loading} />
    </div>
  )
}

export default CategoryManagement
