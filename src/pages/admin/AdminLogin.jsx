import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import authService from '../../services/authService'
import { useLanguage } from '../../i18n/config'

const AdminLogin = () => {
  const navigate = useNavigate()
  const { language } = useLanguage()
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const translations = {
    vi: {
      adminLogin: 'Đăng nhập quản trị',
      welcomeBack: 'Chào mừng trở lại!',
      loginToContinue: 'Đăng nhập để tiếp tục vào trang quản trị',
      email: 'Email',
      password: 'Mật khẩu',
      rememberMe: 'Ghi nhớ đăng nhập',
      forgotPassword: 'Quên mật khẩu?',
      login: 'Đăng nhập',
      loggingIn: 'Đang đăng nhập...',
      demoCredentials: 'Thông tin demo',
      noAdminAccess: 'Bạn không có quyền truy cập trang quản trị',
      loginFailed: 'Đăng nhập thất bại',
      serverError: 'Lỗi server',
      enterEmail: 'Nhập email của bạn',
      enterPassword: 'Nhập mật khẩu của bạn'
    },
    en: {
      adminLogin: 'Admin Login',
      welcomeBack: 'Welcome Back!',
      loginToContinue: 'Login to continue to admin dashboard',
      email: 'Email',
      password: 'Password',
      rememberMe: 'Remember me',
      forgotPassword: 'Forgot Password?',
      login: 'Login',
      loggingIn: 'Logging in...',
      demoCredentials: 'Demo Credentials',
      noAdminAccess: 'You do not have admin access',
      loginFailed: 'Login failed',
      serverError: 'Server error',
      enterEmail: 'Enter your email',
      enterPassword: 'Enter your password'
    }
  }

  const t = (key) => translations[language]?.[key] || translations['vi'][key] || key

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
    setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const response = await authService.login(formData.email, formData.password)
      console.log('Login response:', response)
      
      if (response.success) {
        const userData = response.data.user
        const userRoles = userData?.roles || []
        
        console.log('User roles:', userRoles)
        
        // Check if user is admin
        const isAdmin = userRoles.some(role => 
          role === 'ADMIN' || role === 'SUPER_ADMIN' || role === 'CENTER_MANAGER'
        )

        if (!isAdmin) {
          setError(t('noAdminAccess'))
          localStorage.removeItem('token')
          localStorage.removeItem('user')
          return
        }

        // Token and user already saved by authService.login
        console.log('Redirecting to /admin/dashboard...')
        
        // Use setTimeout to ensure state updates before navigation
        setTimeout(() => {
          navigate('/admin/dashboard', { replace: true })
        }, 100)
      } else {
        setError(response.message || t('loginFailed'))
      }
    } catch (err) {
      console.error('Login error:', err)
      setError(err.response?.data?.error?.message || err.message || t('loginFailed'))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-mekong-blue via-blue-500 to-sunrise-orange flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        {/* Logo Card */}
        <div className="bg-white rounded-t-2xl p-8 text-center">
          <div className="w-20 h-20 mx-auto bg-gradient-to-r from-mekong-blue to-sunrise-orange rounded-2xl flex items-center justify-center mb-4">
            <span className="text-white font-bold text-3xl">HWM</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            {t('adminLogin')}
          </h1>
          <p className="text-gray-600">
            Happy World Mekong Management System
          </p>
        </div>

        {/* Login Form Card */}
        <div className="bg-white rounded-b-2xl shadow-2xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Error Message */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm"
              >
                <i className="fas fa-exclamation-circle mr-2"></i>
                {error}
              </motion.div>
            )}

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                {t('email')}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <i className="fas fa-envelope text-gray-400"></i>
                </div>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-mekong-blue focus:border-transparent transition-colors"
                  placeholder="admin@happyworldmekong.com"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                {t('password')}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <i className="fas fa-lock text-gray-400"></i>
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="block w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-mekong-blue focus:border-transparent transition-colors"
                  placeholder={t('enterPassword')}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                >
                  <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                </button>
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-mekong-blue border-gray-300 rounded focus:ring-mekong-blue"
                />
                <span className="ml-2 text-sm text-gray-600">Ghi nhớ đăng nhập</span>
              </label>
              <a href="#" className="text-sm text-mekong-blue hover:text-blue-700 font-medium">
                Quên mật khẩu?
              </a>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-mekong-blue to-blue-600 text-white py-3 px-4 rounded-lg font-semibold
                hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-mekong-blue
                disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <i className="fas fa-spinner fa-spin"></i>
                  <span>{t('loggingIn')}</span>
                </>
              ) : (
                <>
                  <i className="fas fa-sign-in-alt"></i>
                  <span>{t('login')}</span>
                </>
              )}
            </button>
          </form>

          {/* Demo Credentials */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <p className="text-xs text-gray-500 text-center mb-2">{t('demoCredentials')}:</p>
            <div className="bg-gray-50 rounded-lg p-3 text-xs text-gray-600 space-y-1">
              <p><strong>{t('email')}:</strong> admin@mekong.com</p>
              <p><strong>{t('password')}:</strong> Admin123</p>
            </div>
          </div>
        </div>

        {/* Back to Home */}
        <div className="text-center mt-6">
          <a
            href="/"
            className="text-white hover:text-gray-200 text-sm font-medium inline-flex items-center gap-2"
          >
            <i className="fas fa-arrow-left"></i>
            <span>Quay lại trang chủ</span>
          </a>
        </div>
      </motion.div>
    </div>
  )
}

export default AdminLogin

