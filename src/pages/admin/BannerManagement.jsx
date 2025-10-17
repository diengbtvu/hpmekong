import React, { useState, useEffect } from 'react'
import DataTable from '../../components/admin/DataTable'
import Modal from '../../components/admin/Modal'
import FormInput from '../../components/admin/FormInput'
import FormSelect from '../../components/admin/FormSelect'
import ImageUpload from '../../components/admin/ImageUpload'
import { bannerService } from '../../services/contentService'
import toast from '../../utils/toast'
import { useLanguage } from '../../i18n/config'

const BannerManagement = () => {
  const { language } = useLanguage()
  const [banners, setBanners] = useState([])
  const [loading, setLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingBanner, setEditingBanner] = useState(null)

  const translations = {
    vi: {
      bannerManagement: 'Quản lý Banner',
      manageHomepageBanners: 'Quản lý banner và slider trang chủ',
      addBanner: 'Thêm Banner',
      editBanner: 'Sửa Banner',
      createBanner: 'Tạo Banner',
      titleVi: 'Tiêu đề (VI)',
      titleEn: 'Tiêu đề (EN)',
      subtitleVi: 'Phụ đề (VI)',
      subtitleEn: 'Phụ đề (EN)',
      descriptionVi: 'Mô tả (VI)',
      descriptionEn: 'Mô tả (EN)',
      bannerImage: 'Hình ảnh Banner',
      linkUrl: 'Đường dẫn',
      type: 'Loại',
      displayOrder: 'Thứ tự hiển thị',
      status: 'Trạng thái',
      active: 'Hoạt động',
      inactive: 'Tạm dừng',
      cancel: 'Hủy',
      update: 'Cập nhật',
      create: 'Tạo',
      hero: 'Hero',
      featuredNews: 'Tin nổi bật',
      promotion: 'Khuyến mãi',
      announcement: 'Thông báo',
      id: 'ID',
      image: 'Hình ảnh',
      title: 'Tiêu đề',
      order: 'Thứ tự',
      deleteBannerConfirm: 'Xóa banner',
      bannerDeletedSuccess: 'Đã xóa banner thành công',
      bannerUpdatedSuccess: 'Đã cập nhật banner thành công',
      bannerCreatedSuccess: 'Đã tạo banner thành công',
      errorFetchingBanners: 'Lỗi tải danh sách banner',
      errorDeletingBanner: 'Lỗi xóa banner',
      errorSavingBanner: 'Lỗi lưu banner'
    },
    en: {
      bannerManagement: 'Banner Management',
      manageHomepageBanners: 'Manage homepage banners and sliders',
      addBanner: 'Add Banner',
      editBanner: 'Edit Banner',
      createBanner: 'Create Banner',
      titleVi: 'Title (VI)',
      titleEn: 'Title (EN)',
      subtitleVi: 'Subtitle (VI)',
      subtitleEn: 'Subtitle (EN)',
      descriptionVi: 'Description (VI)',
      descriptionEn: 'Description (EN)',
      bannerImage: 'Banner Image',
      linkUrl: 'Link URL',
      type: 'Type',
      displayOrder: 'Display Order',
      status: 'Status',
      active: 'Active',
      inactive: 'Inactive',
      cancel: 'Cancel',
      update: 'Update',
      create: 'Create',
      hero: 'Hero',
      featuredNews: 'Featured News',
      promotion: 'Promotion',
      announcement: 'Announcement',
      id: 'ID',
      image: 'Image',
      title: 'Title',
      order: 'Order',
      deleteBannerConfirm: 'Delete banner',
      bannerDeletedSuccess: 'Banner deleted successfully',
      bannerUpdatedSuccess: 'Banner updated successfully',
      bannerCreatedSuccess: 'Banner created successfully',
      errorFetchingBanners: 'Error fetching banners',
      errorDeletingBanner: 'Error deleting banner',
      errorSavingBanner: 'Error saving banner'
    }
  }

  const t = (key) => translations[language]?.[key] || translations['vi'][key] || key
  const [formData, setFormData] = useState({
    title: '',
    titleEn: '',
    subtitle: '',
    subtitleEn: '',
    description: '',
    descriptionEn: '',
    imageUrl: '',
    linkUrl: '',
    linkText: '',
    linkTextEn: '',
    type: 'HERO',
    displayOrder: 0,
    isActive: true
  })

  useEffect(() => {
    fetchBanners()
  }, [])

  const fetchBanners = async () => {
    try {
      const response = await bannerService.getAllBanners()
      if (response.success) {
        setBanners(response.data)
      }
    } catch (error) {
      toast.error(t('errorFetchingBanners'))
    } finally {
      setLoading(false)
    }
  }

  const handleCreate = () => {
    setEditingBanner(null)
    setFormData({
      title: '',
      titleEn: '',
      subtitle: '',
      subtitleEn: '',
      description: '',
      descriptionEn: '',
      imageUrl: '',
      linkUrl: '',
      linkText: '',
      linkTextEn: '',
      type: 'HERO',
      displayOrder: 0,
      isActive: true
    })
    setIsModalOpen(true)
  }

  const handleEdit = (banner) => {
    setEditingBanner(banner)
    setFormData(banner)
    setIsModalOpen(true)
  }

  const handleDelete = async (banner) => {
    if (!confirm(`${t('deleteBannerConfirm')} "${banner.title}"?`)) return

    try {
      await bannerService.deleteBanner(banner.id)
      toast.success(t('bannerDeletedSuccess'))
      fetchBanners()
    } catch (error) {
      toast.error(t('errorDeletingBanner'))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    // Validate required fields
    if (!formData.title || !formData.title.trim()) {
      toast.error(language === 'vi' ? 'Vui lòng nhập tiêu đề' : 'Please enter title')
      return
    }
    
    if (!formData.imageUrl || !formData.imageUrl.trim()) {
      toast.error(language === 'vi' ? 'Vui lòng thêm hình ảnh banner' : 'Please add banner image')
      return
    }
    
    try {
      console.log('Submitting banner data:', formData)
      if (editingBanner) {
        await bannerService.updateBanner(editingBanner.id, formData)
        toast.success(t('bannerUpdatedSuccess'))
      } else {
        await bannerService.createBanner(formData)
        toast.success(t('bannerCreatedSuccess'))
      }
      setIsModalOpen(false)
      fetchBanners()
    } catch (error) {
      console.error('Error saving banner:', error.response?.data || error)
      const errorMessage = error.response?.data?.error?.message || t('errorSavingBanner')
      toast.error(errorMessage)
    }
  }

  const columns = [
    { key: 'id', label: t('id'), sortable: true },
    { 
      key: 'imageUrl', 
      label: t('image'),
      render: (value) => (
        <img src={value} alt="" className="w-20 h-12 object-cover rounded" />
      )
    },
    { key: 'title', label: t('title'), sortable: true },
    { 
      key: 'type', 
      label: t('type'),
      render: (value) => (
        <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
          {value}
        </span>
      )
    },
    { key: 'displayOrder', label: t('order'), sortable: true },
    { 
      key: 'isActive', 
      label: t('status'),
      render: (value) => (
        <span className={`px-2 py-1 text-xs rounded-full ${value ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
          {value ? t('active') : t('inactive')}
        </span>
      )
    },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{t('bannerManagement')}</h1>
          <p className="text-gray-600 mt-1">{t('manageHomepageBanners')}</p>
        </div>
        <button
          onClick={handleCreate}
          className="flex items-center gap-2 px-4 py-2 bg-mekong-blue text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <i className="fas fa-plus"></i>
          <span>{t('addBanner')}</span>
        </button>
      </div>

      {/* Data Table */}
      <DataTable
        columns={columns}
        data={banners}
        loading={loading}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {/* Create/Edit Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingBanner ? t('editBanner') : t('createBanner')}
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
              form="banner-form"
              className="px-4 py-2 bg-mekong-blue text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              {editingBanner ? t('update') : t('create')}
            </button>
          </>
        }
      >
        <form id="banner-form" onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <FormInput
              label={t('titleVi')}
              name="title"
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              required
            />
            <FormInput
              label={t('titleEn')}
              name="titleEn"
              value={formData.titleEn}
              onChange={(e) => setFormData({...formData, titleEn: e.target.value})}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <FormInput
              label={t('subtitleVi')}
              name="subtitle"
              value={formData.subtitle}
              onChange={(e) => setFormData({...formData, subtitle: e.target.value})}
            />
            <FormInput
              label={t('subtitleEn')}
              name="subtitleEn"
              value={formData.subtitleEn}
              onChange={(e) => setFormData({...formData, subtitleEn: e.target.value})}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <FormInput
              label={t('descriptionVi')}
              name="description"
              type="textarea"
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
            />
            <FormInput
              label={t('descriptionEn')}
              name="descriptionEn"
              type="textarea"
              rows={3}
              value={formData.descriptionEn}
              onChange={(e) => setFormData({...formData, descriptionEn: e.target.value})}
            />
          </div>

          <ImageUpload
            label={`${t('bannerImage')} *`}
            value={formData.imageUrl}
            onChange={(url) => setFormData({...formData, imageUrl: url})}
            folder="banners"
          />

          <div className="grid grid-cols-2 gap-4">
            <FormInput
              label={t('linkUrl')}
              name="linkUrl"
              value={formData.linkUrl}
              onChange={(e) => setFormData({...formData, linkUrl: e.target.value})}
            />
            <FormSelect
              label={t('type')}
              name="type"
              value={formData.type}
              onChange={(e) => setFormData({...formData, type: e.target.value})}
              options={[
                { value: 'HERO', label: t('hero') },
                { value: 'FEATURED_NEWS', label: t('featuredNews') },
                { value: 'PROMOTION', label: t('promotion') },
                { value: 'ANNOUNCEMENT', label: t('announcement') }
              ]}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
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
          </div>
        </form>
      </Modal>
    </div>
  )
}

export default BannerManagement

