import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useLanguage } from '../../i18n/config.jsx'
import { motion } from 'framer-motion'
import api from '../../services/api'

const FeaturedNewsSection = () => {
  const { t, language } = useLanguage()
  const [featuredNews, setFeaturedNews] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchFeaturedNews = async () => {
      try {
        // Get latest 3 posts
        const response = await api.get('/posts', {
          params: {
            page: 0,
            size: 3
          }
        })
        
        if (response.data.success) {
          // Map the posts data to match our UI structure
          const posts = (response.data.data.content || []).map(post => ({
            id: post.id,
            slug: post.slug,
            title: language === 'vi' ? post.title : (post.titleEn || post.title),
            excerpt: language === 'vi' ? post.excerpt : (post.excerptEn || post.excerpt),
            image: post.thumbnail || 'https://placehold.co/400x300',
            date: new Date(post.publishedAt).toLocaleDateString('en-CA'),
            author: post.author?.name || 'Admin'
          }))
          setFeaturedNews(posts)
        }
      } catch (error) {
        console.error('Error fetching featured news:', error)
        setFeaturedNews([])
      } finally {
        setLoading(false)
      }
    }

    fetchFeaturedNews()
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
        <div className="text-center mb-12">
          <h3 className="text-3xl md:text-4xl font-heading font-bold">
            {language === 'vi' ? 'TIN TỨC NỔI BẬT' : 'FEATURED NEWS'}
          </h3>
        </div>

        {featuredNews.length === 0 ? (
          <div className="text-center py-12">
            <i className="fas fa-newspaper text-6xl text-gray-300 mb-4"></i>
            <p className="text-gray-600">
              {language === 'vi' ? 'Chưa có tin tức nổi bật' : 'No featured news yet'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredNews.map((news, index) => (
              <motion.div
                key={news.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all group"
              >
                {/* Horizontal layout: image left 40%, content right 60% */}
                <div className="flex flex-col md:flex-row">
                  {/* Image - 40% */}
                  <Link to={`/news/${news.slug}`} className="md:w-2/5 flex-shrink-0">
                    <div className="h-48 md:h-full bg-gray-200 overflow-hidden">
                      <img
                        src={news.image}
                        alt={news.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                  </Link>

                  {/* Content - 60% */}
                  <div className="md:w-3/5 p-5 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-3 text-xs text-gray-600 mb-2">
                        <span><i className="far fa-calendar"></i> {news.date}</span>
                        <span><i className="far fa-user"></i> by {news.author}</span>
                      </div>

                      <Link to={`/news/${news.slug}`}>
                        <h3 className="font-bold text-base mb-2 line-clamp-2 group-hover:text-mekong-blue transition-colors">
                          {news.title}
                        </h3>
                      </Link>

                      <p className="text-gray-600 text-sm line-clamp-3 mb-3">
                        {news.excerpt}
                      </p>
                    </div>

                    <Link
                      to={`/news/${news.slug}`}
                      className="inline-flex items-center gap-2 text-mekong-blue font-semibold text-sm hover:gap-3 transition-all"
                    >
                      {language === 'vi' ? 'Xem thêm' : 'Read more'}
                      <i className="fas fa-arrow-right-long"></i>
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {featuredNews.length > 0 && (
          <div className="text-center mt-8">
            <Link to="/news" className="btn btn-outline">
              {language === 'vi' ? 'Xem tất cả tin tức' : 'View all news'}
            </Link>
          </div>
        )}
      </div>
    </section>
  )
}

export default FeaturedNewsSection
