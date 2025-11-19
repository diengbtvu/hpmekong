import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useLanguage } from '../../i18n/config.jsx'

const NewsCard = ({ post, index = 0 }) => {
  const { t, language } = useLanguage()

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat(language === 'vi' ? 'vi-VN' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date)
  }

  const getCategoryColor = (category) => {
    const colors = {
      activities: 'bg-blue-100 text-blue-700',
      recruitment: 'bg-green-100 text-green-700',
      events: 'bg-orange-100 text-orange-700',
      announcements: 'bg-red-100 text-red-700'
    }
    return colors[category] || 'bg-gray-100 text-gray-700'
  }

  // Extract category info safely - handle both old format (string) and new format (object)
  const categoryName = typeof post.category === 'object' && post.category?.name
    ? post.category.name
    : post.categoryName || null
  const categorySlug = typeof post.category === 'object' && post.category?.slug
    ? post.category.slug
    : (typeof post.category === 'string' ? post.category : null)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      viewport={{ once: true }}
      className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all group"
    >
      {/* Featured Image */}
      <Link to={`/news/${post.slug}`} className="block relative overflow-hidden">
        <div className="aspect-video bg-gray-200 flex items-center justify-center">
          {(post.image || post.featuredImageUrl) ? (
            <img
              src={post.image || post.featuredImageUrl}
              alt={post.title}
              className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <i className="fas fa-newspaper text-4xl sm:text-5xl md:text-6xl text-gray-400"></i>
            </div>
          )}
        </div>

        {/* Category Badge */}
        {categoryName && (
          <div className="absolute top-2 sm:top-3 left-2 sm:left-3">
            <span className={`px-2 py-0.5 sm:px-3 sm:py-1 ${getCategoryColor(categorySlug)} text-[10px] sm:text-xs font-bold rounded-full`}>
              {categoryName}
            </span>
          </div>
        )}
      </Link>

      {/* Content */}
      <div className="p-3 sm:p-4 md:p-5">
        {/* Meta Info */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 md:gap-4 text-[10px] sm:text-xs text-gray-500 mb-2 sm:mb-3">
          <span className="flex items-center gap-1">
            <i className="far fa-calendar text-[10px] sm:text-xs"></i>
            <span className="hidden sm:inline">{formatDate(post.publishedAt || post.createdAt)}</span>
            <span className="sm:hidden">{formatDate(post.publishedAt || post.createdAt).split(' ')[0]}</span>
          </span>
          {post.author && (
            <span className="flex items-center gap-1 truncate max-w-[120px] sm:max-w-none">
              <i className="far fa-user text-[10px] sm:text-xs"></i>
              <span className="truncate">{typeof post.author === 'object' ? post.author.name : post.author}</span>
            </span>
          )}
          {post.views && (
            <span className="flex items-center gap-1">
              <i className="far fa-eye text-[10px] sm:text-xs"></i>
              {post.views}
            </span>
          )}
        </div>

        {/* Title */}
        <Link to={`/news/${post.slug}`}>
          <h3 className="font-bold text-sm sm:text-base md:text-lg text-gray-900 mb-2 sm:mb-3 line-clamp-2 group-hover:text-mekong-blue transition-colors">
            {(language === 'en' && post.titleEn) ? post.titleEn : post.title}
          </h3>
        </Link>

        {/* Excerpt */}
        <p className="text-gray-600 text-xs sm:text-sm line-clamp-2 sm:line-clamp-3 mb-3 sm:mb-4">
          {(language === 'en' && post.excerptEn) ? post.excerptEn : (post.excerpt || post.description)}
        </p>

        {/* Read More */}
        <Link
          to={`/news/${post.slug}`}
          className="inline-flex items-center gap-1 sm:gap-2 text-mekong-blue font-semibold text-xs sm:text-sm hover:gap-2 sm:hover:gap-3 transition-all"
        >
          {t('common.readMore')}
          <i className="fas fa-arrow-right text-[10px] sm:text-xs"></i>
        </Link>
      </div>
    </motion.div>
  )
}

export default NewsCard

