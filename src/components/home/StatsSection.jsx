import React, { useEffect, useState, useRef } from 'react'
import { useLanguage } from '../../i18n/config.jsx'
import { motion } from 'framer-motion'
import { STATS } from '../../utils/constants'
import { settingsService } from '../../services/contentService'

const StatsSection = () => {
  const { t, language } = useLanguage()
  const [stats, setStats] = useState(STATS)
  const [counters, setCounters] = useState(STATS.map(() => 0))
  const [hasStarted, setHasStarted] = useState(false)
  const sectionRef = useRef(null)

  // Fetch stats from API
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await settingsService.getSettingsByGroup('stats')
        if (response.success && response.data) {
          const apiStats = [
            { icon: 'fa-users', count: parseInt(response.data.total_students) || 0, suffix: '+', label: language === 'vi' ? 'Học viên đã đào tạo' : 'Students Trained', color: 'text-mekong-blue' },
            { icon: 'fa-book-open', count: parseInt(response.data.total_courses) || 0, suffix: '+', label: language === 'vi' ? 'Khóa học chất lượng' : 'Quality Courses', color: 'text-sunrise-orange' },
            { icon: 'fa-chalkboard-user', count: parseInt(response.data.total_instructors) || 0, suffix: '+', label: language === 'vi' ? 'Giảng viên & Chuyên gia' : 'Instructors & Experts', color: 'text-rice-green' },
            { icon: 'fa-handshake', count: parseInt(response.data.total_partners) || 0, suffix: '+', label: language === 'vi' ? 'Đối tác chiến lược' : 'Strategic Partners', color: 'text-mekong-blue' },
          ]
          setStats(apiStats)
          setCounters(apiStats.map(() => 0))
        }
      } catch (error) {
        console.error('Error fetching stats:', error)
        // Set empty stats on error
        setStats([])
      }
    }
    fetchStats()
  }, [language])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasStarted) {
          setHasStarted(true)
          animateCounters()
        }
      },
      { threshold: 0.3 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [hasStarted])

  const animateCounters = () => {
    stats.forEach((stat, index) => {
      let current = 0
      const target = stat.count
      const increment = target / 100
      const duration = 2000
      const stepTime = duration / 100

      const timer = setInterval(() => {
        current += increment
        if (current >= target) {
          current = target
          clearInterval(timer)
        }
        setCounters(prev => {
          const newCounters = [...prev]
          newCounters[index] = Math.floor(current)
          return newCounters
        })
      }, stepTime)
    })
  }

  return (
    <section ref={sectionRef} className="section-padding bg-gradient-to-br from-blue-50 via-orange-50 to-green-50">
      <div className="container-custom">
        {/* Title */}
        <div className="text-center mb-12">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-block px-4 py-2 bg-white text-mekong-blue rounded-full font-semibold mb-4 shadow-md"
          >
            {t('home.statsTitle')}
          </motion.span>
        </div>

        {/* Stats Grid với hanger-line (xen kẽ cao thấp) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`bg-white rounded-2xl p-8 text-center shadow-lg hover:shadow-xl transition-shadow relative ${
                index % 2 === 1 ? 'lg:mt-16' : ''
              }`}
            >
              <div className={`w-16 h-16 ${stat.color} bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-4`}>
                <i className={`fas ${stat.icon} text-3xl ${stat.color}`}></i>
              </div>
              <div className="text-4xl font-black mb-2">
                <span className={stat.color}>{counters[index].toLocaleString()}</span>
                <span className={stat.color}>{stat.suffix}</span>
              </div>
              <p className="text-gray-600 font-medium">{t(`stats.${Object.keys(t('stats'))[index]}`)}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default StatsSection

