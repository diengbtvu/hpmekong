import React, { useState, useEffect } from 'react'
import { useLanguage } from '../i18n/config.jsx'
import api from '../services/api'
import { motion } from 'framer-motion'
import { settingsService } from '../services/contentService'

const About = () => {
  const { t, language } = useLanguage()
  const [leaders, setLeaders] = useState([])
  const [loadingLeaders, setLoadingLeaders] = useState(true)
  const [loading, setLoading] = useState(true)
  const [aboutContent, setAboutContent] = useState({
    badge_vi: 'Giáo dục từ miền Tây',
    badge_en: 'Education from the West',
    intro_paragraph1_vi: '',
    intro_paragraph1_en: '',
    intro_paragraph2_vi: '',
    intro_paragraph2_en: '',
    intro_paragraph3_vi: '',
    intro_paragraph3_en: '',
    youtube_video_url: 'https://www.youtube.com/embed/sCJunphEExA?si=vlYEK38MaI1B1KD-',
    main_areas_title_vi: 'HOẠT ĐỘNG TRONG 7 LĨNH VỰC CHÍNH',
    main_areas_title_en: 'OPERATES IN 7 MAIN AREAS',
    // 7 Main Activity Areas
    area1_title_vi: 'Công nghệ giáo dục',
    area1_title_en: 'Educational Technology',
    area1_icon: 'fa-laptop-code',
    area2_title_vi: 'Đào tạo tư duy kỹ năng mềm kỹ năng sống',
    area2_title_en: 'Thinking & Soft Skills Training',
    area2_icon: 'fa-brain',
    area3_title_vi: 'Định hướng nghề nghiệp, kết nối việc làm',
    area3_title_en: 'Career Guidance & Job Matching',
    area3_icon: 'fa-briefcase',
    area4_title_vi: 'Hỗ trợ khởi nghiệp và phát triển doanh nghiệp',
    area4_title_en: 'Startup Support & Business Development',
    area4_icon: 'fa-rocket',
    area5_title_vi: 'Tư vấn giáo dục, xây dựng chương trình đào tạo',
    area5_title_en: 'Education Consulting & Curriculum Development',
    area5_icon: 'fa-chalkboard-teacher',
    area6_title_vi: 'Hợp tác đào tạo theo nhu cầu doanh nghiệp',
    area6_title_en: 'Corporate Training Solutions',
    area6_icon: 'fa-handshake',
    area7_title_vi: 'Chuyển đổi số trong giáo dục',
    area7_title_en: 'Digital Transformation in Education',
    area7_icon: 'fa-digital-tachograph',
    vision_title_vi: 'Tầm nhìn',
    vision_title_en: 'Vision',
    vision_content_vi: '',
    vision_content_en: '',
    vision_icon: 'fa-eye',
    mission_title_vi: 'Sứ mệnh',
    mission_title_en: 'Mission',
    mission_content_vi: '',
    mission_content_en: '',
    mission_icon: 'fa-bullseye',
    values_title_vi: 'Giá trị cốt lõi',
    values_title_en: 'Core Values',
    values_content_vi: 'Tiên phong - Toàn diện - Bền vững',
    values_content_en: 'Pioneering - Comprehensive - Sustainable',
    values_icon: 'fa-gem',
    value1_title_vi: 'Tiên phong',
    value1_title_en: 'Pioneering',
    value1_desc_vi: 'Dẫn đầu và sáng tạo, áp dụng công nghệ mới, tạo ra chuẩn mực mới trong giáo dục',
    value1_desc_en: 'Lead and innovate, apply new technology, create new standards in education',
    value2_title_vi: 'Toàn diện',
    value2_title_en: 'Comprehensive',
    value2_desc_vi: 'Trang bị đầy đủ kỹ năng mềm, kiến thức nền tảng và năng lực tương lai cho người học',
    value2_desc_en: 'Equip learners with full soft skills, foundational knowledge and future capabilities',
    value3_title_vi: 'Bền vững',
    value3_title_en: 'Sustainable',
    value3_desc_vi: 'Tạo ra sự phát triển lâu dài cho cá nhân và xã hội, kiến tạo tương lai thịnh vượng',
    value3_desc_en: 'Create long-term development for individuals and society, build a prosperous future',
    team_badge_vi: 'Đội ngũ',
    team_badge_en: 'Our Team',
    team_title_vi: 'Ban Lãnh Đạo',
    team_title_en: 'Leadership Team',
  })

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        
        // Fetch about content and leaders in parallel
        const [settingsResponse, leadersResponse] = await Promise.all([
          settingsService.getSettingsByGroup('about'),
          api.get('/leaders') // Changed from /instructors to /leaders
        ])
        
        // Update about content
        if (settingsResponse.success && settingsResponse.data) {
          setAboutContent(prev => ({
            ...prev,
            ...settingsResponse.data
          }))
        }
        
        // Update leaders - updated to match new API response structure
        if (leadersResponse.data.success && leadersResponse.data.data) {
          setLeaders(leadersResponse.data.data)
        }
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        setLoading(false)
        setLoadingLeaders(false)
      }
    }

    fetchData()
  }, [])

  const mainAreas = [
    {
      icon: aboutContent.area1_icon || 'fa-laptop-code',
      title: language === 'vi' ? aboutContent.area1_title_vi : aboutContent.area1_title_en,
    },
    {
      icon: aboutContent.area2_icon || 'fa-brain',
      title: language === 'vi' ? aboutContent.area2_title_vi : aboutContent.area2_title_en,
    },
    {
      icon: aboutContent.area3_icon || 'fa-briefcase',
      title: language === 'vi' ? aboutContent.area3_title_vi : aboutContent.area3_title_en,
    },
    {
      icon: aboutContent.area4_icon || 'fa-rocket',
      title: language === 'vi' ? aboutContent.area4_title_vi : aboutContent.area4_title_en,
    },
    {
      icon: aboutContent.area5_icon || 'fa-chalkboard-teacher',
      title: language === 'vi' ? aboutContent.area5_title_vi : aboutContent.area5_title_en,
    },
    {
      icon: aboutContent.area6_icon || 'fa-handshake',
      title: language === 'vi' ? aboutContent.area6_title_vi : aboutContent.area6_title_en,
    },
    {
      icon: aboutContent.area7_icon || 'fa-digital-tachograph',
      title: language === 'vi' ? aboutContent.area7_title_vi : aboutContent.area7_title_en,
    }
  ]

  const values = [
    {
      icon: aboutContent.vision_icon,
      title: language === 'vi' ? aboutContent.vision_title_vi : aboutContent.vision_title_en,
      content: language === 'vi' ? aboutContent.vision_content_vi : aboutContent.vision_content_en,
      gradient: 'bg-gradient-blue',
      details: [
        {
          title: language === 'vi' ? aboutContent.value1_title_vi : aboutContent.value1_title_en,
          description: language === 'vi' ? aboutContent.value1_desc_vi : aboutContent.value1_desc_en
        }
      ]
    },
    {
      icon: aboutContent.mission_icon,
      title: language === 'vi' ? aboutContent.mission_title_vi : aboutContent.mission_title_en,
      content: language === 'vi' ? aboutContent.mission_content_vi : aboutContent.mission_content_en,
      gradient: 'bg-gradient-orange',
      details: [
        {
          title: language === 'vi' ? aboutContent.value2_title_vi : aboutContent.value2_title_en,
          description: language === 'vi' ? aboutContent.value2_desc_vi : aboutContent.value2_desc_en
        }
      ]
    },
    {
      icon: aboutContent.values_icon,
      title: language === 'vi' ? aboutContent.values_title_vi : aboutContent.values_title_en,
      content: language === 'vi' ? aboutContent.values_content_vi : aboutContent.values_content_en,
      gradient: 'bg-gradient-green',
      details: [
        {
          title: language === 'vi' ? aboutContent.value3_title_vi : aboutContent.value3_title_en,
          description: language === 'vi' ? aboutContent.value3_desc_vi : aboutContent.value3_desc_en
        }
      ]
    }
  ]

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-b-2 border-mekong-blue mb-4"></div>
          <p className="text-gray-600">{language === 'vi' ? 'Đang tải...' : 'Loading...'}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="relative bg-gradient-mekong py-16 md:py-20">
        <div className="container-custom">
          <div className="flex flex-col items-center text-center">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-block mb-6"
            >
              <div className="bg-white px-6 py-3 rounded-full shadow-lg">
                <p className="text-mekong-blue font-bold m-0">
                  🏆 {language === 'vi' ? aboutContent.badge_vi : aboutContent.badge_en}
                </p>
              </div>
            </motion.div>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl font-heading font-bold text-text-primary mb-8"
            >
              {language === 'vi' ? 'GIỚI THIỆU VỀ' : 'ABOUT'}{' '}
              <span className="text-mekong-blue">HAPPY</span>{' '}
              <span className="text-sunrise-orange">WORLD</span>{' '}
              <span className="text-rice-green">MEKONG</span>
            </motion.h1>

            {/* Content */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-2xl p-6 md:p-8 shadow-lg"
              >
                <p className="text-gray-700 leading-relaxed mb-4">
                  <span className="font-bold">Happy World Mekong</span>{' '}
                  {language === 'vi' ? aboutContent.intro_paragraph1_vi : aboutContent.intro_paragraph1_en}
                </p>
                <p className="text-gray-700 leading-relaxed mb-4">
                  <span className="font-bold">
                    {language === 'vi' ? 'Công ty Cổ phần Công nghệ Giáo dục Happy World Mekong' : 'Happy World Mekong Education Technology Co., Ltd'}
                  </span>{' '}
                  {language === 'vi' ? aboutContent.intro_paragraph2_vi : aboutContent.intro_paragraph2_en}
                </p>
                <p className="text-gray-700 leading-relaxed">
                  <span className="font-bold">Happy World Mekong</span>{' '}
                  {language === 'vi' ? aboutContent.intro_paragraph3_vi : aboutContent.intro_paragraph3_en}
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white rounded-2xl overflow-hidden shadow-lg"
              >
                <div className="aspect-video">
                  <iframe
                    className="w-full h-full"
                    src={aboutContent.youtube_video_url}
                    title="Happy World Mekong Introduction"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Activity Areas */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-text-primary">
              <span className="text-mekong-blue">HAPPY</span>{' '}
              <span className="text-sunrise-orange">WORLD</span>{' '}
              <span className="text-rice-green">MEKONG</span>{' '}
              {language === 'vi' ? aboutContent.main_areas_title_vi : aboutContent.main_areas_title_en}
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {mainAreas.map((area, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow p-6 flex flex-column items-center text-center"
              >
                <div className="w-full h-32 flex items-center justify-center mb-4">
                  <div className="w-24 h-24 bg-gradient-blue rounded-full flex items-center justify-center text-white text-3xl">
                    <i className={`fas ${area.icon}`}></i>
                  </div>
                </div>
                <p className="font-bold text-gray-900">{area.title}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Vision, Mission, Values */}
      <section className="section-padding bg-gradient-mekong">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.15 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl shadow-lg overflow-hidden group hover:shadow-xl transition-all"
              >
                {/* Header with Gradient */}
                <div className={`h-40 ${value.gradient} flex items-center justify-center text-white`}>
                  <div className="text-center">
                    <i className={`fas ${value.icon} text-5xl mb-3`}></i>
                    <h3 className="text-2xl font-bold">{value.title}</h3>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <p className="text-gray-700 leading-relaxed text-center">
                    {value.content}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership Team Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="inline-block px-4 py-2 bg-blue-50 text-mekong-blue rounded-full font-semibold mb-4">
              {language === 'vi' ? aboutContent.team_badge_vi : aboutContent.team_badge_en}
            </span>
            <h2 className="text-3xl md:text-4xl font-heading font-bold">
              {language === 'vi' ? aboutContent.team_title_vi : aboutContent.team_title_en}
            </h2>
          </motion.div>

          {loadingLeaders ? (
            <div className="text-center">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-mekong-blue"></div>
            </div>
          ) : leaders.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {leaders.map((leader, index) => (
                <motion.div
                  key={leader.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
                >
                  <div className="aspect-square bg-gray-200 overflow-hidden">
                    {leader.avatarUrl ? (
                      <img 
                        src={leader.avatarUrl} 
                        alt={leader.fullName}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <i className="fas fa-user-tie text-6xl text-gray-400"></i>
                      </div>
                    )}
                  </div>
                  <div className="p-6 text-center">
                    <h4 className="font-bold text-lg mb-1">
                      {leader.fullName}
                    </h4>
                    <p className="text-mekong-blue font-semibold mb-3">
                      {leader.position}
                    </p>
                    {leader.bio && (
                      <p className="text-gray-600 text-sm line-clamp-3">
                        {leader.bio}
                      </p>
                    )}
                    {(leader.linkedinUrl || leader.facebookUrl || leader.twitterUrl) && (
                      <div className="flex justify-center gap-3 mt-4">
                        {leader.linkedinUrl && (
                          <a href={leader.linkedinUrl} target="_blank" rel="noopener noreferrer" 
                             className="text-gray-600 hover:text-blue-600 transition-colors">
                            <i className="fab fa-linkedin text-xl"></i>
                          </a>
                        )}
                        {leader.facebookUrl && (
                          <a href={leader.facebookUrl} target="_blank" rel="noopener noreferrer"
                             className="text-gray-600 hover:text-blue-600 transition-colors">
                            <i className="fab fa-facebook text-xl"></i>
                          </a>
                        )}
                        {leader.twitterUrl && (
                          <a href={leader.twitterUrl} target="_blank" rel="noopener noreferrer"
                             className="text-gray-600 hover:text-blue-400 transition-colors">
                            <i className="fab fa-twitter text-xl"></i>
                          </a>
                        )}
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <i className="fas fa-users text-6xl text-gray-300 mb-4"></i>
              <p className="text-gray-600">
                {language === 'vi' ? 'Chưa có thông tin ban lãnh đạo' : 'No leadership information yet'}
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

export default About

