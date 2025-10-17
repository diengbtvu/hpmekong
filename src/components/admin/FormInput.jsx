import React from 'react'

const FormInput = ({ 
  label, 
  name, 
  type = 'text', 
  value, 
  onChange, 
  placeholder, 
  required = false,
  error,
  disabled = false,
  icon,
  rows = 3
}) => {
  const inputClasses = `w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-mekong-blue focus:border-transparent transition-colors
    ${error ? 'border-red-500' : 'border-gray-300'}
    ${disabled ? 'bg-gray-100 cursor-not-allowed' : 'bg-white'}
    ${icon ? 'pl-10' : ''}
  `

  return (
    <div className="space-y-1">
      {label && (
        <label htmlFor={name} className="block text-sm font-medium text-gray-700">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      
      <div className="relative">
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <i className={`fas ${icon} text-gray-400`}></i>
          </div>
        )}
        
        {type === 'textarea' ? (
          <textarea
            id={name}
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            required={required}
            disabled={disabled}
            rows={rows}
            className={inputClasses}
          />
        ) : (
          <input
            id={name}
            name={name}
            type={type}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            required={required}
            disabled={disabled}
            className={inputClasses}
          />
        )}
      </div>
      
      {error && (
        <p className="text-sm text-red-500">
          <i className="fas fa-exclamation-circle mr-1"></i>
          {error}
        </p>
      )}
    </div>
  )
}

export default FormInput

