import React from 'react'
import { useParams, Link } from 'react-router-dom'
import { useLanguage } from '../i18n/config.jsx'
import { motion } from 'framer-motion'
import Breadcrumb from '../components/common/Breadcrumb'
import NewsCard from '../components/common/NewsCard'

const NewsDetail = () => {
  const { slug } = useParams()
  const { t, language } = useLanguage()

  // Mock data - lấy từ web gốc
  const mockPost = {
    id: 1,
    slug: slug,
    title: language === 'vi'
      ? '🤝 HAPPY WORLD MEKONG KÝ KẾT HỢP TÁC CHIẾN LƯỢC VỚI ĐẠI HỌC CẦN THƠ'
      : '🤝 HAPPY WORLD MEKONG SIGNS STRATEGIC PARTNERSHIP WITH CAN THO UNIVERSITY',
    category: 'activities',
    categoryName: language === 'vi' ? 'Tin hoạt động' : 'Activities',
    publishedAt: '2025-10-15T09:00:00',
    author: {
      name: 'Admin',
      avatar: null
    },
    views: 1234,
    readingTime: 5,
    featuredImage: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1200&q=80',
    content: language === 'vi' ? `
      <p><strong>Ngày 15/10/2025</strong>, tại Trung tâm Hội nghị Đại học Cần Thơ, Công ty Cổ phần Công nghệ Giáo dục Happy World Mekong và Đại học Cần Thơ đã chính thức ký kết Biên bản ghi nhớ hợp tác (MOU), mở ra một giai đoạn hợp tác chiến lược, bền vững và toàn diện.</p>

      <h2>Mục tiêu hợp tác</h2>
      <p>Thỏa thuận hợp tác tập trung vào các lĩnh vực:</p>
      <ul>
        <li>Đào tạo kỹ năng mềm cho sinh viên</li>
        <li>Định hướng nghề nghiệp và kết nối việc làm</li>
        <li>Hỗ trợ khởi nghiệp cho sinh viên</li>
        <li>Nghiên cứu và phát triển chương trình đào tạo</li>
      </ul>

      <h2>Cam kết của hai bên</h2>
      <p>Happy World Mekong cam kết:</p>
      <ul>
        <li>Cung cấp các khóa học chất lượng cao miễn phí/ưu đãi cho sinh viên</li>
        <li>Hỗ trợ định hướng nghề nghiệp và tư vấn việc làm</li>
        <li>Tạo cơ hội thực tập và làm việc tại các doanh nghiệp đối tác</li>
      </ul>

      <p>Đại học Cần Thơ cam kết:</p>
      <ul>
        <li>Tạo điều kiện để Happy World Mekong triển khai các khóa học</li>
        <li>Hỗ trợ nghiên cứu và phát triển chương trình</li>
        <li>Kết nối với sinh viên và cộng đồng doanh nghiệp</li>
      </ul>
    ` : `
      <p><strong>On October 15, 2025</strong>, at Can Tho University Conference Center, Happy World Mekong Education Technology Co., Ltd and Can Tho University officially signed a Memorandum of Understanding (MOU), opening a strategic, sustainable and comprehensive cooperation phase.</p>

      <h2>Cooperation Objectives</h2>
      <p>The cooperation agreement focuses on the following areas:</p>
      <ul>
        <li>Soft skills training for students</li>
        <li>Career guidance and job matching</li>
        <li>Startup support for students</li>
        <li>Research and training program development</li>
      </ul>

      <h2>Commitments</h2>
      <p>Happy World Mekong commits to:</p>
      <ul>
        <li>Provide high-quality courses free/discounted for students</li>
        <li>Support career guidance and job counseling</li>
        <li>Create internship and job opportunities with partner businesses</li>
      </ul>

      <p>Can Tho University commits to:</p>
      <ul>
        <li>Facilitate Happy World Mekong to implement courses</li>
        <li>Support research and program development</li>
        <li>Connect with students and business community</li>
      </ul>
    `
  }

  const relatedPosts = [
    {
      id: 2,
      slug: 'khai-giang-khoa-ky-nang',
      title: language === 'vi' ? 'Khai giảng khóa Kỹ năng khởi nghiệp' : 'Opening Entrepreneurship Skills Course',
      image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&q=80',
      publishedAt: '2025-10-10'
    },
    {
      id: 3,
      slug: 'workshop-marketing',
      title: language === 'vi' ? 'Workshop Marketing cho sinh viên' : 'Marketing Workshop for Students',
      image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&q=80',
      publishedAt: '2025-10-08'
    },
  ]

  const breadcrumbItems = [
    { label: language === 'vi' ? 'Trang chủ' : 'Home', path: '/' },
    { label: language === 'vi' ? 'Tin tức' : 'News', path: '/news' },
    { label: mockPost.categoryName, path: `/news?category=${mockPost.category}` },
    { label: mockPost.title.substring(0, 50) + '...' }
  ]

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
                <div className="aspect-video bg-gray-200">
                  <img
                    src={mockPost.featuredImage}
                    alt={mockPost.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Content */}
                <div className="p-8">
                  {/* Category */}
                  <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold mb-4">
                    {mockPost.categoryName}
                  </span>

                  {/* Title */}
                  <h1 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 mb-4">
                    {mockPost.title}
                  </h1>

                  {/* Meta */}
                  <div className="flex items-center gap-6 text-sm text-gray-600 mb-6 pb-6 border-b">
                    <span className="flex items-center gap-2">
                      <i className="far fa-calendar"></i>
                      {new Date(mockPost.publishedAt).toLocaleDateString(language === 'vi' ? 'vi-VN' : 'en-US')}
                    </span>
                    <span className="flex items-center gap-2">
                      <i className="far fa-user"></i>
                      {mockPost.author.name}
                    </span>
                    <span className="flex items-center gap-2">
                      <i className="far fa-eye"></i>
                      {mockPost.views} {language === 'vi' ? 'lượt xem' : 'views'}
                    </span>
                    <span className="flex items-center gap-2">
                      <i className="far fa-clock"></i>
                      {mockPost.readingTime} {language === 'vi' ? 'phút đọc' : 'min read'}
                    </span>
                  </div>

                  {/* Article Content */}
                  <div 
                    className="prose prose-lg max-w-none"
                    dangerouslySetInnerHTML={{ __html: mockPost.content }}
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
                  {relatedPosts.map(post => (
                    <Link
                      key={post.id}
                      to={`/news/${post.slug}`}
                      className="flex gap-3 group"
                    >
                      <div className="w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden bg-gray-200">
                        <img
                          src={post.image}
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                        />
                      </div>
                      <div>
                        <h4 className="font-semibold text-sm line-clamp-2 group-hover:text-mekong-blue transition-colors mb-1">
                          {post.title}
                        </h4>
                        <p className="text-xs text-gray-500">
                          {new Date(post.publishedAt).toLocaleDateString(language === 'vi' ? 'vi-VN' : 'en-US')}
                        </p>
                      </div>
                    </Link>
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

export default NewsDetail

