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
    }
    return colors[category] || 'bg-gray-100 text-gray-700'
  }

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
        <div className="aspect-video bg-gray-200">
          {(post.image || post.featuredImageUrl) ? (
            <img
              src={post.image || post.featuredImageUrl}
              alt={post.title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <i className="fas fa-newspaper text-6xl text-gray-400"></i>
            </div>
          )}
        </div>

        {/* Category Badge */}
        {post.category && (
          <div className="absolute top-3 left-3">
            <span className={`px-3 py-1 ${getCategoryColor(post.category)} text-xs font-bold rounded-full`}>
              {post.categoryName || post.category}
            </span>
          </div>
        )}
      </Link>

      {/* Content */}
      <div className="p-5">
        {/* Meta Info */}
        <div className="flex items-center gap-4 text-xs text-gray-500 mb-3">
          <span className="flex items-center gap-1">
            <i className="far fa-calendar"></i>
            {formatDate(post.publishedAt || post.createdAt)}
          </span>
          {post.author && (
            <span className="flex items-center gap-1">
              <i className="far fa-user"></i>
              {typeof post.author === 'object' ? post.author.name : post.author}
            </span>
          )}
          {post.views && (
            <span className="flex items-center gap-1">
              <i className="far fa-eye"></i>
              {post.views}
            </span>
          )}
        </div>

        {/* Title */}
        <Link to={`/news/${post.slug}`}>
          <h3 className="font-bold text-lg text-gray-900 mb-3 line-clamp-2 group-hover:text-mekong-blue transition-colors">
            {post.title}
          </h3>
        </Link>

        {/* Excerpt */}
        <p className="text-gray-600 text-sm line-clamp-3 mb-4">
          {post.excerpt || post.description}
        </p>

        {/* Read More */}
        <Link
          to={`/news/${post.slug}`}
          className="inline-flex items-center gap-2 text-mekong-blue font-semibold text-sm hover:gap-3 transition-all"
        >
          {t('common.readMore')}
          <i className="fas fa-arrow-right"></i>
        </Link>
      </div>
    </motion.div>
  )
}

export default NewsCard

