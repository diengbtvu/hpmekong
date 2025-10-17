import api from './api'

const contactService = {
  // Submit contact form
  submitContact: async (contactData) => {
    const response = await api.post('/contact', contactData)
    return response.data
  },

  // Get all contacts (Admin)
  getContacts: async (params = {}) => {
    const response = await api.get('/admin/contacts', { params })
    return response.data
  },

  // Subscribe to newsletter
  subscribe: async (email) => {
    const response = await api.post('/newsletter/subscribe', { email })
    return response.data
  },

  // Unsubscribe from newsletter
  unsubscribe: async (email) => {
    const response = await api.post('/newsletter/unsubscribe', { email })
    return response.data
  },
}

export default contactService

