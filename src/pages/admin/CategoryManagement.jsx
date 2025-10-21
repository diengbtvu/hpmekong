import React, { useState, useEffect } from 'react'
import DataTable from '../../components/admin/DataTable'
import Modal from '../../components/admin/Modal'
import FormInput from '../../components/admin/FormInput'
import FormSelect from '../../components/admin/FormSelect'
import api from '../../services/api'
import toast from '../../utils/toast'
import { useLanguage } from '../../i18n/config'
import { generateSlug } from '../../utils/slugify'

const CategoryManagement = () => {
  const { language } = useLanguage()
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingCategory, setEditingCategory] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    description: '',
    icon: '',
    color: '',
    displayOrder: 0,
    isActive: true
  })

  const translations = {
    vi: {
      categoryManagement: 'Quản lý Danh mục',
      manageCategories: 'Quản lý danh mục khóa học',
      addCategory: 'Thêm Danh mục',
      editCategory: 'Sửa Danh mục',
      createCategory: 'Tạo Danh mục',
      name: 'Tên danh mục',
      slug: 'Slug (URL)',
      description: 'Mô tả',
      icon: 'Icon',
      color: 'Màu sắc',
      displayOrder: 'Thứ tự hiển thị',
      status: 'Trạng thái',
      active: 'Hoạt động',
      inactive: 'Tạm dừng',
      cancel: 'Hủy',
      update: 'Cập nhật',
      create: 'Tạo',
      id: 'ID',
      courses: 'Số khóa học',
      deleteCategoryConfirm: 'Xóa danh mục',
      categoryDeletedSuccess: 'Đã xóa danh mục thành công',
      categoryUpdatedSuccess: 'Đã cập nhật danh mục thành công',
      categoryCreatedSuccess: 'Đã tạo danh mục thành công',
      errorFetchingCategories: 'Lỗi tải danh sách danh mục',
      errorDeletingCategory: 'Lỗi xóa danh mục',
      errorSavingCategory: 'Lỗi lưu danh mục'
    },
    en: {
      categoryManagement: 'Category Management',
      manageCategories: 'Manage course categories',
      addCategory: 'Add Category',
      editCategory: 'Edit Category',
      createCategory: 'Create Category',
      name: 'Category Name',
      slug: 'Slug (URL)',
      description: 'Description',
      icon: 'Icon',
      color: 'Color',
      displayOrder: 'Display Order',
      status: 'Status',
      active: 'Active',
      inactive: 'Inactive',
      cancel: 'Cancel',
      update: 'Update',
      create: 'Create',
      id: 'ID',
      courses: 'Courses',
      deleteCategoryConfirm: 'Delete category',
      categoryDeletedSuccess: 'Category deleted successfully',
      categoryUpdatedSuccess: 'Category updated successfully',
      categoryCreatedSuccess: 'Category created successfully',
      errorFetchingCategories: 'Error fetching categories',
      errorDeletingCategory: 'Error deleting category',
      errorSavingCategory: 'Error saving category'
    }
  }

  const t = (key) => translations[language]?.[key] || translations['vi'][key] || key

  useEffect(() => {
    fetchCategories()
  }, [])

  const fetchCategories = async () => {
    try {
      const response = await api.get('/categories')
      if (response.data.success) {
        setCategories(response.data.data)
      }
    } catch (error) {
      toast.error(t('errorFetchingCategories'))
    } finally {
      setLoading(false)
    }
  }

  const handleCreate = () => {
    setEditingCategory(null)
    setFormData({
      name: '',
      slug: '',
      description: '',
      icon: '',
      color: '#0057B8',
      displayOrder: 0,
      isActive: true
    })
    setIsModalOpen(true)
  }

  const handleEdit = (category) => {
    setEditingCategory(category)
    setFormData({
      name: category.name,
      slug: category.slug,
      description: category.description || '',
      icon: category.icon || '',
      color: category.color || '#0057B8',
      displayOrder: category.displayOrder || 0,
      isActive: category.isActive !== undefined ? category.isActive : true
    })
    setIsModalOpen(true)
  }

  const handleDelete = async (category) => {
    if (!confirm(`${t('deleteCategoryConfirm')} "${category.name}"?`)) return

    try {
      await api.delete(`/categories/${category.id}`)
      toast.success(t('categoryDeletedSuccess'))
      fetchCategories()
    } catch (error) {
      toast.error(t('errorDeletingCategory'))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    try {
      if (editingCategory) {
        await api.put(`/categories/${editingCategory.id}`, formData)
        toast.success(t('categoryUpdatedSuccess'))
      } else {
        await api.post('/categories', formData)
        toast.success(t('categoryCreatedSuccess'))
      }
      setIsModalOpen(false)
      fetchCategories()
    } catch (error) {
      console.error('Error saving category:', error.response?.data || error)
      const errorMessage = error.response?.data?.error?.message || t('errorSavingCategory')
      toast.error(errorMessage)
    }
  }

  // Auto-generate slug from name
  const handleNameChange = (e) => {
    const name = e.target.value
    setFormData({
      ...formData,
      name: name,
      slug: !editingCategory ? generateSlug(name) : formData.slug
    })
  }


  const columns = [
    { key: 'id', label: t('id'), sortable: true },
    { 
      key: 'icon', 
      label: t('icon'),
      render: (value) => value ? (
        <i className={`${value} text-2xl`} style={{ color: '#0057B8' }}></i>
      ) : '-'
    },
    { key: 'name', label: t('name'), sortable: true },
    { key: 'slug', label: t('slug') },
    { 
      key: 'displayOrder', 
      label: t('displayOrder'), 
      sortable: true,
      render: (value) => value || 0
    },
    { 
      key: 'courseCount', 
      label: t('courses'), 
      sortable: true,
      render: (value) => value || 0
    },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{t('categoryManagement')}</h1>
          <p className="text-gray-600 mt-1">{t('manageCategories')}</p>
        </div>
        <button
          onClick={handleCreate}
          className="flex items-center gap-2 px-4 py-2 bg-mekong-blue text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <i className="fas fa-plus"></i>
          <span>{t('addCategory')}</span>
        </button>
      </div>

      {/* Data Table */}
      <DataTable
        columns={columns}
        data={categories}
        loading={loading}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {/* Create/Edit Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingCategory ? t('editCategory') : t('createCategory')}
        size="md"
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
              form="category-form"
              className="px-4 py-2 bg-mekong-blue text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              {editingCategory ? t('update') : t('create')}
            </button>
          </>
        }
      >
        <form id="category-form" onSubmit={handleSubmit} className="space-y-4">
          <FormInput
            label={`${t('name')} *`}
            name="name"
            value={formData.name}
            onChange={handleNameChange}
            required
            placeholder="Ví dụ: Công nghệ thông tin"
          />

          <FormInput
            label={`${t('slug')} *`}
            name="slug"
            value={formData.slug}
            onChange={(e) => setFormData({...formData, slug: e.target.value})}
            required
            placeholder="cong-nghe-thong-tin"
          />

          <FormInput
            label={t('description')}
            name="description"
            type="textarea"
            rows={3}
            value={formData.description}
            onChange={(e) => setFormData({...formData, description: e.target.value})}
            placeholder="Mô tả về danh mục này..."
          />

          <div className="grid grid-cols-2 gap-4">
            <FormInput
              label={t('icon')}
              name="icon"
              value={formData.icon}
              onChange={(e) => setFormData({...formData, icon: e.target.value})}
              placeholder="fas fa-laptop-code"
            />

            <FormInput
              label={t('color')}
              name="color"
              type="color"
              value={formData.color}
              onChange={(e) => setFormData({...formData, color: e.target.value})}
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

          <div className="bg-blue-50 p-3 rounded-lg text-sm">
            <p className="text-gray-700">
              <strong>Icon:</strong> Sử dụng FontAwesome class (ví dụ: fas fa-laptop-code)
            </p>
            <p className="text-gray-700 mt-1">
              Xem thêm icons tại: <a href="https://fontawesome.com/icons" target="_blank" rel="noopener noreferrer" className="text-mekong-blue hover:underline">fontawesome.com</a>
            </p>
          </div>
        </form>
      </Modal>
    </div>
  )
}

export default CategoryManagement
