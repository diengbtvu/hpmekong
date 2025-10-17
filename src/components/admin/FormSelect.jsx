import React from 'react'

const FormSelect = ({ 
  label, 
  name, 
  value, 
  onChange, 
  options = [],
  required = false,
  error,
  disabled = false,
  placeholder = 'Select...'
}) => {
  return (
    <div className="space-y-1">
      {label && (
        <label htmlFor={name} className="block text-sm font-medium text-gray-700">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      
      <select
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        disabled={disabled}
        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-mekong-blue focus:border-transparent transition-colors
          ${error ? 'border-red-500' : 'border-gray-300'}
          ${disabled ? 'bg-gray-100 cursor-not-allowed' : 'bg-white'}
        `}
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      
      {error && (
        <p className="text-sm text-red-500">
          <i className="fas fa-exclamation-circle mr-1"></i>
          {error}
        </p>
      )}
    </div>
  )
}

export default FormSelect

