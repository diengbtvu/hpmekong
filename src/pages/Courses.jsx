import React, { useState, useEffect } from 'react'
import { useLanguage } from '../i18n/config.jsx'
import { motion } from 'framer-motion'
import CourseCard from '../components/common/CourseCard'
import { CENTERS } from '../utils/constants'
import api from '../services/api'

const Courses = () => {
  const { t, language } = useLanguage()
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCenter, setSelectedCenter] = useState('all')
  const [selectedLevel, setSelectedLevel] = useState('all')
  const [selectedType, setSelectedType] = useState('all')
  const [sortBy, setSortBy] = useState('newest')
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const pageSize = 12 // 12 courses per page (4x3 grid)

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await api.get('/courses', {
          params: {
            page: currentPage - 1,
            size: pageSize
          }
        })
        
        if (response.data.success) {
          const data = response.data.data
          setCourses(data.content || [])
          setTotalPages(data.totalPages || 1)
        }
      } catch (error) {
        console.error('Error fetching courses:', error)
        setCourses([])
      } finally {
        setLoading(false)
      }
    }

    fetchCourses()
  }, [language, currentPage])

  // Mock data - ONLY for reference, NOT used in production
  const mockCoursesReference = [
    {
      id: 1,
      slug: 'ky-nang-giao-tiep-chuyen-nghiep',
      title: language === 'vi' ? 'Kỹ năng giao tiếp chuyên nghiệp' : 'Professional Communication Skills',
      description: language === 'vi' ? 'Khóa học giúp bạn nắm vững nghệ thuật giao tiếp hiệu quả trong môi trường công sở' : 'Master the art of effective communication in professional environments',
      price: 2000000,
      discountPrice: 1500000,
      image: 'https://images.unsplash.com/photo-1553028826-f4804a6dba3b?w=800&q=80',
      instructor: {
        name: 'Nguyễn Văn A',
        avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80'
      },
      rating: 4.9,
      reviewsCount: 234,
      studentsCount: 1245,
      duration: 8,
      lessonsCount: 24,
      type: 'online',
      level: 'beginner',
      centerId: 1,
      isBestseller: true,
      isNew: false,
      isFree: false,
      hasCertificate: true
    },
    {
      id: 2,
      slug: 'khoi-nghiep-trong-ky-nguyen-so',
      title: language === 'vi' ? 'Khởi nghiệp trong kỷ nguyên số' : 'Digital Entrepreneurship',
      price: 5000000,
      discountPrice: 3500000,
      image: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800&q=80',
      instructor: {
        name: 'Trần Thị B',
        avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80'
      },
      rating: 5.0,
      reviewsCount: 156,
      studentsCount: 678,
      duration: 12,
      lessonsCount: 36,
      type: 'hybrid',
      level: 'intermediate',
      centerId: 3,
      isBestseller: true,
      isNew: true,
      hasCertificate: true
    },
    {
      id: 3,
      slug: 'huong-nghiep-toan-dien',
      title: language === 'vi' ? 'Hướng nghiệp toàn diện cho học sinh THPT' : 'Comprehensive Career Guidance for High School',
      price: 0,
      image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&q=80',
      instructor: {
        name: 'Lê Văn C',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80'
      },
      rating: 4.7,
      reviewsCount: 89,
      studentsCount: 2340,
      duration: 4,
      lessonsCount: 12,
      type: 'online',
      level: 'beginner',
      centerId: 2,
      isNew: true,
      isFree: true,
      hasCertificate: false
    },
    // Add more mock courses as needed
  ]

  const filteredCourses = courses.filter(course => {
    if (selectedCenter !== 'all' && course.centerId !== parseInt(selectedCenter)) return false
    if (selectedLevel !== 'all' && course.level !== selectedLevel) return false
    if (selectedType !== 'all' && course.type !== selectedType) return false
    if (searchQuery && !course.title.toLowerCase().includes(searchQuery.toLowerCase())) return false
    return true
  })

  return (
    <div className="courses-page">
      {/* Hero Banner */}
      <section className="relative bg-gradient-mekong py-12 md:py-16">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-text-primary mb-4">
              {t('courses.title')}
            </h1>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto">
              {language === 'vi' 
                ? 'Khám phá hàng trăm khóa học chất lượng cao từ các chuyên gia hàng đầu'
                : 'Explore hundreds of high-quality courses from leading experts'}
            </p>
          </motion.div>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="max-w-2xl mx-auto"
          >
            <div className="bg-white rounded-xl shadow-lg p-2 flex items-center gap-2">
              <i className="fas fa-magnifying-glass text-gray-400 ml-3"></i>
              <input
                type="search"
                placeholder={t('courses.searchPlaceholder')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 py-3 px-2 outline-none"
              />
              <button className="btn btn-primary">
                {t('common.search')}
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Filters & Courses Grid */}
      <section className="py-12">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar Filters */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-md p-6 sticky top-24">
                <h3 className="font-bold text-lg mb-4">{t('courses.filterBy')}</h3>

                {/* By Center */}
                <div className="mb-6">
                  <label className="block font-semibold text-sm mb-2">{t('courses.byCenters')}</label>
                  <select
                    value={selectedCenter}
                    onChange={(e) => setSelectedCenter(e.target.value)}
                    className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:border-mekong-blue outline-none"
                  >
                    <option value="all">{t('courses.allCourses')}</option>
                    {CENTERS.map(center => (
                      <option key={center.id} value={center.id}>{center.name}</option>
                    ))}
                  </select>
                </div>

                {/* By Level */}
                <div className="mb-6">
                  <label className="block font-semibold text-sm mb-2">{t('courses.byLevel')}</label>
                  <select
                    value={selectedLevel}
                    onChange={(e) => setSelectedLevel(e.target.value)}
                    className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:border-mekong-blue outline-none"
                  >
                    <option value="all">{language === 'vi' ? 'Tất cả' : 'All'}</option>
                    <option value="beginner">{language === 'vi' ? 'Cơ bản' : 'Beginner'}</option>
                    <option value="intermediate">{language === 'vi' ? 'Trung cấp' : 'Intermediate'}</option>
                    <option value="advanced">{language === 'vi' ? 'Nâng cao' : 'Advanced'}</option>
                  </select>
                </div>

                {/* By Type */}
                <div className="mb-6">
                  <label className="block font-semibold text-sm mb-2">{t('courses.byType')}</label>
                  <select
                    value={selectedType}
                    onChange={(e) => setSelectedType(e.target.value)}
                    className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:border-mekong-blue outline-none"
                  >
                    <option value="all">{language === 'vi' ? 'Tất cả' : 'All'}</option>
                    <option value="online">{t('courses.online')}</option>
                    <option value="offline">{t('courses.offline')}</option>
                    <option value="hybrid">{language === 'vi' ? 'Kết hợp' : 'Hybrid'}</option>
                  </select>
                </div>

                {/* Clear Filters */}
                <button
                  onClick={() => {
                    setSelectedCenter('all')
                    setSelectedLevel('all')
                    setSelectedType('all')
                    setSearchQuery('')
                  }}
                  className="w-full btn btn-outline btn-sm"
                >
                  {t('courses.clearFilters')}
                </button>
              </div>
            </div>

            {/* Courses Grid */}
            <div className="lg:col-span-3">
              {/* Sort & Result Count */}
              <div className="flex items-center justify-between mb-6">
                <p className="text-gray-600">
                  {language === 'vi' ? 'Tìm thấy' : 'Found'} <span className="font-bold">{filteredCourses.length}</span> {language === 'vi' ? 'khóa học' : 'courses'}
                </p>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-mekong-blue outline-none"
                >
                  <option value="newest">{t('courses.newest')}</option>
                  <option value="popular">{t('courses.popular')}</option>
                  <option value="priceLow">{t('courses.priceLowToHigh')}</option>
                  <option value="priceHigh">{t('courses.priceHighToLow')}</option>
                  <option value="rating">{t('courses.highestRated')}</option>
                </select>
              </div>

              {/* Courses Grid */}
              {loading ? (
                <div className="text-center py-12">
                  <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-mekong-blue"></div>
                  <p className="text-gray-600 mt-4">{language === 'vi' ? 'Đang tải...' : 'Loading...'}</p>
                </div>
              ) : filteredCourses.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filteredCourses.map((course, index) => (
                    <CourseCard key={course.id} course={course} index={index} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <i className="fas fa-search text-6xl text-gray-300 mb-4"></i>
                  <p className="text-gray-600 text-lg">
                    {t('common.noResults')}
                  </p>
                </div>
              )}

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center mt-12">
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                      disabled={currentPage === 1}
                      className={`w-10 h-10 rounded-lg border-2 transition-colors flex items-center justify-center ${
                        currentPage === 1
                          ? 'border-gray-200 text-gray-400 cursor-not-allowed'
                          : 'border-gray-300 hover:border-mekong-blue hover:text-mekong-blue'
                      }`}
                    >
                      <i className="fas fa-chevron-left"></i>
                    </button>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`w-10 h-10 rounded-lg border-2 transition-colors flex items-center justify-center font-semibold ${
                          page === currentPage
                            ? 'bg-gradient-blue text-white border-transparent' 
                            : 'border-gray-300 hover:border-mekong-blue hover:text-mekong-blue'
                        }`}
                      >
                        {page}
                      </button>
                    ))}
                    <button 
                      onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                      disabled={currentPage === totalPages}
                      className={`w-10 h-10 rounded-lg border-2 transition-colors flex items-center justify-center ${
                        currentPage === totalPages
                          ? 'border-gray-200 text-gray-400 cursor-not-allowed'
                          : 'border-gray-300 hover:border-mekong-blue hover:text-mekong-blue'
                      }`}
                    >
                      <i className="fas fa-chevron-right"></i>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Courses

