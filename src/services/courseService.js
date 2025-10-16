import api from './api'

const courseService = {
  // Get all courses with filters
  getCourses: async (params = {}) => {
    const response = await api.get('/courses', { params })
    return response.data
  },

  // Get course by ID or slug
  getCourseBySlug: async (slug) => {
    const response = await api.get(`/courses/${slug}`)
    return response.data
  },

  // Get course lessons
  getCourseLessons: async (courseId) => {
    const response = await api.get(`/courses/${courseId}/lessons`)
    return response.data
  },

  // Enroll in course
  enrollCourse: async (courseId) => {
    const response = await api.post(`/enrollments`, { courseId })
    return response.data
  },

  // Get user enrollments
  getMyEnrollments: async () => {
    const response = await api.get('/enrollments')
    return response.data
  },

  // Get enrollment progress
  getEnrollmentProgress: async (enrollmentId) => {
    const response = await api.get(`/enrollments/${enrollmentId}/progress`)
    return response.data
  },

  // Mark lesson as complete
  completeLesson: async (enrollmentId, lessonId) => {
    const response = await api.put(`/enrollments/${enrollmentId}/lessons/${lessonId}/complete`)
    return response.data
  },

  // Get course reviews
  getCourseReviews: async (courseId, params = {}) => {
    const response = await api.get(`/courses/${courseId}/reviews`, { params })
    return response.data
  },

  // Create course review
  createReview: async (courseId, reviewData) => {
    const response = await api.post(`/courses/${courseId}/reviews`, reviewData)
    return response.data
  },

  // Update review
  updateReview: async (reviewId, reviewData) => {
    const response = await api.put(`/reviews/${reviewId}`, reviewData)
    return response.data
  },

  // Delete review
  deleteReview: async (reviewId) => {
    const response = await api.delete(`/reviews/${reviewId}`)
    return response.data
  },

  // Get featured courses
  getFeaturedCourses: async () => {
    const response = await api.get('/courses/featured')
    return response.data
  },

  // Search courses
  searchCourses: async (query) => {
    const response = await api.get('/courses/search', { params: { q: query } })
    return response.data
  },
}

export default courseService

