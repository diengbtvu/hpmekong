import React, { useState, useEffect } from 'react'
import FormInput from '../../components/admin/FormInput'
import FormSelect from '../../components/admin/FormSelect'
import { settingsService } from '../../services/contentService'
import toast from '../../utils/toast'

const SettingsManagement = () => {
  const [settings, setSettings] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('contact')

  useEffect(() => { fetchSettings() }, [])

  const fetchSettings = async () => {
    try {
      const response = await settingsService.getAllSettings()
      if (response.success) setSettings(response.data)
    } catch (error) { toast.error('Error fetching settings') }
    finally { setLoading(false) }
  }

  const handleUpdate = async (key, value) => {
    try {
      await settingsService.updateSettingValue(key, value)
      toast.success('Setting updated')
      fetchSettings()
    } catch (error) { toast.error('Error updating setting') }
  }

  const tabs = ['contact', 'social', 'stats', 'seo']
  const groupedSettings = settings.reduce((acc, setting) => {
    const group = setting.settingGroup || 'other'
    if (!acc[group]) acc[group] = []
    acc[group].push(setting)
    return acc
  }, {})

  return (
    <div className="space-y-6">
      <div><h1 className="text-2xl font-bold text-gray-900">Site Settings</h1><p className="text-gray-600 mt-1">Configure website settings</p></div>

      <div className="bg-white rounded-xl shadow-sm">
        {/* Tabs */}
        <div className="border-b border-gray-200 px-6">
          <div className="flex gap-4">
            {tabs.map(tab => (
              <button key={tab} onClick={() => setActiveTab(tab)} className={`px-4 py-3 font-medium border-b-2 transition-colors capitalize ${activeTab === tab ? 'border-mekong-blue text-mekong-blue' : 'border-transparent text-gray-600 hover:text-gray-900'}`}>
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {loading ? (
            <div className="flex justify-center py-12"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-mekong-blue"></div></div>
          ) : (
            <div className="space-y-4">
              {(groupedSettings[activeTab] || []).map(setting => (
                <div key={setting.id} className="border-b border-gray-100 pb-4 last:border-0">
                  <label className="block text-sm font-medium text-gray-700 mb-2">{setting.label}</label>
                  {setting.valueType === 'TEXT' ? (
                    <textarea value={setting.settingValue} onChange={(e) => handleUpdate(setting.settingKey, e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-mekong-blue" rows="3" />
                  ) : (
                    <input type={setting.valueType === 'NUMBER' ? 'number' : 'text'} value={setting.settingValue} onChange={(e) => handleUpdate(setting.settingKey, e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-mekong-blue" />
                  )}
                  <p className="text-xs text-gray-500 mt-1">{setting.description}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default SettingsManagement
