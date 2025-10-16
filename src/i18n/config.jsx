import { createContext, useContext, useState, useEffect } from 'react'
import vi from './locales/vi.json'
import en from './locales/en.json'

// Available languages
export const LANGUAGES = {
  vi: {
    code: 'vi',
    name: 'Tiếng Việt',
    flag: '🇻🇳',
    nativeName: 'Tiếng Việt',
  },
  en: {
    code: 'en',
    name: 'English',
    flag: '🇬🇧',
    nativeName: 'English',
  },
}

// Translation resources
const resources = {
  vi,
  en,
}

// Language Context
const LanguageContext = createContext()

// Language Provider Component
export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    // Get from localStorage or default to 'vi'
    return localStorage.getItem('language') || 'vi'
  })

  const translations = resources[language]

  // Save to localStorage when language changes
  useEffect(() => {
    localStorage.setItem('language', language)
    document.documentElement.lang = language
  }, [language])

  const changeLanguage = (newLang) => {
    if (LANGUAGES[newLang]) {
      setLanguage(newLang)
    }
  }

  const t = (key) => {
    const keys = key.split('.')
    let value = translations

    for (const k of keys) {
      if (value && typeof value === 'object') {
        value = value[k]
      } else {
        return key // Return key if translation not found
      }
    }

    return value || key
  }

  return (
    <LanguageContext.Provider value={{ language, changeLanguage, t, languages: LANGUAGES }}>
      {children}
    </LanguageContext.Provider>
  )
}

// Custom hook to use language
export const useLanguage = () => {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider')
  }
  return context
}

export default LanguageContext
