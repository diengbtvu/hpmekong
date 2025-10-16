import { useParams, Link } from 'react-router-dom'
import { useState } from 'react'
import { useLanguage } from '../i18n/config.jsx'
import { motion } from 'framer-motion'
import Breadcrumb from '../components/common/Breadcrumb'

const CourseDetail = () => {
  const { slug } = useParams()
  const { t, language } = useLanguage()
  const [activeTab, setActiveTab] = useState('overview')

  // Mock course data
  const course = {
    id: 1,
    slug: slug,
    title: language === 'vi' ? 'Kỹ năng Giao tiếp Chuyên nghiệp' : 'Professional Communication Skills',
    tagline: language === 'vi' ? 'Làm chủ nghệ thuật giao tiếp hiệu quả' : 'Master the art of effective communication',
    price: 2000000,
    discountPrice: 1500000,
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1200&q=80',
    videoPreview: 'https://www.youtube.com/embed/sCJunphEExA',
    rating: 4.9,
    reviewsCount: 234,
    studentsCount: 1245,
    level: 'beginner',
    duration: 8,
    lessonsCount: 24,
    language: 'Vietnamese',
    hasCertificate: true,
    lastUpdated: '2025-10-15',
    instructor: {
      id: 1,
      name: 'Nguyễn Văn An',
      title: 'Tiến sĩ, Giảng viên cao cấp',
      avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80',
      bio: language === 'vi'
        ? 'Tiến sĩ Nguyễn Văn An có hơn 15 năm kinh nghiệm giảng dạy và tư vấn doanh nghiệp.'
        : 'Dr. Nguyen Van An has over 15 years of teaching and business consulting experience.',
      expertise: language === 'vi' ? 'Kỹ năng giao tiếp, Lãnh đạo' : 'Communication Skills, Leadership'
    },
    whatYouWillLearn: language === 'vi' ? [
      'Nắm vững các nguyên tắc giao tiếp hiệu quả',
      'Xây dựng mối quan hệ tốt với đồng nghiệp và cấp trên',
      'Thuyết trình tự tin trước đám đông',
      'Giải quyết xung đột một cách khéo léo',
      'Lắng nghe chủ động và thấu hiểu',
    ] : [
      'Master effective communication principles',
      'Build good relationships with colleagues and superiors',
      'Present confidently in public',
      'Resolve conflicts skillfully',
      'Active listening and empathy',
    ],
    requirements: language === 'vi' ? [
      'Không yêu cầu kiến thức trước',
      'Laptop/máy tính để học online',
      'Tinh thần học hỏi và thực hành',
    ] : [
      'No prior knowledge required',
      'Laptop/computer for online learning',
      'Willingness to learn and practice',
    ],
    curriculum: [
      {
        module: language === 'vi' ? 'Module 1: Nền tảng giao tiếp' : 'Module 1: Communication Fundamentals',
        duration: '2h 30p',
        lessons: [
          { title: language === 'vi' ? 'Giới thiệu khóa học' : 'Course Introduction', duration: '15p', isPreview: true },
          { title: language === 'vi' ? 'Tại sao giao tiếp quan trọng?' : 'Why is communication important?', duration: '20p', isPreview: false },
          { title: language === 'vi' ? '7 nguyên tắc giao tiếp hiệu quả' : '7 principles of effective communication', duration: '30p' },
          { title: language === 'vi' ? 'Quiz Module 1' : 'Module 1 Quiz', duration: '15p' },
        ]
      },
      {
        module: language === 'vi' ? 'Module 2: Giao tiếp ngôn ngữ cơ thể' : 'Module 2: Body Language Communication',
        duration: '3h',
        lessons: [
          { title: language === 'vi' ? 'Ngôn ngữ cơ thể là gì?' : 'What is body language?', duration: '25p' },
          { title: language === 'vi' ? 'Đọc hiểu ngôn ngữ cơ thể' : 'Reading body language', duration: '35p' },
          { title: language === 'vi' ? 'Sử dụng ngôn ngữ cơ thể hiệu quả' : 'Using body language effectively', duration: '40p' },
        ]
      },
    ]
  }

  const breadcrumbItems = [
    { label: language === 'vi' ? 'Trang chủ' : 'Home', path: '/' },
    { label: language === 'vi' ? 'Khóa học' : 'Courses', path: '/courses' },
    { label: course.title }
  ]

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN').format(price) + 'đ'
  }

  const discountPercent = Math.round(((course.price - course.discountPrice) / course.price) * 100)

  const tabs = [
    { id: 'overview', icon: 'fa-list', label: language === 'vi' ? 'Tổng quan' : 'Overview' },
    { id: 'curriculum', icon: 'fa-book-open', label: language === 'vi' ? 'Nội dung' : 'Curriculum' },
    { id: 'instructor', icon: 'fa-chalkboard-user', label: language === 'vi' ? 'Giảng viên' : 'Instructor' },
    { id: 'reviews', icon: 'fa-star', label: `${language === 'vi' ? 'Đánh giá' : 'Reviews'} (${course.reviewsCount})` },
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
                  <iframe
                    src={course.videoPreview}
                    title={course.title}
                    className="w-full h-full"
                    allowFullScreen
                  ></iframe>
                </div>
              </div>

              {/* Title & Meta */}
              <div className="mb-8">
                <h1 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 mb-3">
                  {course.title}
                </h1>
                <p className="text-lg text-gray-700 mb-4">{course.tagline}</p>

                <div className="flex flex-wrap items-center gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <span className="text-yellow-500 text-xl">⭐</span>
                    <span className="font-bold text-lg">{course.rating}</span>
                    <span className="text-gray-600">({course.reviewsCount} {language === 'vi' ? 'đánh giá' : 'reviews'})</span>
                  </div>
                  <div className="text-gray-600">
                    <i className="fas fa-users"></i> {course.studentsCount.toLocaleString()} {language === 'vi' ? 'học viên' : 'students'}
                  </div>
                  <div className="text-gray-600">
                    <i className="far fa-clock"></i> {language === 'vi' ? 'Cập nhật' : 'Updated'}: {new Date(course.lastUpdated).toLocaleDateString(language === 'vi' ? 'vi-VN' : 'en-US')}
                  </div>
                </div>

                {/* Badges */}
                <div className="flex gap-2 mt-4">
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">
                    {language === 'vi' ? 'Bán chạy nhất' : 'Bestseller'}
                  </span>
                  {course.hasCertificate && (
                    <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
                      <i className="fas fa-certificate"></i> {language === 'vi' ? 'Có chứng chỉ' : 'Certificate'}
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
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {course.whatYouWillLearn.map((item, idx) => (
                            <li key={idx} className="flex items-start gap-3">
                              <i className="fas fa-check-circle text-rice-green mt-1"></i>
                              <span className="text-gray-700">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h3 className="text-xl font-bold mb-4">{language === 'vi' ? 'Yêu cầu' : 'Requirements'}</h3>
                        <ul className="space-y-2">
                          {course.requirements.map((item, idx) => (
                            <li key={idx} className="flex items-start gap-3 text-gray-700">
                              <i className="fas fa-check text-mekong-blue mt-1"></i>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}

                  {/* Curriculum Tab */}
                  {activeTab === 'curriculum' && (
                    <div className="space-y-4">
                      {course.curriculum.map((module, idx) => (
                        <div key={idx} className="border border-gray-200 rounded-lg overflow-hidden">
                          <button className="w-full px-6 py-4 bg-gray-50 hover:bg-gray-100 transition-colors flex items-center justify-between font-semibold text-left">
                            <span>
                              {module.module}
                            </span>
                            <span className="text-gray-600 text-sm">{module.duration}</span>
                          </button>
                          <div className="p-4 space-y-2">
                            {module.lessons.map((lesson, lessonIdx) => (
                              <div key={lessonIdx} className="flex items-center justify-between py-2 hover:bg-gray-50 px-3 rounded transition-colors">
                                <div className="flex items-center gap-3">
                                  <i className={`far ${lesson.isPreview ? 'fa-play-circle text-mekong-blue' : 'fa-lock text-gray-400'}`}></i>
                                  <span className="text-gray-700">{lesson.title}</span>
                                  {lesson.isPreview && (
                                    <span className="text-xs text-mekong-blue font-semibold">{language === 'vi' ? 'Xem trước' : 'Preview'}</span>
                                  )}
                                </div>
                                <span className="text-sm text-gray-500">{lesson.duration}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Instructor Tab */}
                  {activeTab === 'instructor' && (
                    <div className="flex gap-6">
                      <div className="w-32 h-32 rounded-2xl overflow-hidden flex-shrink-0">
                        <img
                          src={course.instructor.avatar}
                          alt={course.instructor.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold mb-1">{course.instructor.name}</h3>
                        <p className="text-mekong-blue font-semibold mb-4">{course.instructor.title}</p>
                        <p className="text-gray-700 mb-4">{course.instructor.bio}</p>
                        <p className="text-sm text-gray-600">
                          <strong>{language === 'vi' ? 'Chuyên môn:' : 'Expertise:'}</strong> {course.instructor.expertise}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Reviews Tab */}
                  {activeTab === 'reviews' && (
                    <div className="space-y-6">
                      <div className="flex items-center gap-8">
                        <div className="text-center">
                          <div className="text-5xl font-black text-mekong-blue">{course.rating}</div>
                          <div className="text-yellow-500 text-2xl my-2">⭐⭐⭐⭐⭐</div>
                          <div className="text-gray-600">{course.reviewsCount} {language === 'vi' ? 'đánh giá' : 'reviews'}</div>
                        </div>
                        <div className="flex-1 space-y-2">
                          {[5, 4, 3, 2, 1].map(star => (
                            <div key={star} className="flex items-center gap-3">
                              <span className="text-sm w-8">{star}⭐</span>
                              <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                                <div
                                  className="h-full bg-yellow-500"
                                  style={{ width: `${star === 5 ? 80 : star === 4 ? 15 : 5}%` }}
                                ></div>
                              </div>
                              <span className="text-sm text-gray-600 w-12">{star === 5 ? '80%' : star === 4 ? '15%' : '5%'}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="border-t pt-6">
                        <p className="text-center text-gray-600">
                          {language === 'vi' ? 'Đánh giá chi tiết sẽ được hiển thị sau khi có dữ liệu thực' : 'Detailed reviews will be displayed once actual data is available'}
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
                  <div className="flex items-baseline gap-3 mb-2">
                    <span className="text-4xl font-black text-mekong-blue">
                      {formatPrice(course.discountPrice)}
                    </span>
                    <span className="text-lg text-gray-400 line-through">
                      {formatPrice(course.price)}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-1 bg-red-100 text-red-600 text-sm font-bold rounded">
                      -{discountPercent}%
                    </span>
                    <span className="text-sm text-gray-600">
                      {language === 'vi' ? 'Ưu đãi có hạn' : 'Limited offer'}
                    </span>
                  </div>
                </div>

                {/* Course Includes */}
                <div className="p-6 border-b">
                  <h4 className="font-bold mb-4">{language === 'vi' ? 'Khóa học bao gồm:' : 'This course includes:'}</h4>
                  <ul className="space-y-3 text-sm">
                    {[
                      { icon: 'fa-clock', text: `${course.duration} ${language === 'vi' ? 'tuần học' : 'weeks'}` },
                      { icon: 'fa-file-alt', text: `${course.lessonsCount} ${language === 'vi' ? 'bài giảng' : 'lessons'}` },
                      { icon: 'fa-certificate', text: language === 'vi' ? 'Chứng chỉ hoàn thành' : 'Certificate of completion' },
                      { icon: 'fa-infinity', text: language === 'vi' ? 'Truy cập trọn đời' : 'Lifetime access' },
                      { icon: 'fa-redo', text: language === 'vi' ? 'Học lại miễn phí' : 'Free retake' },
                      { icon: 'fa-mobile-alt', text: language === 'vi' ? 'Học trên mọi thiết bị' : 'Learn on any device' },
                    ].map((item, idx) => (
                      <li key={idx} className="flex items-center gap-3 text-gray-700">
                        <i className={`fas ${item.icon} text-mekong-blue`}></i>
                        <span>{item.text}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA Buttons */}
                <div className="p-6 space-y-3">
                  <button className="btn btn-primary w-full justify-center">
                    <i className="fas fa-shopping-cart"></i>
                    {language === 'vi' ? 'Đăng ký ngay' : 'Enroll Now'}
                  </button>
                  <button className="btn btn-secondary w-full justify-center">
                    <i className="fas fa-cart-plus"></i>
                    {language === 'vi' ? 'Thêm vào giỏ' : 'Add to Cart'}
                  </button>
                  <button className="btn btn-outline w-full justify-center">
                    <i className="fas fa-phone"></i>
                    {language === 'vi' ? 'Tư vấn miễn phí' : 'Free Consultation'}
                  </button>
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

