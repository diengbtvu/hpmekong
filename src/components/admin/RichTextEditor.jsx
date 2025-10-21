import React, { useMemo, useRef } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import api from '../../services/api'
import toast from '../../utils/toast'

const RichTextEditor = ({ label, value, onChange, height = 400 }) => {
  const quillRef = useRef(null)

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
          // Insert image
          quill.insertEmbed(range.index, 'image', response.data.data.url)
          quill.setSelection(range.index + 1)
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
