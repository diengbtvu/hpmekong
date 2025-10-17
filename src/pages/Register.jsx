import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useLanguage } from '../i18n/config.jsx'
import { motion } from 'framer-motion'
import authService from '../services/authService'
import toast from '../utils/toast'

const Register = () => {
  const { language } = useLanguage()
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    acceptTerms: false
  })
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
    setFormData({
      ...formData,
      [e.target.name]: value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Validation
    if (formData.password !== formData.confirmPassword) {
      toast.error(language === 'vi' ? 'Mật khẩu không khớp' : 'Passwords do not match')
      return
    }

    if (!formData.acceptTerms) {
      toast.error(language === 'vi' ? 'Vui lòng đồng ý với điều khoản' : 'Please accept terms and conditions')
      return
    }

    setLoading(true)

    try {
      const response = await authService.register({
        fullName: formData.fullName,
        email: formData.email,
        password: formData.password,
        phone: formData.phone
      })
      
      if (response.success) {
        toast.success(language === 'vi' ? 'Đăng ký thành công!' : 'Registration successful!')
        navigate('/login')
      } else {
        toast.error(response.message || (language === 'vi' ? 'Đăng ký thất bại' : 'Registration failed'))
      }
    } catch (error) {
      console.error('Registration error:', error)
      toast.error(language === 'vi' ? 'Email đã được sử dụng hoặc có lỗi xảy ra' : 'Email already exists or error occurred')
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
        {/* Title */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-mekong-blue">
            {language === 'vi' ? 'Đăng ký tài khoản' : 'Create Account'}
          </h2>
          <p className="text-gray-600 mt-2">
            {language === 'vi' ? 'Tạo tài khoản để bắt đầu học tập' : 'Create account to start learning'}
          </p>
        </div>

        {/* Register Form */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Full Name */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                {language === 'vi' ? 'Họ và tên' : 'Full Name'} <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-mekong-blue outline-none transition-colors"
                placeholder={language === 'vi' ? 'Nhập họ và tên' : 'Enter full name'}
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-mekong-blue outline-none transition-colors"
                placeholder={language === 'vi' ? 'Nhập email' : 'Enter email'}
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                {language === 'vi' ? 'Số điện thoại' : 'Phone Number'}
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-mekong-blue outline-none transition-colors"
                placeholder={language === 'vi' ? 'Nhập số điện thoại' : 'Enter phone number'}
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                {language === 'vi' ? 'Mật khẩu' : 'Password'} <span className="text-red-500">*</span>
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                minLength={6}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-mekong-blue outline-none transition-colors"
                placeholder={language === 'vi' ? 'Ít nhất 6 ký tự' : 'At least 6 characters'}
              />
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                {language === 'vi' ? 'Xác nhận mật khẩu' : 'Confirm Password'} <span className="text-red-500">*</span>
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-mekong-blue outline-none transition-colors"
                placeholder={language === 'vi' ? 'Nhập lại mật khẩu' : 'Re-enter password'}
              />
            </div>

            {/* Terms */}
            <div className="flex items-start">
              <input
                type="checkbox"
                name="acceptTerms"
                checked={formData.acceptTerms}
                onChange={handleChange}
                className="w-4 h-4 mt-1 text-mekong-blue border-gray-300 rounded"
                required
              />
              <label className="ml-2 text-sm text-gray-600">
                {language === 'vi' ? 'Tôi đồng ý với ' : 'I agree to '}
                <Link to="/terms" className="text-mekong-blue hover:underline">
                  {language === 'vi' ? 'Điều khoản sử dụng' : 'Terms of Service'}
                </Link>
                {' '}{language === 'vi' ? 'và' : 'and'}{' '}
                <Link to="/privacy" className="text-mekong-blue hover:underline">
                  {language === 'vi' ? 'Chính sách bảo mật' : 'Privacy Policy'}
                </Link>
              </label>
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
                  {language === 'vi' ? 'Đang xử lý...' : 'Processing...'}
                </span>
              ) : (
                <span>{language === 'vi' ? 'Đăng ký' : 'Register'}</span>
              )}
            </button>
          </form>

          {/* Login Link */}
          <div className="mt-6 text-center">
            <p className="text-gray-600">
              {language === 'vi' ? 'Đã có tài khoản?' : 'Already have an account?'}{' '}
              <Link to="/login" className="text-mekong-blue font-semibold hover:underline">
                {language === 'vi' ? 'Đăng nhập' : 'Login'}
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default Register

