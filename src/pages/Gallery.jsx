import React, { useState } from 'react'
import { useLanguage } from '../i18n/config.jsx'
import { motion } from 'framer-motion'

const Gallery = () => {
  const { t, language } = useLanguage()
  const [activeTab, setActiveTab] = useState('photos')
  const [lightboxImage, setLightboxImage] = useState(null)

  // Mock data - lấy từ web gốc NovaEdu
  const photoAlbums = [
    {
      id: 1,
      title: language === 'vi' ? 'Thành tựu đạt được' : 'Achievements',
      coverImage: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&q=80',
      imagesCount: 15,
      images: [
        'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&q=80',
        'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&q=80',
        'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800&q=80',
      ]
    },
    {
      id: 2,
      title: language === 'vi' ? 'Hoạt động đào tạo' : 'Training Activities',
      coverImage: 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=800&q=80',
      imagesCount: 20,
    },
  ]

  const videos = [
    {
      id: 1,
      title: language === 'vi' ? 'Chuyên gia Đỗ Mạnh Hùng chia sẻ về Kỹ năng khởi nghiệp' : 'Expert Do Manh Hung shares about Startup Skills',
      thumbnail: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80',
      url: 'https://www.youtube.com/watch?v=sCJunphEExA',
      date: '2020-07-30'
    },
    {
      id: 2,
      title: language === 'vi' ? 'CEO chia sẻ về Kỹ năng thích ứng' : 'CEO shares about Adaptation Skills',
      thumbnail: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=800&q=80',
      url: 'https://www.youtube.com/watch?v=example',
      date: '2020-07-29'
    },
  ]

  return (
    <div className="gallery-page">
      {/* Hero */}
      <section className="bg-gradient-mekong py-8 sm:py-12 md:py-16 lg:py-20">
        <div className="container-custom text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-heading font-bold mb-3 sm:mb-4"
          >
            {t('common.library')}
          </motion.h1>
        </div>
      </section>

      {/* Tabs */}
      <section className="py-8 sm:py-10 md:py-12">
        <div className="container-custom">
          <div className="flex overflow-x-auto scrollbar-hide gap-2 sm:gap-3 mb-6 sm:mb-8 pb-2">
            {['photos', 'videos', 'documents'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-shrink-0 px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg font-semibold transition-all text-sm sm:text-base ${
                  activeTab === tab
                    ? 'bg-gradient-blue text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
                style={{ minHeight: '44px' }}
              >
                {t(`common.${tab}`) || (tab === 'photos' ? (language === 'vi' ? 'Hình ảnh' : 'Photos') : tab === 'videos' ? 'Videos' : (language === 'vi' ? 'Tài liệu' : 'Documents'))}
              </button>
            ))}
          </div>

          {/* Photos */}
          {activeTab === 'photos' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {photoAlbums.map((album, index) => (
                <motion.div
                  key={album.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-xl sm:rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all cursor-pointer group"
                  onClick={() => album.images && setLightboxImage(album.images[0])}
                >
                  <div className="aspect-video bg-gray-200 overflow-hidden">
                    <img
                      src={album.coverImage}
                      alt={album.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-3 sm:p-4">
                    <h3 className="font-bold text-base sm:text-lg mb-1 sm:mb-2 group-hover:text-mekong-blue transition-colors">
                      {album.title}
                    </h3>
                    <p className="text-gray-600 text-xs sm:text-sm">
                      {album.imagesCount} {language === 'vi' ? 'ảnh' : 'photos'}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {/* Videos */}
          {activeTab === 'videos' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {videos.map((video, index) => (
                <motion.a
                  key={video.id}
                  href={video.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-xl sm:rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all group"
                >
                  <div className="aspect-video bg-gray-200 relative">
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center group-hover:bg-opacity-40 transition-all">
                      <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white bg-opacity-90 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                        <i className="fas fa-play text-lg sm:text-2xl text-mekong-blue ml-1"></i>
                      </div>
                    </div>
                  </div>
                  <div className="p-3 sm:p-4">
                    <h3 className="font-bold text-sm sm:text-base line-clamp-2 mb-1 sm:mb-2 group-hover:text-mekong-blue transition-colors">
                      {video.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-600">
                      {new Date(video.date).toLocaleDateString(language === 'vi' ? 'vi-VN' : 'en-US')}
                    </p>
                  </div>
                </motion.a>
              ))}
            </div>
          )}

          {/* Documents */}
          {activeTab === 'documents' && (
            <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-6 sm:p-8">
              <p className="text-center text-gray-600 text-sm sm:text-base">
                {language === 'vi' ? 'Chức năng đang được phát triển' : 'Feature under development'}
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Lightbox */}
      {lightboxImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-3 sm:p-4"
          onClick={() => setLightboxImage(null)}
        >
          <button
            className="absolute top-3 right-3 sm:top-4 sm:right-4 w-11 h-11 sm:w-12 sm:h-12 bg-white rounded-full flex items-center justify-center hover:bg-gray-100"
            onClick={() => setLightboxImage(null)}
            style={{ minWidth: '44px', minHeight: '44px' }}
          >
            <i className="fas fa-times text-xl sm:text-2xl"></i>
          </button>
          <img
            src={lightboxImage}
            alt="Gallery"
            className="max-w-full max-h-full object-contain"
          />
        </div>
      )}
    </div>
  )
}

export default Gallery

