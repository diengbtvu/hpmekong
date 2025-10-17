import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useLanguage } from '../../i18n/config.jsx'

const CourseCard = ({ course, index = 0 }) => {
  const { t, language } = useLanguage()

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN').format(price) + 'đ'
  }

  const discountPercent = course.discountPrice 
    ? Math.round(((course.price - course.discountPrice) / course.price) * 100)
    : 0

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
      className="bg-white rounded-2xl shadow-card hover:shadow-card-hover transition-all overflow-hidden group"
    >
      {/* Image */}
      <Link to={`/courses/${course.slug}`} className="block relative overflow-hidden">
        <div className="aspect-video bg-gray-200 relative">
          {course.image ? (
            <img
              src={course.image}
              alt={course.title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <i className="fas fa-graduation-cap text-6xl text-gray-400"></i>
            </div>
          )}

          {/* Badges */}
          <div className="absolute top-3 left-3 flex gap-2">
            {course.isFree && (
              <span className="px-3 py-1 bg-rice-green text-white text-xs font-bold rounded-full">
                {t('courses.free')}
              </span>
            )}
            {course.isBestseller && (
              <span className="px-3 py-1 bg-sunrise-orange text-white text-xs font-bold rounded-full">
                {t('courses.bestseller')}
              </span>
            )}
            {course.isNew && (
              <span className="px-3 py-1 bg-mekong-blue text-white text-xs font-bold rounded-full">
                {t('courses.new')}
              </span>
            )}
          </div>

          {/* Wishlist Button */}
          <button className="absolute top-3 right-3 w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-red-50 transition-colors group/wish">
            <i className="far fa-heart group-hover/wish:fas text-red-500"></i>
          </button>
        </div>
      </Link>

      {/* Content */}
      <div className="p-5">
        {/* Instructor */}
        <div className="flex items-center gap-2 mb-3">
          <div className="w-8 h-8 rounded-full bg-gray-300 overflow-hidden">
            {course.instructor?.avatar ? (
              <img src={course.instructor.avatar} alt={course.instructor.name} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full bg-gray-400"></div>
            )}
          </div>
          <span className="text-sm text-gray-600">{course.instructor?.name || 'Instructor Name'}</span>
        </div>

        {/* Title */}
        <Link to={`/courses/${course.slug}`}>
          <h3 className="font-bold text-lg text-gray-900 mb-3 line-clamp-2 group-hover:text-mekong-blue transition-colors">
            {course.title}
          </h3>
        </Link>

        {/* Rating & Students */}
        <div className="flex items-center gap-4 mb-3 text-sm">
          <div className="flex items-center gap-1">
            <span className="text-yellow-500">⭐</span>
            <span className="font-semibold">{course.rating || '4.8'}</span>
            <span className="text-gray-500">({course.reviewsCount || 0})</span>
          </div>
          <div className="flex items-center gap-1 text-gray-600">
            <i className="fas fa-users text-xs"></i>
            <span>{course.studentsCount || 0} {t('courses.students')}</span>
          </div>
        </div>

        {/* Stats */}
        <div className="flex items-center gap-3 text-xs text-gray-600 mb-4 pb-4 border-b border-gray-200">
          <span className="flex items-center gap-1">
            <i className="far fa-clock"></i>
            {course.duration || '8'} {t('courses.weeks')}
          </span>
          <span className="flex items-center gap-1">
            <i className="far fa-file-alt"></i>
            {course.lessonsCount || 24} {t('courses.lessons')}
          </span>
          <span className="flex items-center gap-1">
            {course.type === 'online' ? (
              <>
                <i className="fas fa-laptop"></i>
                {t('courses.online')}
              </>
            ) : (
              <>
                <i className="fas fa-chalkboard"></i>
                {t('courses.offline')}
              </>
            )}
          </span>
        </div>

        {/* Price & CTA */}
        <div className="flex items-center justify-between">
          <div>
            {course.discountPrice ? (
              <>
                <span className="text-gray-400 line-through text-sm mr-2">
                  {formatPrice(course.price)}
                </span>
                <span className="text-2xl font-black text-mekong-blue">
                  {formatPrice(course.discountPrice)}
                </span>
                <span className="ml-2 px-2 py-0.5 bg-red-100 text-red-600 text-xs font-bold rounded">
                  -{discountPercent}%
                </span>
              </>
            ) : course.isFree ? (
              <span className="text-2xl font-black text-rice-green">
                {t('courses.free')}
              </span>
            ) : (
              <span className="text-2xl font-black text-mekong-blue">
                {formatPrice(course.price)}
              </span>
            )}
          </div>
        </div>

        {/* Enroll Button */}
        <Link
          to={`/courses/${course.slug}`}
          className="mt-4 btn btn-primary w-full justify-center text-sm"
        >
          {t('courses.enrollNow')}
        </Link>
      </div>
    </motion.div>
  )
}

export default CourseCard

