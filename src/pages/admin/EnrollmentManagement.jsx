import React, { useState, useEffect } from 'react'
import DataTable from '../../components/admin/DataTable'
import api from '../../services/api'
import toast from '../../utils/toast'

const EnrollmentManagement = () => {
  const [enrollments, setEnrollments] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => { fetchData() }, [])

  const fetchData = async () => {
    try {
      const response = await api.get('/admin/enrollments')
      if (response.data.success) setEnrollments(response.data.data.content || response.data.data)
    } catch (error) { toast.error('Error fetching enrollments') }
    finally { setLoading(false) }
  }

  const columns = [
    { key: 'id', label: 'ID', sortable: true },
    { key: 'studentName', label: 'Student' },
    { key: 'courseTitle', label: 'Course' },
    { key: 'status', label: 'Status', render: (v) => <span className={`px-2 py-1 text-xs rounded-full ${v === 'completed' ? 'bg-green-100 text-green-800' : v === 'active' ? 'bg-blue-100 text-blue-800' : 'bg-yellow-100 text-yellow-800'}`}>{v}</span> },
    { key: 'enrolledAt', label: 'Enrolled', render: (v) => new Date(v).toLocaleDateString('vi-VN') },
  ]

  return (
    <div className="space-y-6">
      <div><h1 className="text-2xl font-bold text-gray-900">Enrollment Management</h1><p className="text-gray-600 mt-1">View and manage course enrollments</p></div>
      <DataTable columns={columns} data={enrollments} loading={loading} actions={false} />
    </div>
  )
}

export default EnrollmentManagement
