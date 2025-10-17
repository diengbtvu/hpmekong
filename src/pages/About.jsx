import React, { useState, useEffect } from 'react'
import { useLanguage } from '../i18n/config.jsx'
import api from '../services/api'
import { motion } from 'framer-motion'

const About = () => {
  const { t, language } = useLanguage()
  const [leaders, setLeaders] = useState([])
  const [loadingLeaders, setLoadingLeaders] = useState(true)

  useEffect(() => {
    const fetchLeaders = async () => {
      try {
        // Get top 3 instructors as leadership team
        const response = await api.get('/instructors', {
          params: {
            page: 0,
            size: 3
          }
        })
        
        if (response.data.success && response.data.data.content) {
          setLeaders(response.data.data.content)
        }
      } catch (error) {
        console.error('Error fetching leaders:', error)
        // Keep empty array as fallback
      } finally {
        setLoadingLeaders(false)
      }
    }

    fetchLeaders()
  }, [])

  const mainAreas = [
    {
      icon: '/images/icons/tech-edu.png',
      title: language === 'vi' ? 'Công nghệ giáo dục' : 'Educational Technology',
      titleEn: 'Educational Technology'
    },
    {
      icon: '/images/icons/skills.png',
      title: language === 'vi' ? 'Đào tạo tư duy kỹ năng mềm kỹ năng sống' : 'Thinking & Soft Skills Training',
      titleEn: 'Thinking & Soft Skills Training'
    },
    {
      icon: '/images/icons/career.png',
      title: language === 'vi' ? 'Định hướng nghề nghiệp, kết nối việc làm' : 'Career Guidance & Job Matching',
      titleEn: 'Career Guidance & Job Matching'
    },
    {
      icon: '/images/icons/startup.png',
      title: language === 'vi' ? 'Hỗ trợ khởi nghiệp và phát triển doanh nghiệp' : 'Startup Support & Business Development',
      titleEn: 'Startup Support & Business Development'
    },
    {
      icon: '/images/icons/consulting.png',
      title: language === 'vi' ? 'Tư vấn giáo dục, xây dựng chương trình đào tạo' : 'Education Consulting & Curriculum Development',
      titleEn: 'Education Consulting'
    },
    {
      icon: '/images/icons/training.png',
      title: language === 'vi' ? 'Hợp tác đào tạo theo nhu cầu doanh nghiệp' : 'Corporate Training Solutions',
      titleEn: 'Corporate Training'
    },
    {
      icon: '/images/icons/digital.png',
      title: language === 'vi' ? 'Chuyển đổi số trong giáo dục' : 'Digital Transformation in Education',
      titleEn: 'Digital Transformation'
    }
  ]

  const values = [
    {
      icon: 'fa-eye',
      title: language === 'vi' ? 'Tầm nhìn' : 'Vision',
      content: language === 'vi' 
        ? 'Trở thành Thương hiệu tiên phong dẫn đầu khu vực trong việc khai phóng tiềm năng thế hệ trẻ, tạo ra chuẩn mực mới về trang bị năng lực toàn diện để kiến tạo một tương lai thịnh vượng và hạnh phúc'
        : 'To become a pioneering brand leading the region in unleashing youth potential, creating new standards for comprehensive capacity building to construct a prosperous and happy future',
      gradient: 'bg-gradient-blue'
    },
    {
      icon: 'fa-bullseye',
      title: language === 'vi' ? 'Sứ mệnh' : 'Mission',
      content: language === 'vi'
        ? 'Happy World Mekong trở thành điểm chạm kỹ năng, luôn tiên phong mang đến cơ hội trang bị kỹ năng mềm, kiến thức nền tảng và năng lực tương lai thông qua các chương trình, giải pháp giáo dục hiện đại và dịch vụ công nghệ mới; Kiến tạo tương lai bằng cách khai phóng tiềm năng của thế hệ trẻ, góp phần xây dựng một thế giới hạnh phúc.'
        : 'Happy World Mekong becomes a skills touch point, always pioneering to bring opportunities to equip soft skills, foundational knowledge and future capabilities through modern education programs, solutions and new technology services; Building the future by unleashing youth potential, contributing to building a happy world.',
      gradient: 'bg-gradient-orange'
    },
    {
      icon: 'fa-gem',
      title: language === 'vi' ? 'Giá trị cốt lõi' : 'Core Values',
      content: language === 'vi'
        ? 'Tiên phong - Toàn diện - Bền vững'
        : 'Pioneering - Comprehensive - Sustainable',
      gradient: 'bg-gradient-green'
    }
  ]

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
                  🏆 {language === 'vi' ? 'Giáo dục từ miền Tây' : 'Education from the West'}
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
                  {language === 'vi' 
                    ? 'là Công ty công nghệ giáo dục khu vực Đồng bằng sông Cửu Long, chuyên cung cấp các giải pháp toàn diện về đào tạo tân tiến, định hướng nghề nghiệp, cung ứng nguồn nhân lực chất lượng cao và tạo môi trường cho khởi nghiệp.'
                    : 'is an educational technology company in the Mekong Delta region, specializing in providing comprehensive solutions for innovative training, career guidance, high-quality human resource supply, and creating an environment for entrepreneurship.'}
                </p>
                <p className="text-gray-700 leading-relaxed mb-4">
                  <span className="font-bold">
                    {language === 'vi' ? 'Công ty Cổ phần Công nghệ Giáo dục Happy World Mekong' : 'Happy World Mekong Education Technology Co., Ltd'}
                  </span>{' '}
                  {language === 'vi'
                    ? 'được sáng lập bởi những chuyên gia đào tạo và giảng viên uy tín - những người tâm huyết với sự nghiệp phát triển nguồn nhân lực vùng Đồng bằng sông Cửu Long.'
                    : 'was founded by reputable training experts and lecturers - people passionate about human resource development in the Mekong Delta region.'}
                </p>
                <p className="text-gray-700 leading-relaxed">
                  <span className="font-bold">Happy World Mekong</span>{' '}
                  {language === 'vi'
                    ? 'là đơn vị doanh nghiệp đào tạo kỹ năng toàn diện, định hướng nghề nghiệp cho học sinh, sinh viên, góp phần nâng cao chất lượng nguồn nhân lực tại khu vực miền Tây Nam Bộ.'
                    : 'is an enterprise providing comprehensive skills training and career guidance for students, contributing to improving human resource quality in the Southwest region.'}
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
                    src="https://www.youtube.com/embed/sCJunphEExA?si=vlYEK38MaI1B1KD-"
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
              {language === 'vi' ? 'HOẠT ĐỘNG TRONG 7 LĨNH VỰC CHÍNH' : 'OPERATES IN 7 MAIN AREAS'}
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
                    <i className={`fas fa-${index % 4 === 0 ? 'laptop-code' : index % 4 === 1 ? 'brain' : index % 4 === 2 ? 'briefcase' : 'rocket'}`}></i>
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

      {/* Team Section (Placeholder for now) */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="inline-block px-4 py-2 bg-blue-50 text-mekong-blue rounded-full font-semibold mb-4">
              {language === 'vi' ? 'Đội ngũ' : 'Our Team'}
            </span>
            <h2 className="text-3xl md:text-4xl font-heading font-bold">
              {language === 'vi' ? 'Ban Lãnh Đạo' : 'Leadership Team'}
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
                    {leader.avatar ? (
                      <img 
                        src={leader.avatar} 
                        alt={leader.name}
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
                      {leader.name}
                    </h4>
                    <p className="text-mekong-blue font-semibold mb-3">
                      {leader.title || (language === 'vi' ? 'Giảng viên' : 'Instructor')}
                    </p>
                    <p className="text-gray-600 text-sm">
                      {leader.bio || leader.expertise || 
                        (language === 'vi' 
                          ? 'Chuyên gia với nhiều năm kinh nghiệm trong lĩnh vực giáo dục và đào tạo.'
                          : 'Expert with years of experience in education and training.')}
                    </p>
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

