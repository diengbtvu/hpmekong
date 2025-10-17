import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { exportToCSV } from '../../utils/exportToExcel'

const DataTable = ({
  columns = [],
  data = [],
  loading = false,
  onEdit,
  onDelete,
  onView,
  actions = true,
  searchable = true,
  pagination = true,
  itemsPerPage = 10,
  exportable = true
}) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' })

  // Ensure data is always an array
  const safeData = Array.isArray(data) ? data : []

  // Filter data based on search
  const filteredData = safeData.filter(item =>
    columns.some(column => {
      const value = item[column.key]
      return value && value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    })
  )

  // Sort data
  const sortedData = [...filteredData].sort((a, b) => {
    if (!sortConfig.key) return 0
    
    const aValue = a[sortConfig.key]
    const bValue = b[sortConfig.key]
    
    if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1
    if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1
    return 0
  })

  // Pagination
  const totalPages = Math.ceil(sortedData.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const paginatedData = pagination ? sortedData.slice(startIndex, endIndex) : sortedData

  const handleSort = (key) => {
    setSortConfig(current => ({
      key,
      direction: current.key === key && current.direction === 'asc' ? 'desc' : 'asc'
    }))
  }

  const getSortIcon = (key) => {
    if (sortConfig.key !== key) return 'fa-sort'
    return sortConfig.direction === 'asc' ? 'fa-sort-up' : 'fa-sort-down'
  }

  return (
    <div className="bg-white rounded-xl shadow-sm">
      {/* Header with Search */}
      {(searchable || exportable) && (
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center gap-3">
            {searchable && (
              <div className="relative flex-1">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <i className="fas fa-search text-gray-400"></i>
                </div>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value)
                    setCurrentPage(1)
                  }}
                  placeholder="Search..."
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-mekong-blue focus:border-transparent"
                />
              </div>
            )}
            {exportable && safeData.length > 0 && (
              <button
                onClick={() => exportToCSV(filteredData, 'export.csv')}
                className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors whitespace-nowrap"
              >
                <i className="fas fa-download"></i>
                <span>Export CSV</span>
              </button>
            )}
          </div>
        </div>
      )}

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              {columns.map((column) => (
                <th
                  key={column.key}
                  onClick={() => column.sortable && handleSort(column.key)}
                  className={`px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider
                    ${column.sortable ? 'cursor-pointer hover:bg-gray-100' : ''}
                  `}
                >
                  <div className="flex items-center gap-2">
                    {column.label}
                    {column.sortable && (
                      <i className={`fas ${getSortIcon(column.key)} text-gray-400`}></i>
                    )}
                  </div>
                </th>
              ))}
              {actions && (
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              )}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {loading ? (
              <tr>
                <td colSpan={columns.length + (actions ? 1 : 0)} className="px-6 py-12 text-center">
                  <div className="flex justify-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-mekong-blue"></div>
                  </div>
                </td>
              </tr>
            ) : paginatedData.length === 0 ? (
              <tr>
                <td colSpan={columns.length + (actions ? 1 : 0)} className="px-6 py-12 text-center text-gray-500">
                  <i className="fas fa-inbox text-4xl mb-2 block"></i>
                  <p>No data available</p>
                </td>
              </tr>
            ) : (
              paginatedData.map((row, rowIndex) => (
                <motion.tr
                  key={row.id || rowIndex}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: rowIndex * 0.05 }}
                  className="hover:bg-gray-50"
                >
                  {columns.map((column) => (
                    <td key={column.key} className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {column.render ? column.render(row[column.key], row) : row[column.key]}
                    </td>
                  ))}
                  {actions && (
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end gap-2">
                        {onView && (
                          <button
                            onClick={() => onView(row)}
                            className="text-blue-600 hover:text-blue-900 p-2 hover:bg-blue-50 rounded transition-colors"
                            title="View"
                          >
                            <i className="fas fa-eye"></i>
                          </button>
                        )}
                        {onEdit && (
                          <button
                            onClick={() => onEdit(row)}
                            className="text-green-600 hover:text-green-900 p-2 hover:bg-green-50 rounded transition-colors"
                            title="Edit"
                          >
                            <i className="fas fa-edit"></i>
                          </button>
                        )}
                        {onDelete && (
                          <button
                            onClick={() => onDelete(row)}
                            className="text-red-600 hover:text-red-900 p-2 hover:bg-red-50 rounded transition-colors"
                            title="Delete"
                          >
                            <i className="fas fa-trash"></i>
                          </button>
                        )}
                      </div>
                    </td>
                  )}
                </motion.tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {pagination && totalPages > 1 && (
        <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
          <div className="text-sm text-gray-700">
            Showing <span className="font-medium">{startIndex + 1}</span> to{' '}
            <span className="font-medium">{Math.min(endIndex, sortedData.length)}</span> of{' '}
            <span className="font-medium">{sortedData.length}</span> results
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 border border-gray-300 rounded-lg text-sm hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <i className="fas fa-chevron-left"></i>
            </button>
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-3 py-1 border rounded-lg text-sm
                  ${currentPage === i + 1 
                    ? 'bg-mekong-blue text-white border-mekong-blue' 
                    : 'border-gray-300 hover:bg-gray-50'}
                `}
              >
                {i + 1}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="px-3 py-1 border border-gray-300 rounded-lg text-sm hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <i className="fas fa-chevron-right"></i>
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default DataTable

