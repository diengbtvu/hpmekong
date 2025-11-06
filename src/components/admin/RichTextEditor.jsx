import React, { useMemo, useRef, useState } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import api from '../../services/api'
import toast from '../../utils/toast'

const RichTextEditor = ({ label, value, onChange, height = 400 }) => {
  const quillRef = useRef(null)
  const [showCaptionModal, setShowCaptionModal] = useState(false)
  const [pendingImage, setPendingImage] = useState(null)
  const [imageCaption, setImageCaption] = useState('')
  const [imageAlt, setImageAlt] = useState('')

  // Insert image with caption
  const insertImageWithCaption = (imageUrl, alt, caption) => {
    const quill = quillRef.current.getEditor()
    const range = quill.getSelection(true)

    // Insert image with alt text
    quill.insertEmbed(range.index, 'image', imageUrl)
    
    // Set alt attribute
    setTimeout(() => {
      const images = quill.root.querySelectorAll('img')
      const lastImage = images[images.length - 1]
      if (lastImage && alt) {
        lastImage.setAttribute('alt', alt)
      }
      if (lastImage && caption) {
        lastImage.setAttribute('title', caption)
      }
    }, 0)

    // Insert caption as italic text below image if provided
    if (caption) {
      quill.insertText(range.index + 1, '\n')
      quill.insertText(range.index + 2, caption, { italic: true, color: '#6b7280', size: 'small' })
      quill.insertText(range.index + 2 + caption.length, '\n')
      quill.setSelection(range.index + 3 + caption.length)
    } else {
      quill.setSelection(range.index + 1)
    }
  }

  // Custom image upload handler
  const imageHandler = () => {
    const input = document.createElement('input')
    input.setAttribute('type', 'file')
    input.setAttribute('accept', 'image/*')
    input.click()

    input.onchange = async () => {
      const file = input.files[0]
      if (!file) return

      try {
        // Show loading
        const quill = quillRef.current.getEditor()
        const range = quill.getSelection(true)
        quill.insertText(range.index, 'Đang tải ảnh...')
        quill.setSelection(range.index + 15)

        // Upload image
        const formData = new FormData()
        formData.append('file', file)
        formData.append('folder', 'posts')

        const response = await api.post('/files/upload/image', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })

        if (response.data.success) {
          // Remove loading text
          quill.deleteText(range.index, 15)
          
          // Store image URL and show caption modal
          setPendingImage({
            url: response.data.data.url,
            range: range.index
          })
          setImageCaption('')
          setImageAlt('')
          setShowCaptionModal(true)
          
          toast.success('Tải ảnh lên thành công!')
        }
      } catch (error) {
        console.error('Error uploading image:', error)
        toast.error('Lỗi tải ảnh lên')
        // Remove loading text on error
        const quill = quillRef.current.getEditor()
        const range = quill.getSelection()
        if (range) {
          quill.deleteText(range.index - 15, 15)
        }
      }
    }
  }

  // Handle caption submit
  const handleCaptionSubmit = () => {
    if (pendingImage) {
      insertImageWithCaption(pendingImage.url, imageAlt, imageCaption)
      setShowCaptionModal(false)
      setPendingImage(null)
      setImageCaption('')
      setImageAlt('')
    }
  }

  // Handle caption skip
  const handleCaptionSkip = () => {
    if (pendingImage) {
      const quill = quillRef.current.getEditor()
      quill.insertEmbed(pendingImage.range, 'image', pendingImage.url)
      quill.setSelection(pendingImage.range + 1)
      setShowCaptionModal(false)
      setPendingImage(null)
      setImageCaption('')
      setImageAlt('')
    }
  }

  // Quill modules configuration
  const modules = useMemo(() => ({
    toolbar: {
      container: [
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
        [{ 'font': [] }],
        [{ 'size': ['small', false, 'large', 'huge'] }],
        ['bold', 'italic', 'underline', 'strike'],
        [{ 'color': [] }, { 'background': [] }],
        [{ 'script': 'sub' }, { 'script': 'super' }],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
        [{ 'indent': '-1' }, { 'indent': '+1' }],
        [{ 'align': [] }],
        ['blockquote', 'code-block'],
        ['link', 'image', 'video'],
        ['clean']
      ],
      handlers: {
        image: imageHandler
      }
    },
    clipboard: {
      matchVisual: false
    }
  }), [])

  // Quill formats
  const formats = [
    'header', 'font', 'size',
    'bold', 'italic', 'underline', 'strike',
    'color', 'background',
    'script',
    'list', 'bullet', 'indent',
    'align',
    'blockquote', 'code-block',
    'link', 'image', 'video'
  ]

  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <div className="quill-editor-wrapper">
        <ReactQuill
          ref={quillRef}
          theme="snow"
          value={value}
          onChange={onChange}
          modules={modules}
          formats={formats}
          placeholder="Nhập nội dung bài viết..."
          style={{ height: `${height}px` }}
        />
      </div>
      <p className="text-xs text-gray-500 mt-1">
        Hỗ trợ định dạng văn bản, hình ảnh, video, và nhiều hơn nữa. Click vào icon hình ảnh để tải ảnh lên.
      </p>

      {/* Caption Modal */}
      {showCaptionModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-lg w-full mx-4">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  Thêm mô tả cho ảnh
                </h3>
                <button
                  onClick={handleCaptionSkip}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <i className="fas fa-times"></i>
                </button>
              </div>

              {/* Preview image */}
              {pendingImage && (
                <div className="mb-4">
                  <img 
                    src={pendingImage.url} 
                    alt="Preview" 
                    className="w-full max-h-64 object-contain rounded-lg border"
                  />
                </div>
              )}

              {/* Alt text input */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Alt Text (Văn bản thay thế)
                  <span className="text-gray-500 text-xs ml-1">(Tốt cho SEO)</span>
                </label>
                <input
                  type="text"
                  value={imageAlt}
                  onChange={(e) => setImageAlt(e.target.value)}
                  placeholder="Mô tả ngắn gọn nội dung ảnh..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-mekong-blue focus:border-transparent"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault()
                      handleCaptionSubmit()
                    }
                  }}
                />
              </div>

              {/* Caption input */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Caption (Chú thích)
                  <span className="text-gray-500 text-xs ml-1">(Hiển thị dưới ảnh)</span>
                </label>
                <textarea
                  value={imageCaption}
                  onChange={(e) => setImageCaption(e.target.value)}
                  placeholder="Nhập chú thích cho ảnh (tùy chọn)..."
                  rows="3"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-mekong-blue focus:border-transparent resize-none"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Caption sẽ hiển thị dưới ảnh với font chữ nhỏ và màu xám
                </p>
              </div>

              {/* Action buttons */}
              <div className="flex gap-3">
                <button
                  onClick={handleCaptionSubmit}
                  className="flex-1 px-4 py-2 bg-mekong-blue text-white rounded-lg hover:bg-blue-dark transition-colors"
                >
                  <i className="fas fa-check mr-2"></i>
                  Chèn ảnh
                </button>
                <button
                  onClick={handleCaptionSkip}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Bỏ qua
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      <style jsx>{`
        .quill-editor-wrapper {
          margin-bottom: 60px;
        }
        .quill-editor-wrapper :global(.ql-container) {
          font-size: 16px;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
        }
        .quill-editor-wrapper :global(.ql-editor) {
          min-height: ${height}px;
          max-height: ${height + 200}px;
          overflow-y: auto;
        }
        .quill-editor-wrapper :global(.ql-editor.ql-blank::before) {
          color: #9ca3af;
          font-style: italic;
        }
        .quill-editor-wrapper :global(.ql-snow .ql-picker) {
          color: #374151;
        }
        .quill-editor-wrapper :global(.ql-toolbar.ql-snow) {
          border: 1px solid #e5e7eb;
          border-radius: 8px 8px 0 0;
          background: #f9fafb;
        }
        .quill-editor-wrapper :global(.ql-container.ql-snow) {
          border: 1px solid #e5e7eb;
          border-top: none;
          border-radius: 0 0 8px 8px;
        }
        .quill-editor-wrapper :global(.ql-editor img) {
          max-width: 100%;
          height: auto;
          border-radius: 8px;
          margin: 10px 0;
        }
        .quill-editor-wrapper :global(.ql-editor a) {
          color: #0057B8;
          text-decoration: underline;
        }
        .quill-editor-wrapper :global(.ql-editor blockquote) {
          border-left: 4px solid #0057B8;
          padding-left: 16px;
          margin-left: 0;
          color: #4b5563;
          font-style: italic;
        }
        .quill-editor-wrapper :global(.ql-editor pre) {
          background: #1f2937;
          color: #f3f4f6;
          border-radius: 8px;
          padding: 16px;
          overflow-x: auto;
        }
      `}</style>
    </div>
  )
}

export default RichTextEditor
