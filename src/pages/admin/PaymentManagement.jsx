import React, { useState, useEffect } from 'react'
import DataTable from '../../components/admin/DataTable'
import api from '../../services/api'
import toast from '../../utils/toast'

const PaymentManagement = () => {
  const [payments, setPayments] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => { fetchData() }, [])

  const fetchData = async () => {
    try {
      const response = await api.get('/admin/payments')
      if (response.data.success) setPayments(response.data.data.content || response.data.data)
    } catch (error) { toast.error('Error fetching payments') }
    finally { setLoading(false) }
  }

  const columns = [
    { key: 'id', label: 'ID', sortable: true },
    { key: 'orderCode', label: 'Order Code' },
    { key: 'amount', label: 'Amount', render: (v) => `${v?.toLocaleString()}đ`, sortable: true },
    { key: 'status', label: 'Status', render: (v) => <span className={`px-2 py-1 text-xs rounded-full ${v === 'PAID' ? 'bg-green-100 text-green-800' : v === 'PENDING' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}`}>{v}</span> },
    { key: 'paymentMethod', label: 'Method' },
    { key: 'createdAt', label: 'Date', render: (v) => new Date(v).toLocaleDateString('vi-VN') },
  ]

  return (
    <div className="space-y-6">
      <div><h1 className="text-2xl font-bold text-gray-900">Payment Management</h1><p className="text-gray-600 mt-1">View payment transactions</p></div>
      <DataTable columns={columns} data={payments} loading={loading} actions={false} />
    </div>
  )
}

export default PaymentManagement
