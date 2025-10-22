import React, { useState, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useLanguage } from '../i18n/config.jsx'
import { motion } from 'framer-motion'
import paymentService from '../services/paymentService'
import enrollmentService from '../services/enrollmentService'

const PaymentSuccess = () => {
  const { language } = useLanguage()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const [loading, setLoading] = useState(true)
  const [paymentData, setPaymentData] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    verifyPayment()
  }, [])

  const verifyPayment = async () => {
    try {
      const orderCode = searchParams.get('orderCode')
      const status = searchParams.get('status')
      const code = searchParams.get('code')

      console.log('Payment callback params:', { orderCode, status, code })

      if (!orderCode) {
        setError(language === 'vi' ? 'Thiếu thông tin thanh toán' : 'Missing payment information')
        setLoading(false)
        return
      }

      // Check payment status from our backend
      // Assuming we have an API to check by orderCode
      // For now, we'll consider status=PAID as success
      
      if (status === 'PAID' && code === '00') {
        setPaymentData({
          orderCode,
          status: 'success',
          message: language === 'vi' 
            ? 'Thanh toán thành công! Bạn đã được đăng ký khóa học.'
            : 'Payment successful! You have been enrolled in the course.'
        })
      } else {
        setError(language === 'vi' 
          ? 'Thanh toán không thành công. Vui lòng thử lại.'
          : 'Payment unsuccessful. Please try again.')
      }
      
      setLoading(false)
    } catch (err) {
      console.error('Error verifying payment:', err)
      setError(language === 'vi' 
        ? 'Có lỗi xảy ra khi xác thực thanh toán'
        : 'Error verifying payment')
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-b-4 border-mekong-blue mb-4"></div>
          <p className="text-gray-600 text-lg">
            {language === 'vi' ? 'Đang xác thực thanh toán...' : 'Verifying payment...'}
          </p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-2xl shadow-xl p-8 md:p-12 max-w-lg text-center"
        >
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <i className="fas fa-times text-4xl text-red-500"></i>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            {language === 'vi' ? 'Thanh toán thất bại' : 'Payment Failed'}
          </h1>
          <p className="text-gray-600 mb-8">{error}</p>
          <div className="flex gap-4 justify-center">
            <button
              onClick={() => navigate('/courses')}
              className="btn btn-outline"
            >
              <i className="fas fa-arrow-left mr-2"></i>
              {language === 'vi' ? 'Quay lại khóa học' : 'Back to Courses'}
            </button>
            <button
              onClick={() => navigate('/contact')}
              className="btn btn-primary"
            >
              <i className="fas fa-phone mr-2"></i>
              {language === 'vi' ? 'Liên hệ hỗ trợ' : 'Contact Support'}
            </button>
          </div>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-2xl shadow-xl p-8 md:p-12 max-w-lg text-center"
      >
        {/* Success Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
        >
          <i className="fas fa-check text-4xl text-green-500"></i>
        </motion.div>

        {/* Success Message */}
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
          {language === 'vi' ? 'Thanh toán thành công!' : 'Payment Successful!'}
        </h1>
        <p className="text-gray-600 mb-2">
          {paymentData?.message}
        </p>
        <p className="text-sm text-gray-500 mb-8">
          {language === 'vi' ? 'Mã đơn hàng: ' : 'Order Code: '}
          <span className="font-semibold">{paymentData?.orderCode}</span>
        </p>

        {/* Success Animation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-green-50 border border-green-200 rounded-xl p-6 mb-8"
        >
          <div className="flex items-start gap-3">
            <i className="fas fa-graduation-cap text-2xl text-green-600 mt-1"></i>
            <div className="text-left">
              <h3 className="font-semibold text-gray-900 mb-1">
                {language === 'vi' ? 'Bạn đã được đăng ký!' : 'You are enrolled!'}
              </h3>
              <p className="text-sm text-gray-600">
                {language === 'vi' 
                  ? 'Khóa học của bạn đã được kích hoạt. Bắt đầu học ngay hôm nay!'
                  : 'Your course has been activated. Start learning today!'
                }
              </p>
            </div>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => navigate('/profile/my-courses')}
            className="btn btn-primary justify-center"
          >
            <i className="fas fa-book-reader mr-2"></i>
            {language === 'vi' ? 'Khóa học của tôi' : 'My Courses'}
          </button>
          <button
            onClick={() => navigate('/courses')}
            className="btn btn-outline justify-center"
          >
            <i className="fas fa-search mr-2"></i>
            {language === 'vi' ? 'Khám phá thêm' : 'Explore More'}
          </button>
        </div>

        {/* Additional Info */}
        <div className="mt-8 pt-6 border-t border-gray-200 text-sm text-gray-600">
          <p>
            {language === 'vi' 
              ? 'Email xác nhận đã được gửi đến địa chỉ email của bạn.'
              : 'A confirmation email has been sent to your email address.'
            }
          </p>
        </div>
      </motion.div>
    </div>
  )
}

export default PaymentSuccess
