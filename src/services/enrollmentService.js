import api from './api'

const enrollmentService = {
  // Enroll in a course
  enrollCourse: async (courseId) => {
    const response = await api.post('/enrollments', { courseId })
    return response.data
  },

  // Get my enrollments
  getMyEnrollments: async (params = {}) => {
    const response = await api.get('/enrollments', { params })
    return response.data
  },

  // Get enrollment by ID
  getEnrollmentById: async (id) => {
    const response = await api.get(`/enrollments/${id}`)
    return response.data
  },

  // Update enrollment progress
  updateProgress: async (id, completedLessons) => {
    const response = await api.put(`/enrollments/${id}/progress`, null, {
      params: { completedLessons }
    })
    return response.data
  },

  // Check if enrolled in course
  checkEnrollment: async (courseId) => {
    try {
      const response = await enrollmentService.getMyEnrollments()
      if (response.success && response.data) {
        const enrollments = response.data.content || response.data
        return enrollments.some(e => e.course?.id === courseId || e.courseId === courseId)
      }
      return false
    } catch (error) {
      console.error('Error checking enrollment:', error)
      return false
    }
  }
}

export default enrollmentService
