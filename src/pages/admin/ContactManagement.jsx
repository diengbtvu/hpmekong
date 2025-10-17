import React, { useState, useEffect } from 'react'
import DataTable from '../../components/admin/DataTable'
import contactService from '../../services/contactService'
import toast from '../../utils/toast'

const ContactManagement = () => {
  const [contacts, setContacts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => { fetchData() }, [])

  const fetchData = async () => {
    try {
      const response = await contactService.getContacts()
      if (response.success) setContacts(response.data)
    } catch (error) { toast.error('Error fetching contacts') }
    finally { setLoading(false) }
  }

  const columns = [
    { key: 'id', label: 'ID', sortable: true },
    { key: 'name', label: 'Name', sortable: true },
    { key: 'email', label: 'Email' },
    { key: 'phone', label: 'Phone' },
    { key: 'subject', label: 'Subject' },
    { key: 'createdAt', label: 'Date', render: (v) => new Date(v).toLocaleDateString('vi-VN') },
  ]

  return (
    <div className="space-y-6">
      <div><h1 className="text-2xl font-bold text-gray-900">Contact Management</h1><p className="text-gray-600 mt-1">View customer inquiries</p></div>
      <DataTable columns={columns} data={contacts} loading={loading} />
    </div>
  )
}

export default ContactManagement
