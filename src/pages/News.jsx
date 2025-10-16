import { useState } from 'react'
import { useLanguage } from '../i18n/config.jsx'
import { motion } from 'framer-motion'
import NewsCard from '../components/common/NewsCard'

const News = () => {
  const { t, language } = useLanguage()
  const [activeCategory, setActiveCategory] = useState('all')

  // Mock news data - lấy images từ web gốc
  const mockNews = [
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

  const categories = [
    { id: 'all', name: language === 'vi' ? 'Tất cả' : 'All' },
    { id: 'activities', name: language === 'vi' ? 'Tin hoạt động' : 'Activities' },
    { id: 'recruitment', name: language === 'vi' ? 'Tuyển dụng' : 'Recruitment' },
    { id: 'events', name: language === 'vi' ? 'Sự kiện' : 'Events' },
  ]

  const filteredNews = activeCategory === 'all'
    ? mockNews
    : mockNews.filter(post => post.category === activeCategory)

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
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-6 py-3 rounded-lg font-semibold whitespace-nowrap transition-all ${
                  activeCategory === cat.id
                    ? 'bg-gradient-blue text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* News Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredNews.map((post, index) => (
              <NewsCard key={post.id} post={post} index={index} />
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center mt-12">
            <div className="flex items-center gap-2">
              <button className="w-10 h-10 rounded-lg border-2 border-gray-300 hover:border-mekong-blue transition-colors flex items-center justify-center">
                <i className="fas fa-chevron-left"></i>
              </button>
              {[1, 2, 3].map(page => (
                <button
                  key={page}
                  className={`w-10 h-10 rounded-lg transition-all font-semibold ${
                    page === 1
                      ? 'bg-gradient-blue text-white'
                      : 'border-2 border-gray-300 hover:border-mekong-blue'
                  }`}
                >
                  {page}
                </button>
              ))}
              <button className="w-10 h-10 rounded-lg border-2 border-gray-300 hover:border-mekong-blue transition-colors flex items-center justify-center">
                <i className="fas fa-chevron-right"></i>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default News

