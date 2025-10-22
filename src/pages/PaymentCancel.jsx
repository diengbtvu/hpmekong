import React from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useLanguage } from '../i18n/config.jsx'
import { motion } from 'framer-motion'

const PaymentCancel = () => {
  const { language } = useLanguage()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const orderCode = searchParams.get('orderCode')

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-2xl shadow-xl p-8 md:p-12 max-w-lg text-center"
      >
        {/* Cancel Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6"
        >
          <i className="fas fa-exclamation text-4xl text-yellow-500"></i>
        </motion.div>

        {/* Cancel Message */}
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
          {language === 'vi' ? 'Thanh toán đã bị hủy' : 'Payment Cancelled'}
        </h1>
        <p className="text-gray-600 mb-8">
          {language === 'vi' 
            ? 'Bạn đã hủy giao dịch thanh toán. Không có khoản phí nào được tính.'
            : 'You have cancelled the payment transaction. No charges were made.'
          }
        </p>

        {orderCode && (
          <p className="text-sm text-gray-500 mb-8">
            {language === 'vi' ? 'Mã đơn hàng: ' : 'Order Code: '}
            <span className="font-semibold">{orderCode}</span>
          </p>
        )}

        {/* Info Box */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-8 text-left"
        >
          <div className="flex items-start gap-3">
            <i className="fas fa-info-circle text-xl text-blue-600 mt-1"></i>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">
                {language === 'vi' ? 'Bạn vẫn muốn đăng ký?' : 'Still want to enroll?'}
              </h3>
              <p className="text-sm text-gray-600 mb-2">
                {language === 'vi' 
                  ? 'Khóa học vẫn còn đó! Bạn có thể quay lại và thanh toán bất cứ lúc nào.'
                  : 'The course is still available! You can return and checkout anytime.'
                }
              </p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• {language === 'vi' ? 'Truy cập trọn đời' : 'Lifetime access'}</li>
                <li>• {language === 'vi' ? 'Chứng chỉ hoàn thành' : 'Certificate of completion'}</li>
                <li>• {language === 'vi' ? 'Hỗ trợ 24/7' : '24/7 support'}</li>
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => navigate(-1)}
            className="btn btn-primary justify-center"
          >
            <i className="fas fa-redo mr-2"></i>
            {language === 'vi' ? 'Thử lại thanh toán' : 'Try Again'}
          </button>
          <button
            onClick={() => navigate('/courses')}
            className="btn btn-outline justify-center"
          >
            <i className="fas fa-arrow-left mr-2"></i>
            {language === 'vi' ? 'Quay lại khóa học' : 'Back to Courses'}
          </button>
        </div>

        {/* Support Link */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <p className="text-sm text-gray-600">
            {language === 'vi' ? 'Cần hỗ trợ? ' : 'Need help? '}
            <button
              onClick={() => navigate('/contact')}
              className="text-mekong-blue hover:underline font-semibold"
            >
              {language === 'vi' ? 'Liên hệ với chúng tôi' : 'Contact us'}
            </button>
          </p>
        </div>
      </motion.div>
    </div>
  )
}

export default PaymentCancel
