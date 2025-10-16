import { Link } from 'react-router-dom'
import { useLanguage } from '../../i18n/config.jsx'
import { motion } from 'framer-motion'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination, EffectCards } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/effect-cards'
import 'swiper/css/pagination'

const HeroSection = () => {
  const { t, language } = useLanguage()

  const featuredNews = [
    {
      id: 1,
      title: language === 'vi'
        ? '📢 [TUẦN SHCD – ĐẠI HỌC CÔNG NGHỆ ĐÔNG Á X HAPPY WORLD MEKONG]'
        : '📢 [SHCD WEEK – DONG A UNIVERSITY X HAPPY WORLD MEKONG]',
      excerpt: language === 'vi'
        ? 'Ngày 24/9/2025, sinh viên Trường Đại học Công nghệ Đông Á đã có một buổi sinh hoạt công dân đặc biệt với chủ đề: "Kỹ năng khởi nghiệp trong kỷ nguyên số"'
        : 'On September 24, 2025, students of Dong A University of Technology had a special civic activity session on the theme: "Entrepreneurship skills in the digital era"',
      image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=600&q=80',
      link: '/news/tuan-shcd-dai-hoc'
    },
    {
      id: 2,
      title: language === 'vi'
        ? '🎉 [HAPPY WORLD MEKONG x HOU] KHAI GIẢNG HỌC PHẦN "PHÁT TRIỂN KỸ NĂNG NGHỀ NGHIỆP"'
        : '🎉 [HAPPY WORLD MEKONG x HOU] OPENING OF "CAREER SKILLS DEVELOPMENT" COURSE',
      excerpt: language === 'vi'
        ? 'Ngày 21/09/2025, tại Khoa Kinh tế - Trường Đại học Mở Hà Nội (HOU), học phần đã chính thức khai giảng trong không khí hứng khởi'
        : 'On September 21, 2025, at the Faculty of Economics - Hanoi Open University (HOU), the course officially opened in an exciting atmosphere',
      image: 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=600&q=80',
      link: '/news/khai-giang-hoc-phan'
    },
    {
      id: 3,
      title: language === 'vi'
        ? '🎉 HAPPY WORLD MEKONG THAM DỰ CHƯƠNG TRÌNH CHÀO ĐÓN TÂN SINH VIÊN K19'
        : '🎉 HAPPY WORLD MEKONG PARTICIPATES IN WELCOMING FRESHMEN K19',
      excerpt: language === 'vi'
        ? 'Ngày 16/09/2025, Chương trình chào đón Tân sinh viên Khóa 19 đã diễn ra long trọng với sự tham gia của hơn 1.000 tân sinh viên'
        : 'On September 16, 2025, the Freshmen Welcoming Program for Batch 19 took place solemnly with the participation of over 1,000 freshmen',
      image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=600&q=80',
      link: '/news/chao-don-tan-sinh-vien'
    },
  ]

  return (
    <section className="relative bg-gradient-mekong overflow-hidden">
      <div className="w-full py-16 md:py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Content - 7 columns */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7"
          >
            {/* Badge */}
            <div className="inline-block mb-6">
              <div className="bg-white px-4 py-2 rounded-full shadow-md">
                <span className="text-mekong-blue font-semibold">
                  {t('home.heroBadge')}
                </span>
              </div>
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-black mb-6 leading-tight">
              <span className="text-mekong-blue">HAPPY </span>
              <span className="text-sunrise-orange">WORLD </span>
              <span className="text-rice-green">MEKONG</span>
            </h1>

            {/* Slogan */}
            <p className="text-xl md:text-2xl text-gray-700 font-semibold mb-4">
              {t('home.heroSlogan')}
            </p>

            {/* Description */}
            <p className="text-gray-600 text-lg mb-8">
              {t('home.heroDescription')}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4">
              <Link to="/courses" className="btn btn-primary btn-lg">
                <i className="fas fa-graduation-cap"></i>
                {t('home.exploreCourses')}
              </Link>
              <Link to="/contact" className="btn btn-outline btn-lg">
                <i className="fas fa-phone"></i>
                {t('home.consultNow')}
              </Link>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-4 mt-12">
              <div className="text-center">
                <div className="text-3xl font-bold text-mekong-blue">100K+</div>
                <div className="text-sm text-gray-600">{t('stats.students')}</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-sunrise-orange">150+</div>
                <div className="text-sm text-gray-600">{t('stats.courses')}</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-rice-green">200+</div>
                <div className="text-sm text-gray-600">{t('stats.instructors')}</div>
              </div>
            </div>
          </motion.div>

          {/* Right Slider - 5 columns */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-5 relative"
          >
            {/* Hero Image */}
            <div className="relative z-10">
              <img
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80"
                alt="Happy World Mekong Education"
                className="w-full h-auto rounded-2xl shadow-2xl"
              />
            </div>

            {/* Swiper Cards - News Carousel */}
            <div className="mt-8 relative">
              <Swiper
                modules={[Autoplay, Pagination, EffectCards]}
                effect="cards"
                grabCursor={true}
                pagination={{
                  clickable: true,
                  el: '.swiper-pagination-custom',
                }}
                autoplay={{
                  delay: 4000,
                  disableOnInteraction: false,
                }}
                loop={true}
                className="w-full max-w-[280px] mx-auto"
              >
                {featuredNews.map((news) => (
                  <SwiperSlide key={news.id}>
                    <div className="bg-white rounded-2xl shadow-xl overflow-hidden h-[380px]">
                      <Link to={news.link}>
                        <div className="h-[180px] overflow-hidden">
                          <img
                            src={news.image}
                            alt={news.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </Link>
                      <div className="p-4">
                        <h4 className="font-bold text-sm line-clamp-2 mb-2 hover:text-mekong-blue transition-colors">
                          <Link to={news.link}>{news.title}</Link>
                        </h4>
                        <p className="text-gray-600 text-xs line-clamp-3 mb-3">
                          {news.excerpt}
                        </p>
                        <Link
                          to={news.link}
                          className="text-mekong-blue text-xs font-semibold inline-flex items-center gap-1 hover:gap-2 transition-all"
                        >
                          {language === 'vi' ? 'Xem thêm' : 'Read more'}
                          <i className="fas fa-arrow-right text-xs"></i>
                        </Link>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
              <div className="swiper-pagination-custom mt-4 flex justify-center"></div>
            </div>
          </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection

