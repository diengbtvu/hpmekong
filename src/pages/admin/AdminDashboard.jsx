import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import api from '../../services/api'
import { useLanguage } from '../../i18n/config'

const AdminDashboard = () => {
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)
  const user = JSON.parse(localStorage.getItem('user') || '{}')
  const { language } = useLanguage()

  const translations = {
    vi: {
      welcome: 'Chào mừng trở lại',
      overview: 'Tổng quan hôm nay',
      totalUsers: 'Tổng người dùng',
      totalCourses: 'Tổng khóa học',
      totalEnrollments: 'Tổng đăng ký',
      totalRevenue: 'Tổng doanh thu',
      quickActions: 'Thao tác nhanh',
      addNewCourse: 'Thêm khóa học mới',
      createNewPost: 'Tạo bài viết mới',
      viewReports: 'Xem báo cáo',
      manageUsers: 'Quản lý người dùng',
      recentActivities: 'Hoạt động gần đây',
      newUser: 'Người dùng mới',
      newEnrollment: 'Đăng ký mới',
      newPayment: 'Thanh toán mới',
      viewAll: 'Xem tất cả',
      minutesAgo: 'phút trước',
      hoursAgo: 'giờ trước',
      loading: 'Đang tải...'
    },
    en: {
      welcome: 'Welcome back',
      overview: "Today's Overview",
      totalUsers: 'Total Users',
      totalCourses: 'Total Courses',
      totalEnrollments: 'Total Enrollments',
      totalRevenue: 'Total Revenue',
      quickActions: 'Quick Actions',
      addNewCourse: 'Add New Course',
      createNewPost: 'Create New Post',
      viewReports: 'View Reports',
      manageUsers: 'Manage Users',
      recentActivities: 'Recent Activities',
      newUser: 'New user',
      newEnrollment: 'New enrollment',
      newPayment: 'New payment',
      viewAll: 'View All',
      minutesAgo: 'minutes ago',
      hoursAgo: 'hours ago',
      loading: 'Loading...'
    }
  }

  const t = (key) => translations[language]?.[key] || translations['vi'][key] || key

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    try {
      const response = await api.get('/admin/dashboard/stats')
      if (response.data.success) {
        setStats(response.data.data)
      }
    } catch (error) {
      console.error('Error fetching stats:', error)
    } finally {
      setLoading(false)
    }
  }

  const formatPercent = (value) => {
    if (!value || value === 0) return '0%'
    const sign = value > 0 ? '+' : ''
    return `${sign}${value.toFixed(1)}%`
  }

  const statCards = [
    {
      title: t('totalUsers'),
      value: stats?.totalUsers || 0,
      icon: 'fa-users',
      color: 'bg-blue-500',
      change: formatPercent(stats?.userGrowthPercent),
      changeColor: (stats?.userGrowthPercent || 0) >= 0 ? 'text-green-500' : 'text-red-500',
      link: '/admin/users'
    },
    {
      title: t('totalCourses'),
      value: stats?.totalCourses || 0,
      icon: 'fa-book',
      color: 'bg-green-500',
      change: formatPercent(stats?.courseGrowthPercent),
      changeColor: (stats?.courseGrowthPercent || 0) >= 0 ? 'text-green-500' : 'text-red-500',
      link: '/admin/learning/courses'
    },
    {
      title: t('totalEnrollments'),
      value: stats?.totalEnrollments || 0,
      icon: 'fa-user-graduate',
      color: 'bg-purple-500',
      change: formatPercent(stats?.enrollmentGrowthPercent),
      changeColor: (stats?.enrollmentGrowthPercent || 0) >= 0 ? 'text-green-500' : 'text-red-500',
      link: '/admin/learning/enrollments'
    },
    {
      title: t('totalRevenue'),
      value: `${(stats?.totalRevenue || 0).toLocaleString()}đ`,
      icon: 'fa-dollar-sign',
      color: 'bg-orange-500',
      change: formatPercent(stats?.revenueGrowthPercent),
      changeColor: (stats?.revenueGrowthPercent || 0) >= 0 ? 'text-green-500' : 'text-red-500',
      link: '/admin/business/payments'
    },
  ]

  const quickActions = [
    { title: t('addNewCourse'), icon: 'fa-book', link: '/admin/learning/courses', color: 'bg-purple-500' },
    { title: t('createNewPost'), icon: 'fa-file-alt', link: '/admin/publishing/posts', color: 'bg-orange-500' },
    { title: t('viewReports'), icon: 'fa-chart-line', link: '/admin/dashboard', color: 'bg-blue-500' },
    { title: t('manageUsers'), icon: 'fa-users', link: '/admin/users', color: 'bg-green-500' },
  ]

  const getTimeAgo = (createdAt) => {
    if (!createdAt) return ''
    const now = new Date()
    const created = new Date(createdAt)
    const diffInMinutes = Math.floor((now - created) / 1000 / 60)
    
    if (diffInMinutes < 60) {
      return `${diffInMinutes} ${t('minutesAgo')}`
    }
    const hours = Math.floor(diffInMinutes / 60)
    if (hours < 24) {
      return `${hours} ${t('hoursAgo')}`
    }
    const days = Math.floor(hours / 24)
    return `${days} ${language === 'vi' ? 'ngày trước' : 'days ago'}`
  }

  // Recent activities from stats - showing real data
  const recentActivities = stats?.recentActivities || []

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-mekong-blue to-blue-600 rounded-2xl p-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">
              {t('welcome')}, {user.name || 'Admin'}! 👋
            </h1>
            <p className="text-blue-100">
              {t('overview')}
            </p>
          </div>
          <div className="hidden md:block">
            <div className="text-right">
              <p className="text-sm text-blue-100">Today</p>
              <p className="text-2xl font-bold">{new Date().toLocaleDateString('vi-VN')}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-white rounded-xl p-6 animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
              <div className="h-8 bg-gray-200 rounded w-3/4"></div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {statCards.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link
                to={stat.link}
                className="block bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center`}>
                    <i className={`fas ${stat.icon} text-white text-xl`}></i>
                  </div>
                  <span className={`${stat.changeColor} text-sm font-semibold flex items-center gap-1`}>
                    {(stat.changeColor === 'text-green-500') && <i className="fas fa-arrow-up text-xs"></i>}
                    {(stat.changeColor === 'text-red-500') && <i className="fas fa-arrow-down text-xs"></i>}
                    {stat.change}
                  </span>
                </div>
                <h3 className="text-gray-600 text-sm mb-1">{stat.title}</h3>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </Link>
            </motion.div>
          ))}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Actions */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h2 className="text-lg font-bold text-gray-900 mb-4">{t('quickActions')}</h2>
            <div className="space-y-2">
              {quickActions.map((action, index) => (
                <Link
                  key={index}
                  to={action.link}
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors group"
                >
                  <div className={`w-10 h-10 ${action.color} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform`}>
                    <i className={`fas ${action.icon} text-white`}></i>
                  </div>
                  <span className="text-gray-700 font-medium">{action.title}</span>
                  <i className="fas fa-arrow-right ml-auto text-gray-400 group-hover:text-mekong-blue"></i>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Activities */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-gray-900">{t('recentActivities')}</h2>
              <button className="text-sm text-mekong-blue hover:text-blue-700 font-medium">
                {t('viewAll')}
              </button>
            </div>
            <div className="space-y-4">
              {recentActivities.length > 0 ? (
                recentActivities.map((activity, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                        <i className={`fas ${activity.icon} ${activity.color}`}></i>
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-gray-900">
                        <span className="font-semibold">{activity.user}</span>
                        {' '}{activity.action}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">{getTimeAgo(activity.createdAt)}</p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8">
                  <i className="fas fa-history text-4xl text-gray-300 mb-2"></i>
                  <p className="text-sm text-gray-500">
                    {language === 'vi' ? 'Chưa có hoạt động gần đây' : 'No recent activities'}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard

