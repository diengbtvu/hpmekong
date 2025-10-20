import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useLanguage } from '../../i18n/config.jsx'
import { CENTERS, SOCIAL_LINKS, CONTACT_INFO } from '../../utils/constants'
import { settingsService } from '../../services/contentService'

const Footer = () => {
  const { t, language } = useLanguage()
  const [contactInfo, setContactInfo] = useState(CONTACT_INFO)
  const [socialLinks, setSocialLinks] = useState(SOCIAL_LINKS)

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        // Fetch contact info
        const contactResponse = await settingsService.getSettingsByGroup('contact')
        if (contactResponse.success && contactResponse.data) {
          setContactInfo({
            address: contactResponse.data.address || CONTACT_INFO.address,
            email: contactResponse.data.email || CONTACT_INFO.email,
            hotline: contactResponse.data.hotline || CONTACT_INFO.hotline,
            workingHours: contactResponse.data.working_hours || CONTACT_INFO.workingHours,
          })
        }

        // Fetch social links
        const socialResponse = await settingsService.getSettingsByGroup('social')
        if (socialResponse.success && socialResponse.data) {
          setSocialLinks({
            facebook: socialResponse.data.facebook || SOCIAL_LINKS.facebook,
            youtube: socialResponse.data.youtube || SOCIAL_LINKS.youtube,
            instagram: socialResponse.data.instagram || SOCIAL_LINKS.instagram,
            tiktok: socialResponse.data.tiktok || SOCIAL_LINKS.tiktok,
            zalo: socialResponse.data.zalo || SOCIAL_LINKS.zalo,
          })
        }
      } catch (error) {
        console.error('Error fetching footer settings:', error)
      }
    }
    fetchSettings()
  }, [])

  return (
    <footer className="bg-[#FFFEF8] border-t border-gray-200">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Column 1: Company Info */}
          <div className="lg:pr-8">
            <div className="flex items-center gap-3 mb-4">
              <img 
                src="/logo.png" 
                alt="Happy World Mekong Logo" 
                className="h-12 w-auto object-contain"
              />
              <div>
                <div className="font-heading font-bold text-lg leading-tight">
                  <span className="text-mekong-blue">HAPPY</span><br />
                  <span className="text-sunrise-orange">WORLD</span>{' '}
                  <span className="text-rice-green">MEKONG</span>
                </div>
              </div>
            </div>
            <h5 className="font-bold text-gray-900 mb-3">{t('footer.companyName')}</h5>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-start gap-2">
                <i className="fas fa-map-marker-alt mt-1 text-mekong-blue"></i>
                <span>{contactInfo.address}</span>
              </li>
              <li className="flex items-center gap-2">
                <i className="fas fa-envelope text-mekong-blue"></i>
                <a href={`mailto:${contactInfo.email}`} className="hover:text-mekong-blue transition-colors">
                  {contactInfo.email}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <i className="fas fa-phone text-mekong-blue"></i>
                <a href={`tel:${contactInfo.hotline}`} className="hover:text-mekong-blue transition-colors">
                  {contactInfo.hotline}
                </a>
              </li>
            </ul>

            {/* Social Media */}
            <div className="flex items-center gap-3 mt-4">
              <a
                href={socialLinks.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center hover:scale-110 transition-transform"
                aria-label="Facebook"
              >
                <i className="fab fa-facebook-f"></i>
              </a>
              <a
                href={socialLinks.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-red-600 text-white flex items-center justify-center hover:scale-110 transition-transform"
                aria-label="YouTube"
              >
                <i className="fab fa-youtube"></i>
              </a>
              <a
                href={socialLinks.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white flex items-center justify-center hover:scale-110 transition-transform"
                aria-label="Instagram"
              >
                <i className="fab fa-instagram"></i>
              </a>
              <a
                href={socialLinks.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center hover:scale-110 transition-transform"
                aria-label="TikTok"
              >
                <i className="fab fa-tiktok"></i>
              </a>
            </div>
          </div>

          {/* Column 2: About Company & Project Description */}
          <div className="lg:px-6">
            <p className="text-gray-700 text-justify leading-relaxed">
              {language === 'vi'
                ? 'Happy World Mekong - Điểm chạm kỹ năng, tiên phong trong việc khai phóng tiềm năng thế hệ trẻ. Chúng tôi mang đến cơ hội trang bị kỹ năng mềm, kiến thức nền tảng và năng lực tương lai thông qua các chương trình giáo dục hiện đại và dịch vụ công nghệ mới, góp phần xây dựng một thế giới hạnh phúc.'
                : 'Happy World Mekong - Skills Touch Point, pioneering in unleashing youth potential. We bring opportunities to equip soft skills, foundational knowledge and future capabilities through modern education programs and new technology services, contributing to building a happy world.'}
            </p>
          </div>

          {/* Column 3: Google Maps */}
          <div className="lg:pl-4">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3928.841459932746!2d105.78164431533394!3d10.029933692833894!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31a0629f6de3cfbd%3A0x30b3c5f90e5d1ec8!2zQ-G6p24gVGjGoSwgVmnhu4d0IE5hbQ!5e0!3m2!1svi!2s!4v1234567890"
              width="100%"
              height="350"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              className="rounded-lg"
            ></iframe>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-200 mt-8 pt-6">
          <div className="flex flex-col items-center gap-4">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <img 
                src="/logo.png" 
                alt="Happy World Mekong Logo" 
                className="h-12 w-auto object-contain"
              />
              <div className="font-heading font-bold text-base leading-tight">
                <span className="text-mekong-blue">HAPPY</span>{' '}
                <span className="text-sunrise-orange">WORLD</span>{' '}
                <span className="text-rice-green">MEKONG</span>
              </div>
            </div>
            {/* Copyright */}
            <div className="text-center text-gray-600 text-sm">
              <p>{t('footer.copyright')}</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer

