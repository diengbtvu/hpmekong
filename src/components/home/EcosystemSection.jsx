import { useLanguage } from '../../i18n/config.jsx'
import { CENTERS } from '../../utils/constants'
import { motion } from 'framer-motion'

const EcosystemSection = () => {
  const { t } = useLanguage()

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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CENTERS.map((center, index) => (
            <motion.a
              key={center.id}
              href={center.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              className="card group"
            >
              {(() => {
                const centerLogos = {
                  'skills-pro': 'https://novaedu.vn/uploads/brands/1719387894_SPRO.png',
                  'career-guide': 'https://novaedu.vn/uploads/brands/1719387923_Egai.png',
                  'boss': 'https://novaedu.vn/uploads/brands/1719387965_Boss.png',
                  'teen': 'https://novaedu.vn/uploads/brands/1719387981_Teen.png',
                  'book': 'https://novaedu.vn/uploads/brands/1719387991_Book.png',
                  'job': 'https://novaedu.vn/uploads/brands/1719388015_job.png',
                  'space': 'https://novaedu.vn/uploads/brands/1719388003_UP.png',
                  'agri': 'https://novaedu.vn/uploads/brands/1698227471_%c4%91ean.png',
                  'innovation': 'https://novaedu.vn/uploads/brands/1719388070_sharrk.png',
                }
                return (
                  <div className="flex justify-center mb-4 h-32 items-center">
                    <img
                      src={centerLogos[center.slug]}
                      alt={center.name}
                      className="max-w-[175px] h-auto object-contain transition-transform group-hover:scale-110"
                    />
                  </div>
                )
              })()}

              {/* Content */}
              <h3 className="text-lg font-bold text-gray-900 text-center mb-2 group-hover:text-mekong-blue transition-colors">
                {center.name}
              </h3>
              <p className="text-gray-600 text-center text-sm mb-4 h-12">
                {center.description}
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
      </div>
    </section>
  )
}

export default EcosystemSection

