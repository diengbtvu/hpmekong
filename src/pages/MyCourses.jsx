import React, { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useLanguage } from '../i18n/config.jsx'
import { motion } from 'framer-motion'
import enrollmentService from '../services/enrollmentService'
import Breadcrumb from '../components/common/Breadcrumb'
import toast from '../utils/toast'

const MyCourses = () => {
  const { language } = useLanguage()
  const navigate = useNavigate()
  const [enrollments, setEnrollments] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeFilter, setActiveFilter] = useState('ALL') // ALL, ACTIVE, COMPLETED, PENDING

  useEffect(() => {
    checkAuth()
    fetchEnrollments()
  }, [])

  const checkAuth = () => {
    const user = localStorage.getItem('user')
    if (!user) {
      toast.info(language === 'vi' ? 'Vui lòng đăng nhập để xem khóa học của bạn' : 'Please login to view your courses')
      navigate('/login', { state: { from: '/profile/my-courses' } })
    }
  }

  const fetchEnrollments = async () => {
    try {
      setLoading(true)
      const response = await enrollmentService.getMyEnrollments({ page: 0, size: 100 })
      if (response.success) {
        const data = response.data.content || response.data
        setEnrollments(Array.isArray(data) ? data : [])
      }
    } catch (error) {
      console.error('Error fetching enrollments:', error)
      toast.error(language === 'vi' ? 'Không thể tải danh sách khóa học' : 'Unable to load courses')
    } finally {
      setLoading(false)
    }
  }

  const filteredEnrollments = enrollments.filter(enrollment => {
    if (activeFilter === 'ALL') return true
    return enrollment.status === activeFilter
  })

  const getStatusBadge = (status) => {
    const badges = {
      ACTIVE: { 
        color: 'bg-green-100 text-green-700',
        icon: 'fa-play-circle',
        text: language === 'vi' ? 'Đang học' : 'Active'
      },
      COMPLETED: { 
        color: 'bg-blue-100 text-blue-700',
        icon: 'fa-check-circle',
        text: language === 'vi' ? 'Hoàn thành' : 'Completed'
      },
      PENDING: { 
        color: 'bg-yellow-100 text-yellow-700',
        icon: 'fa-clock',
        text: language === 'vi' ? 'Chờ thanh toán' : 'Pending'
      },
      CANCELLED: { 
        color: 'bg-red-100 text-red-700',
        icon: 'fa-times-circle',
        text: language === 'vi' ? 'Đã hủy' : 'Cancelled'
      },
      EXPIRED: { 
        color: 'bg-gray-100 text-gray-700',
        icon: 'fa-ban',
        text: language === 'vi' ? 'Hết hạn' : 'Expired'
      }
    }
    return badges[status] || badges.PENDING
  }

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price)
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString(language === 'vi' ? 'vi-VN' : 'en-US')
  }

  const breadcrumbItems = [
    { label: language === 'vi' ? 'Trang chủ' : 'Home', path: '/' },
    { label: language === 'vi' ? 'Khóa học của tôi' : 'My Courses' }
  ]

  const filterOptions = [
    { value: 'ALL', label: language === 'vi' ? 'Tất cả' : 'All', count: enrollments.length },
    { value: 'ACTIVE', label: language === 'vi' ? 'Đang học' : 'Active', count: enrollments.filter(e => e.status === 'ACTIVE').length },
    { value: 'COMPLETED', label: language === 'vi' ? 'Hoàn thành' : 'Completed', count: enrollments.filter(e => e.status === 'COMPLETED').length },
    { value: 'PENDING', label: language === 'vi' ? 'Chờ thanh toán' : 'Pending', count: enrollments.filter(e => e.status === 'PENDING').length }
  ]

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-mekong-blue mb-4"></div>
          <p className="text-gray-600">{language === 'vi' ? 'Đang tải...' : 'Loading...'}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Breadcrumb items={breadcrumbItems} />

      {/* Header */}
      <section className="py-12 bg-gradient-to-r from-mekong-blue to-blue-600 text-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">
              {language === 'vi' ? 'Khóa học của tôi' : 'My Courses'}
            </h1>
            <p className="text-lg md:text-xl opacity-90">
              {language === 'vi' 
                ? `Bạn có ${enrollments.length} khóa học`
                : `You have ${enrollments.length} courses`
              }
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-6 bg-white border-b sticky top-0 z-10">
        <div className="container-custom">
          <div className="flex flex-wrap gap-3 justify-center">
            {filterOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => setActiveFilter(option.value)}
                className={`px-6 py-2 rounded-full font-semibold transition-all ${
                  activeFilter === option.value
                    ? 'bg-mekong-blue text-white shadow-lg scale-105'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {option.label}
                {option.count > 0 && (
                  <span className={`ml-2 px-2 py-0.5 text-xs rounded-full ${
                    activeFilter === option.value
                      ? 'bg-white text-mekong-blue'
                      : 'bg-gray-200 text-gray-600'
                  }`}>
                    {option.count}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Courses Grid */}
      <section className="py-12">
        <div className="container-custom">
          {filteredEnrollments.length === 0 ? (
            /* Empty State */
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-16"
            >
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <i className="fas fa-book-reader text-4xl text-gray-400"></i>
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                {language === 'vi' ? 'Chưa có khóa học' : 'No courses yet'}
              </h3>
              <p className="text-gray-600 mb-8">
                {language === 'vi' 
                  ? 'Khám phá và đăng ký khóa học để bắt đầu học tập'
                  : 'Explore and enroll in courses to start learning'
                }
              </p>
              <button
                onClick={() => navigate('/courses')}
                className="btn btn-primary"
              >
                <i className="fas fa-search mr-2"></i>
                {language === 'vi' ? 'Khám phá khóa học' : 'Explore Courses'}
              </button>
            </motion.div>
          ) : (
            /* Courses Grid */
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredEnrollments.map((enrollment, index) => {
                const course = enrollment.course || {}
                const badge = getStatusBadge(enrollment.status)
                
                return (
                  <motion.div
                    key={enrollment.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow"
                  >
                    {/* Thumbnail */}
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={course.thumbnailUrl || '/placeholder-course.jpg'}
                        alt={course.title}
                        className="w-full h-full object-cover"
                      />
                      {/* Status Badge */}
                      <div className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-semibold ${badge.color}`}>
                        <i className={`fas ${badge.icon} mr-1`}></i>
                        {badge.text}
                      </div>
                      {/* Certificate Badge */}
                      {enrollment.certificateIssued && (
                        <div className="absolute top-3 left-3 bg-purple-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                          <i className="fas fa-certificate mr-1"></i>
                          {language === 'vi' ? 'Chứng chỉ' : 'Certified'}
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <h3 className="font-semibold text-lg mb-2 line-clamp-2 hover:text-mekong-blue">
                        <Link to={`/courses/${course.slug}`}>
                          {course.title}
                        </Link>
                      </h3>

                      {/* Instructor */}
                      {course.instructor && (
                        <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                          <i className="fas fa-user-tie"></i>
                          <span>{course.instructor.fullName || course.instructor.name}</span>
                        </div>
                      )}

                      {/* Progress */}
                      {enrollment.status === 'ACTIVE' || enrollment.status === 'COMPLETED' ? (
                        <div className="mb-4">
                          <div className="flex justify-between text-sm mb-1">
                            <span className="text-gray-600">
                              {language === 'vi' ? 'Tiến độ' : 'Progress'}
                            </span>
                            <span className="font-semibold text-mekong-blue">
                              {enrollment.progressPercentage || 0}%
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-mekong-blue h-2 rounded-full transition-all duration-300"
                              style={{ width: `${enrollment.progressPercentage || 0}%` }}
                            ></div>
                          </div>
                          <div className="flex justify-between text-xs text-gray-500 mt-1">
                            <span>
                              {enrollment.completedLessons || 0}/{enrollment.totalLessons || 0} {language === 'vi' ? 'bài học' : 'lessons'}
                            </span>
                            {enrollment.completedAt && (
                              <span>
                                {language === 'vi' ? 'Hoàn thành: ' : 'Completed: '}
                                {formatDate(enrollment.completedAt)}
                              </span>
                            )}
                          </div>
                        </div>
                      ) : (
                        /* Enrollment Info */
                        <div className="mb-4 text-sm text-gray-600">
                          <p>
                            <i className="fas fa-calendar mr-2"></i>
                            {language === 'vi' ? 'Đăng ký: ' : 'Enrolled: '}
                            {formatDate(enrollment.enrolledAt)}
                          </p>
                          {enrollment.amountPaid > 0 && (
                            <p className="mt-1">
                              <i className="fas fa-money-bill-wave mr-2"></i>
                              {formatPrice(enrollment.amountPaid)}
                            </p>
                          )}
                        </div>
                      )}

                      {/* Actions */}
                      <div className="flex gap-2">
                        {enrollment.status === 'PENDING' ? (
                          <button
                            onClick={() => navigate(`/courses/${course.slug}`)}
                            className="btn btn-primary flex-1 justify-center text-sm"
                          >
                            <i className="fas fa-credit-card mr-2"></i>
                            {language === 'vi' ? 'Thanh toán' : 'Pay Now'}
                          </button>
                        ) : (
                          <>
                            <Link
                              to={`/courses/${course.slug}?tab=curriculum`}
                              className="btn btn-primary flex-1 justify-center text-sm"
                            >
                              <i className="fas fa-play mr-2"></i>
                              {language === 'vi' ? 'Học tiếp' : 'Continue'}
                            </Link>
                            {enrollment.certificateIssued && (
                              <button
                                className="btn btn-outline text-sm"
                                title={language === 'vi' ? 'Tải chứng chỉ' : 'Download Certificate'}
                              >
                                <i className="fas fa-download"></i>
                              </button>
                            )}
                          </>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

export default MyCourses
