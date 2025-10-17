import React, { useState, useEffect } from 'react'
import DataTable from '../../components/admin/DataTable'
import Modal from '../../components/admin/Modal'
import FormInput from '../../components/admin/FormInput'
import FormSelect from '../../components/admin/FormSelect'
import ImageUpload from '../../components/admin/ImageUpload'
import api from '../../services/api'
import toast from '../../utils/toast'
import { useLanguage } from '../../i18n/config'

const CourseManagement = () => {
  const { language } = useLanguage()
  const [courses, setCourses] = useState([])
  const [centers, setCenters] = useState([])
  const [categories, setCategories] = useState([])
  const [instructors, setInstructors] = useState([])
  const [loading, setLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingCourse, setEditingCourse] = useState(null)
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    subtitle: '',
    description: '',
    thumbnailUrl: '',
    centerId: '',
    categoryId: '',
    instructorId: '',
    price: 0,
    isFree: false,
    level: 'ALL_LEVELS',
    language: 'vi',
    durationHours: 0,
    totalLessons: 0,
    status: 'DRAFT',
    isActive: true,
    displayOrder: 0
  })

  const translations = {
    vi: {
      courseManagement: 'Quản lý Khóa học',
      manageCourses: 'Quản lý khóa học và chương trình đào tạo',
      addCourse: 'Thêm Khóa học',
      editCourse: 'Sửa Khóa học',
      createCourse: 'Tạo Khóa học',
      title: 'Tiêu đề khóa học',
      slug: 'Slug (URL)',
      subtitle: 'Phụ đề',
      description: 'Mô tả',
      thumbnail: 'Ảnh đại diện',
      center: 'Trung tâm',
      category: 'Danh mục',
      instructor: 'Giảng viên',
      price: 'Giá (đ)',
      isFree: 'Miễn phí',
      level: 'Cấp độ',
      courseLang: 'Ngôn ngữ khóa học',
      duration: 'Thời lượng (giờ)',
      totalLessons: 'Số bài học',
      status: 'Trạng thái',
      displayOrder: 'Thứ tự',
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
      expert: 'Chuyên gia',
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
      title: 'Course Title',
      slug: 'Slug (URL)',
      subtitle: 'Subtitle',
      description: 'Description',
      thumbnail: 'Thumbnail',
      center: 'Center',
      category: 'Category',
      instructor: 'Instructor',
      price: 'Price (₫)',
      isFree: 'Free',
      level: 'Level',
      courseLang: 'Course Language',
      duration: 'Duration (hours)',
      totalLessons: 'Total Lessons',
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
      expert: 'Expert',
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
    setFormData({
      title: '',
      slug: '',
      subtitle: '',
      description: '',
      thumbnailUrl: '',
      centerId: centers[0]?.id || '',
      categoryId: '',
      instructorId: '',
      price: 0,
      isFree: false,
      level: 'ALL_LEVELS',
      language: 'vi',
      durationHours: 0,
      totalLessons: 0,
      status: 'DRAFT',
      isActive: true,
      displayOrder: 0
    })
    setIsModalOpen(true)
  }

  const handleEdit = (course) => {
    setEditingCourse(course)
    setFormData({
      title: course.title,
      slug: course.slug,
      subtitle: course.subtitle || '',
      description: course.description || '',
      thumbnailUrl: course.thumbnailUrl || '',
      centerId: course.center?.id || '',
      categoryId: course.category?.id || '',
      instructorId: course.instructor?.id || '',
      price: course.price || 0,
      isFree: course.isFree || false,
      level: course.level || 'ALL_LEVELS',
      language: course.language || 'vi',
      durationHours: course.durationHours || 0,
      totalLessons: course.totalLessons || 0,
      status: course.status || 'DRAFT',
      isActive: course.isActive !== undefined ? course.isActive : true,
      displayOrder: course.displayOrder || 0
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
      if (editingCourse) {
        await api.put(`/admin/courses/${editingCourse.id}`, formData)
        toast.success(t('courseUpdatedSuccess'))
      } else {
        await api.post('/admin/courses', formData)
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
      render: (value) => value ? `${value.toLocaleString()}đ` : 'Miễn phí'
    },
    { 
      key: 'enrollmentCount', 
      label: t('students'), 
      sortable: true 
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
          {t(value.toLowerCase())}
        </span>
      )
    },
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
              form="course-form"
              className="px-4 py-2 bg-mekong-blue text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              {editingCourse ? t('update') : t('create')}
            </button>
          </>
        }
      >
        <form id="course-form" onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <FormInput
              label={`${t('title')} *`}
              name="title"
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
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
          />

          <FormInput
            label={t('description')}
            name="description"
            type="textarea"
            rows={4}
            value={formData.description}
            onChange={(e) => setFormData({...formData, description: e.target.value})}
          />

          <ImageUpload
            label={t('thumbnail')}
            value={formData.thumbnailUrl}
            onChange={(url) => setFormData({...formData, thumbnailUrl: url})}
            folder="courses"
          />

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

          <div className="grid grid-cols-3 gap-4">
            <FormInput
              label={t('price')}
              name="price"
              type="number"
              value={formData.price}
              onChange={(e) => setFormData({...formData, price: parseFloat(e.target.value)})}
            />
            <FormInput
              label={t('duration')}
              name="durationHours"
              type="number"
              value={formData.durationHours}
              onChange={(e) => setFormData({...formData, durationHours: parseInt(e.target.value)})}
            />
            <FormInput
              label={t('totalLessons')}
              name="totalLessons"
              type="number"
              value={formData.totalLessons}
              onChange={(e) => setFormData({...formData, totalLessons: parseInt(e.target.value)})}
            />
          </div>

          <div className="grid grid-cols-4 gap-4">
            <FormSelect
              label={t('level')}
              name="level"
              value={formData.level}
              onChange={(e) => setFormData({...formData, level: e.target.value})}
              options={[
                { value: 'ALL_LEVELS', label: t('allLevels') },
                { value: 'BEGINNER', label: t('beginner') },
                { value: 'INTERMEDIATE', label: t('intermediate') },
                { value: 'ADVANCED', label: t('advanced') },
                { value: 'EXPERT', label: t('expert') }
              ]}
            />
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
              label={t('isFree')}
              name="isFree"
              value={formData.isFree}
              onChange={(e) => setFormData({...formData, isFree: e.target.value === 'true'})}
              options={[
                { value: 'false', label: t('no') },
                { value: 'true', label: t('yes') }
              ]}
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

export default CourseManagement
