import React, { useEffect, useState } from 'react'
import { useLanguage } from '../../i18n/config.jsx'
import { achievementService } from '../../services/contentService'

const AchievementsSection = () => {
  const { t, language } = useLanguage()
  const [achievements, setAchievements] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchAchievements = async () => {
      try {
        const response = await achievementService.getAllAchievements()
        if (response.success && response.data) {
          setAchievements(response.data.map(achievement => ({
            id: achievement.id,
            image: achievement.imageUrl,
            title: language === 'vi' ? achievement.title : (achievement.titleEn || achievement.title)
          })))
        }
      } catch (error) {
        console.error('Error fetching achievements:', error)
        setAchievements([])
      } finally {
        setLoading(false)
      }
    }

    fetchAchievements()
  }, [language])

  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-heading font-bold">
            {language === 'vi' ? 'THÀNH TỰU CỦA' : 'ACHIEVEMENTS OF'}{' '}
            <span className="text-mekong-blue">HAPPY</span>{' '}
            <span className="text-sunrise-orange">WORLD</span>{' '}
            <span className="text-rice-green">MEKONG</span>
          </h2>
        </div>

        {/* Achievements Grid */}
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-mekong-blue"></div>
          </div>
        ) : achievements.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {achievements.map((achievement) => (
            <div key={achievement.id} className="px-3">
              <div className="bg-white rounded-xl overflow-hidden cursor-pointer hover:shadow-xl transition-shadow">
                <div className="aspect-square bg-gray-200 p-4 flex items-center justify-center">
                  <img
                    src={achievement.image}
                    alt={achievement.title}
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500">{language === 'vi' ? 'Không có thành tựu' : 'No achievements available'}</p>
          </div>
        )}
      </div>
    </section>
  )
}

export default AchievementsSection

