import React, { useState } from 'react'
import toast from '../../utils/toast'

const MediaLibrary = () => {
  const [uploading, setUploading] = useState(false)

  const handleUpload = async (e) => {
    const files = Array.from(e.target.files)
    setUploading(true)
    try {
      // TODO: Implement upload
      toast.success('Files uploaded successfully')
    } catch (error) {
      toast.error('Error uploading files')
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div><h1 className="text-2xl font-bold text-gray-900">Media Library</h1><p className="text-gray-600 mt-1">Upload and manage media files</p></div>
      
      <div className="bg-white rounded-xl p-8 shadow-sm text-center">
        <label className="cursor-pointer">
          <div className="border-2 border-dashed border-gray-300 rounded-xl p-12 hover:border-mekong-blue hover:bg-blue-50 transition-colors">
            <i className="fas fa-cloud-upload-alt text-6xl text-gray-400 mb-4"></i>
            <p className="text-lg font-semibold text-gray-900 mb-2">Drop files here or click to upload</p>
            <p className="text-sm text-gray-500">Supports: JPG, PNG, GIF, PDF, DOC (Max 10MB)</p>
          </div>
          <input type="file" multiple onChange={handleUpload} className="hidden" accept="image/*,application/pdf,.doc,.docx" />
        </label>
      </div>

      {uploading && (
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-mekong-blue"></div>
            <span>Uploading files...</span>
          </div>
        </div>
      )}
    </div>
  )
}

export default MediaLibrary
