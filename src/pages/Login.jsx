import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useLanguage } from '../i18n/config.jsx'
import { motion } from 'framer-motion'
import authService from '../services/authService'
import toast from '../utils/toast'
import { formatErrorForToast } from '../utils/errorHandler'

const Login = () => {
  const { language } = useLanguage()
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await authService.login(formData.email, formData.password)
      
      if (response.success) {
        toast.success(language === 'vi' ? 'Đăng nhập thành công!' : 'Login successful!')
        
        // Redirect to home or previous page
        const returnUrl = new URLSearchParams(window.location.search).get('returnUrl')
        navigate(returnUrl || '/')
      } else {
        toast.error(response.message || (language === 'vi' ? 'Đăng nhập thất bại' : 'Login failed'))
      }
    } catch (error) {
      console.error('Login error:', error)
      
      // Format error with validation details
      const errorMessage = formatErrorForToast(error)
      toast.error(errorMessage, 5000)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50 flex items-center justify-center py-12 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full"
      >
        {/* Logo & Title */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <img 
              src="/logo.png" 
              alt="Happy World Mekong Logo" 
              className="h-16 w-auto object-contain"
            />
          </div>
          <h2 className="text-3xl font-bold text-mekong-blue">
            {language === 'vi' ? 'Đăng nhập' : 'Login'}
          </h2>
          <p className="text-gray-600 mt-2">
            {language === 'vi' ? 'Chào mừng bạn trở lại!' : 'Welcome back!'}
          </p>
        </div>

        {/* Login Form */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-mekong-blue outline-none transition-colors"
                placeholder={language === 'vi' ? 'Nhập email của bạn' : 'Enter your email'}
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                {language === 'vi' ? 'Mật khẩu' : 'Password'}
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-mekong-blue outline-none transition-colors"
                placeholder={language === 'vi' ? 'Nhập mật khẩu' : 'Enter password'}
              />
            </div>

            {/* Forgot Password */}
            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input type="checkbox" className="w-4 h-4 text-mekong-blue border-gray-300 rounded" />
                <span className="ml-2 text-sm text-gray-600">
                  {language === 'vi' ? 'Ghi nhớ đăng nhập' : 'Remember me'}
                </span>
              </label>
              <Link to="/forgot-password" className="text-sm text-mekong-blue hover:underline">
                {language === 'vi' ? 'Quên mật khẩu?' : 'Forgot password?'}
              </Link>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full btn btn-primary py-3 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <i className="fas fa-spinner fa-spin"></i>
                  {language === 'vi' ? 'Đang đăng nhập...' : 'Logging in...'}
                </span>
              ) : (
                <span>{language === 'vi' ? 'Đăng nhập' : 'Login'}</span>
              )}
            </button>
          </form>

          {/* Register Link */}
          <div className="mt-6 text-center">
            <p className="text-gray-600">
              {language === 'vi' ? 'Chưa có tài khoản?' : "Don't have an account?"}{' '}
              <Link to="/register" className="text-mekong-blue font-semibold hover:underline">
                {language === 'vi' ? 'Đăng ký ngay' : 'Register now'}
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default Login

