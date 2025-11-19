import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useLanguage } from '../../i18n/config.jsx'
import { motion } from 'framer-motion'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination, EffectCards } from 'swiper/modules'
import { bannerService } from '../../services/contentService'
import api from '../../services/api'
import 'swiper/css'
import 'swiper/css/effect-cards'
import 'swiper/css/pagination'

const HeroSection = () => {
  const { t, language } = useLanguage()
  const [featuredNews, setFeaturedNews] = useState([])
  const [heroBanner, setHeroBanner] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch HERO banner for main image
        const heroResponse = await bannerService.getBannersByType('HERO')
        if (heroResponse.success && heroResponse.data && heroResponse.data.length > 0) {
          setHeroBanner(heroResponse.data[0]) // Get first active HERO banner
        }

        // Fetch latest 3 posts for slider
        const postsResponse = await api.get('/posts', {
          params: {
            page: 0,
            size: 3
          }
        })
        
        if (postsResponse.data.success && postsResponse.data.data.content) {
          const posts = postsResponse.data.data.content.map(post => ({
            id: post.id,
            title: language === 'vi' ? post.title : (post.titleEn || post.title),
            excerpt: language === 'vi' ? (post.excerpt || '') : (post.excerptEn || post.excerpt || ''),
            image: post.featuredImageUrl || 'https://placehold.co/400x300',
            link: `/news/${post.slug}`
          }))
          setFeaturedNews(posts)
        }
      } catch (error) {
        console.error('Error fetching data:', error)
        // Fallback to empty on error
        setHeroBanner(null)
        setFeaturedNews([])
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [language])

  return (
    <section className="relative bg-gradient-mekong overflow-hidden">
      <div className="w-full py-8 sm:py-10 md:py-12 lg:py-16 px-3 sm:px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
          {/* Left Content - 7 columns */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7"
          >
            {/* Badge */}
            <div className="inline-block mb-3 sm:mb-4">
              <div className="bg-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-full shadow-md">
                <span className="text-mekong-blue font-semibold text-xs sm:text-sm md:text-base">
                  {t('home.heroBadge')}
                </span>
              </div>
            </div>

            {/* Title */}
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-heading font-black mb-3 sm:mb-4 leading-tight">
              <span className="text-mekong-blue">HAPPY </span>
              <span className="text-sunrise-orange">WORLD </span>
              <span className="text-rice-green">MEKONG</span>
            </h1>

            {/* Slogan */}
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-700 font-semibold mb-3 sm:mb-4">
              {t('home.heroSlogan')}
            </p>

            {/* Description */}
            <p className="text-gray-600 text-sm sm:text-base md:text-lg mb-4 sm:mb-6">
              {t('home.heroDescription')}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4">
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
            <div className="grid grid-cols-3 gap-3 sm:gap-4 mt-6 sm:mt-8">
              <div className="text-center">
                <div className="text-xl sm:text-2xl md:text-3xl font-bold text-mekong-blue">100K+</div>
                <div className="text-xs sm:text-sm text-gray-600">{t('stats.students')}</div>
              </div>
              <div className="text-center">
                <div className="text-xl sm:text-2xl md:text-3xl font-bold text-sunrise-orange">150+</div>
                <div className="text-xs sm:text-sm text-gray-600">{t('stats.courses')}</div>
              </div>
              <div className="text-center">
                <div className="text-xl sm:text-2xl md:text-3xl font-bold text-rice-green">200+</div>
                <div className="text-xs sm:text-sm text-gray-600">{t('stats.instructors')}</div>
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
              {loading ? (
                <div className="w-full h-[250px] sm:h-[300px] md:h-[350px] lg:h-[400px] bg-gray-200 rounded-2xl shadow-2xl flex items-center justify-center animate-pulse">
                  <div className="text-gray-400">
                    <i className="fas fa-spinner fa-spin text-3xl sm:text-4xl"></i>
                  </div>
                </div>
              ) : heroBanner ? (
                <img
                  src={heroBanner.imageUrl}
                  alt={language === 'vi' ? heroBanner.title : (heroBanner.titleEn || heroBanner.title)}
                  className="w-full h-auto rounded-2xl shadow-2xl"
                />
              ) : (
                <div className="w-full h-[250px] sm:h-[300px] md:h-[350px] lg:h-[400px] bg-gradient-to-br from-mekong-blue to-sunrise-orange rounded-2xl shadow-2xl flex items-center justify-center">
                  <div className="text-white text-center p-6 sm:p-8">
                    <i className="fas fa-image text-4xl sm:text-5xl md:text-6xl mb-3 sm:mb-4 opacity-50"></i>
                    <p className="text-sm sm:text-base md:text-lg">{language === 'vi' ? 'Chưa có banner' : 'No banner yet'}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Swiper Cards - News Carousel */}
            <div className="mt-6 sm:mt-8 relative">
              {loading ? (
                <div className="w-full max-w-[240px] sm:max-w-[280px] mx-auto h-[340px] sm:h-[380px] bg-white rounded-2xl shadow-xl flex items-center justify-center">
                  <div className="animate-spin rounded-full h-10 w-10 sm:h-12 sm:w-12 border-b-2 border-mekong-blue"></div>
                </div>
              ) : featuredNews.length > 0 ? (
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
                loop={featuredNews.length > 1}
                className="w-full max-w-[240px] sm:max-w-[280px] mx-auto"
              >
                {featuredNews.map((news) => (
                  <SwiperSlide key={news.id}>
                    <div className="bg-white rounded-2xl shadow-xl overflow-hidden h-[340px] sm:h-[380px]">
                      <Link to={news.link}>
                        <div className="h-[160px] sm:h-[180px] overflow-hidden">
                          <img
                            src={news.image}
                            alt={news.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </Link>
                      <div className="p-3 sm:p-4">
                        <h4 className="font-bold text-xs sm:text-sm line-clamp-2 mb-2 hover:text-mekong-blue transition-colors">
                          <Link to={news.link}>{news.title}</Link>
                        </h4>
                        <p className="text-gray-600 text-[10px] sm:text-xs line-clamp-3 mb-2 sm:mb-3">
                          {news.excerpt}
                        </p>
                        <Link
                          to={news.link}
                          className="text-mekong-blue text-[10px] sm:text-xs font-semibold inline-flex items-center gap-1 hover:gap-2 transition-all"
                        >
                          {language === 'vi' ? 'Xem thêm' : 'Read more'}
                          <i className="fas fa-arrow-right text-[10px] sm:text-xs"></i>
                        </Link>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
              ) : (
                <div className="w-full max-w-[280px] mx-auto h-[380px] bg-white rounded-2xl shadow-xl flex items-center justify-center">
                  <p className="text-gray-500">{language === 'vi' ? 'Không có tin tức nổi bật' : 'No featured news'}</p>
                </div>
              )}
              {featuredNews.length > 0 && (
                <div className="swiper-pagination-custom mt-4 flex justify-center"></div>
              )}
            </div>
          </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection

