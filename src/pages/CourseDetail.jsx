import React, { useState, useEffect } from 'react'
import { useParams, Link, useNavigate, useSearchParams } from 'react-router-dom'
import { useLanguage } from '../i18n/config.jsx'
import { motion } from 'framer-motion'
import Breadcrumb from '../components/common/Breadcrumb'
import courseService from '../services/courseService'
import enrollmentService from '../services/enrollmentService'
import paymentService from '../services/paymentService'
import toast from '../utils/toast'

const CourseDetail = () => {
  const { slug } = useParams()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const { t, language } = useLanguage()
  const [activeTab, setActiveTab] = useState(searchParams.get('tab') || 'overview')
  const [course, setCourse] = useState(null)
  const [curriculum, setCurriculum] = useState([])
  const [loading, setLoading] = useState(true)
  const [curriculumLoading, setCurriculumLoading] = useState(false)
  const [expandedModules, setExpandedModules] = useState({})
  const [enrollment, setEnrollment] = useState(null)

  useEffect(() => {
    const fetchCourseAndEnrollment = async () => {
      try {
        setLoading(true)
        const response = await courseService.getCourseBySlug(slug)
        if (response.success) {
          setCourse(response.data)
          
          // Check if user is enrolled
          const user = localStorage.getItem('user')
          if (user && response.data.id) {
            try {
              const enrollmentResponse = await enrollmentService.getMyEnrollments({ page: 0, size: 100 })
              if (enrollmentResponse.success) {
                const enrollments = enrollmentResponse.data.content || enrollmentResponse.data || []
                const userEnrollment = enrollments.find(e => e.course?.id === response.data.id)
                setEnrollment(userEnrollment || null)
              }
            } catch (err) {
              console.log('Not enrolled or error checking enrollment')
            }
          }
        } else {
          toast.error(language === 'vi' ? 'Không tìm thấy khóa học' : 'Course not found')
          navigate('/courses')
        }
      } catch (error) {
        console.error('Error fetching course:', error)
        toast.error(language === 'vi' ? 'Không thể tải thông tin khóa học' : 'Unable to load course information')
        navigate('/courses')
      } finally {
        setLoading(false)
      }
    }

    fetchCourseAndEnrollment()
  }, [slug, language, navigate])

  // Fetch curriculum when tab is opened
  useEffect(() => {
    if (activeTab === 'curriculum' && course && curriculum.length === 0 && !curriculumLoading) {
      fetchCurriculum()
    }
  }, [activeTab, course])

  const fetchCurriculum = async () => {
    if (!course?.id) return
    
    try {
      setCurriculumLoading(true)
      const response = await courseService.getCourseCurriculum(course.id)
      if (response.success) {
        const modules = response.data || []
        setCurriculum(modules)
        
        // Auto-expand first module
        if (modules.length > 0) {
          setExpandedModules({ [modules[0].id]: true })
        }
      }
    } catch (error) {
      console.error('Error fetching curriculum:', error)
    } finally {
      setCurriculumLoading(false)
    }
  }

  const toggleModule = (moduleId) => {
    setExpandedModules(prev => ({
      ...prev,
      [moduleId]: !prev[moduleId]
    }))
  }

  const getLessonIcon = (type) => {
    const icons = {
      VIDEO: 'fa-play-circle',
      DOCUMENT: 'fa-file-alt',
      QUIZ: 'fa-question-circle',
      ASSIGNMENT: 'fa-tasks',
      LIVE_SESSION: 'fa-video'
    }
    return icons[type] || 'fa-file'
  }

  const formatDuration = (minutes) => {
    if (!minutes) return '0 phút'
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    if (hours > 0) {
      return `${hours}h ${mins}p`
    }
    return `${mins} phút`
  }

  const handleEnroll = async () => {
    const user = localStorage.getItem('user')
    if (!user) {
      toast.info(language === 'vi' ? 'Vui lòng đăng nhập để đăng ký khóa học' : 'Please login to enroll')
      navigate('/login', { state: { from: `/courses/${slug}` } })
      return
    }

    try {
      // If course is free, enroll directly
      if (course.isFree) {
        const response = await enrollmentService.enrollCourse(course.id)
        if (response.success) {
          toast.success(language === 'vi' ? 'Đăng ký thành công! Chúc bạn học tốt!' : 'Enrollment successful! Happy learning!')
          navigate('/profile/my-courses')
        }
      } else {
        // For paid courses:
        // 1. First create enrollment with PENDING status
        const enrollmentResponse = await enrollmentService.enrollCourse(course.id)
        if (!enrollmentResponse.success) {
          throw new Error(enrollmentResponse.message)
        }

        // 2. Then create payment link
        const paymentData = {
          paymentType: 'COURSE_ENROLLMENT',
          referenceId: course.id,
          amount: course.price,
          description: `Thanh toán khóa học: ${course.title}`
        }
        const paymentResponse = await paymentService.createPayment(paymentData)
        if (paymentResponse.success && paymentResponse.data.checkoutUrl) {
          // Redirect to payment page
          // After payment success, webhook will activate the enrollment
          window.location.href = paymentResponse.data.checkoutUrl
        }
      }
    } catch (error) {
      console.error('Enrollment error:', error)
      const message = error.response?.data?.message || (language === 'vi' ? 'Có lỗi xảy ra. Vui lòng thử lại!' : 'An error occurred. Please try again!')
      toast.error(message)
    }
  }

  const handleAddToCart = () => {
    const user = localStorage.getItem('user')
    if (!user) {
      toast.info(language === 'vi' ? 'Vui lòng đăng nhập để thêm vào giỏ hàng' : 'Please login to add to cart')
      navigate('/login', { state: { from: `/courses/${slug}` } })
      return
    }

    // Get existing cart from localStorage
    const cart = JSON.parse(localStorage.getItem('courseCart') || '[]')
    
    // Check if course already in cart
    if (cart.some(item => item.id === course.id)) {
      toast.info(language === 'vi' ? 'Khóa học đã có trong giỏ hàng' : 'Course already in cart')
      navigate('/cart')
      return
    }

    // Add to cart
    cart.push({
      id: course.id,
      title: course.title,
      price: course.price,
      thumbnailUrl: course.thumbnailUrl,
      instructor: course.instructor,
      slug: course.slug
    })
    localStorage.setItem('courseCart', JSON.stringify(cart))
    
    toast.success(language === 'vi' ? 'Đã thêm vào giỏ hàng' : 'Added to cart')
    
    // Show option to go to cart
    setTimeout(() => {
      if (window.confirm(language === 'vi' ? 'Đi đến giỏ hàng để thanh toán?' : 'Go to cart to checkout?')) {
        navigate('/cart')
      }
    }, 500)
  }

  const handleConsultation = () => {
    const state = {
      courseTitle: course?.title,
      topic: 'course_consultation',
      prefilledMessage: language === 'vi' 
        ? `Tôi muốn tư vấn về khóa học: ${course?.title}`
        : `I would like to consult about the course: ${course?.title}`
    }
    navigate('/contact', { state })
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-mekong-blue"></div>
          <p className="text-gray-600 mt-4">{language === 'vi' ? 'Đang tải...' : 'Loading...'}</p>
        </div>
      </div>
    )
  }

  if (!course) {
    return null
  }

  // Use course data from API directly
  const displayCourse = course

  const breadcrumbItems = [
    { label: language === 'vi' ? 'Trang chủ' : 'Home', path: '/' },
    { label: language === 'vi' ? 'Khóa học' : 'Courses', path: '/courses' },
    { label: displayCourse.title }
  ]

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN').format(price) + 'đ'
  }

  const discountPercent = displayCourse.discountPercentage || 
    (displayCourse.originalPrice && displayCourse.price
      ? Math.round(((displayCourse.originalPrice - displayCourse.price) / displayCourse.originalPrice) * 100)
      : 0)

  const tabs = [
    { id: 'overview', icon: 'fa-list', label: language === 'vi' ? 'Tổng quan' : 'Overview' },
    { id: 'curriculum', icon: 'fa-book-open', label: language === 'vi' ? 'Nội dung' : 'Curriculum' },
    { id: 'instructor', icon: 'fa-chalkboard-user', label: language === 'vi' ? 'Giảng viên' : 'Instructor' },
    { id: 'reviews', icon: 'fa-star', label: `${language === 'vi' ? 'Đánh giá' : 'Reviews'} (${displayCourse?.totalReviews || 0})` },
  ]

  return (
    <div className="course-detail-page">
      {/* Hero */}
      <section className="bg-gradient-mekong py-8">
        <div className="container-custom">
          <Breadcrumb items={breadcrumbItems} />
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left: Course Info */}
            <div className="lg:col-span-2">
              {/* Video/Image Preview */}
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8">
                <div className="aspect-video bg-gray-900">
                  {displayCourse.previewVideoUrl ? (
                    <iframe
                      src={displayCourse.previewVideoUrl}
                      title={displayCourse.title}
                      className="w-full h-full"
                      allowFullScreen
                    ></iframe>
                  ) : (
                    <img 
                      src={displayCourse.thumbnailUrl || displayCourse.image} 
                      alt={displayCourse.title}
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
              </div>

              {/* Title & Meta */}
              <div className="mb-8">
                <h1 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 mb-3">
                  {displayCourse.title}
                </h1>
                <p className="text-lg text-gray-700 mb-4">{displayCourse.subtitle || displayCourse.tagline}</p>

                <div className="flex flex-wrap items-center gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <span className="text-yellow-500 text-xl">⭐</span>
                    <span className="font-bold text-lg">{displayCourse.averageRating || displayCourse.rating}</span>
                    <span className="text-gray-600">({displayCourse.totalReviews || displayCourse.reviewsCount} {language === 'vi' ? 'đánh giá' : 'reviews'})</span>
                  </div>
                  <div className="text-gray-600">
                    <i className="fas fa-users"></i> {(displayCourse.totalStudents || displayCourse.studentsCount || 0).toLocaleString()} {language === 'vi' ? 'học viên' : 'students'}
                  </div>
                  <div className="text-gray-600">
                    <i className="far fa-clock"></i> {language === 'vi' ? 'Cập nhật' : 'Updated'}: {new Date(displayCourse.updatedAt || displayCourse.lastUpdated).toLocaleDateString(language === 'vi' ? 'vi-VN' : 'en-US')}
                  </div>
                </div>

                {/* Badges */}
                <div className="flex gap-2 mt-4">
                  {displayCourse.isBestseller && (
                    <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">
                      {language === 'vi' ? 'Bán chạy nhất' : 'Bestseller'}
                    </span>
                  )}
                  {displayCourse.hasCertificate && (
                    <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
                      <i className="fas fa-certificate"></i> {language === 'vi' ? 'Có chứng chỉ' : 'Certificate'}
                    </span>
                  )}
                  {displayCourse.isFree && (
                    <span className="px-3 py-1 bg-rice-green/20 text-rice-green rounded-full text-sm font-semibold">
                      {language === 'vi' ? 'Miễn phí' : 'Free'}
                    </span>
                  )}
                </div>
              </div>

              {/* Tabs */}
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <div className="border-b border-gray-200">
                  <div className="flex overflow-x-auto">
                    {tabs.map(tab => (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex-shrink-0 px-6 py-4 font-semibold transition-colors ${
                          activeTab === tab.id
                            ? 'text-mekong-blue border-b-4 border-mekong-blue'
                            : 'text-gray-600 hover:text-mekong-blue'
                        }`}
                      >
                        <i className={`fas ${tab.icon} mr-2`}></i>
                        {tab.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="p-8">
                  {/* Overview Tab */}
                  {activeTab === 'overview' && (
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-xl font-bold mb-4">{language === 'vi' ? 'Bạn sẽ học được gì?' : 'What You Will Learn'}</h3>
                        {displayCourse.whatYouWillLearn && displayCourse.whatYouWillLearn.length > 0 ? (
                          <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {displayCourse.whatYouWillLearn.map((item, idx) => (
                              <li key={idx} className="flex items-start gap-3">
                                <i className="fas fa-check-circle text-rice-green mt-1"></i>
                                <span className="text-gray-700">{item}</span>
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <div className="text-gray-500 text-center py-8">
                            {language === 'vi' ? 'Nội dung đang được cập nhật' : 'Content is being updated'}
                          </div>
                        )}
                      </div>

                      {displayCourse.requirements && displayCourse.requirements.length > 0 && (
                        <div>
                          <h3 className="text-xl font-bold mb-4">{language === 'vi' ? 'Yêu cầu' : 'Requirements'}</h3>
                          <ul className="space-y-2">
                            {displayCourse.requirements.map((item, idx) => (
                              <li key={idx} className="flex items-start gap-3 text-gray-700">
                                <i className="fas fa-check text-mekong-blue mt-1"></i>
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Curriculum Tab */}
                  {activeTab === 'curriculum' && (
                    <div>
                      {curriculumLoading ? (
                        <div className="text-center py-8">
                          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-mekong-blue"></div>
                          <p className="text-gray-600 mt-2">{language === 'vi' ? 'Đang tải...' : 'Loading...'}</p>
                        </div>
                      ) : curriculum.length === 0 ? (
                        <div className="text-center text-gray-500 py-8">
                          <i className="fas fa-book-open text-4xl mb-4 text-gray-300"></i>
                          <p>{language === 'vi' ? 'Nội dung khóa học đang được cập nhật' : 'Course curriculum is being updated'}</p>
                          <p className="text-sm mt-2">{language === 'vi' ? 'Vui lòng liên hệ để biết thêm chi tiết' : 'Please contact for more details'}</p>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          <div className="flex items-center justify-between mb-4">
                            <h3 className="text-xl font-bold">
                              {language === 'vi' ? 'Chương trình học' : 'Course Curriculum'}
                            </h3>
                            <div className="text-sm text-gray-600">
                              {curriculum.length} {language === 'vi' ? 'module' : 'modules'} · {' '}
                              {curriculum.reduce((sum, m) => sum + (m.lessons?.length || 0), 0)} {language === 'vi' ? 'bài học' : 'lessons'}
                            </div>
                          </div>

                          {curriculum.map((module, index) => (
                            <div key={module.id} className="border border-gray-200 rounded-lg overflow-hidden">
                              {/* Module Header */}
                              <button
                                onClick={() => toggleModule(module.id)}
                                className="w-full bg-gray-50 px-4 py-4 flex items-center justify-between hover:bg-gray-100 transition-colors"
                              >
                                <div className="flex items-center gap-3 flex-1 text-left">
                                  <i className={`fas fa-chevron-${expandedModules[module.id] ? 'down' : 'right'} text-gray-500`}></i>
                                  <div className="flex-1">
                                    <div className="font-semibold text-gray-900">
                                      {language === 'vi' ? 'Module' : 'Module'} {index + 1}: {module.title}
                                    </div>
                                    {module.description && (
                                      <p className="text-sm text-gray-600 mt-1">{module.description}</p>
                                    )}
                                    <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                                      <span>
                                        <i className="fas fa-book mr-1"></i>
                                        {module.lessons?.length || 0} {language === 'vi' ? 'bài học' : 'lessons'}
                                      </span>
                                      <span>
                                        <i className="fas fa-clock mr-1"></i>
                                        {formatDuration(module.durationMinutes)}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </button>

                              {/* Lessons List */}
                              {expandedModules[module.id] && module.lessons && module.lessons.length > 0 && (
                                <div className="bg-white divide-y divide-gray-100">
                                  {module.lessons.map((lesson) => {
                                    // Check if user can access this lesson
                                    const canAccess = lesson.isPreview || lesson.isFree || 
                                                      (enrollment && (enrollment.status === 'ACTIVE' || enrollment.status === 'COMPLETED'))
                                    
                                    const handleLessonClick = () => {
                                      if (!canAccess) {
                                        toast.info(language === 'vi' 
                                          ? 'Vui lòng đăng ký khóa học để xem bài học này'
                                          : 'Please enroll to access this lesson')
                                        return
                                      }
                                      
                                      if (!lesson.contentUrl) {
                                        toast.warning(language === 'vi' 
                                          ? 'Nội dung bài học đang được cập nhật'
                                          : 'Lesson content is being updated')
                                        return
                                      }
                                      
                                      // Open content URL in new tab
                                      window.open(lesson.contentUrl, '_blank')
                                    }
                                    
                                    return (
                                      <div key={lesson.id} className="px-4 py-3 flex items-center justify-between hover:bg-gray-50 transition-colors">
                                        <div className="flex items-center gap-3 flex-1">
                                          <i className={`fas ${getLessonIcon(lesson.type)} text-mekong-blue`}></i>
                                          <div className="flex-1">
                                            <div className="flex items-center gap-2">
                                              <span className="font-medium text-gray-900">{lesson.title}</span>
                                              {lesson.isPreview && (
                                                <span className="px-2 py-0.5 text-xs bg-green-100 text-green-700 rounded">
                                                  {language === 'vi' ? 'Xem trước' : 'Preview'}
                                                </span>
                                              )}
                                              {lesson.isFree && (
                                                <span className="px-2 py-0.5 text-xs bg-blue-100 text-blue-700 rounded">
                                                  {language === 'vi' ? 'Miễn phí' : 'Free'}
                                                </span>
                                              )}
                                            </div>
                                            {lesson.description && (
                                              <p className="text-sm text-gray-600 mt-1">{lesson.description}</p>
                                            )}
                                          </div>
                                        </div>
                                        <div className="flex items-center gap-4 text-sm text-gray-600">
                                          <span className="flex items-center gap-1">
                                            <i className="fas fa-clock"></i>
                                            {formatDuration(lesson.durationMinutes)}
                                          </span>
                                          {canAccess && (
                                            <button 
                                              onClick={handleLessonClick}
                                              className="text-mekong-blue hover:text-blue-700 font-medium transition-colors"
                                            >
                                              <i className="fas fa-play-circle mr-1"></i>
                                              {language === 'vi' ? 'Xem' : 'Watch'}
                                            </button>
                                          )}
                                          {!canAccess && (
                                            <i className="fas fa-lock text-gray-400" title={language === 'vi' ? 'Cần đăng ký' : 'Enrollment required'}></i>
                                          )}
                                        </div>
                                      </div>
                                    )
                                  })}
                                </div>
                              )}

                              {expandedModules[module.id] && (!module.lessons || module.lessons.length === 0) && (
                                <div className="px-4 py-6 text-center text-gray-500 bg-white">
                                  <i className="fas fa-book text-2xl text-gray-300 mb-2"></i>
                                  <p className="text-sm">{language === 'vi' ? 'Chưa có bài học trong module này' : 'No lessons in this module yet'}</p>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                  {/* Instructor Tab */}
                  {activeTab === 'instructor' && displayCourse.instructor && (
                    <div className="flex gap-6">
                      <div className="w-32 h-32 rounded-2xl overflow-hidden flex-shrink-0">
                        <img
                          src={displayCourse.instructor.avatarUrl || displayCourse.instructor.avatar}
                          alt={displayCourse.instructor.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold mb-1">{displayCourse.instructor.name}</h3>
                        <p className="text-mekong-blue font-semibold mb-4">{displayCourse.instructor.title}</p>
                        <p className="text-gray-700 mb-4">{displayCourse.instructor.shortBio || displayCourse.instructor.bio}</p>
                        {displayCourse.instructor.expertise && (
                          <p className="text-sm text-gray-600">
                            <strong>{language === 'vi' ? 'Chuyên môn:' : 'Expertise:'}</strong> {displayCourse.instructor.expertise}
                          </p>
                        )}
                      </div>
                    </div>
                  )}

                  {activeTab === 'instructor' && !displayCourse.instructor && (
                    <div className="text-center text-gray-500 py-8">
                      {language === 'vi' ? 'Thông tin giảng viên đang được cập nhật' : 'Instructor information is being updated'}
                    </div>
                  )}

                  {/* Reviews Tab */}
                  {activeTab === 'reviews' && (
                    <div className="space-y-6">
                      <div className="flex items-center gap-8">
                        <div className="text-center">
                          <div className="text-5xl font-black text-mekong-blue">{displayCourse.averageRating?.toFixed(1) || '0.0'}</div>
                          <div className="text-yellow-500 text-2xl my-2">
                            {[1,2,3,4,5].map(i => (
                              <span key={i}>{i <= Math.floor(displayCourse.averageRating || 0) ? '⭐' : '☆'}</span>
                            ))}
                          </div>
                          <div className="text-gray-600">{displayCourse.totalReviews || 0} {language === 'vi' ? 'đánh giá' : 'reviews'}</div>
                        </div>
                      </div>

                      <div className="border-t pt-6">
                        <p className="text-center text-gray-600">
                          {displayCourse.totalReviews > 0 
                            ? (language === 'vi' ? 'Đánh giá chi tiết sẽ được hiển thị sớm' : 'Detailed reviews will be displayed soon')
                            : (language === 'vi' ? 'Chưa có đánh giá nào. Hãy là người đầu tiên đánh giá!' : 'No reviews yet. Be the first to review!')
                          }
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Right: Pricing Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden sticky top-24">
                {/* Price */}
                <div className="p-6 border-b">
                  {displayCourse.isFree ? (
                    <div className="text-4xl font-black text-rice-green mb-2">
                      {language === 'vi' ? 'MIỄN PHÍ' : 'FREE'}
                    </div>
                  ) : (
                    <>
                      <div className="mb-3">
                        <div className="text-3xl md:text-4xl font-black text-mekong-blue break-words">
                          {formatPrice(displayCourse.price)}
                        </div>
                        {displayCourse.originalPrice && displayCourse.originalPrice > displayCourse.price && (
                          <div className="text-base md:text-lg text-gray-400 line-through mt-1">
                            {formatPrice(displayCourse.originalPrice)}
                          </div>
                        )}
                      </div>
                      {discountPercent > 0 && (
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="px-2 py-1 bg-red-100 text-red-600 text-sm font-bold rounded">
                            -{discountPercent}%
                          </span>
                          <span className="text-sm text-gray-600">
                            {language === 'vi' ? 'Ưu đãi có hạn' : 'Limited offer'}
                          </span>
                        </div>
                      )}
                    </>
                  )}
                </div>

                {/* Course Includes */}
                <div className="p-6 border-b">
                  <h4 className="font-bold mb-4">{language === 'vi' ? 'Khóa học bao gồm:' : 'This course includes:'}</h4>
                  <ul className="space-y-3 text-sm">
                    {[
                      displayCourse.durationHours && { icon: 'fa-clock', text: `${displayCourse.durationHours} ${language === 'vi' ? 'giờ học' : 'hours'}` },
                      displayCourse.totalLessons && { icon: 'fa-file-alt', text: `${displayCourse.totalLessons} ${language === 'vi' ? 'bài giảng' : 'lessons'}` },
                      displayCourse.hasCertificate && { icon: 'fa-certificate', text: language === 'vi' ? 'Chứng chỉ hoàn thành' : 'Certificate of completion' },
                      { icon: 'fa-infinity', text: language === 'vi' ? 'Truy cập trọn đời' : 'Lifetime access' },
                      { icon: 'fa-redo', text: language === 'vi' ? 'Học lại miễn phí' : 'Free retake' },
                      { icon: 'fa-mobile-alt', text: language === 'vi' ? 'Học trên mọi thiết bị' : 'Learn on any device' },
                    ].filter(Boolean).map((item, idx) => (
                      <li key={idx} className="flex items-center gap-3 text-gray-700">
                        <i className={`fas ${item.icon} text-mekong-blue`}></i>
                        <span>{item.text}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA Buttons */}
                <div className="p-6 space-y-3">
                  {enrollment && (enrollment.status === 'ACTIVE' || enrollment.status === 'COMPLETED') ? (
                    /* Already Enrolled - Show Access Button */
                    <div className="space-y-3">
                      <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
                        <i className="fas fa-check-circle text-green-600 text-2xl mb-2"></i>
                        <p className="text-green-700 font-semibold">
                          {language === 'vi' ? 'Bạn đã đăng ký khóa học này' : 'You are enrolled in this course'}
                        </p>
                        {enrollment.progressPercentage > 0 && (
                          <p className="text-sm text-green-600 mt-1">
                            {language === 'vi' ? 'Tiến độ: ' : 'Progress: '}
                            {enrollment.progressPercentage}%
                          </p>
                        )}
                      </div>
                      <button
                        onClick={() => setActiveTab('curriculum')}
                        className="btn btn-primary w-full justify-center"
                      >
                        <i className="fas fa-play mr-2"></i>
                        {language === 'vi' ? 'Vào học ngay' : 'Start Learning'}
                      </button>
                    </div>
                  ) : enrollment && enrollment.status === 'PENDING' ? (
                    /* Pending Payment */
                    <div className="space-y-3">
                      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-center">
                        <i className="fas fa-clock text-yellow-600 text-2xl mb-2"></i>
                        <p className="text-yellow-700 font-semibold">
                          {language === 'vi' ? 'Chờ thanh toán' : 'Pending Payment'}
                        </p>
                        <p className="text-sm text-yellow-600 mt-1">
                          {language === 'vi' ? 'Vui lòng hoàn tất thanh toán' : 'Please complete payment'}
                        </p>
                      </div>
                      <button 
                        onClick={handleEnroll}
                        className="btn btn-primary w-full justify-center"
                      >
                        <i className="fas fa-credit-card"></i>
                        {language === 'vi' ? 'Thanh toán ngay' : 'Pay Now'}
                      </button>
                    </div>
                  ) : (
                    /* Not Enrolled - Show Purchase Options */
                    <>
                      <button 
                        onClick={handleEnroll}
                        className="btn btn-primary w-full justify-center"
                      >
                        <i className="fas fa-shopping-cart"></i>
                        {language === 'vi' ? 'Đăng ký ngay' : 'Enroll Now'}
                      </button>
                      {!displayCourse.isFree && (
                        <button 
                          onClick={handleAddToCart}
                          className="btn btn-secondary w-full justify-center"
                        >
                          <i className="fas fa-cart-plus"></i>
                          {language === 'vi' ? 'Thêm vào giỏ' : 'Add to Cart'}
                        </button>
                      )}
                      <button 
                        onClick={handleConsultation}
                        className="btn btn-outline w-full justify-center"
                      >
                        <i className="fas fa-phone"></i>
                        {language === 'vi' ? 'Tư vấn miễn phí' : 'Free Consultation'}
                      </button>
                    </>
                  )}
                </div>

                {/* Guarantees */}
                <div className="px-6 pb-6 space-y-2 text-sm">
                  {[
                    { icon: 'fa-shield-alt', text: language === 'vi' ? 'Hoàn tiền 30 ngày' : '30-day money back' },
                    { icon: 'fa-check-circle', text: language === 'vi' ? 'Cam kết chất lượng' : 'Quality guaranteed' },
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-gray-700">
                      <i className={`fas ${item.icon} text-rice-green`}></i>
                      <span>{item.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default CourseDetail

