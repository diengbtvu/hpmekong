import React from 'react'
import { motion } from 'framer-motion'
import { useLanguage } from '../../i18n/config.jsx'

const InstructorCard = ({ instructor, index = 0, onClick }) => {
  const { t, language } = useLanguage()

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.1 }}
      viewport={{ once: true }}
      onClick={onClick}
      className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all cursor-pointer group"
    >
      {/* Avatar */}
      <div className="aspect-square bg-gray-200 overflow-hidden">
        {instructor.avatar ? (
          <img
            src={instructor.avatar}
            alt={instructor.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <i className="fas fa-user-tie text-8xl text-gray-400"></i>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-6 text-center">
        {/* Name */}
        <h3 className="font-bold text-lg text-gray-900 mb-1 group-hover:text-mekong-blue transition-colors">
          {instructor.name}
        </h3>

        {/* Title/Degree */}
        <p className="text-mekong-blue font-semibold mb-3 text-sm">
          {instructor.title || (language === 'vi' ? 'Giảng viên' : 'Instructor')}
        </p>

        {/* Expertise */}
        {instructor.expertise && (
          <p className="text-gray-600 text-sm line-clamp-2 mb-3">
            {instructor.expertise}
          </p>
        )}

        {/* Stats */}
        <div className="flex items-center justify-center gap-4 text-xs text-gray-600 mb-4 pt-4 border-t border-gray-200">
          {instructor.experience && (
            <span className="flex items-center gap-1">
              <i className="fas fa-calendar-alt"></i>
              {instructor.experience} {language === 'vi' ? 'năm' : 'years'}
            </span>
          )}
          {instructor.coursesCount && (
            <span className="flex items-center gap-1">
              <i className="fas fa-book"></i>
              {instructor.coursesCount} {language === 'vi' ? 'khóa' : 'courses'}
            </span>
          )}
        </div>

        {/* View Profile Button */}
        <button className="btn btn-outline w-full btn-sm">
          {t('instructors.viewProfile')}
        </button>
      </div>
    </motion.div>
  )
}

export default InstructorCard

