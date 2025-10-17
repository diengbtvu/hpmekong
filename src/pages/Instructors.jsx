import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useLanguage } from '../i18n/config.jsx'
import { motion } from 'framer-motion'
import InstructorCard from '../components/common/InstructorCard'
import { CENTERS } from '../utils/constants'
import api from '../services/api'

const Instructors = () => {
  const { t, language } = useLanguage()
  const [selectedInstructor, setSelectedInstructor] = useState(null)
  const [filterCenter, setFilterCenter] = useState('all')
  const [instructors, setInstructors] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchInstructors = async () => {
      try {
        const response = await api.get('/instructors', {
          params: {
            page: 0,
            size: 100
          }
        })
        
        if (response.data.success) {
          setInstructors(response.data.data.content || [])
        }
      } catch (error) {
        console.error('Error fetching instructors:', error)
        setInstructors([])
      } finally {
        setLoading(false)
      }
    }

    fetchInstructors()
  }, [language])

  // Mock data - ONLY for reference, NOT used
  const mockInstructorsReference = [
    {
      id: 1,
      name: language === 'vi' ? 'Nguyễn Văn An' : 'Nguyen Van An',
      title: language === 'vi' ? 'Tiến sĩ, Giảng viên cao cấp' : 'Ph.D., Senior Lecturer',
      avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80',
      expertise: language === 'vi' ? 'Kỹ năng lãnh đạo, Quản trị doanh nghiệp' : 'Leadership Skills, Business Management',
      experience: 15,
      coursesCount: 12,
      studentsCount: 5420,
      rating: 4.9,
      centerId: 1,
      bio: language === 'vi'
        ? 'Tiến sĩ Nguyễn Văn An có hơn 15 năm kinh nghiệm giảng dạy và tư vấn doanh nghiệp. Chuyên gia hàng đầu về kỹ năng lãnh đạo và quản trị.'
        : 'Dr. Nguyen Van An has over 15 years of teaching and business consulting experience. Leading expert in leadership skills and management.',
      achievements: language === 'vi'
        ? ['Giải thưởng Giảng viên xuất sắc 2023', 'Tác giả 5 cuốn sách về lãnh đạo', '10+ năm làm CEO']
        : ['Outstanding Lecturer Award 2023', 'Author of 5 leadership books', '10+ years as CEO']
    },
    {
      id: 2,
      name: language === 'vi' ? 'Trần Thị Bình' : 'Tran Thi Binh',
      title: language === 'vi' ? 'Thạc sĩ, Chuyên gia Marketing' : 'Master, Marketing Expert',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80',
      expertise: language === 'vi' ? 'Marketing số, Content Marketing' : 'Digital Marketing, Content Marketing',
      experience: 10,
      coursesCount: 8,
      studentsCount: 3200,
      rating: 4.8,
      centerId: 1,
      bio: language === 'vi'
        ? 'Chuyên gia marketing với 10 năm kinh nghiệm thực chiến. Đã tư vấn cho hơn 100 doanh nghiệp về chiến lược marketing.'
        : '10 years of practical marketing experience. Consulted over 100 businesses on marketing strategies.'
    },
    {
      id: 3,
      name: language === 'vi' ? 'Lê Hoàng Cường' : 'Le Hoang Cuong',
      title: language === 'vi' ? 'CEO, Chuyên gia khởi nghiệp' : 'CEO, Startup Expert',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80',
      expertise: language === 'vi' ? 'Khởi nghiệp, Phát triển sản phẩm' : 'Entrepreneurship, Product Development',
      experience: 12,
      coursesCount: 6,
      studentsCount: 1850,
      rating: 5.0,
      centerId: 3,
      bio: language === 'vi'
        ? 'Founder & CEO của 3 công ty công nghệ thành công. Mentor cho hơn 50 startup tại miền Tây.'
        : 'Founder & CEO of 3 successful tech companies. Mentor for 50+ startups in Southwest region.'
    },
  ]

  const filteredInstructors = filterCenter === 'all'
    ? instructors
    : instructors.filter(inst => inst.centerId === parseInt(filterCenter))

  return (
    <div className="instructors-page">
      {/* Hero Banner */}
      <section className="bg-gradient-mekong py-16 md:py-20">
        <div className="container-custom text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-heading font-bold text-text-primary mb-4"
          >
            {t('instructors.title')}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-gray-700 max-w-2xl mx-auto"
          >
            {t('instructors.subtitle')}
          </motion.p>
        </div>
      </section>

      {/* Instructors Grid */}
      <section className="py-12">
        <div className="container-custom">
          {/* Filter */}
          <div className="flex items-center justify-between mb-8">
            <p className="text-gray-600">
              {filteredInstructors.length} {language === 'vi' ? 'giảng viên' : 'instructors'}
            </p>
            <select
              value={filterCenter}
              onChange={(e) => setFilterCenter(e.target.value)}
              className="px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-mekong-blue outline-none"
            >
              <option value="all">{language === 'vi' ? 'Tất cả Trung tâm' : 'All Centers'}</option>
              {CENTERS.map(center => (
                <option key={center.id} value={center.id}>{center.name}</option>
              ))}
            </select>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredInstructors.map((instructor, index) => (
              <InstructorCard
                key={instructor.id}
                instructor={instructor}
                index={index}
                onClick={() => setSelectedInstructor(instructor)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Instructor Detail Modal */}
      {selectedInstructor && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setSelectedInstructor(null)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="grid grid-cols-1 md:grid-cols-2">
              {/* Left: Image */}
              <div className="relative">
                {selectedInstructor.avatar ? (
                  <img
                    src={selectedInstructor.avatar}
                    alt={selectedInstructor.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-96 bg-gray-200 flex items-center justify-center">
                    <i className="fas fa-user-tie text-9xl text-gray-400"></i>
                  </div>
                )}
                <button
                  onClick={() => setSelectedInstructor(null)}
                  className="absolute top-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors"
                >
                  <i className="fas fa-times text-xl"></i>
                </button>
              </div>

              {/* Right: Info */}
              <div className="p-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">
                  {selectedInstructor.name}
                </h2>
                <p className="text-mekong-blue font-semibold text-lg mb-4">
                  {selectedInstructor.title}
                </p>

                <div className="space-y-4 mb-6">
                  <div>
                    <h4 className="font-bold mb-2">{t('instructors.expertise')}</h4>
                    <p className="text-gray-700">{selectedInstructor.expertise}</p>
                  </div>

                  <div>
                    <h4 className="font-bold mb-2">{language === 'vi' ? 'Giới thiệu' : 'Biography'}</h4>
                    <p className="text-gray-700">{selectedInstructor.bio}</p>
                  </div>

                  {selectedInstructor.achievements && (
                    <div>
                      <h4 className="font-bold mb-2">{t('instructors.achievements')}</h4>
                      <ul className="space-y-2">
                        {selectedInstructor.achievements.map((achievement, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-gray-700">
                            <i className="fas fa-trophy text-sunrise-orange mt-1"></i>
                            <span>{achievement}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className="flex items-center gap-6 pt-4 border-t">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-mekong-blue">{selectedInstructor.coursesCount}</div>
                      <div className="text-xs text-gray-600">{language === 'vi' ? 'Khóa học' : 'Courses'}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-sunrise-orange">{selectedInstructor.studentsCount?.toLocaleString()}</div>
                      <div className="text-xs text-gray-600">{language === 'vi' ? 'Học viên' : 'Students'}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-rice-green">{selectedInstructor.rating}</div>
                      <div className="text-xs text-gray-600">⭐ Rating</div>
                    </div>
                  </div>
                </div>

                <Link
                  to={`/instructors/${selectedInstructor.id}/courses`}
                  className="btn btn-primary w-full justify-center"
                >
                  {t('instructors.coursesTeaching')}
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  )
}

export default Instructors

