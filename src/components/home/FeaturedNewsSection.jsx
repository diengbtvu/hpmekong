import { Link } from 'react-router-dom'
import { useLanguage } from '../../i18n/config.jsx'
import { motion } from 'framer-motion'

const FeaturedNewsSection = () => {
  const { t, language } = useLanguage()

  const featuredNews = [
    {
      id: 1,
      slug: 'hop-tac-dai-hoc-can-tho',
      title: language === 'vi'
        ? 'HAPPY WORLD MEKONG KÝ KẾT HỢP TÁC CHIẾN LƯỢC'
        : 'HAPPY WORLD MEKONG SIGNS STRATEGIC PARTNERSHIP',
      excerpt: language === 'vi'
        ? 'Happy World Mekong tiếp tục ký kết hợp tác thỏa thuận với các trường Đại học khu vực ĐBSCL giai đoạn 2025-2030.'
        : 'Happy World Mekong continues to sign cooperation agreements with universities in the Mekong Delta for 2025-2030.',
      image: 'https://novaedu.vn/uploads/news/1747648520_z6617495722356_78e5a741d89395651d14d5c92d154cd3.jpg',
      date: '2025-10-15',
      author: 'Admin'
    },
    {
      id: 2,
      slug: 'khai-giang-khoa-hoc',
      title: language === 'vi'
        ? 'KHAI GIẢNG KHÓA "KỸ NĂNG KHỞI NGHIỆP TRONG KỶ NGUYÊN SỐ"'
        : 'OPENING OF "DIGITAL ENTREPRENEURSHIP SKILLS" COURSE',
      excerpt: language === 'vi'
        ? 'Khóa học thu hút hơn 200 sinh viên các trường ĐH tại miền Tây tham gia.'
        : 'The course attracted over 200 students from universities in the Southwest region.',
      image: 'https://novaedu.vn/uploads/news/1745308165_493225700_1094537646042302_5324479177072506720_n.jpg',
      date: '2025-10-10',
      author: 'Admin'
    },
    {
      id: 3,
      slug: 'workshop-ung-dung-cong-nghe',
      title: language === 'vi'
        ? 'ỨNG DỤNG CÔNG NGHỆ - BƯỚC TIẾN ĐỔI MỚI TRONG LỚP HỌC'
        : 'TECHNOLOGY APPLICATION - INNOVATION IN CLASSROOMS',
      excerpt: language === 'vi'
        ? 'Workshop về ứng dụng AI và công nghệ trong giảng dạy cho giảng viên.'
        : 'Workshop on AI and technology application in teaching for lecturers.',
      image: 'https://novaedu.vn/uploads/news/1740380778_okkkkk.jpg',
      date: '2025-10-05',
      author: 'Admin'
    },
  ]

  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h3 className="text-3xl md:text-4xl font-heading font-bold">
            {language === 'vi' ? 'TIN TỨC NỔI BẬT' : 'FEATURED NEWS'}
          </h3>
        </div>

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
              {/* Horizontal layout: image left 40%, content right 60% - giống NovaEdu */}
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

        <div className="text-center mt-8">
          <Link to="/news" className="btn btn-outline">
            {language === 'vi' ? 'Xem tất cả tin tức' : 'View all news'}
          </Link>
        </div>
      </div>
    </section>
  )
}

export default FeaturedNewsSection

