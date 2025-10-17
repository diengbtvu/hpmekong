import React, { useState, useEffect } from 'react'
import { useLanguage } from '../../i18n/config.jsx'
import { motion } from 'framer-motion'
import api from '../../services/api'

const EcosystemSection = () => {
  const { t, language } = useLanguage()
  const [centers, setCenters] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchCenters = async () => {
      try {
        const response = await api.get('/centers')
        
        if (response.data.success) {
          setCenters(response.data.data || [])
        }
      } catch (error) {
        console.error('Error fetching centers:', error)
        setCenters([])
      } finally {
        setLoading(false)
      }
    }

    fetchCenters()
  }, [language])

  if (loading) {
    return (
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-mekong-blue"></div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        {/* Section Title */}
        <div className="text-center mb-12">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-block px-4 py-2 bg-blue-50 text-mekong-blue rounded-full font-semibold mb-4"
          >
            {t('home.ecosystemTitle')}
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl md:text-4xl font-heading font-bold"
          >
            {t('home.ecosystemSubtitle')}
          </motion.h2>
        </div>

        {/* Centers Grid */}
        {centers.length === 0 ? (
          <div className="text-center py-12">
            <i className="fas fa-network-wired text-6xl text-gray-300 mb-4"></i>
            <p className="text-gray-600">
              {language === 'vi' ? 'Chưa có thông tin hệ sinh thái' : 'No ecosystem information yet'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {centers.map((center, index) => (
              <motion.a
                key={center.id}
                href={center.url || center.website}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="card group"
              >
                {/* Logo */}
                <div className="flex justify-center mb-4 h-32 items-center overflow-hidden">
                  {center.logoUrl ? (
                    <img
                      src={center.logoUrl}
                      alt={center.name}
                      className="max-w-full max-h-full w-auto h-auto object-contain transition-transform group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-32 h-32 bg-gray-200 rounded-lg flex items-center justify-center">
                      <i className="fas fa-building text-4xl text-gray-400"></i>
                    </div>
                  )}
                </div>

                {/* Content */}
                <h3 className="text-lg font-bold text-gray-900 text-center mb-2 group-hover:text-mekong-blue transition-colors">
                  {center.name}
                </h3>
                <p className="text-gray-600 text-center text-sm mb-4 h-12">
                  {center.tagline || center.description || ''}
                </p>

                {/* View More */}
                <div className="text-center">
                  <span className="text-mekong-blue font-semibold text-sm inline-flex items-center gap-2 group-hover:gap-3 transition-all">
                    {t('common.learnMore')}
                    <i className="fas fa-arrow-right"></i>
                  </span>
                </div>
              </motion.a>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

export default EcosystemSection

