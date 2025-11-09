import React from 'react'
import { Navigate } from 'react-router-dom'

const ProtectedRoute = ({ children, requiredRoles = [] }) => {
  const token = localStorage.getItem('token')
  const user = JSON.parse(localStorage.getItem('user') || '{}')
  const userRoles = user?.roles || []

  // Check if user is logged in
  if (!token || !user.id) {
    return <Navigate to="/admin/login" replace />
  }

  // Check if user has required role
  if (requiredRoles.length > 0) {
    // Check roles array (API returns roles with ROLE_ prefix)
    const hasRequiredRole = requiredRoles.some(requiredRole => 
      userRoles.includes(requiredRole) || 
      userRoles.includes(`ROLE_${requiredRole}`) ||
      userRoles.includes(requiredRole.replace('ROLE_', ''))
    )
    if (!hasRequiredRole) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-md text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="fas fa-ban text-red-500 text-2xl"></i>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Access Denied</h2>
            <p className="text-gray-600 mb-6">
              Bạn không có quyền truy cập trang này.
            </p>
            <a
              href="/admin/dashboard"
              className="inline-block bg-mekong-blue text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Quay lại Dashboard
            </a>
          </div>
        </div>
      )
    }
  }

  return children
}

export default ProtectedRoute

