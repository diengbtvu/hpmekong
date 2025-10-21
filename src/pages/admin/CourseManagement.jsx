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

const CourseManagement = () => {
  const { language } = useLanguage()
  const [courses, setCourses] = useState([])
  const [centers, setCenters] = useState([])
  const [categories, setCategories] = useState([])
  const [instructors, setInstructors] = useState([])
  const [loading, setLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingCourse, setEditingCourse] = useState(null)
  const [activeTab, setActiveTab] = useState('basic') // basic, content, pricing, settings
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    subtitle: '',
    description: '',
    thumbnailUrl: '',
    previewVideoUrl: '',
    centerId: '',
    categoryId: '',
    instructorId: '',
    price: 0,
    originalPrice: 0,
    discountPercentage: 0,
    isFree: false,
    level: 'ALL_LEVELS',
    language: 'vi',
    deliveryMode: 'ONLINE',
    durationHours: 0,
    totalLessons: 0,
    hasCertificate: true,
    status: 'DRAFT',
    isActive: true,
    displayOrder: 0,
    // New fields
    whatYouWillLearn: [''],
    requirements: [''],
    targetAudience: ['']
  })

  const translations = {
    vi: {
      courseManagement: 'Quản lý Khóa học',
      manageCourses: 'Quản lý khóa học và chương trình đào tạo',
      addCourse: 'Thêm Khóa học',
      editCourse: 'Sửa Khóa học',
      createCourse: 'Tạo Khóa học',
      
      // Tabs
      basicInfo: 'Thông tin cơ bản',
      content: 'Nội dung khóa học',
      pricing: 'Giá & Khuyến mãi',
      settings: 'Cài đặt',
      
      // Basic fields
      title: 'Tiêu đề khóa học',
      slug: 'Slug (URL)',
      subtitle: 'Phụ đề',
      description: 'Mô tả chi tiết',
      thumbnail: 'Ảnh đại diện',
      previewVideo: 'Video giới thiệu (URL)',
      center: 'Trung tâm',
      category: 'Danh mục',
      instructor: 'Giảng viên',
      
      // Content fields
      whatYouWillLearn: 'Bạn sẽ học được gì?',
      requirements: 'Yêu cầu',
      targetAudience: 'Đối tượng học viên',
      addItem: 'Thêm',
      removeItem: 'Xóa',
      
      // Pricing
      price: 'Giá hiện tại (đ)',
      originalPrice: 'Giá gốc (đ)',
      discountPercentage: 'Giảm giá (%)',
      isFree: 'Miễn phí',
      
      // Settings
      level: 'Cấp độ',
      courseLang: 'Ngôn ngữ',
      deliveryMode: 'Hình thức học',
      duration: 'Thời lượng (giờ)',
      totalLessons: 'Số bài học',
      hasCertificate: 'Cấp chứng chỉ',
      status: 'Trạng thái',
      displayOrder: 'Thứ tự hiển thị',
      active: 'Hoạt động',
      inactive: 'Tạm dừng',
      
      yes: 'Có',
      no: 'Không',
      cancel: 'Hủy',
      update: 'Cập nhật',
      create: 'Tạo',
      
      allLevels: 'Tất cả',
      beginner: 'Cơ bản',
      intermediate: 'Trung cấp',
      advanced: 'Nâng cao',
      
      online: 'Online',
      offline: 'Offline',
      hybrid: 'Kết hợp',
      
      draft: 'Nháp',
      published: 'Đã xuất bản',
      archived: 'Lưu trữ',
      
      id: 'ID',
      students: 'Học viên',
      deleteCourseConfirm: 'Xóa khóa học',
      courseDeletedSuccess: 'Đã xóa khóa học thành công',
      courseUpdatedSuccess: 'Đã cập nhật khóa học thành công',
      courseCreatedSuccess: 'Đã tạo khóa học thành công',
      errorFetchingCourses: 'Lỗi tải danh sách khóa học',
      errorDeletingCourse: 'Lỗi xóa khóa học',
      errorSavingCourse: 'Lỗi lưu khóa học'
    },
    en: {
      courseManagement: 'Course Management',
      manageCourses: 'Manage courses and training programs',
      addCourse: 'Add Course',
      editCourse: 'Edit Course',
      createCourse: 'Create Course',
      
      basicInfo: 'Basic Information',
      content: 'Course Content',
      pricing: 'Pricing & Discounts',
      settings: 'Settings',
      
      title: 'Course Title',
      slug: 'Slug (URL)',
      subtitle: 'Subtitle',
      description: 'Detailed Description',
      thumbnail: 'Thumbnail',
      previewVideo: 'Preview Video (URL)',
      center: 'Center',
      category: 'Category',
      instructor: 'Instructor',
      
      whatYouWillLearn: 'What You Will Learn',
      requirements: 'Requirements',
      targetAudience: 'Target Audience',
      addItem: 'Add',
      removeItem: 'Remove',
      
      price: 'Current Price (₫)',
      originalPrice: 'Original Price (₫)',
      discountPercentage: 'Discount (%)',
      isFree: 'Free',
      
      level: 'Level',
      courseLang: 'Language',
      deliveryMode: 'Delivery Mode',
      duration: 'Duration (hours)',
      totalLessons: 'Total Lessons',
      hasCertificate: 'Certificate',
      status: 'Status',
      displayOrder: 'Display Order',
      active: 'Active',
      inactive: 'Inactive',
      
      yes: 'Yes',
      no: 'No',
      cancel: 'Cancel',
      update: 'Update',
      create: 'Create',
      
      allLevels: 'All Levels',
      beginner: 'Beginner',
      intermediate: 'Intermediate',
      advanced: 'Advanced',
      
      online: 'Online',
      offline: 'Offline',
      hybrid: 'Hybrid',
      
      draft: 'Draft',
      published: 'Published',
      archived: 'Archived',
      
      id: 'ID',
      students: 'Students',
      deleteCourseConfirm: 'Delete course',
      courseDeletedSuccess: 'Course deleted successfully',
      courseUpdatedSuccess: 'Course updated successfully',
      courseCreatedSuccess: 'Course created successfully',
      errorFetchingCourses: 'Error fetching courses',
      errorDeletingCourse: 'Error deleting course',
      errorSavingCourse: 'Error saving course'
    }
  }

  const t = (key) => translations[language]?.[key] || translations['vi'][key] || key

  useEffect(() => {
    fetchCourses()
    fetchCenters()
    fetchCategories()
    fetchInstructors()
  }, [])

  const fetchCourses = async () => {
    try {
      const response = await api.get('/admin/courses')
      if (response.data.success) {
        setCourses(response.data.data.content || response.data.data)
      }
    } catch (error) {
      toast.error(t('errorFetchingCourses'))
    } finally {
      setLoading(false)
    }
  }

  const fetchCenters = async () => {
    try {
      const response = await api.get('/centers')
      if (response.data.success) {
        setCenters(response.data.data)
      }
    } catch (error) {
      console.error('Error fetching centers:', error)
    }
  }

  const fetchCategories = async () => {
    try {
      const response = await api.get('/categories')
      if (response.data.success) {
        setCategories(response.data.data)
      }
    } catch (error) {
      console.error('Error fetching categories:', error)
    }
  }

  const fetchInstructors = async () => {
    try {
      const response = await api.get('/instructors')
      if (response.data.success) {
        setInstructors(response.data.data.content || response.data.data)
      }
    } catch (error) {
      console.error('Error fetching instructors:', error)
    }
  }

  const handleCreate = () => {
    setEditingCourse(null)
    setActiveTab('basic')
    setFormData({
      title: '',
      slug: '',
      subtitle: '',
      description: '',
      thumbnailUrl: '',
      previewVideoUrl: '',
      centerId: centers[0]?.id || '',
      categoryId: '',
      instructorId: '',
      price: 0,
      originalPrice: 0,
      discountPercentage: 0,
      isFree: false,
      level: 'ALL_LEVELS',
      language: 'vi',
      deliveryMode: 'ONLINE',
      durationHours: 0,
      totalLessons: 0,
      hasCertificate: true,
      status: 'DRAFT',
      isActive: true,
      displayOrder: 0,
      whatYouWillLearn: [''],
      requirements: [''],
      targetAudience: ['']
    })
    setIsModalOpen(true)
  }

  const handleEdit = (course) => {
    setEditingCourse(course)
    setActiveTab('basic')
    setFormData({
      title: course.title,
      slug: course.slug,
      subtitle: course.subtitle || '',
      description: course.description || '',
      thumbnailUrl: course.thumbnailUrl || '',
      previewVideoUrl: course.previewVideoUrl || '',
      centerId: course.center?.id || '',
      categoryId: course.category?.id || '',
      instructorId: course.instructor?.id || '',
      price: course.price || 0,
      originalPrice: course.originalPrice || 0,
      discountPercentage: course.discountPercentage || 0,
      isFree: course.isFree || false,
      level: course.level || 'ALL_LEVELS',
      language: course.language || 'vi',
      deliveryMode: course.deliveryMode || 'ONLINE',
      durationHours: course.durationHours || 0,
      totalLessons: course.totalLessons || 0,
      hasCertificate: course.hasCertificate !== undefined ? course.hasCertificate : true,
      status: course.status || 'DRAFT',
      isActive: course.isActive !== undefined ? course.isActive : true,
      displayOrder: course.displayOrder || 0,
      whatYouWillLearn: course.whatYouWillLearn || [''],
      requirements: course.requirements || [''],
      targetAudience: course.targetAudience || ['']
    })
    setIsModalOpen(true)
  }

  const handleDelete = async (course) => {
    if (!confirm(`${t('deleteCourseConfirm')} "${course.title}"?`)) return

    try {
      await api.delete(`/admin/courses/${course.id}`)
      toast.success(t('courseDeletedSuccess'))
      fetchCourses()
    } catch (error) {
      toast.error(t('errorDeletingCourse'))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    try {
      // Filter empty strings from arrays
      const cleanedData = {
        ...formData,
        whatYouWillLearn: formData.whatYouWillLearn.filter(item => item.trim() !== ''),
        requirements: formData.requirements.filter(item => item.trim() !== ''),
        targetAudience: formData.targetAudience.filter(item => item.trim() !== '')
      }

      if (editingCourse) {
        await api.put(`/admin/courses/${editingCourse.id}`, cleanedData)
        toast.success(t('courseUpdatedSuccess'))
      } else {
        await api.post('/admin/courses', cleanedData)
        toast.success(t('courseCreatedSuccess'))
      }
      setIsModalOpen(false)
      fetchCourses()
    } catch (error) {
      console.error('Error saving course:', error.response?.data || error)
      const errorMessage = error.response?.data?.error?.message || t('errorSavingCourse')
      toast.error(errorMessage)
    }
  }

  // Array field handlers
  const addArrayItem = (field) => {
    setFormData({
      ...formData,
      [field]: [...formData[field], '']
    })
  }

  const removeArrayItem = (field, index) => {
    const newArray = formData[field].filter((_, i) => i !== index)
    setFormData({
      ...formData,
      [field]: newArray.length > 0 ? newArray : ['']
    })
  }

  const updateArrayItem = (field, index, value) => {
    const newArray = [...formData[field]]
    newArray[index] = value
    setFormData({
      ...formData,
      [field]: newArray
    })
  }

  const columns = [
    { key: 'id', label: t('id'), sortable: true },
    { 
      key: 'thumbnailUrl', 
      label: t('thumbnail'),
      render: (value) => value ? (
        <img src={value} alt="" className="w-20 h-12 object-cover rounded" />
      ) : (
        <div className="w-20 h-12 bg-gray-200 rounded flex items-center justify-center">
          <i className="fas fa-book text-gray-400"></i>
        </div>
      )
    },
    { key: 'title', label: t('title'), sortable: true },
    { 
      key: 'price', 
      label: t('price'),
      render: (value, row) => row.isFree ? 'Miễn phí' : `${value?.toLocaleString()}đ`
    },
    { 
      key: 'totalStudents', 
      label: t('students'), 
      sortable: true,
      render: (value) => value || 0
    },
    { 
      key: 'status', 
      label: t('status'),
      render: (value) => (
        <span className={`px-2 py-1 text-xs rounded-full ${
          value === 'PUBLISHED' ? 'bg-green-100 text-green-800' : 
          value === 'DRAFT' ? 'bg-yellow-100 text-yellow-800' : 
          'bg-gray-100 text-gray-800'
        }`}>
          {t(value?.toLowerCase() || 'draft')}
        </span>
      )
    },
  ]

  const tabs = [
    { id: 'basic', label: t('basicInfo'), icon: 'fa-info-circle' },
    { id: 'content', label: t('content'), icon: 'fa-book' },
    { id: 'pricing', label: t('pricing'), icon: 'fa-dollar-sign' },
    { id: 'settings', label: t('settings'), icon: 'fa-cog' }
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{t('courseManagement')}</h1>
          <p className="text-gray-600 mt-1">{t('manageCourses')}</p>
        </div>
        <button
          onClick={handleCreate}
          className="flex items-center gap-2 px-4 py-2 bg-mekong-blue text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <i className="fas fa-plus"></i>
          <span>{t('addCourse')}</span>
        </button>
      </div>

      {/* Data Table */}
      <DataTable
        columns={columns}
        data={courses}
        loading={loading}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {/* Create/Edit Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingCourse ? t('editCourse') : t('createCourse')}
        size="xl"
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
              form="course-form"
              className="px-4 py-2 bg-mekong-blue text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              {editingCourse ? t('update') : t('create')}
            </button>
          </>
        }
      >
        {/* Tab Navigation */}
        <div className="border-b mb-6">
          <div className="flex gap-2 overflow-x-auto">
            {tabs.map(tab => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-3 font-medium border-b-2 transition-colors whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'border-mekong-blue text-mekong-blue'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                <i className={`fas ${tab.icon}`}></i>
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <form id="course-form" onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Info Tab */}
          {activeTab === 'basic' && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <FormInput
                  label={`${t('title')} *`}
                  name="title"
                  value={formData.title}
                  onChange={(e) => {
                    const title = e.target.value
                    setFormData({
                      ...formData,
                      title: title,
                      slug: !editingCourse ? generateSlug(title) : formData.slug
                    })
                  }}
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
                label={t('subtitle')}
                name="subtitle"
                value={formData.subtitle}
                onChange={(e) => setFormData({...formData, subtitle: e.target.value})}
                placeholder="Làm chủ nghệ thuật giao tiếp hiệu quả"
              />

              <FormInput
                label={t('description')}
                name="description"
                type="textarea"
                rows={4}
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                placeholder="Mô tả chi tiết về khóa học..."
              />

              <div className="grid grid-cols-2 gap-4">
                <ImageUpload
                  label={t('thumbnail')}
                  value={formData.thumbnailUrl}
                  onChange={(url) => setFormData({...formData, thumbnailUrl: url})}
                  folder="courses"
                />

                <FormInput
                  label={t('previewVideo')}
                  name="previewVideoUrl"
                  value={formData.previewVideoUrl}
                  onChange={(e) => setFormData({...formData, previewVideoUrl: e.target.value})}
                  placeholder="https://www.youtube.com/embed/..."
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <FormSelect
                  label={`${t('center')} *`}
                  name="centerId"
                  value={formData.centerId}
                  onChange={(e) => setFormData({...formData, centerId: e.target.value})}
                  options={centers.map(c => ({ value: c.id, label: c.name }))}
                  required
                />
                <FormSelect
                  label={t('category')}
                  name="categoryId"
                  value={formData.categoryId}
                  onChange={(e) => setFormData({...formData, categoryId: e.target.value})}
                  options={[
                    { value: '', label: '-- Chọn danh mục --' },
                    ...categories.map(c => ({ value: c.id, label: c.name }))
                  ]}
                />
                <FormSelect
                  label={t('instructor')}
                  name="instructorId"
                  value={formData.instructorId}
                  onChange={(e) => setFormData({...formData, instructorId: e.target.value})}
                  options={[
                    { value: '', label: '-- Chọn giảng viên --' },
                    ...instructors.map(i => ({ value: i.id, label: i.name }))
                  ]}
                />
              </div>
            </div>
          )}

          {/* Content Tab */}
          {activeTab === 'content' && (
            <div className="space-y-6">
              {/* What You Will Learn */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('whatYouWillLearn')}
                </label>
                <div className="space-y-2">
                  {formData.whatYouWillLearn.map((item, index) => (
                    <div key={index} className="flex gap-2">
                      <input
                        type="text"
                        value={item}
                        onChange={(e) => updateArrayItem('whatYouWillLearn', index, e.target.value)}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-mekong-blue focus:border-transparent"
                        placeholder="Ví dụ: Nắm vững các nguyên tắc giao tiếp hiệu quả"
                      />
                      <button
                        type="button"
                        onClick={() => removeArrayItem('whatYouWillLearn', index)}
                        className="px-3 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50"
                      >
                        <i className="fas fa-trash"></i>
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => addArrayItem('whatYouWillLearn')}
                    className="px-4 py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-mekong-blue hover:text-mekong-blue transition-colors w-full"
                  >
                    <i className="fas fa-plus mr-2"></i>
                    {t('addItem')}
                  </button>
                </div>
              </div>

              {/* Requirements */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('requirements')}
                </label>
                <div className="space-y-2">
                  {formData.requirements.map((item, index) => (
                    <div key={index} className="flex gap-2">
                      <input
                        type="text"
                        value={item}
                        onChange={(e) => updateArrayItem('requirements', index, e.target.value)}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-mekong-blue focus:border-transparent"
                        placeholder="Ví dụ: Không yêu cầu kiến thức trước"
                      />
                      <button
                        type="button"
                        onClick={() => removeArrayItem('requirements', index)}
                        className="px-3 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50"
                      >
                        <i className="fas fa-trash"></i>
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => addArrayItem('requirements')}
                    className="px-4 py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-mekong-blue hover:text-mekong-blue transition-colors w-full"
                  >
                    <i className="fas fa-plus mr-2"></i>
                    {t('addItem')}
                  </button>
                </div>
              </div>

              {/* Target Audience */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('targetAudience')}
                </label>
                <div className="space-y-2">
                  {formData.targetAudience.map((item, index) => (
                    <div key={index} className="flex gap-2">
                      <input
                        type="text"
                        value={item}
                        onChange={(e) => updateArrayItem('targetAudience', index, e.target.value)}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-mekong-blue focus:border-transparent"
                        placeholder="Ví dụ: Sinh viên muốn cải thiện kỹ năng mềm"
                      />
                      <button
                        type="button"
                        onClick={() => removeArrayItem('targetAudience', index)}
                        className="px-3 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50"
                      >
                        <i className="fas fa-trash"></i>
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => addArrayItem('targetAudience')}
                    className="px-4 py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-mekong-blue hover:text-mekong-blue transition-colors w-full"
                  >
                    <i className="fas fa-plus mr-2"></i>
                    {t('addItem')}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Pricing Tab */}
          {activeTab === 'pricing' && (
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-4 bg-blue-50 rounded-lg">
                <input
                  type="checkbox"
                  id="isFree"
                  checked={formData.isFree}
                  onChange={(e) => setFormData({...formData, isFree: e.target.checked})}
                  className="w-5 h-5 text-mekong-blue"
                />
                <label htmlFor="isFree" className="text-sm font-medium text-gray-700">
                  {t('isFree')} - Khóa học miễn phí
                </label>
              </div>

              {!formData.isFree && (
                <div className="grid grid-cols-3 gap-4">
                  <FormInput
                    label={`${t('price')} *`}
                    name="price"
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData({...formData, price: parseFloat(e.target.value) || 0})}
                    placeholder="1500000"
                  />
                  <FormInput
                    label={t('originalPrice')}
                    name="originalPrice"
                    type="number"
                    value={formData.originalPrice}
                    onChange={(e) => setFormData({...formData, originalPrice: parseFloat(e.target.value) || 0})}
                    placeholder="2000000"
                  />
                  <FormInput
                    label={t('discountPercentage')}
                    name="discountPercentage"
                    type="number"
                    value={formData.discountPercentage}
                    onChange={(e) => setFormData({...formData, discountPercentage: parseInt(e.target.value) || 0})}
                    placeholder="25"
                  />
                </div>
              )}

              {formData.originalPrice > 0 && formData.price > 0 && (
                <div className="p-4 bg-green-50 rounded-lg">
                  <p className="text-sm text-gray-700">
                    <strong>Giảm giá:</strong>{' '}
                    <span className="text-red-600 font-bold">
                      {Math.round(((formData.originalPrice - formData.price) / formData.originalPrice) * 100)}%
                    </span>
                    {' '}(Từ {formData.originalPrice.toLocaleString()}đ xuống {formData.price.toLocaleString()}đ)
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Settings Tab */}
          {activeTab === 'settings' && (
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <FormSelect
                  label={t('level')}
                  name="level"
                  value={formData.level}
                  onChange={(e) => setFormData({...formData, level: e.target.value})}
                  options={[
                    { value: 'ALL_LEVELS', label: t('allLevels') },
                    { value: 'BEGINNER', label: t('beginner') },
                    { value: 'INTERMEDIATE', label: t('intermediate') },
                    { value: 'ADVANCED', label: t('advanced') }
                  ]}
                />
                <FormSelect
                  label={t('courseLang')}
                  name="language"
                  value={formData.language}
                  onChange={(e) => setFormData({...formData, language: e.target.value})}
                  options={[
                    { value: 'vi', label: 'Tiếng Việt' },
                    { value: 'en', label: 'English' }
                  ]}
                />
                <FormSelect
                  label={t('deliveryMode')}
                  name="deliveryMode"
                  value={formData.deliveryMode}
                  onChange={(e) => setFormData({...formData, deliveryMode: e.target.value})}
                  options={[
                    { value: 'ONLINE', label: t('online') },
                    { value: 'OFFLINE', label: t('offline') },
                    { value: 'HYBRID', label: t('hybrid') }
                  ]}
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <FormInput
                  label={t('duration')}
                  name="durationHours"
                  type="number"
                  value={formData.durationHours}
                  onChange={(e) => setFormData({...formData, durationHours: parseInt(e.target.value) || 0})}
                  placeholder="40"
                />
                <FormInput
                  label={t('totalLessons')}
                  name="totalLessons"
                  type="number"
                  value={formData.totalLessons}
                  onChange={(e) => setFormData({...formData, totalLessons: parseInt(e.target.value) || 0})}
                  placeholder="24"
                />
                <FormSelect
                  label={t('hasCertificate')}
                  name="hasCertificate"
                  value={formData.hasCertificate}
                  onChange={(e) => setFormData({...formData, hasCertificate: e.target.value === 'true'})}
                  options={[
                    { value: 'true', label: t('yes') },
                    { value: 'false', label: t('no') }
                  ]}
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <FormSelect
                  label={t('status')}
                  name="status"
                  value={formData.status}
                  onChange={(e) => setFormData({...formData, status: e.target.value})}
                  options={[
                    { value: 'DRAFT', label: t('draft') },
                    { value: 'PUBLISHED', label: t('published') },
                    { value: 'ARCHIVED', label: t('archived') }
                  ]}
                />
                <FormSelect
                  label={t('active')}
                  name="isActive"
                  value={formData.isActive}
                  onChange={(e) => setFormData({...formData, isActive: e.target.value === 'true'})}
                  options={[
                    { value: 'true', label: t('active') },
                    { value: 'false', label: t('inactive') }
                  ]}
                />
                <FormInput
                  label={t('displayOrder')}
                  name="displayOrder"
                  type="number"
                  value={formData.displayOrder}
                  onChange={(e) => setFormData({...formData, displayOrder: parseInt(e.target.value) || 0})}
                  placeholder="0"
                />
              </div>
            </div>
          )}
        </form>
      </Modal>
    </div>
  )
}

export default CourseManagement
