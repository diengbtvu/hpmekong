import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useLanguage } from '../../i18n/config.jsx'
import { CENTERS, SOCIAL_LINKS, CONTACT_INFO } from '../../utils/constants'
import { settingsService } from '../../services/contentService'

const Footer = () => {
  const { t, language } = useLanguage()
  const [contactInfo, setContactInfo] = useState(CONTACT_INFO)
  const [socialLinks, setSocialLinks] = useState(SOCIAL_LINKS)
  const [companyInfo, setCompanyInfo] = useState({
    name: 'CÔNG TY CP CÔNG NGHỆ GIÁO DỤC HAPPY WORLD MEKONG',
    description_vi: 'Happy World Mekong - Điểm chạm kỹ năng, tiên phong trong việc khai phóng tiềm năng thế hệ trẻ.',
    description_en: 'Happy World Mekong - Skills Touch Point, pioneering in unleashing youth potential.',
    copyright: '© 2024 Happy World Mekong. All rights reserved.',
    google_maps_embed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3928.5!2d105.9569!3d10.2430!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x310a82ce24af8f11%3A0x8573c2a9a739a32c!2zUGjhuqFtIE5nxakgTMOjbywgVHLDoCBWaW5oLCBUaMOgbmggcGjhu5EgVsSpbmggTG9uZywgVsSpbmggTG9uZw!5e0!3m2!1svi!2s!4v1234567890'
  })

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        // Fetch all settings
        const [contactResponse, socialResponse] = await Promise.all([
          settingsService.getSettingsByGroup('contact'),
          settingsService.getSettingsByGroup('social')
        ])
        
        if (contactResponse.success && contactResponse.data) {
          setContactInfo({
            address: contactResponse.data.address || CONTACT_INFO.address,
            email: contactResponse.data.email || CONTACT_INFO.email,
            hotline: contactResponse.data.hotline || CONTACT_INFO.hotline,
            website: contactResponse.data.website || CONTACT_INFO.website,
            workingHours: contactResponse.data.working_hours || CONTACT_INFO.workingHours,
          })
          
          // Set company info from contact group
          setCompanyInfo(prev => ({
            ...prev,
            name: contactResponse.data.company_name || prev.name,
            description_vi: contactResponse.data.company_description_vi || prev.description_vi,
            description_en: contactResponse.data.company_description_en || prev.description_en,
            copyright: contactResponse.data.copyright_text || prev.copyright,
            google_maps_embed: contactResponse.data.google_maps_embed || prev.google_maps_embed
          }))
        }

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
            <h5 className="font-bold text-gray-900 mb-3 text-sm">{companyInfo.name}</h5>
            <ul className="space-y-2 text-gray-600 text-sm">
              <li className="flex items-start gap-2">
                <i className="fas fa-map-marker-alt mt-1 text-mekong-blue flex-shrink-0"></i>
                <span>{contactInfo.address}</span>
              </li>
              <li className="flex items-center gap-2">
                <i className="fas fa-globe text-mekong-blue flex-shrink-0"></i>
                <a href={contactInfo.website} target="_blank" rel="noopener noreferrer" className="hover:text-mekong-blue transition-colors break-all">
                  {contactInfo.website}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <i className="fas fa-phone text-mekong-blue flex-shrink-0"></i>
                <a href={`tel:${contactInfo.hotline}`} className="hover:text-mekong-blue transition-colors">
                  {contactInfo.hotline}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <i className="fas fa-envelope text-mekong-blue flex-shrink-0"></i>
                <a href={`mailto:${contactInfo.email}`} className="hover:text-mekong-blue transition-colors break-all">
                  {contactInfo.email}
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
              {language === 'vi' ? companyInfo.description_vi : companyInfo.description_en}
            </p>
          </div>

          {/* Column 3: Google Maps */}
          <div className="lg:pl-4">
            <h5 className="font-bold text-gray-900 mb-3">{language === 'vi' ? 'Vị trí' : 'Location'}</h5>
            {companyInfo.google_maps_embed && companyInfo.google_maps_embed.trim() !== '' ? (
              <div 
                className="rounded-lg shadow-md overflow-hidden w-full"
                dangerouslySetInnerHTML={{ 
                  __html: (() => {
                    const embed = companyInfo.google_maps_embed
                    // If it's a full iframe tag
                    if (embed.includes('<iframe')) {
                      return embed
                        .replace(/width="[^"]*"/g, 'width="100%"')
                        .replace(/height="[^"]*"/g, 'height="300"')
                        .replace(/style="[^"]*"/g, 'style="border:0;width:100%;height:300px;"')
                    }
                    // If it's just a URL
                    return `<iframe src="${embed}" width="100%" height="300" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>`
                  })()
                }}
              />
            ) : (
              <div className="w-full h-[300px] bg-gray-100 rounded-lg flex items-center justify-center">
                <div className="text-center text-gray-400">
                  <i className="fas fa-map-marked-alt text-4xl mb-2"></i>
                  <p className="text-sm">Chưa cấu hình bản đồ</p>
                </div>
              </div>
            )}
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
              <p>{companyInfo.copyright}</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer

