import React, { useState, useEffect } from 'react'
import DataTable from '../../components/admin/DataTable'
import Modal from '../../components/admin/Modal'
import FormInput from '../../components/admin/FormInput'
import FormSelect from '../../components/admin/FormSelect'
import ImageUpload from '../../components/admin/ImageUpload'
import api from '../../services/api'
import toast from '../../utils/toast'
import { useLanguage } from '../../i18n/config'

const InstructorManagement = () => {
  const { language } = useLanguage()
  const [instructors, setInstructors] = useState([])
  const [loading, setLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingInstructor, setEditingInstructor] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    title: '',
    bio: '',
    email: '',
    phone: '',
    avatarUrl: '',
    expertise: '',
    yearsOfExperience: 0,
    rating: 0,
    linkedinUrl: '',
    facebookUrl: '',
    isActive: true,
    isFeatured: false,
    displayOrder: 0
  })

  const translations = {
    vi: {
      instructorManagement: 'Quản lý Giảng viên',
      manageInstructors: 'Quản lý giảng viên và chuyên gia',
      addInstructor: 'Thêm Giảng viên',
      editInstructor: 'Sửa Giảng viên',
      createInstructor: 'Tạo Giảng viên',
      name: 'Họ tên',
      slug: 'Slug (URL)',
      title: 'Chức danh',
      bio: 'Tiểu sử',
      email: 'Email',
      phone: 'Số điện thoại',
      avatar: 'Ảnh đại diện',
      expertise: 'Chuyên môn',
      experience: 'Kinh nghiệm (năm)',
      rating: 'Đánh giá',
      linkedinUrl: 'LinkedIn URL',
      facebookUrl: 'Facebook URL',
      status: 'Trạng thái',
      featured: 'Nổi bật',
      displayOrder: 'Thứ tự hiển thị',
      active: 'Hoạt động',
      inactive: 'Tạm dừng',
      yes: 'Có',
      no: 'Không',
      cancel: 'Hủy',
      update: 'Cập nhật',
      create: 'Tạo',
      id: 'ID',
      deleteInstructorConfirm: 'Xóa giảng viên',
      instructorDeletedSuccess: 'Đã xóa giảng viên thành công',
      instructorUpdatedSuccess: 'Đã cập nhật giảng viên thành công',
      instructorCreatedSuccess: 'Đã tạo giảng viên thành công',
      errorFetchingInstructors: 'Lỗi tải danh sách giảng viên',
      errorDeletingInstructor: 'Lỗi xóa giảng viên',
      errorSavingInstructor: 'Lỗi lưu giảng viên'
    },
    en: {
      instructorManagement: 'Instructor Management',
      manageInstructors: 'Manage instructors and experts',
      addInstructor: 'Add Instructor',
      editInstructor: 'Edit Instructor',
      createInstructor: 'Create Instructor',
      name: 'Full Name',
      slug: 'Slug (URL)',
      title: 'Title',
      bio: 'Biography',
      email: 'Email',
      phone: 'Phone',
      avatar: 'Avatar',
      expertise: 'Expertise',
      experience: 'Experience (years)',
      rating: 'Rating',
      linkedinUrl: 'LinkedIn URL',
      facebookUrl: 'Facebook URL',
      status: 'Status',
      featured: 'Featured',
      displayOrder: 'Display Order',
      active: 'Active',
      inactive: 'Inactive',
      yes: 'Yes',
      no: 'No',
      cancel: 'Cancel',
      update: 'Update',
      create: 'Create',
      id: 'ID',
      deleteInstructorConfirm: 'Delete instructor',
      instructorDeletedSuccess: 'Instructor deleted successfully',
      instructorUpdatedSuccess: 'Instructor updated successfully',
      instructorCreatedSuccess: 'Instructor created successfully',
      errorFetchingInstructors: 'Error fetching instructors',
      errorDeletingInstructor: 'Error deleting instructor',
      errorSavingInstructor: 'Error saving instructor'
    }
  }

  const t = (key) => translations[language]?.[key] || translations['vi'][key] || key

  useEffect(() => {
    fetchInstructors()
  }, [])

  const fetchInstructors = async () => {
    try {
      const response = await api.get('/admin/instructors')
      if (response.data.success) {
        setInstructors(response.data.data.content || response.data.data)
      }
    } catch (error) {
      toast.error(t('errorFetchingInstructors'))
    } finally {
      setLoading(false)
    }
  }

  const handleCreate = () => {
    setEditingInstructor(null)
    setFormData({
      name: '',
      slug: '',
      title: '',
      bio: '',
      email: '',
      phone: '',
      avatarUrl: '',
      expertise: '',
      yearsOfExperience: 0,
      rating: 0,
      linkedinUrl: '',
      facebookUrl: '',
      isActive: true,
      isFeatured: false,
      displayOrder: 0
    })
    setIsModalOpen(true)
  }

  const handleEdit = (instructor) => {
    setEditingInstructor(instructor)
    setFormData({
      name: instructor.name,
      slug: instructor.slug || instructor.name.toLowerCase().replace(/\s+/g, '-'),
      title: instructor.title || '',
      bio: instructor.bio || '',
      email: instructor.email || '',
      phone: instructor.phone || '',
      avatarUrl: instructor.avatarUrl || '',
      expertise: instructor.expertise || '',
      yearsOfExperience: instructor.yearsExperience || 0,
      rating: instructor.averageRating || 0,
      linkedinUrl: instructor.linkedinUrl || '',
      facebookUrl: instructor.facebookUrl || '',
      isActive: instructor.isActive !== undefined ? instructor.isActive : true,
      isFeatured: instructor.isFeatured || false,
      displayOrder: instructor.displayOrder || 0
    })
    setIsModalOpen(true)
  }

  const handleDelete = async (instructor) => {
    if (!confirm(`${t('deleteInstructorConfirm')} "${instructor.name}"?`)) return

    try {
      await api.delete(`/admin/instructors/${instructor.id}`)
      toast.success(t('instructorDeletedSuccess'))
      fetchInstructors()
    } catch (error) {
      toast.error(t('errorDeletingInstructor'))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    try {
      if (editingInstructor) {
        await api.put(`/admin/instructors/${editingInstructor.id}`, formData)
        toast.success(t('instructorUpdatedSuccess'))
      } else {
        await api.post('/admin/instructors', formData)
        toast.success(t('instructorCreatedSuccess'))
      }
      setIsModalOpen(false)
      fetchInstructors()
    } catch (error) {
      console.error('Error saving instructor:', error.response?.data || error)
      const errorMessage = error.response?.data?.error?.message || t('errorSavingInstructor')
      toast.error(errorMessage)
    }
  }

  const columns = [
    { key: 'id', label: t('id'), sortable: true },
    { 
      key: 'avatarUrl', 
      label: t('avatar'),
      render: (value) => value ? (
        <img src={value} alt="" className="w-12 h-12 rounded-full object-cover" />
      ) : (
        <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
          <i className="fas fa-user text-gray-400"></i>
        </div>
      )
    },
    { key: 'name', label: t('name'), sortable: true },
    { key: 'title', label: t('title') },
    { key: 'email', label: t('email') },
    { 
      key: 'averageRating', 
      label: t('rating'),
      render: (value) => value ? `⭐ ${value.toFixed(1)}` : '-'
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{t('instructorManagement')}</h1>
          <p className="text-gray-600 mt-1">{t('manageInstructors')}</p>
        </div>
        <button
          onClick={handleCreate}
          className="flex items-center gap-2 px-4 py-2 bg-mekong-blue text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <i className="fas fa-plus"></i>
          <span>{t('addInstructor')}</span>
        </button>
      </div>

      <DataTable
        columns={columns}
        data={instructors}
        loading={loading}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingInstructor ? t('editInstructor') : t('createInstructor')}
        size="lg"
        footer={
          <>
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              {t('cancel')}
            </button>
            <button
              type="submit"
              form="instructor-form"
              className="px-4 py-2 bg-mekong-blue text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              {editingInstructor ? t('update') : t('create')}
            </button>
          </>
        }
      >
        <form id="instructor-form" onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <FormInput
              label={`${t('name')} *`}
              name="name"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              required
            />
            <FormInput
              label={`${t('slug')} *`}
              name="slug"
              value={formData.slug}
              onChange={(e) => setFormData({...formData, slug: e.target.value})}
              required
            />
          </div>

          <FormInput
            label={t('title')}
            name="title"
            value={formData.title}
            onChange={(e) => setFormData({...formData, title: e.target.value})}
            placeholder="VD: Giảng viên cao cấp, Chuyên gia đào tạo"
          />

          <FormInput
            label={t('bio')}
            name="bio"
            type="textarea"
            rows={4}
            value={formData.bio}
            onChange={(e) => setFormData({...formData, bio: e.target.value})}
          />

          <ImageUpload
            label={t('avatar')}
            value={formData.avatarUrl}
            onChange={(url) => setFormData({...formData, avatarUrl: url})}
            folder="instructors"
          />

          <div className="grid grid-cols-2 gap-4">
            <FormInput
              label={t('email')}
              name="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
            <FormInput
              label={t('phone')}
              name="phone"
              value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
            />
          </div>

          <FormInput
            label={t('expertise')}
            name="expertise"
            value={formData.expertise}
            onChange={(e) => setFormData({...formData, expertise: e.target.value})}
            placeholder="VD: Web Development, Data Science, Digital Marketing"
          />

          <div className="grid grid-cols-2 gap-4">
            <FormInput
              label={t('experience')}
              name="yearsOfExperience"
              type="number"
              value={formData.yearsOfExperience}
              onChange={(e) => setFormData({...formData, yearsOfExperience: parseInt(e.target.value)})}
            />
            <FormInput
              label={t('rating')}
              name="rating"
              type="number"
              step="0.1"
              min="0"
              max="5"
              value={formData.rating}
              onChange={(e) => setFormData({...formData, rating: parseFloat(e.target.value)})}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <FormInput
              label={t('linkedinUrl')}
              name="linkedinUrl"
              type="url"
              value={formData.linkedinUrl}
              onChange={(e) => setFormData({...formData, linkedinUrl: e.target.value})}
            />
            <FormInput
              label={t('facebookUrl')}
              name="facebookUrl"
              type="url"
              value={formData.facebookUrl}
              onChange={(e) => setFormData({...formData, facebookUrl: e.target.value})}
            />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <FormInput
              label={t('displayOrder')}
              name="displayOrder"
              type="number"
              value={formData.displayOrder}
              onChange={(e) => setFormData({...formData, displayOrder: parseInt(e.target.value)})}
            />
            <FormSelect
              label={t('status')}
              name="isActive"
              value={formData.isActive}
              onChange={(e) => setFormData({...formData, isActive: e.target.value === 'true'})}
              options={[
                { value: 'true', label: t('active') },
                { value: 'false', label: t('inactive') }
              ]}
            />
            <FormSelect
              label={t('featured')}
              name="isFeatured"
              value={formData.isFeatured}
              onChange={(e) => setFormData({...formData, isFeatured: e.target.value === 'true'})}
              options={[
                { value: 'false', label: t('no') },
                { value: 'true', label: t('yes') }
              ]}
            />
          </div>
        </form>
      </Modal>
    </div>
  )
}

export default InstructorManagement
