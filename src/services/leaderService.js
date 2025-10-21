import api from './api'

const leaderService = {
  // Public APIs
  getActiveLeaders: async () => {
    const response = await api.get('/leaders')
    return response.data
  },

  getFeaturedLeaders: async () => {
    const response = await api.get('/leaders/featured')
    return response.data
  },

  getLeaderById: async (id) => {
    const response = await api.get(`/leaders/${id}`)
    return response.data
  },

  // Admin APIs
  getAllLeadersAdmin: async (params = {}) => {
    const response = await api.get('/admin/leaders', { params })
    return response.data
  },

  createLeader: async (data) => {
    const response = await api.post('/admin/leaders', data)
    return response.data
  },

  updateLeader: async (id, data) => {
    const response = await api.put(`/admin/leaders/${id}`, data)
    return response.data
  },

  deleteLeader: async (id) => {
    const response = await api.delete(`/admin/leaders/${id}`)
    return response.data
  },
}

export default leaderService
