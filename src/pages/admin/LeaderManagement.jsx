import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import leaderService from '../../services/leaderService'
import toast from '../../utils/toast'
import { formatErrorForToast } from '../../utils/errorHandler'
import api from '../../services/api'

const LeaderManagement = () => {
  const [leaders, setLeaders] = useState([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editingLeader, setEditingLeader] = useState(null)
  const [uploadingImage, setUploadingImage] = useState(false)
  const [imagePreview, setImagePreview] = useState(null)
  const [formData, setFormData] = useState({
    fullName: '',
    position: '',
    avatarUrl: '',
    bio: '',
    email: '',
    phone: '',
    linkedinUrl: '',
    facebookUrl: '',
    twitterUrl: '',
    displayOrder: 0,
    isActive: true,
    isFeatured: false,
  })

  useEffect(() => {
    fetchLeaders()
  }, [])

  const fetchLeaders = async () => {
    try {
      setLoading(true)
      const response = await leaderService.getAllLeadersAdmin({
        page: 0,
        size: 100,
        sortBy: 'displayOrder',
        sortDir: 'asc'
      })
      if (response.success) {
        setLeaders(response.data.content || [])
      }
    } catch (error) {
      console.error('Error fetching leaders:', error)
      toast.error('Không thể tải danh sách ban lãnh đạo')
    } finally {
      setLoading(false)
    }
  }

  const handleOpenModal = (leader = null) => {
    if (leader) {
      setEditingLeader(leader)
      setImagePreview(leader.avatarUrl || null)
      setFormData({
        fullName: leader.fullName || '',
        position: leader.position || '',
        avatarUrl: leader.avatarUrl || '',
        bio: leader.bio || '',
        email: leader.email || '',
        phone: leader.phone || '',
        linkedinUrl: leader.linkedinUrl || '',
        facebookUrl: leader.facebookUrl || '',
        twitterUrl: leader.twitterUrl || '',
        displayOrder: leader.displayOrder || 0,
        isActive: leader.isActive !== undefined ? leader.isActive : true,
        isFeatured: leader.isFeatured !== undefined ? leader.isFeatured : false,
      })
    } else {
      setEditingLeader(null)
      setImagePreview(null)
      setFormData({
        fullName: '',
        position: '',
        avatarUrl: '',
        bio: '',
        email: '',
        phone: '',
        linkedinUrl: '',
        facebookUrl: '',
        twitterUrl: '',
        displayOrder: 0,
        isActive: true,
        isFeatured: false,
      })
    }
    setShowModal(true)
  }

  const handleCloseModal = () => {
    setShowModal(false)
    setEditingLeader(null)
    setImagePreview(null)
  }

  const handleImageUpload = async (e) => {
    const file = e.target.files[0]
    if (!file) return

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast.error('Vui lòng chọn file ảnh hợp lệ')
      return
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('Kích thước ảnh không được vượt quá 5MB')
      return
    }

    try {
      setUploadingImage(true)

      // Create FormData
      const formDataUpload = new FormData()
      formDataUpload.append('file', file)
      formDataUpload.append('folder', 'leaders')

      // Upload to server
      const response = await api.post('/files/upload/image', formDataUpload, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })

      if (response.data.success) {
        const imageUrl = response.data.data.url
        setFormData({ ...formData, avatarUrl: imageUrl })
        setImagePreview(imageUrl)
        toast.success('Tải ảnh lên thành công!')
      }
    } catch (error) {
      console.error('Upload error:', error)
      const errorMessage = formatErrorForToast(error)
      toast.error(errorMessage, 5000)
    } finally {
      setUploadingImage(false)
    }
  }

  const handleRemoveImage = () => {
    setFormData({ ...formData, avatarUrl: '' })
    setImagePreview(null)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    try {
      if (editingLeader) {
        await leaderService.updateLeader(editingLeader.id, formData)
        toast.success('Cập nhật ban lãnh đạo thành công!')
      } else {
        await leaderService.createLeader(formData)
        toast.success('Thêm ban lãnh đạo thành công!')
      }
      handleCloseModal()
      fetchLeaders()
    } catch (error) {
      const errorMessage = formatErrorForToast(error)
      toast.error(errorMessage, 5000)
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Bạn có chắc chắn muốn xóa thành viên ban lãnh đạo này?')) {
      return
    }

    try {
      await leaderService.deleteLeader(id)
      toast.success('Xóa thành công!')
      fetchLeaders()
    } catch (error) {
      const errorMessage = formatErrorForToast(error)
      toast.error(errorMessage, 5000)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-mekong-blue mb-4"></div>
          <p className="text-gray-600">Đang tải...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Quản lý Ban Lãnh Đạo</h1>
          <p className="text-gray-600 mt-1">Quản lý thông tin ban lãnh đạo công ty</p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="btn btn-primary"
        >
          <i className="fas fa-plus mr-2"></i>
          Thêm Thành Viên
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Thứ tự
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Ảnh
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Họ tên
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Chức vụ
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Liên hệ
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Trạng thái
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Thao tác
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {leaders.length === 0 ? (
              <tr>
                <td colSpan="7" className="px-6 py-12 text-center text-gray-500">
                  <i className="fas fa-users text-4xl mb-4 text-gray-300"></i>
                  <p>Chưa có thành viên ban lãnh đạo nào</p>
                </td>
              </tr>
            ) : (
              leaders.map((leader) => (
                <tr key={leader.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {leader.displayOrder}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {leader.avatarUrl ? (
                      <img
                        src={leader.avatarUrl}
                        alt={leader.fullName}
                        className="h-12 w-12 rounded-full object-cover"
                      />
                    ) : (
                      <div className="h-12 w-12 rounded-full bg-gray-200 flex items-center justify-center">
                        <i className="fas fa-user text-gray-400"></i>
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{leader.fullName}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{leader.position}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">{leader.email}</div>
                    <div className="text-sm text-gray-500">{leader.phone}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex flex-col gap-1">
                      <span className={`inline-flex px-2 py-1 text-xs leading-5 font-semibold rounded-full ${
                        leader.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {leader.isActive ? 'Hoạt động' : 'Ẩn'}
                      </span>
                      {leader.isFeatured && (
                        <span className="inline-flex px-2 py-1 text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                          Nổi bật
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => handleOpenModal(leader)}
                      className="text-blue-600 hover:text-blue-900 mr-4"
                    >
                      <i className="fas fa-edit"></i>
                    </button>
                    <button
                      onClick={() => handleDelete(leader.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      <i className="fas fa-trash"></i>
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen px-4">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black bg-opacity-50"
                onClick={handleCloseModal}
              ></motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="relative bg-white rounded-lg shadow-xl max-w-2xl w-full p-6 z-10"
              >
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold">
                    {editingLeader ? 'Chỉnh sửa Thành Viên' : 'Thêm Thành Viên Mới'}
                  </h2>
                  <button onClick={handleCloseModal} className="text-gray-400 hover:text-gray-600">
                    <i className="fas fa-times text-xl"></i>
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Họ tên <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-mekong-blue focus:border-transparent"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Chức vụ <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={formData.position}
                        onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                        placeholder="CEO, CTO, COO..."
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-mekong-blue focus:border-transparent"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-mekong-blue focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Số điện thoại</label>
                      <input
                        type="text"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-mekong-blue focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Ảnh đại diện</label>
                    
                    {/* Image Preview */}
                    {imagePreview ? (
                      <div className="mb-3">
                        <div className="relative inline-block">
                          <img
                            src={imagePreview}
                            alt="Preview"
                            className="w-32 h-32 object-cover rounded-lg border-2 border-gray-200"
                          />
                          <button
                            type="button"
                            onClick={handleRemoveImage}
                            className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
                          >
                            <i className="fas fa-times text-xs"></i>
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="mb-3 w-32 h-32 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center bg-gray-50">
                        <i className="fas fa-user text-4xl text-gray-300"></i>
                      </div>
                    )}

                    {/* Upload Button */}
                    <div className="flex gap-2">
                      <label className="btn btn-outline cursor-pointer">
                        <i className="fas fa-upload mr-2"></i>
                        {uploadingImage ? 'Đang tải...' : 'Chọn ảnh'}
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="hidden"
                          disabled={uploadingImage}
                        />
                      </label>
                      {uploadingImage && (
                        <div className="flex items-center text-sm text-gray-600">
                          <i className="fas fa-spinner fa-spin mr-2"></i>
                          Đang upload...
                        </div>
                      )}
                    </div>
                    <p className="text-xs text-gray-500 mt-2">
                      Hoặc nhập URL ảnh:
                    </p>
                    <input
                      type="text"
                      value={formData.avatarUrl}
                      onChange={(e) => {
                        setFormData({ ...formData, avatarUrl: e.target.value })
                        setImagePreview(e.target.value)
                      }}
                      placeholder="https://hwm.edu.vn/uploads/leaders/..."
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-mekong-blue focus:border-transparent mt-1"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Giới thiệu</label>
                    <textarea
                      value={formData.bio}
                      onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                      rows="4"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-mekong-blue focus:border-transparent"
                    ></textarea>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">LinkedIn</label>
                      <input
                        type="text"
                        value={formData.linkedinUrl}
                        onChange={(e) => setFormData({ ...formData, linkedinUrl: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-mekong-blue focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Facebook</label>
                      <input
                        type="text"
                        value={formData.facebookUrl}
                        onChange={(e) => setFormData({ ...formData, facebookUrl: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-mekong-blue focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Twitter</label>
                      <input
                        type="text"
                        value={formData.twitterUrl}
                        onChange={(e) => setFormData({ ...formData, twitterUrl: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-mekong-blue focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Thứ tự hiển thị</label>
                      <input
                        type="number"
                        value={formData.displayOrder}
                        onChange={(e) => setFormData({ ...formData, displayOrder: parseInt(e.target.value) || 0 })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-mekong-blue focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Trạng thái</label>
                      <select
                        value={formData.isActive}
                        onChange={(e) => setFormData({ ...formData, isActive: e.target.value === 'true' })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-mekong-blue focus:border-transparent"
                      >
                        <option value="true">Hoạt động</option>
                        <option value="false">Ẩn</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Nổi bật</label>
                      <select
                        value={formData.isFeatured}
                        onChange={(e) => setFormData({ ...formData, isFeatured: e.target.value === 'true' })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-mekong-blue focus:border-transparent"
                      >
                        <option value="false">Không</option>
                        <option value="true">Có</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex justify-end gap-3 pt-4">
                    <button
                      type="button"
                      onClick={handleCloseModal}
                      className="btn btn-outline"
                    >
                      Hủy
                    </button>
                    <button type="submit" className="btn btn-primary">
                      {editingLeader ? 'Cập nhật' : 'Tạo mới'}
                    </button>
                  </div>
                </form>
              </motion.div>
            </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default LeaderManagement
