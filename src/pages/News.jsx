import React, { useState, useEffect } from 'react'
import { useLanguage } from '../i18n/config.jsx'
import { motion } from 'framer-motion'
import NewsCard from '../components/common/NewsCard'
import api from '../services/api'

const News = () => {
  const { t, language } = useLanguage()
  const [activeCategory, setActiveCategory] = useState('all')
  const [news, setNews] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const pageSize = 9 // 9 posts per page (3x3 grid)

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch both news and categories in parallel
        const [newsResponse, categoriesResponse] = await Promise.all([
          api.get('/posts', {
            params: {
              page: currentPage - 1, // API uses 0-based index
              size: pageSize
            }
          }),
          api.get('/post-categories')
        ])
        
        if (newsResponse.data.success) {
          const data = newsResponse.data.data
          setNews(data.content || [])
          setTotalPages(data.totalPages || 1)
        }
        
        if (categoriesResponse.data.success) {
          const dbCategories = categoriesResponse.data.data || []
          // Add "All" category at the beginning
          const allCategories = [
            { id: null, name: language === 'vi' ? 'Tất cả' : 'All', slug: 'all' },
            ...dbCategories
          ]
          console.log('Categories loaded:', allCategories)
          setCategories(allCategories)
        }
      } catch (error) {
        console.error('Error fetching data:', error)
        setNews([])
        // Fallback categories if API fails
        setCategories([
          { id: null, name: language === 'vi' ? 'Tất cả' : 'All', slug: 'all' },
          { slug: 'activities', name: language === 'vi' ? 'Tin hoạt động' : 'Activities' },
          { slug: 'recruitment', name: language === 'vi' ? 'Tuyển dụng' : 'Recruitment' },
          { slug: 'events', name: language === 'vi' ? 'Sự kiện' : 'Events' },
        ])
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [language, currentPage, activeCategory])

  // Reset to page 1 when category changes
  useEffect(() => {
    setCurrentPage(1)
  }, [activeCategory])

  // Mock news data - ONLY for reference, NOT used
  const mockNewsReference = [
    {
      id: 1,
      slug: 'hop-tac-dai-hoc-can-tho-2025',
      title: language === 'vi' 
        ? '🤝 Happy World Mekong ký kết hợp tác với Đại học Cần Thơ'
        : '🤝 Happy World Mekong signs partnership with Can Tho University',
      excerpt: language === 'vi'
        ? 'Ngày 15/10/2025, Happy World Mekong và Đại học Cần Thơ đã chính thức ký kết biên bản ghi nhớ hợp tác chiến lược, mở ra giai đoạn hợp tác toàn diện...'
        : 'On October 15, 2025, Happy World Mekong and Can Tho University officially signed a strategic partnership MOU...',
      image: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800&q=80',
      category: 'activities',
      categoryName: language === 'vi' ? 'Tin hoạt động' : 'Activities',
      publishedAt: '2025-10-15',
      author: 'Admin',
      views: 1234
    },
    {
      id: 2,
      slug: 'khai-giang-khoa-ky-nang-khoi-nghiep',
      title: language === 'vi'
        ? '🎉 Khai giảng khóa học "Kỹ năng khởi nghiệp trong kỷ nguyên số"'
        : '🎉 Opening of "Entrepreneurship Skills in Digital Era" course',
      excerpt: language === 'vi'
        ? 'Sáng ngày 10/10/2025, khóa học Kỹ năng khởi nghiệp đã chính thức khai giảng với sự tham gia của 200 sinh viên...'
        : 'On October 10, 2025, the Entrepreneurship Skills course officially opened with 200 students...',
      image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&q=80',
      category: 'activities',
      categoryName: language === 'vi' ? 'Tin hoạt động' : 'Activities',
      publishedAt: '2025-10-10',
      author: 'Admin',
      views: 856
    },
    {
      id: 3,
      slug: 'tuyen-dung-giang-vien-ky-nang',
      title: language === 'vi'
        ? '📢 Tuyển dụng Giảng viên Kỹ năng mềm - Mức lương hấp dẫn'
        : '📢 Hiring Soft Skills Lecturers - Attractive Salary',
      excerpt: language === 'vi'
        ? 'Happy World Mekong đang tìm kiếm các giảng viên tài năng, nhiệt huyết để gia nhập đội ngũ...'
        : 'Happy World Mekong is looking for talented, passionate lecturers to join our team...',
      image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80',
      category: 'recruitment',
      categoryName: language === 'vi' ? 'Tuyển dụng' : 'Recruitment',
      publishedAt: '2025-10-05',
      author: 'HR Team',
      views: 2340
    },
  ]

  // Note: Filtering is now handled by backend via category query param
  // For now we filter client-side, but should move to backend for better performance
  const filteredNews = activeCategory === 'all'
    ? news
    : news.filter(post => post.category?.slug === activeCategory)

  // Generate page numbers for pagination
  const getPageNumbers = () => {
    const pages = []
    const maxVisiblePages = 5
    
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) pages.push(i)
        pages.push('...')
        pages.push(totalPages)
      } else if (currentPage >= totalPages - 2) {
        pages.push(1)
        pages.push('...')
        for (let i = totalPages - 3; i <= totalPages; i++) pages.push(i)
      } else {
        pages.push(1)
        pages.push('...')
        for (let i = currentPage - 1; i <= currentPage + 1; i++) pages.push(i)
        pages.push('...')
        pages.push(totalPages)
      }
    }
    return pages
  }

  return (
    <div className="news-page">
      {/* Hero */}
      <section className="bg-gradient-mekong py-16 md:py-20">
        <div className="container-custom text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-heading font-bold mb-4"
          >
            {t('news.title')}
          </motion.h1>
        </div>
      </section>

      {/* Content */}
      <section className="py-12">
        <div className="container-custom">
          {/* Categories Tabs */}
          <div className="flex items-center gap-3 mb-8 overflow-x-auto pb-2">
            {categories && categories.length > 0 ? categories.map(cat => {
              // Ensure cat is an object with required properties
              if (!cat || typeof cat !== 'object' || !cat.slug || !cat.name) {
                console.error('Invalid category:', cat)
                return null
              }
              return (
                <button
                  key={cat.slug}
                  onClick={() => setActiveCategory(cat.slug)}
                  className={`px-6 py-3 rounded-lg font-semibold whitespace-nowrap transition-all ${
                    activeCategory === cat.slug
                      ? 'bg-gradient-blue text-white shadow-lg'
                      : 'bg-white text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {cat.icon && <i className={`fas ${cat.icon} mr-2`}></i>}
                  {cat.name}
                </button>
              )
            }) : (
              <div className="text-gray-500">Loading categories...</div>
            )}
          </div>

          {/* News Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredNews.map((post, index) => (
              <NewsCard key={post.id} post={post} index={index} />
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-12">
              <div className="flex items-center gap-2">
                {/* Previous Button */}
                <button 
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                  className={`w-10 h-10 rounded-lg border-2 transition-colors flex items-center justify-center ${
                    currentPage === 1 
                      ? 'border-gray-200 text-gray-400 cursor-not-allowed' 
                      : 'border-gray-300 hover:border-mekong-blue text-gray-700'
                  }`}
                >
                  <i className="fas fa-chevron-left"></i>
                </button>

                {/* Page Numbers */}
                {getPageNumbers().map((page, index) => (
                  page === '...' ? (
                    <span key={`ellipsis-${index}`} className="px-2 text-gray-500">...</span>
                  ) : (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`w-10 h-10 rounded-lg transition-all font-semibold ${
                        page === currentPage
                          ? 'bg-gradient-blue text-white shadow-lg'
                          : 'border-2 border-gray-300 hover:border-mekong-blue text-gray-700'
                      }`}
                    >
                      {page}
                    </button>
                  )
                ))}

                {/* Next Button */}
                <button 
                  onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                  disabled={currentPage === totalPages}
                  className={`w-10 h-10 rounded-lg border-2 transition-colors flex items-center justify-center ${
                    currentPage === totalPages
                      ? 'border-gray-200 text-gray-400 cursor-not-allowed'
                      : 'border-gray-300 hover:border-mekong-blue text-gray-700'
                  }`}
                >
                  <i className="fas fa-chevron-right"></i>
                </button>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

export default News

