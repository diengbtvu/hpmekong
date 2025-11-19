import React from 'react'
import { useLanguage } from '../i18n/config.jsx'
import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import api from '../services/api'

const Ecosystem = () => {
  const { t, language } = useLanguage()
  const [selectedCenter, setSelectedCenter] = useState(null)

  const [centers, setCenters] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchCenters = async () => {
      try {
        const response = await api.get('/centers')
        if (response.data.success) {
          setCenters(response.data.data)
        }
      } catch (error) {
        console.error('Error fetching centers:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchCenters()
  }, [])

  return (
    <div className="ecosystem-page">
      {/* Hero Banner */}
      <section className="relative bg-gradient-mekong py-16 md:py-24">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block mb-6"
          >
            <div className="bg-white px-6 py-3 rounded-full shadow-lg">
              <p className="text-mekong-blue font-bold">
                🌐 {language === 'vi' ? 'Hệ sinh thái giáo dục' : 'Education Ecosystem'}
              </p>
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-6"
          >
            {t('ecosystem.title')}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto"
          >
            {t('ecosystem.subtitle')}
          </motion.p>
        </div>
      </section>

      {/* 9 Centers Grid */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {centers.map((center, index) => {
              const name = (language === 'en' && center.nameEn) ? center.nameEn : center.name
              const tagline = (language === 'en' && center.taglineEn) ? center.taglineEn : center.tagline
              const description = (language === 'en' && center.descriptionEn) ? center.descriptionEn : center.description

              return (
                <motion.div
                  key={center.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all overflow-hidden group cursor-pointer"
                  onClick={() => setSelectedCenter(center)}
                >
                  {/* Header với gradient */}
                  <div
                    className="h-32 flex items-center justify-center text-white relative overflow-hidden"
                    style={{
                      background: center.primaryColor && center.primaryColor.includes('gradient')
                        ? center.primaryColor
                        : `linear-gradient(135deg, ${center.primaryColor || '#0057B8'} 0%, ${center.primaryColor || '#0057B8'}CC 100%)`
                    }}
                  >
                    {center.logoUrl ? (
                      <img src={center.logoUrl} alt={name} className="h-16 object-contain bg-white rounded p-1" />
                    ) : (
                      <i className="fas fa-building text-5xl opacity-90 group-hover:scale-110 transition-transform"></i>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-mekong-blue transition-colors">
                      {name}
                    </h3>
                    <p className="text-gray-600 mb-4 line-clamp-2">
                      {tagline || description}
                    </p>

                    {/* CTA */}
                    <a
                      href={center.website || '#'}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="inline-flex items-center gap-2 text-mekong-blue font-semibold hover:gap-3 transition-all"
                    >
                      {t('common.learnMore')}
                      <i className="fas fa-arrow-right"></i>
                    </a>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Partnership Section */}
      <section className="section-padding bg-gradient-mekong">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
              {language === 'vi' ? 'Cơ hội hợp tác' : 'Partnership Opportunities'}
            </h2>
            <p className="text-gray-700 max-w-2xl mx-auto">
              {language === 'vi'
                ? 'Chúng tôi luôn mở rộng cơ hội hợp tác với các trường đại học, doanh nghiệp và tổ chức giáo dục.'
                : 'We are always expanding partnership opportunities with universities, businesses and educational institutions.'}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: 'fa-university',
                title: language === 'vi' ? 'Hợp tác Đại học' : 'University Partnership',
                description: language === 'vi'
                  ? 'Đưa chương trình vào giảng dạy chính khóa'
                  : 'Integrate programs into main curriculum'
              },
              {
                icon: 'fa-building',
                title: language === 'vi' ? 'Hợp tác Doanh nghiệp' : 'Corporate Partnership',
                description: language === 'vi'
                  ? 'Đào tạo nội bộ, tuyển dụng nhân sự'
                  : 'Internal training, recruitment'
              },
              {
                icon: 'fa-handshake',
                title: language === 'vi' ? 'Đối tác chiến lược' : 'Strategic Partner',
                description: language === 'vi'
                  ? 'Hợp tác dài hạn, phát triển cùng nhau'
                  : 'Long-term cooperation, grow together'
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl p-8 text-center shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className={`fas ${item.icon} text-3xl text-mekong-blue`}></i>
                </div>
                <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.description}</p>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <a
              href="/contact"
              className="btn btn-primary btn-lg"
            >
              {language === 'vi' ? 'Đăng ký hợp tác' : 'Register Partnership'}
            </a>
          </div>
        </div>
      </section>

      {/* Center Detail Modal */}
      {selectedCenter && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setSelectedCenter(null)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            {/* Modal Header */}
            <div
              className="h-40 flex items-center justify-center text-white relative"
              style={{
                background: selectedCenter.primaryColor && selectedCenter.primaryColor.includes('gradient')
                  ? selectedCenter.primaryColor
                  : `linear-gradient(135deg, ${selectedCenter.primaryColor || '#0057B8'} 0%, ${selectedCenter.primaryColor || '#0057B8'}CC 100%)`
              }}
            >
              <button
                onClick={() => setSelectedCenter(null)}
                className="absolute top-4 right-4 w-10 h-10 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full flex items-center justify-center transition-colors"
              >
                <i className="fas fa-times text-2xl"></i>
              </button>
              <div className="text-center">
                {selectedCenter.logoUrl ? (
                  <img src={selectedCenter.logoUrl} alt={selectedCenter.name} className="h-20 object-contain bg-white rounded p-2 mb-2 mx-auto" />
                ) : (
                  <i className="fas fa-building text-6xl mb-2"></i>
                )}
                <h3 className="text-2xl font-bold">
                  {(language === 'en' && selectedCenter.nameEn) ? selectedCenter.nameEn : selectedCenter.name}
                </h3>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-8">
              <p className="text-gray-700 text-lg mb-6">
                {(language === 'en' && selectedCenter.descriptionEn) ? selectedCenter.descriptionEn : selectedCenter.description}
              </p>

              <div className="flex gap-4">
                <a
                  href={selectedCenter.website || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary flex-1 justify-center"
                >
                  {language === 'vi' ? 'Truy cập website' : 'Visit Website'}
                </a>
                <a
                  href="/contact"
                  className="btn btn-outline flex-1 justify-center"
                >
                  {language === 'vi' ? 'Liên hệ tư vấn' : 'Contact Us'}
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  )
}

export default Ecosystem

