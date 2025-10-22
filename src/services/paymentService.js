import api from './api'

const paymentService = {
  // Create payment
  createPayment: async (paymentData) => {
    const response = await api.post('/payments/create', paymentData)
    return response.data
  },

  // Get payment by code
  getPaymentByCode: async (paymentCode) => {
    const response = await api.get(`/payments/${paymentCode}`)
    return response.data
  },

  // Verify payment status
  verifyPayment: async (paymentCode) => {
    const response = await api.get(`/payments/${paymentCode}/verify`)
    return response.data
  },

  // Get my payments
  getMyPayments: async (params = {}) => {
    const response = await api.get('/payments', { params })
    return response.data
  }
}

export default paymentService
