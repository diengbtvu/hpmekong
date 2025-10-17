import React, { useState } from 'react'
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useLanguage } from '../../i18n/config'

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const { language, changeLanguage } = useLanguage()

  // Get user info from localStorage (assume logged in)
  const user = JSON.parse(localStorage.getItem('user') || '{}')

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    navigate('/admin/login')
  }

  const languages = [
    { code: 'vi', name: 'Tiếng Việt', flag: '🇻🇳' },
    { code: 'en', name: 'English', flag: '🇬🇧' }
  ]

  const currentLang = languages.find(lang => lang.code === language) || languages[0]

  const translations = {
    vi: {
      dashboard: 'Bảng điều khiển',
      contentManagement: 'Quản lý nội dung',
      banners: 'Banner',
      partners: 'Đối tác',
      achievements: 'Thành tựu',
      videos: 'Video',
      settings: 'Cài đặt',
      centers: 'Hệ sinh thái',
      learningManagement: 'Quản lý học tập',
      courses: 'Khóa học',
      instructors: 'Giảng viên',
      enrollments: 'Đăng ký học',
      publishing: 'Xuất bản',
      posts: 'Bài viết',
      categories: 'Danh mục',
      business: 'Kinh doanh',
      payments: 'Thanh toán',
      contacts: 'Liên hệ',
      users: 'Người dùng',
      mediaLibrary: 'Thư viện media',
      adminDashboard: 'Quản trị hệ thống',
      notifications: 'Thông báo',
      administrator: 'Quản trị viên',
      logout: 'Đăng xuất'
    },
    en: {
      dashboard: 'Dashboard',
      contentManagement: 'Content Management',
      banners: 'Banners',
      partners: 'Partners',
      achievements: 'Achievements',
      videos: 'Videos',
      settings: 'Settings',
      centers: 'Centers',
      learningManagement: 'Learning Management',
      courses: 'Courses',
      instructors: 'Instructors',
      enrollments: 'Enrollments',
      publishing: 'Publishing',
      posts: 'Posts',
      categories: 'Categories',
      business: 'Business',
      payments: 'Payments',
      contacts: 'Contacts',
      users: 'Users',
      mediaLibrary: 'Media Library',
      adminDashboard: 'Admin Dashboard',
      notifications: 'Notifications',
      administrator: 'Administrator',
      logout: 'Logout'
    }
  }

  const t = (key) => translations[language]?.[key] || translations['vi'][key] || key

  const menuItems = [
    {
      title: t('dashboard'),
      icon: 'fa-home',
      path: '/admin/dashboard',
      badge: null
    },
    {
      title: t('contentManagement'),
      icon: 'fa-file-alt',
      children: [
        { title: t('banners'), path: '/admin/content/banners', icon: 'fa-images' },
        { title: t('partners'), path: '/admin/content/partners', icon: 'fa-handshake' },
        { title: t('achievements'), path: '/admin/content/achievements', icon: 'fa-trophy' },
        { title: t('videos'), path: '/admin/content/videos', icon: 'fa-video' },
        { title: t('settings'), path: '/admin/content/settings', icon: 'fa-cog' },
        { title: t('centers'), path: '/admin/content/centers', icon: 'fa-sitemap' },
      ]
    },
    {
      title: t('learningManagement'),
      icon: 'fa-graduation-cap',
      children: [
        { title: t('courses'), path: '/admin/learning/courses', icon: 'fa-book' },
        { title: t('instructors'), path: '/admin/learning/instructors', icon: 'fa-chalkboard-teacher' },
        { title: t('enrollments'), path: '/admin/learning/enrollments', icon: 'fa-user-graduate' },
      ]
    },
    {
      title: t('publishing'),
      icon: 'fa-newspaper',
      children: [
        { title: t('posts'), path: '/admin/publishing/posts', icon: 'fa-file-alt' },
        { title: t('categories'), path: '/admin/publishing/categories', icon: 'fa-folder' },
      ]
    },
    {
      title: t('business'),
      icon: 'fa-briefcase',
      children: [
        { title: t('payments'), path: '/admin/business/payments', icon: 'fa-credit-card' },
        { title: t('contacts'), path: '/admin/business/contacts', icon: 'fa-envelope' },
      ]
    },
    {
      title: t('users'),
      icon: 'fa-users',
      path: '/admin/users',
    },
    {
      title: t('mediaLibrary'),
      icon: 'fa-folder-open',
      path: '/admin/media',
    },
  ]

  const [expandedMenus, setExpandedMenus] = useState([])

  const toggleMenu = (title) => {
    if (expandedMenus.includes(title)) {
      setExpandedMenus(expandedMenus.filter(m => m !== title))
    } else {
      setExpandedMenus([...expandedMenus, title])
    }
  }

  const isActive = (path) => {
    return location.pathname === path
  }

  const isParentActive = (children) => {
    return children?.some(child => location.pathname === child.path)
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Top Header */}
      <header className="bg-white shadow-sm fixed top-0 left-0 right-0 z-30 h-16">
        <div className="flex items-center justify-between h-full px-4">
          {/* Left: Logo + Menu Toggle */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="hidden lg:block p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <i className="fas fa-bars text-gray-600"></i>
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <i className="fas fa-bars text-gray-600"></i>
            </button>
            
            <Link to="/admin/dashboard" className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-mekong-blue to-sunrise-orange rounded-xl flex items-center justify-center shadow-md hover:shadow-lg transition-shadow">
                <span className="text-white font-bold text-lg">HWM</span>
              </div>
              <div className="hidden sm:block">
                <h1 className="text-base font-bold text-gray-900">Happy World Mekong</h1>
                <p className="text-xs text-gray-500">{t('adminDashboard')}</p>
              </div>
            </Link>
          </div>

          {/* Right: User Menu */}
          <div className="flex items-center gap-4">
            {/* Language Switcher */}
            <div className="relative">
              <button
                onClick={() => setShowLanguageDropdown(!showLanguageDropdown)}
                className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <span className="text-lg">{currentLang.flag}</span>
                <span className="text-sm font-medium text-gray-700">{currentLang.code.toUpperCase()}</span>
                <i className="fas fa-chevron-down text-xs text-gray-500"></i>
              </button>

              {showLanguageDropdown && (
                <div className="absolute right-0 mt-1 w-48 bg-white rounded-lg shadow-lg py-1 z-50">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        changeLanguage(lang.code)
                        setShowLanguageDropdown(false)
                      }}
                      className={`w-full px-4 py-2 text-left flex items-center gap-3 hover:bg-gray-100 transition-colors
                        ${language === lang.code ? 'bg-blue-50 text-mekong-blue' : 'text-gray-700'}
                      `}
                    >
                      <span className="text-lg">{lang.flag}</span>
                      <span className="text-sm">{lang.name}</span>
                      {language === lang.code && (
                        <i className="fas fa-check text-xs ml-auto"></i>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Notifications */}
            <button className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors" title={t('notifications')}>
              <i className="fas fa-bell text-gray-600"></i>
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>

            {/* User Dropdown */}
            <div className="flex items-center gap-3 cursor-pointer hover:bg-gray-100 px-3 py-2 rounded-lg transition-colors group">
              <div className="w-8 h-8 bg-mekong-blue rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-semibold">
                  {user.name?.charAt(0) || 'A'}
                </span>
              </div>
              <div className="hidden md:block">
                <p className="text-sm font-semibold text-gray-900">{user.name || 'Admin'}</p>
                <p className="text-xs text-gray-500">{user.role || t('administrator')}</p>
              </div>
              <button onClick={handleLogout} className="text-gray-400 hover:text-red-500 transition-colors" title={t('logout')}>
                <i className="fas fa-sign-out-alt"></i>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Sidebar */}
      <aside
        className={`fixed top-16 left-0 h-[calc(100vh-4rem)] bg-white shadow-lg transition-all duration-300 z-20 overflow-y-auto
          ${sidebarOpen ? 'w-64' : 'w-0 lg:w-16'}
          ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        <nav className="p-4 space-y-1">
          {menuItems.map((item, index) => (
            <div key={index}>
              {item.children ? (
                // Menu with submenu
                <div>
                  <button
                    onClick={() => toggleMenu(item.title)}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-lg transition-colors
                      ${isParentActive(item.children) ? 'bg-blue-50 text-mekong-blue' : 'text-gray-700 hover:bg-gray-100'}
                    `}
                  >
                    <div className="flex items-center gap-3">
                      <i className={`fas ${item.icon} ${sidebarOpen ? 'w-5' : 'w-auto'}`}></i>
                      {sidebarOpen && <span className="text-sm font-medium">{item.title}</span>}
                    </div>
                    {sidebarOpen && (
                      <i className={`fas fa-chevron-down text-xs transition-transform ${expandedMenus.includes(item.title) ? 'rotate-180' : ''}`}></i>
                    )}
                  </button>
                  
                  <AnimatePresence>
                    {expandedMenus.includes(item.title) && sidebarOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="ml-4 mt-1 space-y-1 overflow-hidden"
                      >
                        {item.children.map((child, childIndex) => (
                          <Link
                            key={childIndex}
                            to={child.path}
                            className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors
                              ${isActive(child.path) ? 'bg-mekong-blue text-white' : 'text-gray-600 hover:bg-gray-100'}
                            `}
                          >
                            <i className={`fas ${child.icon} text-xs`}></i>
                            <span>{child.title}</span>
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                // Single menu item
                <Link
                  to={item.path}
                  className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors
                    ${isActive(item.path) ? 'bg-mekong-blue text-white' : 'text-gray-700 hover:bg-gray-100'}
                  `}
                >
                  <i className={`fas ${item.icon} ${sidebarOpen ? 'w-5' : 'w-auto'}`}></i>
                  {sidebarOpen && (
                    <>
                      <span className="text-sm font-medium flex-1">{item.title}</span>
                      {item.badge && (
                        <span className="px-2 py-0.5 bg-red-500 text-white text-xs rounded-full">
                          {item.badge}
                        </span>
                      )}
                    </>
                  )}
                </Link>
              )}
            </div>
          ))}
        </nav>
      </aside>

      {/* Mobile Overlay */}
      {mobileMenuOpen && (
        <div
          onClick={() => setMobileMenuOpen(false)}
          className="fixed inset-0 bg-black bg-opacity-50 z-10 lg:hidden"
        ></div>
      )}

      {/* Language Dropdown Overlay */}
      {showLanguageDropdown && (
        <div
          onClick={() => setShowLanguageDropdown(false)}
          className="fixed inset-0 z-40"
        ></div>
      )}

      {/* Main Content */}
      <main
        className={`pt-16 transition-all duration-300
          ${sidebarOpen ? 'lg:pl-64' : 'lg:pl-16'}
        `}
      >
        <div className="p-4 md:p-6 lg:p-8">
          <Outlet />
        </div>
      </main>
    </div>
  )
}

export default AdminLayout

