import React, { useState, useEffect } from 'react'
import Modal from '../../components/admin/Modal'
import contactService from '../../services/contactService'

const ContactManagement = () => {
  const [contacts, setContacts] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedContact, setSelectedContact] = useState(null)
  const [viewModal, setViewModal] = useState(false)
  const [filterStatus, setFilterStatus] = useState('all')
  const [editingStatus, setEditingStatus] = useState(null)
  const [editingNote, setEditingNote] = useState(false)
  const [noteValue, setNoteValue] = useState('')

  useEffect(() => { fetchData() }, [])

  const fetchData = async () => {
    try {
      setLoading(true)
      const response = await contactService.getContacts()
      if (response.success) {
        setContacts(response.data || [])
      }
    } catch (error) {
      console.error('Error fetching contacts:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleView = (contact) => {
    setSelectedContact(contact)
    setNoteValue(contact.adminNote || '')
    setViewModal(true)
  }

  const handleStatusChange = async (contactId, newStatus) => {
    try {
      const response = await contactService.updateContactStatus(contactId, newStatus)
      if (response.success) {
        // Update local state
        setContacts(contacts.map(c => 
          c.id === contactId ? { ...c, status: newStatus } : c
        ))
        if (selectedContact?.id === contactId) {
          setSelectedContact({ ...selectedContact, status: newStatus })
        }
        setEditingStatus(null)
      }
    } catch (error) {
      console.error('Error updating status:', error)
      alert('Lỗi khi cập nhật trạng thái')
    }
  }

  const handleNoteUpdate = async () => {
    if (!selectedContact) return
    try {
      const response = await contactService.updateContactNote(selectedContact.id, noteValue)
      if (response.success) {
        setContacts(contacts.map(c => 
          c.id === selectedContact.id ? { ...c, adminNote: noteValue } : c
        ))
        setSelectedContact({ ...selectedContact, adminNote: noteValue })
        setEditingNote(false)
      }
    } catch (error) {
      console.error('Error updating note:', error)
      alert('Lỗi khi cập nhật ghi chú')
    }
  }

  const getStatusBadge = (status) => {
    const badges = {
      NEW: 'bg-blue-100 text-blue-700',
      IN_PROGRESS: 'bg-yellow-100 text-yellow-700',
      RESOLVED: 'bg-green-100 text-green-700',
      CLOSED: 'bg-gray-100 text-gray-700'
    }
    return badges[status] || badges.NEW
  }

  const getStatusText = (status) => {
    const texts = {
      NEW: 'Mới',
      IN_PROGRESS: 'Đang xử lý',
      RESOLVED: 'Đã giải quyết',
      CLOSED: 'Đã đóng'
    }
    return texts[status] || 'Mới'
  }

  const filteredContacts = filterStatus === 'all' 
    ? contacts 
    : contacts.filter(c => c.status === filterStatus)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Quản lý Liên hệ</h1>
          <p className="text-gray-600 mt-1">Xem và quản lý các yêu cầu liên hệ từ khách hàng</p>
        </div>
        <div className="flex items-center gap-3">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">Tất cả trạng thái</option>
            <option value="NEW">Mới</option>
            <option value="IN_PROGRESS">Đang xử lý</option>
            <option value="RESOLVED">Đã giải quyết</option>
            <option value="CLOSED">Đã đóng</option>
          </select>
          <button
            onClick={fetchData}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <i className="fas fa-sync-alt mr-2"></i>
            Làm mới
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Tổng số</p>
              <p className="text-2xl font-bold text-gray-900">{contacts.length}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <i className="fas fa-envelope text-blue-600 text-xl"></i>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Mới</p>
              <p className="text-2xl font-bold text-blue-600">{contacts.filter(c => c.status === 'NEW').length}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <i className="fas fa-bell text-blue-600 text-xl"></i>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Đang xử lý</p>
              <p className="text-2xl font-bold text-yellow-600">{contacts.filter(c => c.status === 'IN_PROGRESS').length}</p>
            </div>
            <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
              <i className="fas fa-spinner text-yellow-600 text-xl"></i>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Đã giải quyết</p>
              <p className="text-2xl font-bold text-green-600">{contacts.filter(c => c.status === 'RESOLVED').length}</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <i className="fas fa-check text-green-600 text-xl"></i>
            </div>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tên</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">SĐT</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Chủ đề</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Trạng thái</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ngày gửi</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hành động</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {loading ? (
                <tr>
                  <td colSpan="8" className="px-6 py-12 text-center">
                    <i className="fas fa-spinner fa-spin text-3xl text-gray-400"></i>
                    <p className="text-gray-500 mt-2">Đang tải...</p>
                  </td>
                </tr>
              ) : filteredContacts.length === 0 ? (
                <tr>
                  <td colSpan="8" className="px-6 py-12 text-center">
                    <i className="fas fa-inbox text-4xl text-gray-300"></i>
                    <p className="text-gray-500 mt-2">Không có liên hệ nào</p>
                  </td>
                </tr>
              ) : (
                filteredContacts.map((contact) => (
                  <tr key={contact.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">#{contact.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{contact.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{contact.email}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{contact.phone || '-'}</td>
                    <td className="px-6 py-4 text-sm text-gray-900 max-w-xs truncate">{contact.subject}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadge(contact.status)}`}>
                        {getStatusText(contact.status)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {new Date(contact.createdAt).toLocaleDateString('vi-VN', {
                        year: 'numeric',
                        month: '2-digit',
                        day: '2-digit',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <button
                        onClick={() => handleView(contact)}
                        className="text-blue-600 hover:text-blue-900 font-medium"
                      >
                        <i className="fas fa-eye mr-1"></i>
                        Xem
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* View Modal */}
      {viewModal && selectedContact && (
        <Modal
          isOpen={viewModal}
          onClose={() => {
            setViewModal(false)
            setSelectedContact(null)
          }}
          title="Chi tiết liên hệ"
          size="lg"
        >
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tên</label>
                <p className="text-gray-900">{selectedContact.name}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Trạng thái</label>
                {editingStatus === selectedContact.id ? (
                  <div className="flex items-center gap-2">
                    <select
                      value={selectedContact.status}
                      onChange={(e) => handleStatusChange(selectedContact.id, e.target.value)}
                      className="flex-1 px-3 py-1 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="NEW">Mới</option>
                      <option value="IN_PROGRESS">Đang xử lý</option>
                      <option value="RESOLVED">Đã giải quyết</option>
                      <option value="CLOSED">Đã đóng</option>
                    </select>
                    <button
                      onClick={() => setEditingStatus(null)}
                      className="px-2 py-1 text-gray-600 hover:text-gray-900"
                    >
                      <i className="fas fa-times"></i>
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadge(selectedContact.status)}`}>
                      {getStatusText(selectedContact.status)}
                    </span>
                    <button
                      onClick={() => setEditingStatus(selectedContact.id)}
                      className="text-blue-600 hover:text-blue-900 text-sm"
                    >
                      <i className="fas fa-edit"></i>
                    </button>
                  </div>
                )}
              </div>
            </div>

            {selectedContact.topic && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Loại</label>
                <span className="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-full">
                  {selectedContact.topic}
                </span>
              </div>
            )}

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <a href={`mailto:${selectedContact.email}`} className="text-blue-600 hover:underline">
                  {selectedContact.email}
                </a>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Số điện thoại</label>
                <a href={`tel:${selectedContact.phone}`} className="text-blue-600 hover:underline">
                  {selectedContact.phone || '-'}
                </a>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Chủ đề</label>
              <p className="text-gray-900">{selectedContact.subject}</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nội dung</label>
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <p className="text-gray-900 whitespace-pre-wrap">{selectedContact.message}</p>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Ghi chú Admin</label>
              {editingNote ? (
                <div className="space-y-2">
                  <textarea
                    value={noteValue}
                    onChange={(e) => setNoteValue(e.target.value)}
                    rows="3"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Nhập ghi chú..."
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={handleNoteUpdate}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      <i className="fas fa-save mr-2"></i>
                      Lưu
                    </button>
                    <button
                      onClick={() => {
                        setEditingNote(false)
                        setNoteValue(selectedContact.adminNote || '')
                      }}
                      className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                    >
                      Hủy
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex items-start gap-2">
                  <div className="flex-1 bg-gray-50 p-3 rounded-lg border border-gray-200 min-h-[60px]">
                    <p className="text-gray-700 whitespace-pre-wrap">
                      {selectedContact.adminNote || <span className="text-gray-400 italic">Chưa có ghi chú</span>}
                    </p>
                  </div>
                  <button
                    onClick={() => setEditingNote(true)}
                    className="text-blue-600 hover:text-blue-900"
                  >
                    <i className="fas fa-edit"></i>
                  </button>
                </div>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Ngày gửi</label>
                <p>{new Date(selectedContact.createdAt).toLocaleString('vi-VN')}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Cập nhật lần cuối</label>
                <p>{new Date(selectedContact.updatedAt).toLocaleString('vi-VN')}</p>
              </div>
              {selectedContact.handledAt && (
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Thời gian xử lý</label>
                  <p>{new Date(selectedContact.handledAt).toLocaleString('vi-VN')}</p>
                </div>
              )}
            </div>
          </div>
        </Modal>
      )}
    </div>
  )
}

export default ContactManagement
