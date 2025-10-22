import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLanguage } from '../i18n/config.jsx'
import { motion } from 'framer-motion'
import Breadcrumb from '../components/common/Breadcrumb'
import paymentService from '../services/paymentService'
import enrollmentService from '../services/enrollmentService'
import toast from '../utils/toast'

const Cart = () => {
  const { t, language } = useLanguage()
  const navigate = useNavigate()
  const [cartItems, setCartItems] = useState([])
  const [isProcessing, setIsProcessing] = useState(false)

  useEffect(() => {
    loadCart()
  }, [])

  const loadCart = () => {
    const cart = JSON.parse(localStorage.getItem('courseCart') || '[]')
    setCartItems(cart)
  }

  const removeItem = (courseId) => {
    const updatedCart = cartItems.filter(item => item.id !== courseId)
    setCartItems(updatedCart)
    localStorage.setItem('courseCart', JSON.stringify(updatedCart))
    toast.success(language === 'vi' ? 'Đã xóa khỏi giỏ hàng' : 'Removed from cart')
  }

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price || 0), 0)
  }

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price)
  }

  const handleCheckout = async () => {
    if (cartItems.length === 0) {
      toast.error(language === 'vi' ? 'Giỏ hàng trống' : 'Cart is empty')
      return
    }

    const user = localStorage.getItem('user')
    if (!user) {
      toast.info(language === 'vi' ? 'Vui lòng đăng nhập để thanh toán' : 'Please login to checkout')
      navigate('/login', { state: { from: '/cart' } })
      return
    }

    try {
      setIsProcessing(true)

      // 1. Create enrollments for all courses first
      for (const item of cartItems) {
        try {
          await enrollmentService.enrollCourse(item.id)
          console.log(`Created enrollment for course ${item.id}`)
        } catch (error) {
          // If already enrolled (ACTIVE/COMPLETED), remove from cart
          if (error.response?.data?.message?.includes('đã đăng ký') || 
              error.response?.data?.message?.includes('already enrolled')) {
            toast.warning(
              language === 'vi' 
                ? `Bạn đã đăng ký khóa học "${item.title}" rồi`
                : `You are already enrolled in "${item.title}"`
            )
            removeItem(item.id)
            return
          }
          throw error
        }
      }

      // 2. Create payment for all courses
      const paymentData = {
        paymentType: 'COURSE_ENROLLMENT',
        referenceId: cartItems[0].id, // Use first course as reference
        amount: calculateTotal(),
        description: language === 'vi'
          ? `Thanh toán ${cartItems.length} khóa học`
          : `Payment for ${cartItems.length} courses`,
        metadata: JSON.stringify({
          courseIds: cartItems.map(item => item.id),
          courses: cartItems.map(item => ({
            id: item.id,
            title: item.title,
            price: item.price
          }))
        })
      }

      const response = await paymentService.createPayment(paymentData)
      
      if (response.success && response.data.checkoutUrl) {
        // Save cart for after payment
        localStorage.setItem('pendingCartCheckout', JSON.stringify(cartItems))
        // Redirect to payment - webhook will activate all enrollments
        window.location.href = response.data.checkoutUrl
      } else {
        throw new Error('Failed to create payment')
      }
    } catch (error) {
      console.error('Checkout error:', error)
      const message = error.response?.data?.message || 
        (language === 'vi' ? 'Có lỗi xảy ra. Vui lòng thử lại!' : 'An error occurred. Please try again!')
      toast.error(message)
    } finally {
      setIsProcessing(false)
    }
  }

  const breadcrumbItems = [
    { label: language === 'vi' ? 'Trang chủ' : 'Home', path: '/' },
    { label: language === 'vi' ? 'Giỏ hàng' : 'Cart' }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <Breadcrumb items={breadcrumbItems} />

      <section className="py-12">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-5xl mx-auto"
          >
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-3xl md:text-4xl font-heading font-bold mb-2">
                {language === 'vi' ? 'Giỏ hàng của bạn' : 'Your Cart'}
              </h1>
              <p className="text-gray-600">
                {language === 'vi' 
                  ? `${cartItems.length} khóa học trong giỏ hàng`
                  : `${cartItems.length} courses in cart`
                }
              </p>
            </div>

            {cartItems.length === 0 ? (
              /* Empty Cart */
              <div className="bg-white rounded-2xl shadow-md p-12 text-center">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <i className="fas fa-shopping-cart text-4xl text-gray-400"></i>
                </div>
                <h3 className="text-xl font-semibold mb-2">
                  {language === 'vi' ? 'Giỏ hàng trống' : 'Your cart is empty'}
                </h3>
                <p className="text-gray-600 mb-6">
                  {language === 'vi' 
                    ? 'Hãy khám phá các khóa học và thêm vào giỏ hàng'
                    : 'Explore courses and add them to cart'
                  }
                </p>
                <button
                  onClick={() => navigate('/courses')}
                  className="btn btn-primary"
                >
                  <i className="fas fa-search mr-2"></i>
                  {language === 'vi' ? 'Khám phá khóa học' : 'Browse Courses'}
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Cart Items */}
                <div className="lg:col-span-2 space-y-4">
                  {cartItems.map((item) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      className="bg-white rounded-xl shadow-md overflow-hidden"
                    >
                      <div className="flex flex-col sm:flex-row gap-4 p-4">
                        {/* Thumbnail */}
                        <div className="w-full sm:w-32 h-32 flex-shrink-0">
                          <img
                            src={item.thumbnailUrl || '/placeholder-course.jpg'}
                            alt={item.title}
                            className="w-full h-full object-cover rounded-lg"
                          />
                        </div>

                        {/* Details */}
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg mb-2 line-clamp-2">
                            {item.title}
                          </h3>
                          {item.instructor && (
                            <p className="text-sm text-gray-600 mb-2">
                              <i className="fas fa-user-tie mr-1"></i>
                              {item.instructor.fullName || item.instructor.name}
                            </p>
                          )}
                          <div className="flex items-center justify-between mt-4">
                            <p className="text-xl font-bold text-mekong-blue">
                              {formatPrice(item.price)}
                            </p>
                            <button
                              onClick={() => removeItem(item.id)}
                              className="text-red-500 hover:text-red-700 transition-colors"
                            >
                              <i className="fas fa-trash-alt mr-1"></i>
                              {language === 'vi' ? 'Xóa' : 'Remove'}
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Summary */}
                <div className="lg:col-span-1">
                  <div className="bg-white rounded-xl shadow-md p-6 sticky top-24">
                    <h3 className="text-xl font-semibold mb-4">
                      {language === 'vi' ? 'Tổng cộng' : 'Summary'}
                    </h3>
                    
                    <div className="space-y-3 mb-6">
                      <div className="flex justify-between text-gray-600">
                        <span>{language === 'vi' ? 'Tổng tiền khóa học' : 'Subtotal'}</span>
                        <span>{formatPrice(calculateTotal())}</span>
                      </div>
                      <div className="border-t pt-3 flex justify-between font-semibold text-lg">
                        <span>{language === 'vi' ? 'Tổng cộng' : 'Total'}</span>
                        <span className="text-mekong-blue">{formatPrice(calculateTotal())}</span>
                      </div>
                    </div>

                    <button
                      onClick={handleCheckout}
                      disabled={isProcessing}
                      className="btn btn-primary w-full justify-center"
                    >
                      {isProcessing ? (
                        <>
                          <i className="fas fa-spinner fa-spin mr-2"></i>
                          {language === 'vi' ? 'Đang xử lý...' : 'Processing...'}
                        </>
                      ) : (
                        <>
                          <i className="fas fa-credit-card mr-2"></i>
                          {language === 'vi' ? 'Thanh toán' : 'Checkout'}
                        </>
                      )}
                    </button>

                    <button
                      onClick={() => navigate('/courses')}
                      className="btn btn-outline w-full justify-center mt-3"
                    >
                      <i className="fas fa-arrow-left mr-2"></i>
                      {language === 'vi' ? 'Tiếp tục mua sắm' : 'Continue Shopping'}
                    </button>

                    {/* Guarantees */}
                    <div className="mt-6 pt-6 border-t space-y-3 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <i className="fas fa-shield-alt text-green-500"></i>
                        <span>{language === 'vi' ? 'Thanh toán an toàn' : 'Secure payment'}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <i className="fas fa-undo text-blue-500"></i>
                        <span>{language === 'vi' ? 'Hoàn tiền 30 ngày' : '30-day refund'}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <i className="fas fa-infinity text-purple-500"></i>
                        <span>{language === 'vi' ? 'Truy cập trọn đời' : 'Lifetime access'}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Cart
