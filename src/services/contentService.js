import api from './api'

// ========== Banner APIs ==========
export const bannerService = {
  // Public APIs
  getActiveBanners: async () => {
    const response = await api.get('/public/banners')
    return response.data
  },

  getBannersByType: async (type) => {
    const response = await api.get(`/public/banners/type/${type}`)
    return response.data
  },

  incrementBannerView: async (id) => {
    const response = await api.post(`/public/banners/${id}/view`)
    return response.data
  },

  incrementBannerClick: async (id) => {
    const response = await api.post(`/public/banners/${id}/click`)
    return response.data
  },

  // Admin APIs
  getAllBanners: async () => {
    const response = await api.get('/admin/banners')
    return response.data
  },

  getBannerById: async (id) => {
    const response = await api.get(`/admin/banners/${id}`)
    return response.data
  },

  createBanner: async (data) => {
    const response = await api.post('/admin/banners', data)
    return response.data
  },

  updateBanner: async (id, data) => {
    const response = await api.put(`/admin/banners/${id}`, data)
    return response.data
  },

  deleteBanner: async (id) => {
    const response = await api.delete(`/admin/banners/${id}`)
    return response.data
  },
}

// ========== Partner APIs ==========
export const partnerService = {
  // Public APIs
  getAllPartners: async () => {
    const response = await api.get('/public/partners')
    return response.data
  },

  getPartnersByType: async (type) => {
    const response = await api.get(`/public/partners/type/${type}`)
    return response.data
  },

  getFeaturedPartners: async () => {
    const response = await api.get('/public/partners/featured')
    return response.data
  },

  // Admin APIs
  getPartnerById: async (id) => {
    const response = await api.get(`/admin/partners/${id}`)
    return response.data
  },

  createPartner: async (data) => {
    const response = await api.post('/admin/partners', data)
    return response.data
  },

  updatePartner: async (id, data) => {
    const response = await api.put(`/admin/partners/${id}`, data)
    return response.data
  },

  deletePartner: async (id) => {
    const response = await api.delete(`/admin/partners/${id}`)
    return response.data
  },
}

// ========== Achievement APIs ==========
export const achievementService = {
  // Public APIs
  getAllAchievements: async () => {
    const response = await api.get('/public/achievements')
    return response.data
  },

  getAchievementsByType: async (type) => {
    const response = await api.get(`/public/achievements/type/${type}`)
    return response.data
  },

  getFeaturedAchievements: async () => {
    const response = await api.get('/public/achievements/featured')
    return response.data
  },

  // Admin APIs
  getAchievementById: async (id) => {
    const response = await api.get(`/admin/achievements/${id}`)
    return response.data
  },

  createAchievement: async (data) => {
    const response = await api.post('/admin/achievements', data)
    return response.data
  },

  updateAchievement: async (id, data) => {
    const response = await api.put(`/admin/achievements/${id}`, data)
    return response.data
  },

  deleteAchievement: async (id) => {
    const response = await api.delete(`/admin/achievements/${id}`)
    return response.data
  },
}

// ========== Video APIs ==========
export const videoService = {
  // Public APIs
  getAllVideos: async () => {
    const response = await api.get('/public/videos')
    return response.data
  },

  getVideosByType: async (type) => {
    const response = await api.get(`/public/videos/type/${type}`)
    return response.data
  },

  getFeaturedVideos: async () => {
    const response = await api.get('/public/videos/featured')
    return response.data
  },

  incrementVideoView: async (id) => {
    const response = await api.post(`/public/videos/${id}/view`)
    return response.data
  },

  // Admin APIs
  getVideoById: async (id) => {
    const response = await api.get(`/admin/videos/${id}`)
    return response.data
  },

  createVideo: async (data) => {
    const response = await api.post('/admin/videos', data)
    return response.data
  },

  updateVideo: async (id, data) => {
    const response = await api.put(`/admin/videos/${id}`, data)
    return response.data
  },

  deleteVideo: async (id) => {
    const response = await api.delete(`/admin/videos/${id}`)
    return response.data
  },
}

// ========== Site Settings APIs ==========
export const settingsService = {
  // Public APIs
  getPublicSettings: async () => {
    const response = await api.get('/public/settings')
    return response.data
  },

  getSettingsByGroup: async (group) => {
    const response = await api.get(`/public/settings/group/${group}`)
    return response.data
  },

  getSettingByKey: async (key) => {
    const response = await api.get(`/public/settings/key/${key}`)
    return response.data
  },

  // Admin APIs
  getAllSettings: async () => {
    const response = await api.get('/admin/settings')
    return response.data
  },

  getSettingById: async (id) => {
    const response = await api.get(`/admin/settings/${id}`)
    return response.data
  },

  createSetting: async (data) => {
    const response = await api.post('/admin/settings', data)
    return response.data
  },

  updateSetting: async (id, data) => {
    const response = await api.put(`/admin/settings/${id}`, data)
    return response.data
  },

  updateSettingValue: async (key, value) => {
    const response = await api.patch(`/admin/settings/key/${key}`, { value })
    return response.data
  },

  deleteSetting: async (id) => {
    const response = await api.delete(`/admin/settings/${id}`)
    return response.data
  },
}

export default {
  banner: bannerService,
  partner: partnerService,
  achievement: achievementService,
  video: videoService,
  settings: settingsService,
}

