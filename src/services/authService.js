import api from './api'

const authService = {
  // Register new user
  register: async (userData) => {
    const response = await api.post('/auth/register', userData)
    const data = response.data.data || response.data
    if (data.token) {
      localStorage.setItem('token', data.token)
      localStorage.setItem('user', JSON.stringify(data.user || data))
    }
    return response.data
  },

  // Login
  login: async (email, password) => {
    const response = await api.post('/auth/login', { email, password })
    const data = response.data.data || response.data
    if (data.token) {
      localStorage.setItem('token', data.token)
      localStorage.setItem('user', JSON.stringify(data.user || data))
    }
    return response.data
  },

  // Logout
  logout: async () => {
    try {
      await api.post('/auth/logout')
    } finally {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
    }
  },

  // Get current user
  getCurrentUser: async () => {
    const response = await api.get('/auth/me')
    return response.data
  },

  // Refresh token
  refreshToken: async () => {
    const response = await api.post('/auth/refresh')
    if (response.data.token) {
      localStorage.setItem('token', response.data.token)
    }
    return response.data
  },

  // Forgot password
  forgotPassword: async (email) => {
    const response = await api.post('/auth/forgot-password', { email })
    return response.data
  },

  // Reset password
  resetPassword: async (token, newPassword) => {
    const response = await api.post('/auth/reset-password', { token, newPassword })
    return response.data
  },

  // Get user from localStorage
  getLocalUser: () => {
    const userStr = localStorage.getItem('user')
    return userStr ? JSON.parse(userStr) : null
  },

  // Get token from localStorage
  getLocalToken: () => {
    return localStorage.getItem('token')
  },
}

export default authService

