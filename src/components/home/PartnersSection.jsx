import React, { useState, useEffect } from 'react'
import { useLanguage } from '../../i18n/config.jsx'
import { motion } from 'framer-motion'
import { partnerService } from '../../services/contentService'

const PartnersSection = () => {
  const { t, language } = useLanguage()
  const [partners, setPartners] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPartners = async () => {
      try {
        const response = await partnerService.getAllPartners()
        if (response.success && response.data) {
          setPartners(response.data.map(partner => ({
            id: partner.id,
            name: language === 'vi' ? partner.name : (partner.nameEn || partner.name),
            logo: partner.logoUrl,
            url: partner.websiteUrl
          })))
        }
      } catch (error) {
        console.error('Error fetching partners:', error)
        setPartners([])
      } finally {
        setLoading(false)
      }
    }

    fetchPartners()
  }, [language])

  return (
    <section className="section-padding" style={{ 
      background: 'linear-gradient(184deg, rgba(255, 255, 255, 0.00) 5.98%, rgba(0, 87, 184, 0.07) 25.31%, rgba(255, 140, 0, 0.07) 58.58%, rgba(248, 248, 248, 0.23) 96.97%)'
    }}>
      <div className="container-custom">
        <div className="text-center mb-12">
          <h3 className="text-3xl md:text-4xl font-heading font-bold">
            {language === 'vi' ? 'ĐỐI TÁC TIÊU BIỂU CỦA' : 'STRATEGIC PARTNERS OF'}{' '}
            <span className="text-mekong-blue">HAPPY</span>{' '}
            <span className="text-sunrise-orange">WORLD</span>{' '}
            <span className="text-rice-green">MEKONG</span>
          </h3>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-mekong-blue"></div>
          </div>
        ) : partners.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {partners.map((partner, index) => (
            <motion.a
              key={partner.id}
              href={partner.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
              className="bg-white rounded-xl p-6 flex items-center justify-center transition-transform"
            >
              <img
                src={partner.logo}
                alt={partner.name}
                className="w-full h-auto max-h-20 object-contain"
                title={partner.name}
              />
            </motion.a>
          ))}
        </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500">{language === 'vi' ? 'Không có đối tác' : 'No partners available'}</p>
          </div>
        )}
      </div>
    </section>
  )
}

export default PartnersSection

