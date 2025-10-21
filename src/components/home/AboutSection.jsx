import React, { useState, useEffect } from 'react'
import { useLanguage } from '../../i18n/config.jsx'
import { motion } from 'framer-motion'
import { settingsService } from '../../services/contentService'

const AboutSection = () => {
  const { t, language } = useLanguage()
  const [loading, setLoading] = useState(true)
  const [aboutContent, setAboutContent] = useState({
    vision_title_vi: 'Tầm nhìn',
    vision_title_en: 'Vision',
    vision_content_vi: '',
    vision_content_en: '',
    vision_icon: 'fa-eye',
    mission_title_vi: 'Sứ mệnh',
    mission_title_en: 'Mission',
    mission_content_vi: '',
    mission_content_en: '',
    mission_icon: 'fa-bullseye',
    values_title_vi: 'Giá trị cốt lõi',
    values_title_en: 'Core Values',
    value1_title_vi: 'Tiên phong',
    value1_title_en: 'Pioneering',
    value1_desc_vi: '',
    value1_desc_en: '',
    value2_title_vi: 'Toàn diện',
    value2_title_en: 'Comprehensive',
    value2_desc_vi: '',
    value2_desc_en: '',
    value3_title_vi: 'Bền vững',
    value3_title_en: 'Sustainable',
    value3_desc_vi: '',
    value3_desc_en: '',
    youtube_video_url: 'https://www.youtube.com/embed/sCJunphEExA?si=vlYEK38MaI1B1KD-',
  })

  useEffect(() => {
    const fetchAboutContent = async () => {
      try {
        const response = await settingsService.getSettingsByGroup('about')
        if (response.success && response.data) {
          setAboutContent(prev => ({
            ...prev,
            ...response.data
          }))
        }
      } catch (error) {
        console.error('Error fetching about content:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchAboutContent()
  }, [])

  const features = [
    {
      icon: aboutContent.vision_icon,
      title: language === 'vi' ? aboutContent.vision_title_vi : aboutContent.vision_title_en,
      description: language === 'vi' ? aboutContent.vision_content_vi : aboutContent.vision_content_en,
      color: 'bg-blue-50',
      iconColor: 'text-mekong-blue',
    },
    {
      icon: aboutContent.mission_icon,
      title: language === 'vi' ? aboutContent.mission_title_vi : aboutContent.mission_title_en,
      description: language === 'vi' ? aboutContent.mission_content_vi : aboutContent.mission_content_en,
      color: 'bg-orange-50',
      iconColor: 'text-sunrise-orange',
    },
  ]

  const coreValues = [
    {
      icon: 'fa-rocket',
      title: language === 'vi' ? aboutContent.value1_title_vi : aboutContent.value1_title_en,
      description: language === 'vi' ? aboutContent.value1_desc_vi : aboutContent.value1_desc_en,
      color: 'bg-blue-50',
      iconColor: 'text-mekong-blue',
    },
    {
      icon: 'fa-puzzle-piece',
      title: language === 'vi' ? aboutContent.value2_title_vi : aboutContent.value2_title_en,
      description: language === 'vi' ? aboutContent.value2_desc_vi : aboutContent.value2_desc_en,
      color: 'bg-orange-50',
      iconColor: 'text-sunrise-orange',
    },
    {
      icon: 'fa-seedling',
      title: language === 'vi' ? aboutContent.value3_title_vi : aboutContent.value3_title_en,
      description: language === 'vi' ? aboutContent.value3_desc_vi : aboutContent.value3_desc_en,
      color: 'bg-green-50',
      iconColor: 'text-rice-green',
    },
  ]

  if (loading) {
    return (
      <section className="section-padding bg-gradient-mekong">
        <div className="container-custom">
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-mekong-blue"></div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="section-padding bg-gradient-mekong">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Video/Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              {aboutContent.youtube_video_url ? (
                <div className="aspect-video">
                  <iframe
                    className="w-full h-full"
                    src={aboutContent.youtube_video_url}
                    title="Happy World Mekong Introduction"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              ) : (
                <>
                  <div className="aspect-video bg-gray-200 flex items-center justify-center">
                    <i className="fas fa-play-circle text-6xl text-mekong-blue"></i>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end p-6">
                    <p className="text-white font-semibold">
                      {language === 'vi' ? 'Video giới thiệu Happy World Mekong' : 'Happy World Mekong Introduction Video'}
                    </p>
                  </div>
                </>
              )}
            </div>
          </motion.div>

          {/* Right: Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <span className="inline-block px-4 py-2 bg-orange-50 text-sunrise-orange rounded-full font-semibold mb-4">
              {t('home.aboutSubtitle')}
            </span>
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6">
              {t('home.aboutTitle')}
            </h2>

            {/* Vision & Mission */}
            <div className="space-y-6 mb-8">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex gap-4"
                >
                  <div className={`flex-shrink-0 w-14 h-14 ${feature.color} rounded-xl flex items-center justify-center`}>
                    <i className={`fas ${feature.icon} text-2xl ${feature.iconColor}`}></i>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-gray-900 mb-2">{feature.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Core Values */}
            <div className="border-t pt-6">
              <h3 className="font-bold text-xl text-gray-900 mb-4">
                {language === 'vi' ? aboutContent.values_title_vi : aboutContent.values_title_en}
              </h3>
              <div className="grid grid-cols-3 gap-4">
                {coreValues.map((value, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="text-center"
                  >
                    <div className={`w-12 h-12 ${value.color} rounded-xl flex items-center justify-center mx-auto mb-2`}>
                      <i className={`fas ${value.icon} text-xl ${value.iconColor}`}></i>
                    </div>
                    <h4 className="font-bold text-sm text-gray-900 mb-1">{value.title}</h4>
                    <p className="text-xs text-gray-600 leading-tight">{value.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default AboutSection

