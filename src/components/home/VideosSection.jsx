import { useLanguage } from '../../i18n/config.jsx'
import { motion } from 'framer-motion'

const VideosSection = () => {
  const { t, language } = useLanguage()

  const videos = [
    {
      id: 1,
      title: language === 'vi' ? 'Chuyên gia chia sẻ về Kỹ năng khởi nghiệp' : 'Expert shares about Entrepreneurship Skills',
      thumbnail: 'https://novaedu.vn/uploads/video-clip/images/anh-lam-chu-cam-xuc.png',
      url: 'https://novaedu.vn/video-clip/chuyen-gia-do-manh-hung-chia-se-ve-chu-de-lam-chu-cam-xuc-54.html',
      date: '2020-07-30',
      author: 'Admin'
    },
    {
      id: 2,
      title: language === 'vi' ? 'CEO chia sẻ về Kỹ năng thích ứng' : 'CEO shares about Adaptation Skills',
      thumbnail: 'https://novaedu.vn/uploads/video-clip/images/anh-truyen-hinh.png',
      url: 'https://novaedu.vn/video-clip/ceo-do-manh-hung-chia-se-ve-ky-nang-thich-ung-1-53.html',
      date: '2020-07-29',
      author: 'Admin'
    },
    {
      id: 3,
      title: language === 'vi' ? 'Giới trẻ và sự vô cảm với cuộc sống' : 'Youth and indifference to life',
      thumbnail: 'https://novaedu.vn/uploads/video-clip/images/1.jpg',
      url: 'https://novaedu.vn/video-clip/ceo-do-manh-hung-chia-se-ve-chu-de-gioi-tre-va-su-vo-cam-voi-cuoc-song-52.html',
      date: '2020-05-26',
      author: 'Admin'
    },
    {
      id: 4,
      title: language === 'vi' ? 'Nghệ thuật thỏa hiệp với cảm xúc' : 'The art of emotional compromise',
      thumbnail: 'https://novaedu.vn/uploads/video-clip/images/tai-xuong-2.jpg',
      url: 'https://novaedu.vn/video-clip/ceo-do-manh-hung-chia-se-ve-nghe-thuat-thoa-hiep-voi-cam-xuc-51.html',
      date: '2020-05-26',
      author: 'Admin'
    },
  ]

  // Split videos into 2 slides, 4 items each - giống NovaEdu
  const slide1 = videos.slice(0, 4)
  const slide2 = videos.slice(4, 8)
  const allSlides = [slide1, slide2]

  return (
    <section className="section-padding" style={{
      background: 'linear-gradient(184deg, rgba(255, 255, 255, 0.00) 5.98%, rgba(0, 87, 184, 0.07) 25.31%, rgba(255, 140, 0, 0.07) 58.58%, rgba(248, 248, 248, 0.23) 96.97%)'
    }}>
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-heading font-bold">
            {language === 'vi' ? 'TRUYỀN HÌNH THÔNG TIN VỀ' : 'MEDIA COVERAGE ABOUT'}{' '}
            <span className="text-mekong-blue">HAPPY</span>{' '}
            <span className="text-sunrise-orange">WORLD</span>{' '}
            <span className="text-rice-green">MEKONG</span>
          </h2>
        </div>

        {/* Bootstrap-style Carousel với 2 slides - giống NovaEdu */}
        <div id="videosCarousel" className="relative">
          {/* Carousel Inner */}
          <div className="overflow-hidden">
            {allSlides.map((slideVideos, slideIndex) => (
              <div
                key={slideIndex}
                className={`${slideIndex === 0 ? 'block' : 'hidden'} videos-slide`}
                data-slide={slideIndex}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {slideVideos.map((video, index) => (
                    <motion.a
                      key={video.id}
                      href={video.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all group"
                    >
                      <div className="aspect-video bg-gray-200 relative overflow-hidden">
                        <img
                          src={video.thumbnail}
                          alt={video.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center group-hover:bg-opacity-40 transition-all">
                          <div className="w-16 h-16 bg-white bg-opacity-90 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                            <i className="fas fa-play text-2xl text-mekong-blue ml-1"></i>
                          </div>
                        </div>
                      </div>
                      <div className="p-4">
                        <div className="flex items-center gap-3 text-xs text-gray-600 mb-2">
                          <span><i className="far fa-calendar"></i> {video.date}</span>
                          <span><i className="far fa-user"></i> by {video.author}</span>
                        </div>
                        <h3 className="font-bold text-sm line-clamp-2 group-hover:text-mekong-blue transition-colors">
                          {video.title}
                        </h3>
                      </div>
                    </motion.a>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Carousel Indicators */}
          <div className="flex justify-center gap-2 mt-8">
            {allSlides.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === 0 ? 'bg-mekong-blue w-8' : 'bg-gray-300 hover:bg-gray-400'
                }`}
                onClick={() => {
                  document.querySelectorAll('.videos-slide').forEach((slide, i) => {
                    slide.classList.toggle('hidden', i !== index)
                  })
                }}
              ></button>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default VideosSection

