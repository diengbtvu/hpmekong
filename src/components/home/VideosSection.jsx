import React, { useState, useEffect } from 'react'
import { useLanguage } from '../../i18n/config.jsx'
import { motion } from 'framer-motion'
import { videoService } from '../../services/contentService'

const VideosSection = () => {
  const { t, language } = useLanguage()
  const [videos, setVideos] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await videoService.getAllVideos()
        if (response.success && response.data) {
          setVideos(response.data.map(video => ({
            id: video.id,
            title: language === 'vi' ? video.title : (video.titleEn || video.title),
            thumbnail: video.thumbnailUrl,
            url: video.videoUrl,
            date: video.publishedDate,
            author: video.author
          })))
        }
      } catch (error) {
        console.error('Error fetching videos:', error)
        setVideos([])
      } finally {
        setLoading(false)
      }
    }

    fetchVideos()
  }, [language])

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

        {/* Videos Grid */}
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-mekong-blue"></div>
          </div>
        ) : videos.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {videos.map((video, index) => (
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
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500">{language === 'vi' ? 'Không có video' : 'No videos available'}</p>
          </div>
        )}
      </div>
    </section>
  )
}

export default VideosSection

