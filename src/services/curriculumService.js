import api from './api'

const curriculumService = {
  // Get course curriculum (modules & lessons)
  getCourseCurriculum: async (courseId) => {
    const response = await api.get(`/courses/${courseId}/curriculum`)
    return response.data
  },

  // Admin: Create module
  createModule: async (courseId, moduleData) => {
    const response = await api.post(`/admin/courses/${courseId}/modules`, moduleData)
    return response.data
  },

  // Admin: Update module
  updateModule: async (moduleId, moduleData) => {
    const response = await api.put(`/admin/modules/${moduleId}`, moduleData)
    return response.data
  },

  // Admin: Delete module
  deleteModule: async (moduleId) => {
    const response = await api.delete(`/admin/modules/${moduleId}`)
    return response.data
  },

  // Admin: Create lesson
  createLesson: async (moduleId, lessonData) => {
    const response = await api.post(`/admin/modules/${moduleId}/lessons`, lessonData)
    return response.data
  },

  // Admin: Update lesson
  updateLesson: async (lessonId, lessonData) => {
    const response = await api.put(`/admin/lessons/${lessonId}`, lessonData)
    return response.data
  },

  // Admin: Delete lesson
  deleteLesson: async (lessonId) => {
    const response = await api.delete(`/admin/lessons/${lessonId}`)
    return response.data
  },
}

export default curriculumService
