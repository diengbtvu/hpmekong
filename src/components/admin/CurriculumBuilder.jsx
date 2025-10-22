import React, { useState, useEffect } from 'react'
import FormInput from './FormInput'
import FormSelect from './FormSelect'
import Modal from './Modal'
import api from '../../services/api'
import toast from '../../utils/toast'

const CurriculumBuilder = ({ courseId, onUpdate }) => {
  const [modules, setModules] = useState([])
  const [loading, setLoading] = useState(true)
  const [isModuleModalOpen, setIsModuleModalOpen] = useState(false)
  const [isLessonModalOpen, setIsLessonModalOpen] = useState(false)
  const [editingModule, setEditingModule] = useState(null)
  const [editingLesson, setEditingLesson] = useState(null)
  const [selectedModuleId, setSelectedModuleId] = useState(null)
  const [expandedModules, setExpandedModules] = useState({})

  const [moduleForm, setModuleForm] = useState({
    title: '',
    description: '',
    displayOrder: 0
  })

  const [lessonForm, setLessonForm] = useState({
    title: '',
    description: '',
    type: 'VIDEO',
    contentUrl: '',
    durationMinutes: 0,
    displayOrder: 0,
    isPreview: false,
    isFree: false
  })

  useEffect(() => {
    if (courseId) {
      fetchCurriculum()
    }
  }, [courseId])

  const fetchCurriculum = async () => {
    try {
      setLoading(true)
      const response = await api.get(`/courses/${courseId}/curriculum`)
      if (response.data.success) {
        const modulesData = response.data.data || []
        setModules(modulesData)
        
        // Auto-expand all modules by default
        const expanded = {}
        modulesData.forEach(module => {
          expanded[module.id] = true
        })
        setExpandedModules(expanded)
      }
    } catch (error) {
      console.error('Error fetching curriculum:', error)
      toast.error('Không thể tải nội dung khóa học')
    } finally {
      setLoading(false)
    }
  }

  // Module handlers
  const handleCreateModule = (e) => {
    if (e) {
      e.preventDefault()
      e.stopPropagation()
    }
    console.log('Opening module modal...')
    setEditingModule(null)
    setModuleForm({
      title: '',
      description: '',
      displayOrder: modules.length
    })
    // Use setTimeout to ensure state is properly set
    setTimeout(() => {
      setIsModuleModalOpen(true)
      console.log('Module modal opened')
    }, 0)
  }

  const handleEditModule = (module) => {
    setEditingModule(module)
    setModuleForm({
      title: module.title,
      description: module.description || '',
      displayOrder: module.displayOrder
    })
    setIsModuleModalOpen(true)
  }

  const handleDeleteModule = async (moduleId) => {
    if (!confirm('Xóa module này? Tất cả bài học trong module sẽ bị xóa.')) return

    try {
      await api.delete(`/admin/modules/${moduleId}`)
      toast.success('Đã xóa module')
      await fetchCurriculum()
      // Don't call onUpdate - keep course modal open
    } catch (error) {
      toast.error('Lỗi xóa module')
    }
  }

  const handleSubmitModule = async (e) => {
    if (e) {
      e.preventDefault()
      e.stopPropagation()
    }
    console.log('handleSubmitModule called', moduleForm)
    
    // Validate
    if (!moduleForm.title || moduleForm.title.trim() === '') {
      toast.error('Vui lòng nhập tiêu đề module')
      return
    }
    
    try {
      if (editingModule) {
        await api.put(`/admin/modules/${editingModule.id}`, moduleForm)
        toast.success('Đã cập nhật module')
      } else {
        await api.post(`/admin/courses/${courseId}/modules`, moduleForm)
        toast.success('Đã tạo module')
      }
      setIsModuleModalOpen(false)
      await fetchCurriculum()
      // Don't call onUpdate here - it refreshes parent and may close course modal
    } catch (error) {
      console.error('Error saving module:', error)
      toast.error(error.response?.data?.error?.message || 'Lỗi lưu module')
    }
  }

  // Lesson handlers
  const handleCreateLesson = (moduleId, e) => {
    if (e) {
      e.preventDefault()
      e.stopPropagation()
    }
    const module = modules.find(m => m.id === moduleId)
    setEditingLesson(null)
    setSelectedModuleId(moduleId)
    setLessonForm({
      title: '',
      description: '',
      type: 'VIDEO',
      contentUrl: '',
      durationMinutes: 0,
      displayOrder: module?.lessons?.length || 0,
      isPreview: false,
      isFree: false
    })
    setTimeout(() => {
      setIsLessonModalOpen(true)
    }, 0)
  }

  const handleEditLesson = (lesson, moduleId) => {
    setEditingLesson(lesson)
    setSelectedModuleId(moduleId)
    setLessonForm({
      title: lesson.title,
      description: lesson.description || '',
      type: lesson.type,
      contentUrl: lesson.contentUrl || '',
      durationMinutes: lesson.durationMinutes,
      displayOrder: lesson.displayOrder,
      isPreview: lesson.isPreview,
      isFree: lesson.isFree
    })
    setIsLessonModalOpen(true)
  }

  const handleDeleteLesson = async (lessonId) => {
    if (!confirm('Xóa bài học này?')) return

    try {
      await api.delete(`/admin/lessons/${lessonId}`)
      toast.success('Đã xóa bài học')
      await fetchCurriculum()
      // Don't call onUpdate - keep course modal open
    } catch (error) {
      toast.error('Lỗi xóa bài học')
    }
  }

  const handleSubmitLesson = async (e) => {
    if (e) {
      e.preventDefault()
      e.stopPropagation()
    }
    
    // Validate
    if (!lessonForm.title || lessonForm.title.trim() === '') {
      toast.error('Vui lòng nhập tiêu đề bài học')
      return
    }
    
    try {
      if (editingLesson) {
        await api.put(`/admin/lessons/${editingLesson.id}`, lessonForm)
        toast.success('Đã cập nhật bài học')
      } else {
        await api.post(`/admin/modules/${selectedModuleId}/lessons`, lessonForm)
        toast.success('Đã tạo bài học')
      }
      setIsLessonModalOpen(false)
      await fetchCurriculum()
      // Don't call onUpdate - keep course modal open
    } catch (error) {
      console.error('Error saving lesson:', error)
      toast.error(error.response?.data?.error?.message || 'Lỗi lưu bài học')
    }
  }

  const toggleModule = (moduleId) => {
    setExpandedModules(prev => ({
      ...prev,
      [moduleId]: !prev[moduleId]
    }))
  }

  const getLessonIcon = (type) => {
    const icons = {
      VIDEO: 'fa-play-circle',
      DOCUMENT: 'fa-file-alt',
      QUIZ: 'fa-question-circle',
      ASSIGNMENT: 'fa-tasks',
      LIVE_SESSION: 'fa-video'
    }
    return icons[type] || 'fa-file'
  }

  const formatDuration = (minutes) => {
    if (!minutes) return '0 phút'
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    if (hours > 0) {
      return `${hours}h ${mins}p`
    }
    return `${mins} phút`
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-mekong-blue"></div>
          <p className="text-gray-600 mt-2">Đang tải...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="curriculum-builder">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-bold text-gray-900">Chương trình học</h3>
          <p className="text-sm text-gray-600 mt-1">
            {modules.length} module · {modules.reduce((sum, m) => sum + (m.lessons?.length || 0), 0)} bài học
          </p>
        </div>
        <button
          onClick={handleCreateModule}
          className="flex items-center gap-2 px-4 py-2 bg-mekong-blue text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <i className="fas fa-plus"></i>
          <span>Thêm Module</span>
        </button>
      </div>

      {/* Empty State */}
      {modules.length === 0 && (
        <div className="text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
          <i className="fas fa-book-open text-4xl text-gray-400 mb-4"></i>
          <h4 className="text-lg font-semibold text-gray-700 mb-2">Chưa có nội dung khóa học</h4>
          <p className="text-gray-600 mb-4">Bắt đầu bằng cách tạo module đầu tiên</p>
          <button
            onClick={handleCreateModule}
            className="px-6 py-2 bg-mekong-blue text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <i className="fas fa-plus mr-2"></i>
            Tạo Module
          </button>
        </div>
      )}

      {/* Modules List */}
      <div className="space-y-4">
        {modules.map((module, moduleIndex) => (
          <div key={module.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden">
            {/* Module Header */}
            <div className="bg-gray-50 px-4 py-3 flex items-center justify-between">
              <div className="flex items-center gap-3 flex-1">
                <button
                  onClick={() => toggleModule(module.id)}
                  className="text-gray-500 hover:text-gray-700 transition-colors"
                >
                  <i className={`fas fa-chevron-${expandedModules[module.id] ? 'down' : 'right'}`}></i>
                </button>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-gray-700">Module {moduleIndex + 1}:</span>
                    <span className="font-bold text-gray-900">{module.title}</span>
                  </div>
                  {module.description && (
                    <p className="text-sm text-gray-600 mt-1">{module.description}</p>
                  )}
                  <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                    <span>
                      <i className="fas fa-book mr-1"></i>
                      {module.lessons?.length || 0} bài học
                    </span>
                    <span>
                      <i className="fas fa-clock mr-1"></i>
                      {formatDuration(module.durationMinutes)}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={(e) => handleCreateLesson(module.id, e)}
                  className="px-3 py-1.5 text-sm bg-blue-50 text-mekong-blue rounded hover:bg-blue-100 transition-colors"
                >
                  <i className="fas fa-plus mr-1"></i>
                  Thêm bài học
                </button>
                <button
                  type="button"
                  onClick={(e) => handleEditModule(module, e)}
                  className="p-2 text-gray-600 hover:text-mekong-blue transition-colors"
                >
                  <i className="fas fa-edit"></i>
                </button>
                <button
                  onClick={() => handleDeleteModule(module.id)}
                  className="p-2 text-gray-600 hover:text-red-600 transition-colors"
                >
                  <i className="fas fa-trash"></i>
                </button>
              </div>
            </div>

            {/* Lessons List */}
            {expandedModules[module.id] && module.lessons && module.lessons.length > 0 && (
              <div className="divide-y divide-gray-100">
                {module.lessons.map((lesson, lessonIndex) => (
                  <div key={lesson.id} className="px-4 py-3 hover:bg-gray-50 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3 flex-1">
                        <i className={`fas ${getLessonIcon(lesson.type)} text-mekong-blue`}></i>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-gray-900">{lesson.title}</span>
                            {lesson.isPreview && (
                              <span className="px-2 py-0.5 text-xs bg-green-100 text-green-700 rounded">
                                Xem trước
                              </span>
                            )}
                            {lesson.isFree && (
                              <span className="px-2 py-0.5 text-xs bg-blue-100 text-blue-700 rounded">
                                Miễn phí
                              </span>
                            )}
                          </div>
                          {lesson.description && (
                            <p className="text-sm text-gray-600 mt-1">{lesson.description}</p>
                          )}
                          <div className="flex items-center gap-3 mt-1 text-xs text-gray-500">
                            <span>{lesson.type}</span>
                            <span>
                              <i className="fas fa-clock mr-1"></i>
                              {formatDuration(lesson.durationMinutes)}
                            </span>
                            {lesson.contentUrl && (
                              <span className="text-blue-600">
                                <i className="fas fa-link mr-1"></i>
                                Có nội dung
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={(e) => handleEditLesson(lesson, module.id, e)}
                          className="p-2 text-gray-600 hover:text-mekong-blue transition-colors"
                        >
                          <i className="fas fa-edit"></i>
                        </button>
                        <button
                          onClick={() => handleDeleteLesson(lesson.id)}
                          className="p-2 text-gray-600 hover:text-red-600 transition-colors"
                        >
                          <i className="fas fa-trash"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Empty lessons state */}
            {expandedModules[module.id] && (!module.lessons || module.lessons.length === 0) && (
              <div className="px-4 py-8 text-center">
                <i className="fas fa-book text-2xl text-gray-400 mb-2"></i>
                <p className="text-sm text-gray-600 mb-3">Chưa có bài học trong module này</p>
                <button
                  type="button"
                  onClick={(e) => handleCreateLesson(module.id, e)}
                  className="px-4 py-2 text-sm bg-mekong-blue text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <i className="fas fa-plus mr-2"></i>
                  Tạo bài học đầu tiên
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Module Modal */}
      <Modal
        isOpen={isModuleModalOpen}
        onClose={() => setIsModuleModalOpen(false)}
        title={editingModule ? 'Sửa Module' : 'Tạo Module Mới'}
        footer={
          <div className="flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={() => setIsModuleModalOpen(false)}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Hủy
            </button>
            <button
              type="button"
              onClick={(e) => handleSubmitModule(e)}
              className="px-4 py-2 bg-mekong-blue text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              {editingModule ? 'Cập nhật' : 'Tạo'}
            </button>
          </div>
        }
      >
        <div className="space-y-4">
          <FormInput
            label="Tiêu đề Module *"
            name="title"
            value={moduleForm.title}
            onChange={(e) => setModuleForm({ ...moduleForm, title: e.target.value })}
            required
            placeholder="Ví dụ: Module 1: Giới thiệu về Giao tiếp"
          />
          <FormInput
            label="Mô tả"
            name="description"
            type="textarea"
            rows={3}
            value={moduleForm.description}
            onChange={(e) => setModuleForm({ ...moduleForm, description: e.target.value })}
            placeholder="Mô tả ngắn về nội dung module"
          />
          <FormInput
            label="Thứ tự hiển thị"
            name="displayOrder"
            type="number"
            value={moduleForm.displayOrder}
            onChange={(e) => setModuleForm({ ...moduleForm, displayOrder: parseInt(e.target.value) || 0 })}
          />
        </div>
      </Modal>

      {/* Lesson Modal */}
      <Modal
        isOpen={isLessonModalOpen}
        onClose={() => setIsLessonModalOpen(false)}
        title={editingLesson ? 'Sửa Bài học' : 'Tạo Bài học Mới'}
        size="lg"
        footer={
          <div className="flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={() => setIsLessonModalOpen(false)}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Hủy
            </button>
            <button
              type="button"
              onClick={(e) => handleSubmitLesson(e)}
              className="px-4 py-2 bg-mekong-blue text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              {editingLesson ? 'Cập nhật' : 'Tạo'}
            </button>
          </div>
        }
      >
        <div className="space-y-4">
          <FormInput
            label="Tiêu đề Bài học *"
            name="title"
            value={lessonForm.title}
            onChange={(e) => setLessonForm({ ...lessonForm, title: e.target.value })}
            required
            placeholder="Ví dụ: Bài 1: Giao tiếp là gì?"
          />
          <FormInput
            label="Mô tả"
            name="description"
            type="textarea"
            rows={2}
            value={lessonForm.description}
            onChange={(e) => setLessonForm({ ...lessonForm, description: e.target.value })}
            placeholder="Mô tả ngắn về bài học"
          />
          <div className="grid grid-cols-2 gap-4">
            <FormSelect
              label="Loại bài học *"
              name="type"
              value={lessonForm.type}
              onChange={(e) => setLessonForm({ ...lessonForm, type: e.target.value })}
              options={[
                { value: 'VIDEO', label: '📹 Video' },
                { value: 'DOCUMENT', label: '📄 Tài liệu' },
                { value: 'QUIZ', label: '❓ Quiz' },
                { value: 'ASSIGNMENT', label: '📝 Bài tập' },
                { value: 'LIVE_SESSION', label: '🎥 Buổi học trực tiếp' }
              ]}
            />
            <FormInput
              label="Thời lượng (phút)"
              name="durationMinutes"
              type="number"
              value={lessonForm.durationMinutes}
              onChange={(e) => setLessonForm({ ...lessonForm, durationMinutes: parseInt(e.target.value) || 0 })}
              placeholder="30"
            />
          </div>
          <FormInput
            label="URL nội dung"
            name="contentUrl"
            value={lessonForm.contentUrl}
            onChange={(e) => setLessonForm({ ...lessonForm, contentUrl: e.target.value })}
            placeholder="https://youtube.com/embed/... hoặc link tài liệu"
          />
          <div className="grid grid-cols-3 gap-4">
            <FormInput
              label="Thứ tự"
              name="displayOrder"
              type="number"
              value={lessonForm.displayOrder}
              onChange={(e) => setLessonForm({ ...lessonForm, displayOrder: parseInt(e.target.value) || 0 })}
            />
            <div className="flex items-center gap-2 pt-7">
              <input
                type="checkbox"
                id="isPreview"
                checked={lessonForm.isPreview}
                onChange={(e) => setLessonForm({ ...lessonForm, isPreview: e.target.checked })}
                className="w-5 h-5 text-mekong-blue"
              />
              <label htmlFor="isPreview" className="text-sm font-medium text-gray-700">
                Xem trước
              </label>
            </div>
            <div className="flex items-center gap-2 pt-7">
              <input
                type="checkbox"
                id="isFree"
                checked={lessonForm.isFree}
                onChange={(e) => setLessonForm({ ...lessonForm, isFree: e.target.checked })}
                className="w-5 h-5 text-mekong-blue"
              />
              <label htmlFor="isFree" className="text-sm font-medium text-gray-700">
                Miễn phí
              </label>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default CurriculumBuilder
