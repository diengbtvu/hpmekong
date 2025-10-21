import React, { useState, useEffect } from 'react'
import DataTable from '../../components/admin/DataTable'
import Modal from '../../components/admin/Modal'
import FormInput from '../../components/admin/FormInput'
import FormSelect from '../../components/admin/FormSelect'
import ImageUpload from '../../components/admin/ImageUpload'
import api from '../../services/api'
import toast from '../../utils/toast'
import { useLanguage } from '../../i18n/config'
import { generateSlug } from '../../utils/slugify'

const CenterManagement = () => {
  const { language } = useLanguage()
  const [centers, setCenters] = useState([])
  const [loading, setLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingCenter, setEditingCenter] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    tagline: '',
    description: '',
    logoUrl: '',
    coverImageUrl: '',
    primaryColor: '#0066cc',
    email: '',
    phone: '',
    website: '',
    isActive: true,
    displayOrder: 0
  })

  const translations = {
    vi: {
      centerManagement: 'Quản lý Hệ sinh thái',
      manageEcosystemCenters: 'Quản lý các trung tâm trong hệ sinh thái',
      addCenter: 'Thêm Trung tâm',
      editCenter: 'Sửa Trung tâm',
      createCenter: 'Tạo Trung tâm',
      name: 'Tên trung tâm',
      slug: 'Slug (URL)',
      tagline: 'Slogan',
      description: 'Mô tả',
      logo: 'Logo',
      coverImage: 'Ảnh bìa',
      primaryColor: 'Màu chủ đạo',
      email: 'Email',
      phone: 'Số điện thoại',
      website: 'Website',
      displayOrder: 'Thứ tự hiển thị',
      status: 'Trạng thái',
      active: 'Hoạt động',
      inactive: 'Tạm dừng',
      cancel: 'Hủy',
      update: 'Cập nhật',
      create: 'Tạo',
      id: 'ID',
      actions: 'Thao tác',
      deleteCenterConfirm: 'Xóa trung tâm',
      centerDeletedSuccess: 'Đã xóa trung tâm thành công',
      centerUpdatedSuccess: 'Đã cập nhật trung tâm thành công',
      centerCreatedSuccess: 'Đã tạo trung tâm thành công',
      errorFetchingCenters: 'Lỗi tải danh sách trung tâm',
      errorDeletingCenter: 'Lỗi xóa trung tâm',
      errorSavingCenter: 'Lỗi lưu trung tâm'
    },
    en: {
      centerManagement: 'Ecosystem Management',
      manageEcosystemCenters: 'Manage ecosystem centers',
      addCenter: 'Add Center',
      editCenter: 'Edit Center',
      createCenter: 'Create Center',
      name: 'Center Name',
      slug: 'Slug (URL)',
      tagline: 'Tagline',
      description: 'Description',
      logo: 'Logo',
      coverImage: 'Cover Image',
      primaryColor: 'Primary Color',
      email: 'Email',
      phone: 'Phone',
      website: 'Website',
      displayOrder: 'Display Order',
      status: 'Status',
      active: 'Active',
      inactive: 'Inactive',
      cancel: 'Cancel',
      update: 'Update',
      create: 'Create',
      id: 'ID',
      actions: 'Actions',
      deleteCenterConfirm: 'Delete center',
      centerDeletedSuccess: 'Center deleted successfully',
      centerUpdatedSuccess: 'Center updated successfully',
      centerCreatedSuccess: 'Center created successfully',
      errorFetchingCenters: 'Error fetching centers',
      errorDeletingCenter: 'Error deleting center',
      errorSavingCenter: 'Error saving center'
    }
  }

  const t = (key) => translations[language]?.[key] || translations['vi'][key] || key

  useEffect(() => {
    fetchCenters()
  }, [])

  const fetchCenters = async () => {
    try {
      const response = await api.get('/admin/centers')
      if (response.data.success) {
        setCenters(response.data.data)
      }
    } catch (error) {
      toast.error(t('errorFetchingCenters'))
    } finally {
      setLoading(false)
    }
  }

  const handleCreate = () => {
    setEditingCenter(null)
    setFormData({
      name: '',
      slug: '',
      tagline: '',
      description: '',
      logoUrl: '',
      coverImageUrl: '',
      primaryColor: '#0066cc',
      email: '',
      phone: '',
      website: '',
      isActive: true,
      displayOrder: 0
    })
    setIsModalOpen(true)
  }

  const handleEdit = (center) => {
    setEditingCenter(center)
    setFormData(center)
    setIsModalOpen(true)
  }

  const handleDelete = async (center) => {
    if (!confirm(`${t('deleteCenterConfirm')} "${center.name}"?`)) return

    try {
      await api.delete(`/admin/centers/${center.id}`)
      toast.success(t('centerDeletedSuccess'))
      fetchCenters()
    } catch (error) {
      toast.error(t('errorDeletingCenter'))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    // Validate required fields
    if (!formData.name || !formData.name.trim()) {
      toast.error(language === 'vi' ? 'Vui lòng nhập tên trung tâm' : 'Please enter center name')
      return
    }
    
    if (!formData.slug || !formData.slug.trim()) {
      toast.error(language === 'vi' ? 'Vui lòng nhập slug' : 'Please enter slug')
      return
    }
    
    try {
      if (editingCenter) {
        await api.put(`/admin/centers/${editingCenter.id}`, formData)
        toast.success(t('centerUpdatedSuccess'))
      } else {
        await api.post('/admin/centers', formData)
        toast.success(t('centerCreatedSuccess'))
      }
      setIsModalOpen(false)
      fetchCenters()
    } catch (error) {
      console.error('Error saving center:', error.response?.data || error)
      const errorMessage = error.response?.data?.error?.message || t('errorSavingCenter')
      toast.error(errorMessage)
    }
  }

  const columns = [
    { key: 'id', label: t('id'), sortable: true },
    { 
      key: 'logoUrl', 
      label: t('logo'),
      render: (value) => value ? (
        <img src={value} alt="" className="w-12 h-12 object-contain rounded" />
      ) : (
        <div className="w-12 h-12 bg-gray-200 rounded flex items-center justify-center">
          <i className="fas fa-image text-gray-400"></i>
        </div>
      )
    },
    { key: 'name', label: t('name'), sortable: true },
    { key: 'slug', label: t('slug') },
    { 
      key: 'isActive', 
      label: t('status'),
      render: (value) => (
        <span className={`px-2 py-1 text-xs rounded-full ${value ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
          {value ? t('active') : t('inactive')}
        </span>
      )
    },
    { key: 'displayOrder', label: t('displayOrder'), sortable: true },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{t('centerManagement')}</h1>
          <p className="text-gray-600 mt-1">{t('manageEcosystemCenters')}</p>
        </div>
        <button
          onClick={handleCreate}
          className="flex items-center gap-2 px-4 py-2 bg-mekong-blue text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <i className="fas fa-plus"></i>
          <span>{t('addCenter')}</span>
        </button>
      </div>

      {/* Data Table */}
      <DataTable
        columns={columns}
        data={centers}
        loading={loading}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {/* Create/Edit Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingCenter ? t('editCenter') : t('createCenter')}
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
              form="center-form"
              className="px-4 py-2 bg-mekong-blue text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              {editingCenter ? t('update') : t('create')}
            </button>
          </>
        }
      >
        <form id="center-form" onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <FormInput
              label={`${t('name')} *`}
              name="name"
              value={formData.name}
              onChange={(e) => {
                const name = e.target.value
                setFormData({
                  ...formData,
                  name: name,
                  slug: !editingCenter ? generateSlug(name) : formData.slug
                })
              }}
              required
            />
            <FormInput
              label={`${t('slug')} *`}
              name="slug"
              value={formData.slug}
              onChange={(e) => setFormData({...formData, slug: e.target.value})}
              placeholder="mekong-skills-pro"
              required
            />
          </div>

          <FormInput
            label={t('tagline')}
            name="tagline"
            value={formData.tagline}
            onChange={(e) => setFormData({...formData, tagline: e.target.value})}
          />

          <FormInput
            label={t('description')}
            name="description"
            type="textarea"
            rows={3}
            value={formData.description}
            onChange={(e) => setFormData({...formData, description: e.target.value})}
          />

          <ImageUpload
            label={t('logo')}
            value={formData.logoUrl}
            onChange={(url) => setFormData({...formData, logoUrl: url})}
            folder="centers"
          />

          <ImageUpload
            label={t('coverImage')}
            value={formData.coverImageUrl}
            onChange={(url) => setFormData({...formData, coverImageUrl: url})}
            folder="centers"
          />

          <div className="grid grid-cols-2 gap-4">
            <FormInput
              label={t('primaryColor')}
              name="primaryColor"
              type="color"
              value={formData.primaryColor}
              onChange={(e) => setFormData({...formData, primaryColor: e.target.value})}
            />
            <FormInput
              label={t('displayOrder')}
              name="displayOrder"
              type="number"
              value={formData.displayOrder}
              onChange={(e) => setFormData({...formData, displayOrder: parseInt(e.target.value)})}
            />
          </div>

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
            label={t('website')}
            name="website"
            type="url"
            value={formData.website}
            onChange={(e) => setFormData({...formData, website: e.target.value})}
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
        </form>
      </Modal>
    </div>
  )
}

export default CenterManagement

