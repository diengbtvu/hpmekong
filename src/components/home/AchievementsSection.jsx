import { useLanguage } from '../../i18n/config.jsx'
import { useEffect } from 'react'

const AchievementsSection = () => {
  const { t, language } = useLanguage()

  // Lấy ảnh từ web gốc NovaEdu
  const achievements = [
    'https://novaedu.vn/uploads/photos/images/2020/06/thanh-tu-dat-duoc/07f22d6596836bdd3292-3.jpg',
    'https://novaedu.vn/uploads/photos/images/2020/06/thanh-tu-dat-duoc/7bafef0954efa9b1f0fe-copy-3.jpg',
    'https://novaedu.vn/uploads/photos/images/2020/07/thanh-tu-dat-duoc/bangkhen1-1.jpg',
    'https://novaedu.vn/uploads/photos/images/2021/01/thanh-tu-dat-duoc/bang.png',
    'https://novaedu.vn/uploads/images/1703045868_1.png',
    'https://novaedu.vn/uploads/images/1717389513_z5502538615808_335c486a050eb38284afac8fdb5ab601.jpg',
    'https://novaedu.vn/uploads/photos/images/2020/06/thanh-tu-dat-duoc/8e2bbea20544f81aa155-copy-3-3.jpg',
    'https://novaedu.vn/uploads/photos/images/2020/06/thanh-tu-dat-duoc/15f9bb5200b4fdeaa4a5-copy-3.jpg',
  ]

  useEffect(() => {
    // Initialize Slick slider via jQuery (load from CDN nếu cần)
    if (window.$ && window.$.fn.slick) {
      window.$('.achievements-autoplay').slick({
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        responsive: [
          { breakpoint: 1024, settings: { slidesToShow: 3 } },
          { breakpoint: 768, settings: { slidesToShow: 2 } },
          { breakpoint: 480, settings: { slidesToShow: 1 } }
        ]
      })
    }
  }, [])

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

        {/* Slick Slider - giống NovaEdu gốc */}
        <div className="achievements-autoplay">
          {achievements.map((img, index) => (
            <div key={index} className="px-3">
              <div className="bg-white rounded-xl overflow-hidden cursor-pointer hover:shadow-xl transition-shadow">
                <div className="aspect-square bg-gray-200 p-4 flex items-center justify-center">
                  <img
                    src={img}
                    alt={`Achievement ${index + 1}`}
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default AchievementsSection

