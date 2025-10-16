import api from './api'

const newsService = {
  // Get all posts
  getPosts: async (params = {}) => {
    const response = await api.get('/posts', { params })
    return response.data
  },

  // Get post by slug
  getPostBySlug: async (slug) => {
    const response = await api.get(`/posts/${slug}`)
    return response.data
  },

  // Get posts by category
  getPostsByCategory: async (category, params = {}) => {
    const response = await api.get(`/posts/category/${category}`, { params })
    return response.data
  },

  // Get featured posts
  getFeaturedPosts: async () => {
    const response = await api.get('/posts/featured')
    return response.data
  },

  // Get latest posts
  getLatestPosts: async (limit = 5) => {
    const response = await api.get(`/posts/latest?limit=${limit}`)
    return response.data
  },

  // Get related posts
  getRelatedPosts: async (postId) => {
    const response = await api.get(`/posts/${postId}/related`)
    return response.data
  },

  // Search posts
  searchPosts: async (query) => {
    const response = await api.get('/posts/search', { params: { q: query } })
    return response.data
  },

  // Increment view count
  incrementViews: async (postId) => {
    const response = await api.post(`/posts/${postId}/view`)
    return response.data
  },
}

export default newsService

