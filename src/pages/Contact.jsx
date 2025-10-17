import React, { useState } from 'react'
import { useLanguage } from '../i18n/config.jsx'
import { motion } from 'framer-motion'
import { CONTACT_INFO } from '../utils/constants'

const Contact = () => {
  const { t, language } = useLanguage()
  const [formData, setFormData] = useState({
    topic: '',
    fullName: '',
    email: '',
    phone: '',
    message: ''
  })
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const validate = () => {
    const newErrors = {}

    if (!formData.topic) newErrors.topic = language === 'vi' ? 'Vui lòng chọn chủ đề' : 'Please select a topic'
    if (!formData.fullName.trim()) newErrors.fullName = language === 'vi' ? 'Vui lòng nhập họ tên' : 'Please enter your name'
    if (!formData.email.trim()) {
      newErrors.email = language === 'vi' ? 'Vui lòng nhập email' : 'Please enter email'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = language === 'vi' ? 'Email không hợp lệ' : 'Invalid email'
    }
    if (!formData.phone.trim()) {
      newErrors.phone = language === 'vi' ? 'Vui lòng nhập số điện thoại' : 'Please enter phone'
    } else if (!/^(0[0-9]{9})$/.test(formData.phone)) {
      newErrors.phone = language === 'vi' ? 'Số điện thoại không hợp lệ' : 'Invalid phone number'
    }
    if (!formData.message.trim()) newErrors.message = language === 'vi' ? 'Vui lòng nhập nội dung' : 'Please enter message'

    return newErrors
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    const newErrors = validate()
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    setIsSubmitting(true)
    
    try {
      // TODO: Call API
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      setSubmitStatus('success')
      setFormData({ topic: '', fullName: '', email: '', phone: '', message: '' })
      
      setTimeout(() => setSubmitStatus(null), 5000)
    } catch (error) {
      setSubmitStatus('error')
      setTimeout(() => setSubmitStatus(null), 5000)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="contact-page">
      {/* Hero Banner */}
      <section className="relative bg-gradient-to-br from-[#1F294B] to-[#002191] py-12 md:py-16">
        <div className="container-custom text-center text-white">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-heading font-bold mb-4"
          >
            {t('contact.title')}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg md:text-xl max-w-2xl mx-auto"
          >
            {t('contact.subtitle')}
          </motion.p>
        </div>
      </section>

      {/* Contact Form & Map */}
      <section className="py-12 md:py-16">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Map */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="bg-white rounded-2xl overflow-hidden shadow-lg h-full min-h-[400px]">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3928.841459932746!2d105.78164431533394!3d10.029933692833894!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31a0629f6de3cfbd%3A0x30b3c5f90e5d1ec8!2zQ-G6p24gVGjGoSwgVmnhu4d0IE5hbQ!5e0!3m2!1svi!2s!4v1234567890"
                  width="100%"
                  height="100%"
                  style={{ border: 0, minHeight: '400px' }}
                  allowFullScreen=""
                  loading="lazy"
                ></iframe>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-2xl shadow-lg p-6 md:p-8"
            >
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Topic */}
                  <div>
                    <select
                      name="topic"
                      value={formData.topic}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 rounded-lg border-2 ${errors.topic ? 'border-red-500' : 'border-gray-200'} focus:border-mekong-blue focus:outline-none transition-colors`}
                    >
                      <option value="">{t('contact.selectTopic')}</option>
                      {Object.keys(t('contact.topics')).map(key => (
                        <option key={key} value={key}>{t(`contact.topics.${key}`)}</option>
                      ))}
                    </select>
                    {errors.topic && <p className="text-red-500 text-sm mt-1">{errors.topic}</p>}
                  </div>

                  {/* Full Name */}
                  <div>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder={t('contact.fullName')}
                      className={`w-full px-4 py-3 rounded-lg border-2 ${errors.fullName ? 'border-red-500' : 'border-gray-200'} focus:border-mekong-blue focus:outline-none transition-colors`}
                    />
                    {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Email */}
                  <div>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder={t('contact.email')}
                      className={`w-full px-4 py-3 rounded-lg border-2 ${errors.email ? 'border-red-500' : 'border-gray-200'} focus:border-mekong-blue focus:outline-none transition-colors`}
                    />
                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                  </div>

                  {/* Phone */}
                  <div>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder={t('contact.phone')}
                      className={`w-full px-4 py-3 rounded-lg border-2 ${errors.phone ? 'border-red-500' : 'border-gray-200'} focus:border-mekong-blue focus:outline-none transition-colors`}
                    />
                    {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                  </div>
                </div>

                {/* Message */}
                <div>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder={t('contact.message')}
                    rows="4"
                    className={`w-full px-4 py-3 rounded-lg border-2 ${errors.message ? 'border-red-500' : 'border-gray-200'} focus:border-mekong-blue focus:outline-none transition-colors resize-none`}
                  ></textarea>
                  {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
                </div>

                {/* Submit Button */}
                <div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn btn-primary w-full justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <i className="fas fa-spinner fa-spin"></i>
                        {language === 'vi' ? 'Đang gửi...' : 'Sending...'}
                      </>
                    ) : (
                      <>
                        <i className="fas fa-paper-plane"></i>
                        {t('contact.send')}
                      </>
                    )}
                  </button>
                </div>

                {/* Success/Error Messages */}
                {submitStatus === 'success' && (
                  <div className="bg-green-50 border-2 border-green-500 text-green-700 px-4 py-3 rounded-lg animate-slide-up">
                    <i className="fas fa-check-circle mr-2"></i>
                    {t('contact.successMessage')}
                  </div>
                )}
                {submitStatus === 'error' && (
                  <div className="bg-red-50 border-2 border-red-500 text-red-700 px-4 py-3 rounded-lg animate-slide-up">
                    <i className="fas fa-exclamation-circle mr-2"></i>
                    {t('contact.errorMessage')}
                  </div>
                )}
              </form>

              {/* Contact Info */}
              <div className="mt-8 pt-8 border-t border-gray-200">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <i className="fas fa-map-marker-alt text-mekong-blue"></i>
                    <span className="text-gray-700">{CONTACT_INFO.address}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <i className="fas fa-envelope text-mekong-blue"></i>
                    <a href={`mailto:${CONTACT_INFO.email}`} className="text-gray-700 hover:text-mekong-blue transition-colors">
                      {CONTACT_INFO.email}
                    </a>
                  </div>
                  <div className="flex items-center gap-3">
                    <i className="fas fa-phone text-mekong-blue"></i>
                    <a href={`tel:${CONTACT_INFO.hotline}`} className="text-gray-700 hover:text-mekong-blue transition-colors">
                      {CONTACT_INFO.hotline}
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Contact

