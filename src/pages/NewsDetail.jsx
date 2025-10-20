import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useLanguage } from '../i18n/config.jsx'
import { motion } from 'framer-motion'
import Breadcrumb from '../components/common/Breadcrumb'
import NewsCard from '../components/common/NewsCard'
import api from '../services/api'

const NewsDetail = () => {
  const { slug } = useParams()
  const { t, language } = useLanguage()
  const [post, setPost] = useState(null)
  const [relatedPosts, setRelatedPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchPost()
    fetchRelatedPosts()
  }, [slug])

  const fetchPost = async () => {
    try {
      setLoading(true)
      const response = await api.get(`/posts/${slug}`)
      if (response.data.success) {
        setPost(response.data.data)
      }
    } catch (error) {
      console.error('Error fetching post:', error)
      setError(error.response?.data?.error?.message || 'Post not found')
    } finally {
      setLoading(false)
    }
  }

  const fetchRelatedPosts = async () => {
    try {
      const response = await api.get('/posts', { params: { page: 0, size: 3 } })
      if (response.data.success) {
        const posts = (response.data.data.content || []).slice(0, 3)
        setRelatedPosts(posts)
      }
    } catch (error) {
      console.error('Error fetching related posts:', error)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <i className="fas fa-spinner fa-spin text-4xl text-mekong-blue mb-4"></i>
          <p className="text-gray-600">{t('common.loading')}</p>
        </div>
      </div>
    )
  }

  if (error || !post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <i className="fas fa-exclamation-circle text-4xl text-red-500 mb-4"></i>
          <p className="text-gray-600 mb-4">{error || 'Post not found'}</p>
          <Link to="/news" className="text-mekong-blue hover:underline">
            {t('common.backToNews')}
          </Link>
        </div>
      </div>
    )
  }

  const breadcrumbItems = [
    { label: language === 'vi' ? 'Trang chủ' : 'Home', path: '/' },
    { label: language === 'vi' ? 'Tin tức' : 'News', path: '/news' },
    { label: post.title.substring(0, 50) + '...' }
  ]

  const estimateReadingTime = (content) => {
    const wordsPerMinute = 200
    const words = content?.replace(/<[^>]*>/g, '').split(/\s+/).length || 0
    return Math.ceil(words / wordsPerMinute) || 1
  }

  return (
    <div className="news-detail-page">
      {/* Hero */}
      <section className="bg-gradient-mekong py-4">
        <div className="container-custom">
          <Breadcrumb items={breadcrumbItems} />
        </div>
      </section>

      {/* Content */}
      <section className="py-6">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <article className="bg-white rounded-2xl shadow-lg overflow-hidden">
                {/* Featured Image */}
                {post.featuredImageUrl && (
                  <div className="aspect-video bg-gray-200">
                    <img
                      src={post.featuredImageUrl}
                      alt={post.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}

                {/* Content */}
                <div className="p-8">
                  {/* Title */}
                  <h1 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 mb-4">
                    {post.title}
                  </h1>

                  {/* Meta */}
                  <div className="flex items-center gap-6 text-sm text-gray-600 mb-6 pb-6 border-b flex-wrap">
                    <span className="flex items-center gap-2">
                      <i className="far fa-calendar"></i>
                      {new Date(post.publishedAt || post.createdAt).toLocaleDateString(language === 'vi' ? 'vi-VN' : 'en-US')}
                    </span>
                    {post.author && (
                      <span className="flex items-center gap-2">
                        <i className="far fa-user"></i>
                        {post.author.name}
                      </span>
                    )}
                    <span className="flex items-center gap-2">
                      <i className="far fa-eye"></i>
                      {post.viewCount || 0} {language === 'vi' ? 'lượt xem' : 'views'}
                    </span>
                    <span className="flex items-center gap-2">
                      <i className="far fa-clock"></i>
                      {estimateReadingTime(post.content)} {language === 'vi' ? 'phút đọc' : 'min read'}
                    </span>
                  </div>

                  {/* Excerpt */}
                  {post.excerpt && (
                    <div className="text-lg text-gray-700 italic mb-6 pb-6 border-b">
                      {post.excerpt}
                    </div>
                  )}

                  {/* Article Content */}
                  <div 
                    className="prose prose-lg max-w-none"
                    dangerouslySetInnerHTML={{ __html: post.content }}
                  />

                  {/* Share Buttons */}
                  <div className="mt-8 pt-6 border-t">
                    <p className="font-semibold mb-3">{t('news.sharePost')}</p>
                    <div className="flex gap-3">
                      <button className="w-10 h-10 bg-blue-600 text-white rounded-full hover:scale-110 transition-transform">
                        <i className="fab fa-facebook-f"></i>
                      </button>
                      <button className="w-10 h-10 bg-sky-500 text-white rounded-full hover:scale-110 transition-transform">
                        <i className="fab fa-twitter"></i>
                      </button>
                      <button className="w-10 h-10 bg-blue-500 text-white rounded-full hover:scale-110 transition-transform">
                        <i className="fab fa-linkedin-in"></i>
                      </button>
                      <button className="w-10 h-10 bg-gray-700 text-white rounded-full hover:scale-110 transition-transform">
                        <i className="fas fa-link"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              {/* Related Posts */}
              <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24">
                <h3 className="font-bold text-lg mb-4 pb-3 border-b border-mekong-blue">
                  {t('news.relatedPosts')}
                </h3>
                <div className="space-y-4">
                  {relatedPosts.length > 0 ? (
                    relatedPosts.filter(p => p.slug !== slug).map(relatedPost => (
                      <Link
                        key={relatedPost.id}
                        to={`/news/${relatedPost.slug}`}
                        className="flex gap-3 group"
                      >
                        <div className="w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden bg-gray-200">
                          {relatedPost.featuredImageUrl ? (
                            <img
                              src={relatedPost.featuredImageUrl}
                              alt={relatedPost.title}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <i className="fas fa-newspaper text-gray-400"></i>
                            </div>
                          )}
                        </div>
                        <div>
                          <h4 className="font-semibold text-sm line-clamp-2 group-hover:text-mekong-blue transition-colors mb-1">
                            {relatedPost.title}
                          </h4>
                          <p className="text-xs text-gray-500">
                            {new Date(relatedPost.publishedAt || relatedPost.createdAt).toLocaleDateString(language === 'vi' ? 'vi-VN' : 'en-US')}
                          </p>
                        </div>
                      </Link>
                    ))
                  ) : (
                    <p className="text-sm text-gray-500">{t('news.noRelatedPosts')}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default NewsDetail

