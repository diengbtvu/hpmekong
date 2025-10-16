import api from './api'

const instructorService = {
  // Get all instructors
  getInstructors: async (params = {}) => {
    const response = await api.get('/instructors', { params })
    return response.data
  },

  // Get instructor by ID
  getInstructorById: async (id) => {
    const response = await api.get(`/instructors/${id}`)
    return response.data
  },

  // Get instructor's courses
  getInstructorCourses: async (instructorId) => {
    const response = await api.get(`/instructors/${instructorId}/courses`)
    return response.data
  },

  // Get featured instructors
  getFeaturedInstructors: async () => {
    const response = await api.get('/instructors/featured')
    return response.data
  },
}

export default instructorService

