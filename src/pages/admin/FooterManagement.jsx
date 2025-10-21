import React, { useState, useEffect } from 'react'
import FormInput from '../../components/admin/FormInput'
import api from '../../services/api'
import toast from '../../utils/toast'
import { useLanguage } from '../../i18n/config'

const FooterManagement = () => {
  const { language } = useLanguage()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [settings, setSettings] = useState({})
  const [formData, setFormData] = useState({
    // Contact Info
    address: '',
    email: '',
    hotline: '',
    website: '',
    working_hours: '',
    
    // Social Links
    facebook: '',
    youtube: '',
    instagram: '',
    tiktok: '',
    zalo: '',
    
    // Map
    google_maps_embed: '',
    
    // Company Info
    company_name: '',
    company_description_vi: '',
    company_description_en: '',
    
    // Footer Copyright
    copyright_text: ''
  })

  const translations = {
    vi: {
      footerManagement: 'Quản lý Footer',
      manageFooter: 'Cấu hình thông tin hiển thị ở footer website',
      contactInfo: 'Thông tin liên hệ',
      socialLinks: 'Mạng xã hội',
      companyInfo: 'Thông tin công ty',
      mapLocation: 'Bản đồ & Vị trí',
      companyName: 'Tên công ty',
      address: 'Địa chỉ',
      email: 'Email',
      hotline: 'Hotline',
      website: 'Website',
      workingHours: 'Giờ làm việc',
      facebook: 'Facebook URL',
      youtube: 'YouTube URL',
      instagram: 'Instagram URL',
      tiktok: 'TikTok URL',
      zalo: 'Zalo URL',
      googleMapsEmbed: 'Google Maps Embed Code',
      companyDescriptionVi: 'Mô tả công ty (Tiếng Việt)',
      companyDescriptionEn: 'Mô tả công ty (Tiếng Anh)',
      copyrightText: 'Copyright Text',
      save: 'Lưu thay đổi',
      saving: 'Đang lưu...',
      preview: 'Xem trước',
      loadingSettings: 'Đang tải cài đặt...',
      settingsUpdated: 'Đã cập nhật cài đặt thành công',
      errorUpdating: 'Lỗi cập nhật cài đặt',
      errorLoading: 'Lỗi tải cài đặt'
    },
    en: {
      footerManagement: 'Footer Management',
      manageFooter: 'Configure footer information displayed on website',
      contactInfo: 'Contact Information',
      socialLinks: 'Social Media',
      companyInfo: 'Company Information',
      mapLocation: 'Map & Location',
      companyName: 'Company Name',
      address: 'Address',
      email: 'Email',
      hotline: 'Hotline',
      website: 'Website',
      workingHours: 'Working Hours',
      facebook: 'Facebook URL',
      youtube: 'YouTube URL',
      instagram: 'Instagram URL',
      tiktok: 'TikTok URL',
      zalo: 'Zalo URL',
      googleMapsEmbed: 'Google Maps Embed Code',
      companyDescriptionVi: 'Company Description (Vietnamese)',
      companyDescriptionEn: 'Company Description (English)',
      copyrightText: 'Copyright Text',
      save: 'Save Changes',
      saving: 'Saving...',
      preview: 'Preview',
      loadingSettings: 'Loading settings...',
      settingsUpdated: 'Settings updated successfully',
      errorUpdating: 'Error updating settings',
      errorLoading: 'Error loading settings'
    }
  }

  const t = (key) => translations[language]?.[key] || translations['vi'][key] || key

  useEffect(() => {
    fetchSettings()
  }, [])

  const fetchSettings = async () => {
    try {
      setLoading(true)
      
      // Fetch all settings groups
      const [contactRes, socialRes] = await Promise.all([
        api.get('/public/settings/group/contact'),
        api.get('/public/settings/group/social')
      ])
      
      const allSettings = {
        ...(contactRes.data.data || {}),
        ...(socialRes.data.data || {})
      }
      
      setSettings(allSettings)
      setFormData({
        address: allSettings.address || '',
        email: allSettings.email || '',
        hotline: allSettings.hotline || '',
        website: allSettings.website || '',
        working_hours: allSettings.working_hours || '',
        facebook: allSettings.facebook || '',
        youtube: allSettings.youtube || '',
        instagram: allSettings.instagram || '',
        tiktok: allSettings.tiktok || '',
        zalo: allSettings.zalo || '',
        google_maps_embed: allSettings.google_maps_embed || '',
        company_name: allSettings.company_name || 'CÔNG TY CP CÔNG NGHỆ GIÁO DỤC HAPPY WORLD MEKONG',
        company_description_vi: allSettings.company_description_vi || '',
        company_description_en: allSettings.company_description_en || '',
        copyright_text: allSettings.copyright_text || '© 2024 Happy World Mekong. All rights reserved.'
      })
    } catch (error) {
      console.error('Error fetching settings:', error)
      toast.error(t('errorLoading'))
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async () => {
    try {
      setSaving(true)
      
      // Update each setting via API
      const updates = Object.keys(formData).map(key => 
        api.patch(`/admin/settings/key/${key}`, { value: formData[key] })
          .catch(() => {
            // If setting doesn't exist, create it
            return api.post('/admin/settings', {
              settingKey: key,
              settingValue: formData[key],
              settingGroup: key.startsWith('company_') ? 'company' : 
                           ['facebook', 'youtube', 'instagram', 'tiktok', 'zalo'].includes(key) ? 'social' : 
                           'contact',
              label: key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
              valueType: 'STRING',
              isPublic: true
            })
          })
      )
      
      await Promise.all(updates)
      
      toast.success(t('settingsUpdated'))
      fetchSettings()
    } catch (error) {
      console.error('Error saving settings:', error)
      toast.error(t('errorUpdating'))
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-mekong-blue mb-4"></div>
          <p className="text-gray-600">{t('loadingSettings')}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{t('footerManagement')}</h1>
          <p className="text-gray-600 mt-1">{t('manageFooter')}</p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 px-6 py-3 bg-mekong-blue text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <i className={`fas ${saving ? 'fa-spinner fa-spin' : 'fa-save'}`}></i>
          <span>{saving ? t('saving') : t('save')}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column - Form */}
        <div className="space-y-6">
          {/* Contact Info */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <i className="fas fa-address-card text-mekong-blue"></i>
              {t('contactInfo')}
            </h3>
            <div className="space-y-4">
              <FormInput
                label={t('address')}
                name="address"
                type="textarea"
                rows={3}
                value={formData.address}
                onChange={(e) => setFormData({...formData, address: e.target.value})}
                placeholder="123 Đường ABC, Phường XYZ, TP..."
              />
              <FormInput
                label={t('email')}
                name="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                placeholder="contact@example.com"
              />
              <FormInput
                label={t('hotline')}
                name="hotline"
                value={formData.hotline}
                onChange={(e) => setFormData({...formData, hotline: e.target.value})}
                placeholder="0123 456 789"
              />
              <FormInput
                label={t('website')}
                name="website"
                type="url"
                value={formData.website}
                onChange={(e) => setFormData({...formData, website: e.target.value})}
                placeholder="https://example.com"
              />
              <FormInput
                label={t('workingHours')}
                name="working_hours"
                value={formData.working_hours}
                onChange={(e) => setFormData({...formData, working_hours: e.target.value})}
                placeholder="T2-T6: 8:00 - 17:00"
              />
            </div>
          </div>

          {/* Social Links */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <i className="fas fa-share-alt text-mekong-blue"></i>
              {t('socialLinks')}
            </h3>
            <div className="space-y-4">
              <FormInput
                label={t('facebook')}
                name="facebook"
                value={formData.facebook}
                onChange={(e) => setFormData({...formData, facebook: e.target.value})}
                placeholder="https://facebook.com/..."
              />
              <FormInput
                label={t('youtube')}
                name="youtube"
                value={formData.youtube}
                onChange={(e) => setFormData({...formData, youtube: e.target.value})}
                placeholder="https://youtube.com/..."
              />
              <FormInput
                label={t('instagram')}
                name="instagram"
                value={formData.instagram}
                onChange={(e) => setFormData({...formData, instagram: e.target.value})}
                placeholder="https://instagram.com/..."
              />
              <FormInput
                label={t('tiktok')}
                name="tiktok"
                value={formData.tiktok}
                onChange={(e) => setFormData({...formData, tiktok: e.target.value})}
                placeholder="https://tiktok.com/@..."
              />
              <FormInput
                label={t('zalo')}
                name="zalo"
                value={formData.zalo}
                onChange={(e) => setFormData({...formData, zalo: e.target.value})}
                placeholder="https://zalo.me/..."
              />
            </div>
          </div>

          {/* Company Info */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <i className="fas fa-building text-mekong-blue"></i>
              {t('companyInfo')}
            </h3>
            <div className="space-y-4">
              <FormInput
                label={t('companyName')}
                name="company_name"
                value={formData.company_name}
                onChange={(e) => setFormData({...formData, company_name: e.target.value})}
                placeholder="CÔNG TY CP..."
              />
              <FormInput
                label={t('companyDescriptionVi')}
                name="company_description_vi"
                type="textarea"
                rows={4}
                value={formData.company_description_vi}
                onChange={(e) => setFormData({...formData, company_description_vi: e.target.value})}
                placeholder="Mô tả ngắn về công ty bằng tiếng Việt..."
              />
              <FormInput
                label={t('companyDescriptionEn')}
                name="company_description_en"
                type="textarea"
                rows={4}
                value={formData.company_description_en}
                onChange={(e) => setFormData({...formData, company_description_en: e.target.value})}
                placeholder="Short company description in English..."
              />
              <FormInput
                label={t('copyrightText')}
                name="copyright_text"
                value={formData.copyright_text}
                onChange={(e) => setFormData({...formData, copyright_text: e.target.value})}
                placeholder="© 2024 Company Name. All rights reserved."
              />
            </div>
          </div>

          {/* Map */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <i className="fas fa-map-marked-alt text-mekong-blue"></i>
              {t('mapLocation')}
            </h3>
            <FormInput
              label={t('googleMapsEmbed')}
              name="google_maps_embed"
              type="textarea"
              rows={3}
              value={formData.google_maps_embed}
              onChange={(e) => setFormData({...formData, google_maps_embed: e.target.value})}
              placeholder="<iframe src='https://www.google.com/maps/embed?...' ...></iframe>"
            />
            <p className="text-xs text-gray-500 mt-2">
              Lấy embed code từ Google Maps: Tìm địa chỉ → Share → Embed a map → Copy HTML
            </p>
          </div>
        </div>

        {/* Right Column - Preview */}
        <div className="lg:sticky lg:top-6 space-y-6">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <i className="fas fa-eye text-mekong-blue"></i>
              {t('preview')}
            </h3>
            
            {/* Footer Preview */}
            <div className="border border-gray-200 rounded-lg p-6 bg-gray-50 text-sm">
              <div className="grid grid-cols-1 gap-6">
                {/* Contact Section */}
                <div>
                  <h4 className="font-bold text-gray-900 mb-2">Thông tin liên hệ</h4>
                  <div className="space-y-2 text-gray-600">
                    {formData.address && (
                      <div className="flex items-start gap-2">
                        <i className="fas fa-map-marker-alt mt-1 text-mekong-blue"></i>
                        <span className="text-xs">{formData.address}</span>
                      </div>
                    )}
                    {formData.email && (
                      <div className="flex items-center gap-2">
                        <i className="fas fa-envelope text-mekong-blue"></i>
                        <span className="text-xs">{formData.email}</span>
                      </div>
                    )}
                    {formData.hotline && (
                      <div className="flex items-center gap-2">
                        <i className="fas fa-phone text-mekong-blue"></i>
                        <span className="text-xs">{formData.hotline}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Social Links */}
                {(formData.facebook || formData.youtube || formData.instagram || formData.tiktok) && (
                  <div>
                    <h4 className="font-bold text-gray-900 mb-2">Mạng xã hội</h4>
                    <div className="flex gap-2">
                      {formData.facebook && (
                        <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs">
                          <i className="fab fa-facebook-f"></i>
                        </div>
                      )}
                      {formData.youtube && (
                        <div className="w-8 h-8 rounded-full bg-red-600 text-white flex items-center justify-center text-xs">
                          <i className="fab fa-youtube"></i>
                        </div>
                      )}
                      {formData.instagram && (
                        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white flex items-center justify-center text-xs">
                          <i className="fab fa-instagram"></i>
                        </div>
                      )}
                      {formData.tiktok && (
                        <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center text-xs">
                          <i className="fab fa-tiktok"></i>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Company Description */}
                {formData.company_description_vi && (
                  <div>
                    <p className="text-xs text-gray-700 leading-relaxed">
                      {formData.company_description_vi}
                    </p>
                  </div>
                )}

                {/* Copyright */}
                {formData.copyright_text && (
                  <div className="border-t border-gray-300 pt-4 text-center">
                    <p className="text-xs text-gray-600">{formData.copyright_text}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FooterManagement
