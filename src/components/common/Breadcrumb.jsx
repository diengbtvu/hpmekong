import React from 'react'
import { Link } from 'react-router-dom'
import { useLanguage } from '../../i18n/config.jsx'

const Breadcrumb = ({ items }) => {
  const { language } = useLanguage()

  return (
    <nav className="flex items-center gap-2 text-sm">
      {items.map((item, index) => (
        <div key={index} className="flex items-center gap-2">
          {index > 0 && (
            <i className="fas fa-chevron-right text-gray-400 text-xs"></i>
          )}
          {item.path ? (
            <Link
              to={item.path}
              className="text-gray-600 hover:text-mekong-blue transition-colors"
            >
              {item.label}
            </Link>
          ) : (
            <span className="text-gray-900 font-semibold">{item.label}</span>
          )}
        </div>
      ))}
    </nav>
  )
}

export default Breadcrumb

