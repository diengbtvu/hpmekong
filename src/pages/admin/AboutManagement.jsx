import React, { useState, useEffect } from 'react'
import { useLanguage } from '../../i18n/config.jsx'
import FormInput from '../../components/admin/FormInput'
import { settingsService } from '../../services/contentService'

const AboutManagement = () => {
  const { t, language } = useLanguage()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [formData, setFormData] = useState({
    // Hero section
    badge_vi: '',
    badge_en: '',
    
    // Introduction paragraphs
    intro_paragraph1_vi: '',
    intro_paragraph1_en: '',
    intro_paragraph2_vi: '',
    intro_paragraph2_en: '',
    intro_paragraph3_vi: '',
    intro_paragraph3_en: '',
    
    // YouTube video
    youtube_video_url: '',
    
    // Main activity areas section title
    main_areas_title_vi: '',
    main_areas_title_en: '',
    
    // Main activity areas (7 areas)
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
    
    // Vision
    vision_title_vi: '',
    vision_title_en: '',
    vision_content_vi: '',
    vision_content_en: '',
    vision_icon: 'fa-eye',
    
    // Mission
    mission_title_vi: '',
    mission_title_en: '',
    mission_content_vi: '',
    mission_content_en: '',
    mission_icon: 'fa-bullseye',
    
    // Core Values
    values_title_vi: '',
    values_title_en: '',
    values_content_vi: '',
    values_content_en: '',
    values_icon: 'fa-gem',
    
    // Core values details
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
    
    // Team section
    team_badge_vi: '',
    team_badge_en: '',
    team_title_vi: '',
    team_title_en: '',
  })

  useEffect(() => {
    fetchSettings()
  }, [])

  const fetchSettings = async () => {
    try {
      setLoading(true)
      const response = await settingsService.getSettingsByGroup('about')
      
      if (response.success && response.data) {
        const settings = response.data
        setFormData({
          badge_vi: settings.badge_vi || 'Giáo dục từ miền Tây',
          badge_en: settings.badge_en || 'Education from the West',
          
          intro_paragraph1_vi: settings.intro_paragraph1_vi || 'là Công ty công nghệ giáo dục khu vực Đồng bằng sông Cửu Long, chuyên cung cấp các giải pháp toàn diện về đào tạo tân tiến, định hướng nghề nghiệp, cung ứng nguồn nhân lực chất lượng cao và tạo môi trường cho khởi nghiệp.',
          intro_paragraph1_en: settings.intro_paragraph1_en || 'is an educational technology company in the Mekong Delta region, specializing in providing comprehensive solutions for innovative training, career guidance, high-quality human resource supply, and creating an environment for entrepreneurship.',
          
          intro_paragraph2_vi: settings.intro_paragraph2_vi || 'được sáng lập bởi những chuyên gia đào tạo và giảng viên uy tín - những người tâm huyết với sự nghiệp phát triển nguồn nhân lực vùng Đồng bằng sông Cửu Long.',
          intro_paragraph2_en: settings.intro_paragraph2_en || 'was founded by reputable training experts and lecturers - people passionate about human resource development in the Mekong Delta region.',
          
          intro_paragraph3_vi: settings.intro_paragraph3_vi || 'là đơn vị doanh nghiệp đào tạo kỹ năng toàn diện, định hướng nghề nghiệp cho học sinh, sinh viên, góp phần nâng cao chất lượng nguồn nhân lực tại khu vực miền Tây Nam Bộ.',
          intro_paragraph3_en: settings.intro_paragraph3_en || 'is an enterprise providing comprehensive skills training and career guidance for students, contributing to improving human resource quality in the Southwest region.',
          
          youtube_video_url: settings.youtube_video_url || 'https://www.youtube.com/embed/sCJunphEExA?si=vlYEK38MaI1B1KD-',
          
          main_areas_title_vi: settings.main_areas_title_vi || 'HOẠT ĐỘNG TRONG 7 LĨNH VỰC CHÍNH',
          main_areas_title_en: settings.main_areas_title_en || 'OPERATES IN 7 MAIN AREAS',
          
          // 7 Main Activity Areas
          area1_title_vi: settings.area1_title_vi || 'Công nghệ giáo dục',
          area1_title_en: settings.area1_title_en || 'Educational Technology',
          area1_icon: settings.area1_icon || 'fa-laptop-code',
          
          area2_title_vi: settings.area2_title_vi || 'Đào tạo tư duy kỹ năng mềm kỹ năng sống',
          area2_title_en: settings.area2_title_en || 'Thinking & Soft Skills Training',
          area2_icon: settings.area2_icon || 'fa-brain',
          
          area3_title_vi: settings.area3_title_vi || 'Định hướng nghề nghiệp, kết nối việc làm',
          area3_title_en: settings.area3_title_en || 'Career Guidance & Job Matching',
          area3_icon: settings.area3_icon || 'fa-briefcase',
          
          area4_title_vi: settings.area4_title_vi || 'Hỗ trợ khởi nghiệp và phát triển doanh nghiệp',
          area4_title_en: settings.area4_title_en || 'Startup Support & Business Development',
          area4_icon: settings.area4_icon || 'fa-rocket',
          
          area5_title_vi: settings.area5_title_vi || 'Tư vấn giáo dục, xây dựng chương trình đào tạo',
          area5_title_en: settings.area5_title_en || 'Education Consulting & Curriculum Development',
          area5_icon: settings.area5_icon || 'fa-chalkboard-teacher',
          
          area6_title_vi: settings.area6_title_vi || 'Hợp tác đào tạo theo nhu cầu doanh nghiệp',
          area6_title_en: settings.area6_title_en || 'Corporate Training Solutions',
          area6_icon: settings.area6_icon || 'fa-handshake',
          
          area7_title_vi: settings.area7_title_vi || 'Chuyển đổi số trong giáo dục',
          area7_title_en: settings.area7_title_en || 'Digital Transformation in Education',
          area7_icon: settings.area7_icon || 'fa-digital-tachograph',
          
          vision_title_vi: settings.vision_title_vi || 'Tầm nhìn',
          vision_title_en: settings.vision_title_en || 'Vision',
          vision_content_vi: settings.vision_content_vi || 'Trở thành Thương hiệu tiên phong dẫn đầu khu vực trong việc khai phóng tiềm năng thế hệ trẻ, tạo ra chuẩn mực mới về trang bị năng lực toàn diện để kiến tạo một tương lai thịnh vượng và hạnh phúc',
          vision_content_en: settings.vision_content_en || 'To become a pioneering brand leading the region in unleashing youth potential, creating new standards for comprehensive capacity building to construct a prosperous and happy future',
          vision_icon: settings.vision_icon || 'fa-eye',
          
          mission_title_vi: settings.mission_title_vi || 'Sứ mệnh',
          mission_title_en: settings.mission_title_en || 'Mission',
          mission_content_vi: settings.mission_content_vi || 'Happy World Mekong trở thành điểm chạm kỹ năng, luôn tiên phong mang đến cơ hội trang bị kỹ năng mềm, kiến thức nền tảng và năng lực tương lai thông qua các chương trình, giải pháp giáo dục hiện đại và dịch vụ công nghệ mới; Kiến tạo tương lai bằng cách khai phóng tiềm năng của thế hệ trẻ, góp phần xây dựng một thế giới hạnh phúc',
          mission_content_en: settings.mission_content_en || 'Happy World Mekong becomes a skills touch point, always pioneering to bring opportunities to equip soft skills, foundational knowledge and future capabilities through modern education programs, solutions and new technology services; Building the future by unleashing youth potential, contributing to building a happy world.',
          mission_icon: settings.mission_icon || 'fa-bullseye',
          
          values_title_vi: settings.values_title_vi || 'Giá trị cốt lõi',
          values_title_en: settings.values_title_en || 'Core Values',
          values_content_vi: settings.values_content_vi || 'Tiên phong - Toàn diện - Bền vững',
          values_content_en: settings.values_content_en || 'Pioneering - Comprehensive - Sustainable',
          values_icon: settings.values_icon || 'fa-gem',
          
          value1_title_vi: settings.value1_title_vi || 'Tiên phong',
          value1_title_en: settings.value1_title_en || 'Pioneering',
          value1_desc_vi: settings.value1_desc_vi || 'Dẫn đầu và sáng tạo, áp dụng công nghệ mới, tạo ra chuẩn mực mới trong giáo dục',
          value1_desc_en: settings.value1_desc_en || 'Lead and innovate, apply new technology, create new standards in education',
          
          value2_title_vi: settings.value2_title_vi || 'Toàn diện',
          value2_title_en: settings.value2_title_en || 'Comprehensive',
          value2_desc_vi: settings.value2_desc_vi || 'Trang bị đầy đủ kỹ năng mềm, kiến thức nền tảng và năng lực tương lai cho người học',
          value2_desc_en: settings.value2_desc_en || 'Equip learners with full soft skills, foundational knowledge and future capabilities',
          
          value3_title_vi: settings.value3_title_vi || 'Bền vững',
          value3_title_en: settings.value3_title_en || 'Sustainable',
          value3_desc_vi: settings.value3_desc_vi || 'Tạo ra sự phát triển lâu dài cho cá nhân và xã hội, kiến tạo tương lai thịnh vượng',
          value3_desc_en: settings.value3_desc_en || 'Create long-term development for individuals and society, build a prosperous future',
          
          team_badge_vi: settings.team_badge_vi || 'Đội ngũ',
          team_badge_en: settings.team_badge_en || 'Our Team',
          team_title_vi: settings.team_title_vi || 'Ban Lãnh Đạo',
          team_title_en: settings.team_title_en || 'Leadership Team',
        })
      }
    } catch (error) {
      console.error('Error fetching settings:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async () => {
    try {
      setSaving(true)
      
      // Prepare settings array
      const settings = Object.keys(formData).map(key => ({
        key: key,
        value: formData[key],
        group: 'about'
      }))

      // Save each setting (upsert: create if not exists, update if exists)
      await Promise.all(
        settings.map(setting => 
          settingsService.upsertSetting(setting.key, {
            value: setting.value,
            group: setting.group
          })
        )
      )

      alert(language === 'vi' ? 'Lưu thành công!' : 'Saved successfully!')
    } catch (error) {
      console.error('Error saving settings:', error)
      alert(language === 'vi' ? 'Có lỗi xảy ra!' : 'An error occurred!')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="about-management">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            {language === 'vi' ? 'Quản lý Về Chúng Tôi' : 'About Us Management'}
          </h1>
          <p className="text-gray-600 mt-1">
            {language === 'vi' 
              ? 'Cấu hình nội dung trang Về Chúng Tôi' 
              : 'Configure About Us page content'}
          </p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="btn btn-primary flex items-center gap-2"
        >
          {saving ? (
            <>
              <i className="fas fa-spinner fa-spin"></i>
              {language === 'vi' ? 'Đang lưu...' : 'Saving...'}
            </>
          ) : (
            <>
              <i className="fas fa-save"></i>
              {language === 'vi' ? 'Lưu thay đổi' : 'Save Changes'}
            </>
          )}
        </button>
      </div>

      <div className="space-y-6">
        {/* Hero Section */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <i className="fas fa-star text-yellow-500"></i>
            {language === 'vi' ? 'Hero Section - Badge' : 'Hero Section - Badge'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormInput
              label="Badge (Tiếng Việt)"
              value={formData.badge_vi}
              onChange={(e) => setFormData({...formData, badge_vi: e.target.value})}
              placeholder="🏆 Giáo dục từ miền Tây"
            />
            <FormInput
              label="Badge (English)"
              value={formData.badge_en}
              onChange={(e) => setFormData({...formData, badge_en: e.target.value})}
              placeholder="🏆 Education from the West"
            />
          </div>
        </div>

        {/* Introduction Section */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <i className="fas fa-align-left text-blue-500"></i>
            {language === 'vi' ? 'Giới thiệu' : 'Introduction'}
          </h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {language === 'vi' ? 'Đoạn 1 (Tiếng Việt)' : 'Paragraph 1 (Vietnamese)'}
              </label>
              <textarea
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                value={formData.intro_paragraph1_vi}
                onChange={(e) => setFormData({...formData, intro_paragraph1_vi: e.target.value})}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {language === 'vi' ? 'Đoạn 1 (English)' : 'Paragraph 1 (English)'}
              </label>
              <textarea
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                value={formData.intro_paragraph1_en}
                onChange={(e) => setFormData({...formData, intro_paragraph1_en: e.target.value})}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {language === 'vi' ? 'Đoạn 2 (Tiếng Việt)' : 'Paragraph 2 (Vietnamese)'}
              </label>
              <textarea
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                value={formData.intro_paragraph2_vi}
                onChange={(e) => setFormData({...formData, intro_paragraph2_vi: e.target.value})}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {language === 'vi' ? 'Đoạn 2 (English)' : 'Paragraph 2 (English)'}
              </label>
              <textarea
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                value={formData.intro_paragraph2_en}
                onChange={(e) => setFormData({...formData, intro_paragraph2_en: e.target.value})}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {language === 'vi' ? 'Đoạn 3 (Tiếng Việt)' : 'Paragraph 3 (Vietnamese)'}
              </label>
              <textarea
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                value={formData.intro_paragraph3_vi}
                onChange={(e) => setFormData({...formData, intro_paragraph3_vi: e.target.value})}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {language === 'vi' ? 'Đoạn 3 (English)' : 'Paragraph 3 (English)'}
              </label>
              <textarea
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                value={formData.intro_paragraph3_en}
                onChange={(e) => setFormData({...formData, intro_paragraph3_en: e.target.value})}
              />
            </div>
          </div>
        </div>

        {/* YouTube Video */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <i className="fab fa-youtube text-red-500"></i>
            {language === 'vi' ? 'Video giới thiệu' : 'Introduction Video'}
          </h2>
          <FormInput
            label={language === 'vi' ? 'YouTube Video URL (Embed)' : 'YouTube Video URL (Embed)'}
            value={formData.youtube_video_url}
            onChange={(e) => setFormData({...formData, youtube_video_url: e.target.value})}
            placeholder="https://www.youtube.com/embed/VIDEO_ID"
            help={language === 'vi' 
              ? 'Nhập URL embed của YouTube (bắt đầu với https://www.youtube.com/embed/)' 
              : 'Enter YouTube embed URL (starting with https://www.youtube.com/embed/)'}
          />
          
          {/* Preview */}
          {formData.youtube_video_url && (
            <div className="mt-4">
              <p className="text-sm font-medium text-gray-700 mb-2">
                {language === 'vi' ? 'Xem trước:' : 'Preview:'}
              </p>
              <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
                <iframe
                  className="w-full h-full"
                  src={formData.youtube_video_url}
                  title="Preview"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          )}
        </div>

        {/* Main Areas Title */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <i className="fas fa-list text-green-500"></i>
            {language === 'vi' ? 'Lĩnh vực hoạt động - Tiêu đề chung' : 'Main Activity Areas - Section Title'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormInput
              label={language === 'vi' ? 'Tiêu đề (Tiếng Việt)' : 'Title (Vietnamese)'}
              value={formData.main_areas_title_vi}
              onChange={(e) => setFormData({...formData, main_areas_title_vi: e.target.value})}
            />
            <FormInput
              label={language === 'vi' ? 'Tiêu đề (English)' : 'Title (English)'}
              value={formData.main_areas_title_en}
              onChange={(e) => setFormData({...formData, main_areas_title_en: e.target.value})}
            />
          </div>
        </div>

        {/* 7 Main Activity Areas Details */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <i className="fas fa-th-large text-purple-500"></i>
            {language === 'vi' ? '7 Lĩnh vực hoạt động chính' : '7 Main Activity Areas'}
          </h2>
          
          <div className="space-y-6">
            {[1, 2, 3, 4, 5, 6, 7].map((num) => (
              <div key={num} className="p-4 bg-gray-50 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <span className="w-8 h-8 bg-mekong-blue text-white rounded-full flex items-center justify-center text-sm">
                    {num}
                  </span>
                  {language === 'vi' ? `Lĩnh vực ${num}` : `Area ${num}`}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <FormInput
                    label={language === 'vi' ? 'Tiêu đề (Tiếng Việt)' : 'Title (Vietnamese)'}
                    value={formData[`area${num}_title_vi`]}
                    onChange={(e) => setFormData({...formData, [`area${num}_title_vi`]: e.target.value})}
                  />
                  <FormInput
                    label={language === 'vi' ? 'Tiêu đề (English)' : 'Title (English)'}
                    value={formData[`area${num}_title_en`]}
                    onChange={(e) => setFormData({...formData, [`area${num}_title_en`]: e.target.value})}
                  />
                  <FormInput
                    label="Icon (FontAwesome)"
                    value={formData[`area${num}_icon`]}
                    onChange={(e) => setFormData({...formData, [`area${num}_icon`]: e.target.value})}
                    placeholder="fa-laptop-code"
                    help={
                      <div className="flex items-center gap-2 mt-1">
                        <i className={`fas ${formData[`area${num}_icon`]} text-mekong-blue`}></i>
                        <span className="text-xs text-gray-500">Preview</span>
                      </div>
                    }
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Vision */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <i className="fas fa-eye text-blue-500"></i>
            {language === 'vi' ? 'Tầm nhìn' : 'Vision'}
          </h2>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <FormInput
                label={language === 'vi' ? 'Tiêu đề (Tiếng Việt)' : 'Title (Vietnamese)'}
                value={formData.vision_title_vi}
                onChange={(e) => setFormData({...formData, vision_title_vi: e.target.value})}
              />
              <FormInput
                label={language === 'vi' ? 'Tiêu đề (English)' : 'Title (English)'}
                value={formData.vision_title_en}
                onChange={(e) => setFormData({...formData, vision_title_en: e.target.value})}
              />
              <FormInput
                label="Icon (FontAwesome)"
                value={formData.vision_icon}
                onChange={(e) => setFormData({...formData, vision_icon: e.target.value})}
                placeholder="fa-eye"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {language === 'vi' ? 'Nội dung (Tiếng Việt)' : 'Content (Vietnamese)'}
              </label>
              <textarea
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                value={formData.vision_content_vi}
                onChange={(e) => setFormData({...formData, vision_content_vi: e.target.value})}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {language === 'vi' ? 'Nội dung (English)' : 'Content (English)'}
              </label>
              <textarea
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                value={formData.vision_content_en}
                onChange={(e) => setFormData({...formData, vision_content_en: e.target.value})}
              />
            </div>
          </div>
        </div>

        {/* Mission */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <i className="fas fa-bullseye text-orange-500"></i>
            {language === 'vi' ? 'Sứ mệnh' : 'Mission'}
          </h2>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <FormInput
                label={language === 'vi' ? 'Tiêu đề (Tiếng Việt)' : 'Title (Vietnamese)'}
                value={formData.mission_title_vi}
                onChange={(e) => setFormData({...formData, mission_title_vi: e.target.value})}
              />
              <FormInput
                label={language === 'vi' ? 'Tiêu đề (English)' : 'Title (English)'}
                value={formData.mission_title_en}
                onChange={(e) => setFormData({...formData, mission_title_en: e.target.value})}
              />
              <FormInput
                label="Icon (FontAwesome)"
                value={formData.mission_icon}
                onChange={(e) => setFormData({...formData, mission_icon: e.target.value})}
                placeholder="fa-bullseye"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {language === 'vi' ? 'Nội dung (Tiếng Việt)' : 'Content (Vietnamese)'}
              </label>
              <textarea
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                value={formData.mission_content_vi}
                onChange={(e) => setFormData({...formData, mission_content_vi: e.target.value})}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {language === 'vi' ? 'Nội dung (English)' : 'Content (English)'}
              </label>
              <textarea
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                value={formData.mission_content_en}
                onChange={(e) => setFormData({...formData, mission_content_en: e.target.value})}
              />
            </div>
          </div>
        </div>

        {/* Core Values Summary */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <i className="fas fa-gem text-green-500"></i>
            {language === 'vi' ? 'Giá trị cốt lõi (Tóm tắt)' : 'Core Values (Summary)'}
          </h2>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <FormInput
                label={language === 'vi' ? 'Tiêu đề (Tiếng Việt)' : 'Title (Vietnamese)'}
                value={formData.values_title_vi}
                onChange={(e) => setFormData({...formData, values_title_vi: e.target.value})}
              />
              <FormInput
                label={language === 'vi' ? 'Tiêu đề (English)' : 'Title (English)'}
                value={formData.values_title_en}
                onChange={(e) => setFormData({...formData, values_title_en: e.target.value})}
              />
              <FormInput
                label="Icon (FontAwesome)"
                value={formData.values_icon}
                onChange={(e) => setFormData({...formData, values_icon: e.target.value})}
                placeholder="fa-gem"
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormInput
                label={language === 'vi' ? 'Nội dung ngắn (Tiếng Việt)' : 'Short Content (Vietnamese)'}
                value={formData.values_content_vi}
                onChange={(e) => setFormData({...formData, values_content_vi: e.target.value})}
                placeholder="Tiên phong - Toàn diện - Bền vững"
              />
              <FormInput
                label={language === 'vi' ? 'Nội dung ngắn (English)' : 'Short Content (English)'}
                value={formData.values_content_en}
                onChange={(e) => setFormData({...formData, values_content_en: e.target.value})}
                placeholder="Pioneering - Comprehensive - Sustainable"
              />
            </div>
          </div>
        </div>

        {/* Core Values Details */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <i className="fas fa-list-check text-purple-500"></i>
            {language === 'vi' ? 'Chi tiết Giá trị cốt lõi' : 'Core Values Details'}
          </h2>
          
          {/* Value 1: Pioneering */}
          <div className="mb-6 p-4 bg-blue-50 rounded-lg">
            <h3 className="font-semibold text-blue-900 mb-3">
              {language === 'vi' ? 'Giá trị 1: Tiên phong' : 'Value 1: Pioneering'}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormInput
                label={language === 'vi' ? 'Tiêu đề (Tiếng Việt)' : 'Title (Vietnamese)'}
                value={formData.value1_title_vi}
                onChange={(e) => setFormData({...formData, value1_title_vi: e.target.value})}
              />
              <FormInput
                label={language === 'vi' ? 'Tiêu đề (English)' : 'Title (English)'}
                value={formData.value1_title_en}
                onChange={(e) => setFormData({...formData, value1_title_en: e.target.value})}
              />
              <FormInput
                label={language === 'vi' ? 'Mô tả (Tiếng Việt)' : 'Description (Vietnamese)'}
                value={formData.value1_desc_vi}
                onChange={(e) => setFormData({...formData, value1_desc_vi: e.target.value})}
              />
              <FormInput
                label={language === 'vi' ? 'Mô tả (English)' : 'Description (English)'}
                value={formData.value1_desc_en}
                onChange={(e) => setFormData({...formData, value1_desc_en: e.target.value})}
              />
            </div>
          </div>

          {/* Value 2: Comprehensive */}
          <div className="mb-6 p-4 bg-green-50 rounded-lg">
            <h3 className="font-semibold text-green-900 mb-3">
              {language === 'vi' ? 'Giá trị 2: Toàn diện' : 'Value 2: Comprehensive'}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormInput
                label={language === 'vi' ? 'Tiêu đề (Tiếng Việt)' : 'Title (Vietnamese)'}
                value={formData.value2_title_vi}
                onChange={(e) => setFormData({...formData, value2_title_vi: e.target.value})}
              />
              <FormInput
                label={language === 'vi' ? 'Tiêu đề (English)' : 'Title (English)'}
                value={formData.value2_title_en}
                onChange={(e) => setFormData({...formData, value2_title_en: e.target.value})}
              />
              <FormInput
                label={language === 'vi' ? 'Mô tả (Tiếng Việt)' : 'Description (Vietnamese)'}
                value={formData.value2_desc_vi}
                onChange={(e) => setFormData({...formData, value2_desc_vi: e.target.value})}
              />
              <FormInput
                label={language === 'vi' ? 'Mô tả (English)' : 'Description (English)'}
                value={formData.value2_desc_en}
                onChange={(e) => setFormData({...formData, value2_desc_en: e.target.value})}
              />
            </div>
          </div>

          {/* Value 3: Sustainable */}
          <div className="p-4 bg-yellow-50 rounded-lg">
            <h3 className="font-semibold text-yellow-900 mb-3">
              {language === 'vi' ? 'Giá trị 3: Bền vững' : 'Value 3: Sustainable'}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormInput
                label={language === 'vi' ? 'Tiêu đề (Tiếng Việt)' : 'Title (Vietnamese)'}
                value={formData.value3_title_vi}
                onChange={(e) => setFormData({...formData, value3_title_vi: e.target.value})}
              />
              <FormInput
                label={language === 'vi' ? 'Tiêu đề (English)' : 'Title (English)'}
                value={formData.value3_title_en}
                onChange={(e) => setFormData({...formData, value3_title_en: e.target.value})}
              />
              <FormInput
                label={language === 'vi' ? 'Mô tả (Tiếng Việt)' : 'Description (Vietnamese)'}
                value={formData.value3_desc_vi}
                onChange={(e) => setFormData({...formData, value3_desc_vi: e.target.value})}
              />
              <FormInput
                label={language === 'vi' ? 'Mô tả (English)' : 'Description (English)'}
                value={formData.value3_desc_en}
                onChange={(e) => setFormData({...formData, value3_desc_en: e.target.value})}
              />
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <i className="fas fa-users text-indigo-500"></i>
            {language === 'vi' ? 'Ban lãnh đạo' : 'Leadership Team'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="grid grid-cols-2 gap-4">
              <FormInput
                label={language === 'vi' ? 'Badge (Tiếng Việt)' : 'Badge (Vietnamese)'}
                value={formData.team_badge_vi}
                onChange={(e) => setFormData({...formData, team_badge_vi: e.target.value})}
                placeholder="Đội ngũ"
              />
              <FormInput
                label={language === 'vi' ? 'Badge (English)' : 'Badge (English)'}
                value={formData.team_badge_en}
                onChange={(e) => setFormData({...formData, team_badge_en: e.target.value})}
                placeholder="Our Team"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <FormInput
                label={language === 'vi' ? 'Tiêu đề (Tiếng Việt)' : 'Title (Vietnamese)'}
                value={formData.team_title_vi}
                onChange={(e) => setFormData({...formData, team_title_vi: e.target.value})}
                placeholder="Ban Lãnh Đạo"
              />
              <FormInput
                label={language === 'vi' ? 'Tiêu đề (English)' : 'Title (English)'}
                value={formData.team_title_en}
                onChange={(e) => setFormData({...formData, team_title_en: e.target.value})}
                placeholder="Leadership Team"
              />
            </div>
          </div>
          <p className="text-sm text-gray-500 mt-2">
            <i className="fas fa-info-circle"></i>{' '}
            {language === 'vi' 
              ? 'Danh sách ban lãnh đạo được lấy từ 3 giảng viên đầu tiên trong hệ thống.' 
              : 'Leadership team list is taken from the first 3 instructors in the system.'}
          </p>
        </div>

        {/* Save Button (Bottom) */}
        <div className="flex justify-end">
          <button
            onClick={handleSave}
            disabled={saving}
            className="btn btn-primary btn-lg flex items-center gap-2"
          >
            {saving ? (
              <>
                <i className="fas fa-spinner fa-spin"></i>
                {language === 'vi' ? 'Đang lưu...' : 'Saving...'}
              </>
            ) : (
              <>
                <i className="fas fa-save"></i>
                {language === 'vi' ? 'Lưu tất cả thay đổi' : 'Save All Changes'}
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}

export default AboutManagement
