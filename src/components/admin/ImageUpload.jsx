import React, { useState, useEffect } from 'react'
import api from '../../services/api'
import toast from '../../utils/toast'

const ImageUpload = ({ label, value, onChange, error, folder = 'images' }) => {
  const [preview, setPreview] = useState(value || '')
  const [uploading, setUploading] = useState(false)

  useEffect(() => {
    setPreview(value || '')
  }, [value])

  const handleFileChange = async (e) => {
    const file = e.target.files[0]
    if (!file) return

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast.error('Vui lòng chọn file hình ảnh')
      return
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('Kích thước file không được vượt quá 5MB')
      return
    }

    // Show preview immediately
    const reader = new FileReader()
    reader.onloadend = () => {
      setPreview(reader.result)
    }
    reader.readAsDataURL(file)

    // Upload to server
    setUploading(true)
    try {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('folder', folder)
      
      const response = await api.post('/files/upload/image', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      
      if (response.data.success) {
        const imageUrl = response.data.data.url
        onChange(imageUrl)
        toast.success('Upload hình ảnh thành công')
      }
    } catch (error) {
      console.error('Upload error:', error)
      toast.error('Lỗi upload hình ảnh')
      // Reset preview on error
      setPreview(value || '')
    } finally {
      setUploading(false)
    }
  }

  const handleUrlChange = (e) => {
    const url = e.target.value
    setPreview(url)
    onChange(url)
  }

  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}

      {/* Preview */}
      {preview && (
        <div className="relative w-full h-48 bg-gray-100 rounded-lg overflow-hidden">
          <img
            src={preview}
            alt="Preview"
            className="w-full h-full object-contain"
          />
          <button
            type="button"
            onClick={() => {
              setPreview('')
              onChange('')
            }}
            className="absolute top-2 right-2 w-8 h-8 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
          >
            <i className="fas fa-times"></i>
          </button>
        </div>
      )}

      {/* Upload Button */}
      <div className="flex gap-2">
        <label className="flex-1 cursor-pointer">
          <div className="flex items-center justify-center gap-2 px-4 py-2 border-2 border-dashed border-gray-300 rounded-lg hover:border-mekong-blue hover:bg-blue-50 transition-colors">
            {uploading ? (
              <>
                <i className="fas fa-spinner fa-spin"></i>
                <span>Đang tải lên...</span>
              </>
            ) : (
              <>
                <i className="fas fa-upload"></i>
                <span>Chọn ảnh từ máy tính</span>
              </>
            )}
          </div>
          <input
            type="file"
            onChange={handleFileChange}
            accept="image/*"
            className="hidden"
            disabled={uploading}
          />
        </label>
      </div>

      {/* URL Input */}
      <div className="flex gap-2">
        <input
          type="url"
          value={value || ''}
          onChange={handleUrlChange}
          placeholder="Hoặc dán URL hình ảnh"
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-mekong-blue focus:border-transparent"
        />
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

export default ImageUpload

