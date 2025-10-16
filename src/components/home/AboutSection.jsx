import { useLanguage } from '../../i18n/config.jsx'
import { motion } from 'framer-motion'

const AboutSection = () => {
  const { t } = useLanguage()

  const features = [
    {
      icon: 'fa-eye',
      title: t('home.vision'),
      description: t('home.visionContent'),
      color: 'bg-blue-50',
      iconColor: 'text-mekong-blue',
    },
    {
      icon: 'fa-bullseye',
      title: t('home.mission'),
      description: t('home.missionContent'),
      color: 'bg-orange-50',
      iconColor: 'text-sunrise-orange',
    },
  ]

  const coreValues = [
    {
      icon: 'fa-rocket',
      title: t('home.coreValue1'),
      description: t('home.coreValue1Desc'),
      color: 'bg-blue-50',
      iconColor: 'text-mekong-blue',
    },
    {
      icon: 'fa-puzzle-piece',
      title: t('home.coreValue2'),
      description: t('home.coreValue2Desc'),
      color: 'bg-orange-50',
      iconColor: 'text-sunrise-orange',
    },
    {
      icon: 'fa-seedling',
      title: t('home.coreValue3'),
      description: t('home.coreValue3Desc'),
      color: 'bg-green-50',
      iconColor: 'text-rice-green',
    },
  ]

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
              <div className="aspect-video bg-gray-200 flex items-center justify-center">
                <i className="fas fa-play-circle text-6xl text-mekong-blue"></i>
              </div>
              {/* Placeholder for video */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end p-6">
                <p className="text-white font-semibold">Video giới thiệu Happy World Mekong</p>
              </div>
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
              <h3 className="font-bold text-xl text-gray-900 mb-4">{t('home.coreValues')}</h3>
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

