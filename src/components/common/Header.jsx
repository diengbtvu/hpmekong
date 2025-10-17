import React, { useState, useEffect } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useLanguage } from '../../i18n/config.jsx'
import LanguageSwitcher from './LanguageSwitcher'
import { NAV_MENU } from '../../utils/constants'
import authService from '../../services/authService'
import toast from '../../utils/toast'

const Header = () => {
  const { t, language } = useLanguage()
  const navigate = useNavigate()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState(null)
  const [user, setUser] = useState(null)

  // Check user login status
  useEffect(() => {
    const currentUser = authService.getLocalUser()
    setUser(currentUser)
  }, [])

  const handleLogout = () => {
    authService.logout()
    setUser(null)
    toast.success(language === 'vi' ? 'Đăng xuất thành công' : 'Logged out successfully')
    navigate('/')
  }

  // Close mobile menu on resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMobileMenuOpen(false)
      }
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const toggleDropdown = (index) => {
    setActiveDropdown(activeDropdown === index ? null : index)
  }

  return (
    <>
      {/* Main Navigation */}
      <header className="bg-white sticky top-0 z-50 shadow-sm">
        <div className="container-custom">
          <div className="flex items-center justify-between py-2 gap-2">
            {/* Logo Happy World Mekong */}
            <Link to="/" className="flex items-center gap-0.5 flex-shrink-0">
              <img 
                src="/logo.png" 
                alt="Happy World Mekong Logo" 
                className="h-12 md:h-14 w-auto"
              />
              <div className="hidden sm:block">
                <div className="font-heading font-black text-sm leading-none">
                  <div className="text-mekong-blue">HAPPY</div>
                  <div className="text-sunrise-orange">WORLD</div>
                  <div className="text-rice-green">MEKONG</div>
                </div>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-start gap-1 flex-1 justify-center flex-wrap">
              {NAV_MENU.map((item, index) => (
                <div key={index} className="relative group">
                  {item.children ? (
                    <>
                      <button
                        onClick={() => toggleDropdown(index)}
                        className="px-2 py-1.5 text-sm font-semibold text-text-primary hover:text-mekong-blue transition-colors flex flex-col items-center gap-0.5 min-w-[70px]"
                      >
                        {item.icon && <i className={`fas ${item.icon} text-base`}></i>}
                        <span className="text-center leading-tight whitespace-normal break-words">{t(item.nameKey)}</span>
                        <i className="fas fa-chevron-down text-xs"></i>
                      </button>
                      {/* Dropdown */}
                      <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                        {item.children.map((child, idx) => (
                          child.external ? (
                            <a
                              key={idx}
                              href={child.path}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-mekong-blue transition-colors first:rounded-t-lg last:rounded-b-lg"
                            >
                              {child.nameKey ? t(child.nameKey) : child.name}
                            </a>
                          ) : (
                            <Link
                              key={idx}
                              to={child.path}
                              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-mekong-blue transition-colors first:rounded-t-lg last:rounded-b-lg"
                            >
                              {child.nameKey ? t(child.nameKey) : child.name}
                            </Link>
                          )
                        ))}
                      </div>
                    </>
                  ) : item.external ? (
                    <a
                      href={item.path}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-2 py-1.5 text-sm font-semibold text-text-primary hover:text-mekong-blue transition-colors flex flex-col items-center gap-0.5 min-w-[70px]"
                    >
                      {item.icon && <i className={`fas ${item.icon} text-base`}></i>}
                      <span className="text-center leading-tight whitespace-normal break-words">{t(item.nameKey)}</span>
                    </a>
                  ) : (
                    <NavLink
                      to={item.path}
                      className={({ isActive }) => `
                        px-2 py-1.5 text-sm font-semibold transition-colors flex flex-col items-center gap-0.5 min-w-[70px]
                        ${isActive ? 'text-mekong-blue' : 'text-text-primary hover:text-mekong-blue'}
                      `}
                    >
                      {item.icon && <i className={`fas ${item.icon} text-base`}></i>}
                      <span className="text-center leading-tight whitespace-normal break-words">{t(item.nameKey)}</span>
                    </NavLink>
                  )}
                </div>
              ))}
            </nav>

            {/* Right Actions */}
            <div className="flex items-center gap-2 flex-shrink-0">
              {/* Language Switcher */}
              <LanguageSwitcher />

              {/* User Actions */}
              {user ? (
                <div className="hidden md:flex items-center gap-2">
                  <div className="relative group">
                    <button className="w-10 h-10 rounded-full bg-mekong-blue text-white flex items-center justify-center hover:bg-mekong-blue-dark transition-colors">
                      <i className="fas fa-user"></i>
                    </button>
                    {/* Dropdown */}
                    <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-xl py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                      <div className="px-4 py-2 border-b border-gray-200">
                        <p className="text-sm font-semibold text-gray-900 truncate">{user.fullName || user.email}</p>
                        <p className="text-xs text-gray-500 truncate">{user.email}</p>
                      </div>
                      <button
                        onClick={handleLogout}
                        className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                      >
                        <i className="fas fa-sign-out-alt mr-2"></i>
                        {language === 'vi' ? 'Đăng xuất' : 'Logout'}
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="hidden md:flex items-center gap-2">
                  <Link 
                    to="/login" 
                    className="w-10 h-10 rounded-full border-2 border-mekong-blue text-mekong-blue hover:bg-mekong-blue hover:text-white transition-all flex items-center justify-center"
                    title={language === 'vi' ? 'Đăng nhập' : 'Login'}
                  >
                    <i className="fas fa-sign-in-alt"></i>
                  </Link>
                  <Link 
                    to="/register" 
                    className="w-10 h-10 rounded-full bg-mekong-blue text-white hover:bg-mekong-blue-dark transition-colors flex items-center justify-center"
                    title={language === 'vi' ? 'Đăng ký' : 'Register'}
                  >
                    <i className="fas fa-user-plus"></i>
                  </Link>
                </div>
              )}
              
              {/* Search Dropdown - giống NovaEdu */}
              <div className="relative">
                <button
                  onClick={() => setIsSearchOpen(!isSearchOpen)}
                  className="w-10 h-10 rounded-full bg-text-primary hover:bg-mekong-blue text-white transition-all flex items-center justify-center"
                  aria-label="Search"
                >
                  <i className="fas fa-magnifying-glass text-sm"></i>
                </button>

                {isSearchOpen && (
                  <div className="absolute right-0 top-full mt-2 w-80 bg-white rounded-lg shadow-xl p-3 z-50 animate-fade-in">
                    <form className="flex gap-2">
                      <input
                        type="search"
                        placeholder={t('header.searchPlaceholder')}
                        className="flex-1 px-4 py-2 border-2 border-gray-200 rounded-l-lg focus:border-mekong-blue outline-none text-sm"
                        autoFocus
                      />
                      <button className="px-4 py-2 bg-mekong-blue text-white rounded-r-lg hover:bg-mekong-blue-dark transition-colors">
                        <i className="fas fa-magnifying-glass"></i>
                      </button>
                    </form>
                  </div>
                )}
              </div>

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden w-10 h-10 rounded-lg bg-mekong-blue text-white flex items-center justify-center"
                aria-label="Menu"
              >
                <i className={`fas ${isMobileMenuOpen ? 'fa-xmark' : 'fa-bars'} text-lg`}></i>
              </button>
            </div>
          </div>

        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 bg-white animate-fade-in">
            <nav className="container-custom py-4">
              {NAV_MENU.map((item, index) => (
                <div key={index} className="border-b border-gray-100 last:border-0">
                  {item.children ? (
                    <>
                      <button
                        onClick={() => toggleDropdown(index)}
                        className="w-full px-4 py-3 text-left font-semibold text-gray-700 hover:text-mekong-blue transition-colors flex items-center justify-between"
                      >
                        <span className="flex items-center gap-2">
                          {item.icon && <i className={`fas ${item.icon}`}></i>}
                          {t(item.nameKey)}
                        </span>
                        <i className={`fas fa-chevron-down text-xs transition-transform ${activeDropdown === index ? 'rotate-180' : ''}`}></i>
                      </button>
                      {activeDropdown === index && (
                        <div className="bg-gray-50 py-2">
                          {item.children.map((child, idx) => (
                            child.external ? (
                              <a
                                key={idx}
                                href={child.path}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block px-8 py-2 text-sm text-gray-600 hover:text-mekong-blue transition-colors"
                              >
                                {child.nameKey ? t(child.nameKey) : child.name}
                              </a>
                            ) : (
                              <Link
                                key={idx}
                                to={child.path}
                                className="block px-8 py-2 text-sm text-gray-600 hover:text-mekong-blue transition-colors"
                                onClick={() => setIsMobileMenuOpen(false)}
                              >
                                {child.nameKey ? t(child.nameKey) : child.name}
                              </Link>
                            )
                          ))}
                        </div>
                      )}
                    </>
                  ) : item.external ? (
                    <a
                      href={item.path}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block px-4 py-3 font-semibold text-gray-700 hover:text-mekong-blue transition-colors"
                    >
                      <span className="flex items-center gap-2">
                        {item.icon && <i className={`fas ${item.icon}`}></i>}
                        {item.name}
                      </span>
                    </a>
                  ) : (
                    <NavLink
                      to={item.path}
                      className={({ isActive }) => `
                        block px-4 py-3 font-semibold transition-colors
                        ${isActive ? 'text-mekong-blue bg-blue-50' : 'text-gray-700 hover:text-mekong-blue'}
                      `}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <span className="flex items-center gap-2">
                        {item.icon && <i className={`fas ${item.icon}`}></i>}
                        {item.name}
                      </span>
                    </NavLink>
                  )}
                </div>
              ))}
              
              {/* Mobile Auth Actions */}
              <div className="mt-4 px-4 space-y-2">
                {user ? (
                  <>
                    <div className="text-sm text-center mb-2">
                      <span className="text-gray-600">{language === 'vi' ? 'Xin chào,' : 'Hello,'}</span>
                      <span className="font-semibold text-mekong-blue ml-1">{user.fullName || user.email}</span>
                    </div>
                    <button
                      onClick={() => {
                        handleLogout()
                        setIsMobileMenuOpen(false)
                      }}
                      className="btn btn-outline w-full justify-center"
                    >
                      <i className="fas fa-sign-out-alt mr-2"></i>
                      {language === 'vi' ? 'Đăng xuất' : 'Logout'}
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      to="/login"
                      className="btn btn-outline w-full justify-center"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {language === 'vi' ? 'Đăng nhập' : 'Login'}
                    </Link>
                    <Link
                      to="/register"
                      className="btn btn-primary w-full justify-center"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {language === 'vi' ? 'Đăng ký' : 'Register'}
                    </Link>
                  </>
                )}
              </div>
            </nav>
          </div>
        )}
      </header>
    </>
  )
}

export default Header

