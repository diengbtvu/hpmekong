import { useState, useRef, useEffect } from 'react'
import { useLanguage } from '../../i18n/config.jsx'

const LanguageSwitcher = () => {
  const { language, changeLanguage, languages } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef(null)

  const currentLang = languages[language]

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleLanguageChange = (langCode) => {
    changeLanguage(langCode)
    setIsOpen(false)
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
        aria-label="Change language"
      >
        <span className="text-xl">{currentLang.flag}</span>
        <span className="hidden md:inline font-medium text-gray-700">
          {currentLang.code.toUpperCase()}
        </span>
        <i className={`fas fa-chevron-down text-xs transition-transform ${isOpen ? 'rotate-180' : ''}`}></i>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50 animate-fade-in">
          {Object.values(languages).map((lang) => (
            <button
              key={lang.code}
              onClick={() => handleLanguageChange(lang.code)}
              className={`
                w-full px-4 py-2 text-left hover:bg-gray-100 transition-colors
                flex items-center gap-3
                ${language === lang.code ? 'bg-blue-50 text-mekong-blue font-semibold' : 'text-gray-700'}
              `}
            >
              <span className="text-xl">{lang.flag}</span>
              <div className="flex flex-col">
                <span className="font-medium">{lang.nativeName}</span>
                <span className="text-xs text-gray-500">{lang.name}</span>
              </div>
              {language === lang.code && (
                <i className="fas fa-check ml-auto text-mekong-blue"></i>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default LanguageSwitcher

