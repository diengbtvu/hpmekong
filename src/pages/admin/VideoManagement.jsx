import React, { useState, useEffect } from 'react'
import DataTable from '../../components/admin/DataTable'
import Modal from '../../components/admin/Modal'
import FormInput from '../../components/admin/FormInput'
import FormSelect from '../../components/admin/FormSelect'
import ImageUpload from '../../components/admin/ImageUpload'
import { videoService } from '../../services/contentService'
import toast from '../../utils/toast'
import { useLanguage } from '../../i18n/config'

const VideoManagement = () => {
  const { language } = useLanguage()
  const [videos, setVideos] = useState([])
  const [loading, setLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingVideo, setEditingVideo] = useState(null)
  const [formData, setFormData] = useState({
    title: '',
    titleEn: '',
    description: '',
    descriptionEn: '',
    videoUrl: '',
    videoId: '',
    videoPlatform: 'YOUTUBE',
    thumbnailUrl: '',
    type: 'INTRODUCTION',
    author: '',
    publishedDate: '',
    displayOrder: 0,
    isActive: true,
    isFeatured: false
  })

  const translations = {
    vi: {
      videoManagement: 'Quản lý Video',
      manageVideos: 'Quản lý video giới thiệu và nội dung',
      addVideo: 'Thêm Video',
      editVideo: 'Sửa Video',
      createVideo: 'Tạo Video',
      titleVi: 'Tiêu đề (VI)',
      titleEn: 'Tiêu đề (EN)',
      descriptionVi: 'Mô tả (VI)',
      descriptionEn: 'Mô tả (EN)',
      videoUrl: 'Link Video (YouTube/Vimeo)',
      videoId: 'Video ID',
      thumbnail: 'Ảnh thumbnail',
      platform: 'Platform',
      type: 'Loại',
      author: 'Tác giả',
      publishedDate: 'Ngày xuất bản',
      displayOrder: 'Thứ tự hiển thị',
      status: 'Trạng thái',
      featured: 'Nổi bật',
      active: 'Hoạt động',
      inactive: 'Tạm dừng',
      yes: 'Có',
      no: 'Không',
      cancel: 'Hủy',
      update: 'Cập nhật',
      create: 'Tạo',
      introduction: 'Giới thiệu',
      tutorial: 'Hướng dẫn',
      testimonial: 'Đánh giá',
      event: 'Sự kiện',
      news: 'Tin tức',
      other: 'Khác',
      id: 'ID',
      title: 'Tiêu đề',
      views: 'Lượt xem',
      deleteVideoConfirm: 'Xóa video',
      videoDeletedSuccess: 'Đã xóa video thành công',
      videoUpdatedSuccess: 'Đã cập nhật video thành công',
      videoCreatedSuccess: 'Đã tạo video thành công',
      errorFetchingVideos: 'Lỗi tải danh sách video',
      errorDeletingVideo: 'Lỗi xóa video',
      errorSavingVideo: 'Lỗi lưu video',
      youtubeUrlHelper: 'VD: https://www.youtube.com/watch?v=VIDEO_ID hoặc https://youtu.be/VIDEO_ID'
    },
    en: {
      videoManagement: 'Video Management',
      manageVideos: 'Manage introduction and content videos',
      addVideo: 'Add Video',
      editVideo: 'Edit Video',
      createVideo: 'Create Video',
      titleVi: 'Title (VI)',
      titleEn: 'Title (EN)',
      descriptionVi: 'Description (VI)',
      descriptionEn: 'Description (EN)',
      videoUrl: 'Video URL (YouTube/Vimeo)',
      videoId: 'Video ID',
      thumbnail: 'Thumbnail',
      platform: 'Platform',
      type: 'Type',
      author: 'Author',
      publishedDate: 'Published Date',
      displayOrder: 'Display Order',
      status: 'Status',
      featured: 'Featured',
      active: 'Active',
      inactive: 'Inactive',
      yes: 'Yes',
      no: 'No',
      cancel: 'Cancel',
      update: 'Update',
      create: 'Create',
      introduction: 'Introduction',
      tutorial: 'Tutorial',
      testimonial: 'Testimonial',
      event: 'Event',
      news: 'News',
      other: 'Other',
      id: 'ID',
      title: 'Title',
      views: 'Views',
      deleteVideoConfirm: 'Delete video',
      videoDeletedSuccess: 'Video deleted successfully',
      videoUpdatedSuccess: 'Video updated successfully',
      videoCreatedSuccess: 'Video created successfully',
      errorFetchingVideos: 'Error fetching videos',
      errorDeletingVideo: 'Error deleting video',
      errorSavingVideo: 'Error saving video',
      youtubeUrlHelper: 'E.g.: https://www.youtube.com/watch?v=VIDEO_ID or https://youtu.be/VIDEO_ID'
    }
  }

  const t = (key) => translations[language]?.[key] || translations['vi'][key] || key

  useEffect(() => {
    fetchVideos()
  }, [])

  const fetchVideos = async () => {
    try {
      const response = await videoService.getAllVideos()
      if (response.success) {
        setVideos(response.data)
      }
    } catch (error) {
      toast.error(t('errorFetchingVideos'))
    } finally {
      setLoading(false)
    }
  }

  // Extract YouTube video ID from URL
  const extractYouTubeId = (url) => {
    if (!url) return ''
    
    const patterns = [
      /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/,
      /youtube\.com\/embed\/([^&\n?#]+)/,
      /youtube\.com\/v\/([^&\n?#]+)/
    ]
    
    for (const pattern of patterns) {
      const match = url.match(pattern)
      if (match && match[1]) {
        return match[1]
      }
    }
    
    return ''
  }

  const handleVideoUrlChange = (url) => {
    setFormData({
      ...formData,
      videoUrl: url,
      videoId: extractYouTubeId(url),
      thumbnailUrl: extractYouTubeId(url) 
        ? `https://img.youtube.com/vi/${extractYouTubeId(url)}/maxresdefault.jpg`
        : formData.thumbnailUrl
    })
  }

  const handleCreate = () => {
    setEditingVideo(null)
    setFormData({
      title: '',
      titleEn: '',
      description: '',
      descriptionEn: '',
      videoUrl: '',
      videoId: '',
      videoPlatform: 'YOUTUBE',
      thumbnailUrl: '',
      type: 'INTRODUCTION',
      author: '',
      publishedDate: '',
      displayOrder: 0,
      isActive: true,
      isFeatured: false
    })
    setIsModalOpen(true)
  }

  const handleEdit = (video) => {
    setEditingVideo(video)
    setFormData(video)
    setIsModalOpen(true)
  }

  const handleDelete = async (video) => {
    if (!confirm(`${t('deleteVideoConfirm')} "${video.title}"?`)) return

    try {
      await videoService.deleteVideo(video.id)
      toast.success(t('videoDeletedSuccess'))
      fetchVideos()
    } catch (error) {
      toast.error(t('errorDeletingVideo'))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    try {
      if (editingVideo) {
        await videoService.updateVideo(editingVideo.id, formData)
        toast.success(t('videoUpdatedSuccess'))
      } else {
        await videoService.createVideo(formData)
        toast.success(t('videoCreatedSuccess'))
      }
      setIsModalOpen(false)
      fetchVideos()
    } catch (error) {
      console.error('Error saving video:', error.response?.data || error)
      const errorMessage = error.response?.data?.error?.message || t('errorSavingVideo')
      toast.error(errorMessage)
    }
  }

  const columns = [
    { key: 'id', label: t('id'), sortable: true },
    { 
      key: 'thumbnailUrl', 
      label: t('thumbnail'),
      render: (value) => value ? (
        <img src={value} alt="" className="w-20 h-12 object-cover rounded" />
      ) : (
        <div className="w-20 h-12 bg-gray-200 rounded flex items-center justify-center">
          <i className="fas fa-video text-gray-400"></i>
        </div>
      )
    },
    { key: 'title', label: t('title'), sortable: true },
    { 
      key: 'type', 
      label: t('type'),
      render: (value) => (
        <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full">
          {t(value.toLowerCase())}
        </span>
      )
    },
    { 
      key: 'isFeatured', 
      label: t('featured'),
      render: (value) => value ? (
        <span className="text-yellow-500"><i className="fas fa-star"></i></span>
      ) : null
    },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{t('videoManagement')}</h1>
          <p className="text-gray-600 mt-1">{t('manageVideos')}</p>
        </div>
        <button
          onClick={handleCreate}
          className="flex items-center gap-2 px-4 py-2 bg-mekong-blue text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <i className="fas fa-plus"></i>
          <span>{t('addVideo')}</span>
        </button>
      </div>

      {/* Data Table */}
      <DataTable
        columns={columns}
        data={videos}
        loading={loading}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {/* Create/Edit Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingVideo ? t('editVideo') : t('createVideo')}
        size="lg"
        footer={
          <>
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              {t('cancel')}
            </button>
            <button
              type="submit"
              form="video-form"
              className="px-4 py-2 bg-mekong-blue text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              {editingVideo ? t('update') : t('create')}
            </button>
          </>
        }
      >
        <form id="video-form" onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <FormInput
              label={`${t('titleVi')} *`}
              name="title"
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              required
            />
            <FormInput
              label={t('titleEn')}
              name="titleEn"
              value={formData.titleEn}
              onChange={(e) => setFormData({...formData, titleEn: e.target.value})}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <FormInput
              label={t('descriptionVi')}
              name="description"
              type="textarea"
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
            />
            <FormInput
              label={t('descriptionEn')}
              name="descriptionEn"
              type="textarea"
              rows={3}
              value={formData.descriptionEn}
              onChange={(e) => setFormData({...formData, descriptionEn: e.target.value})}
            />
          </div>

          <div>
            <FormInput
              label={`${t('videoUrl')} *`}
              name="videoUrl"
              value={formData.videoUrl}
              onChange={(e) => handleVideoUrlChange(e.target.value)}
              placeholder="https://www.youtube.com/watch?v=VIDEO_ID"
              required
            />
            <p className="text-xs text-gray-500 mt-1">
              <i className="fas fa-info-circle mr-1"></i>
              {t('youtubeUrlHelper')}
            </p>
            {formData.videoId && (
              <p className="text-xs text-green-600 mt-1">
                <i className="fas fa-check-circle mr-1"></i>
                Video ID: {formData.videoId}
              </p>
            )}
          </div>

          {formData.thumbnailUrl && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('thumbnail')} Preview
              </label>
              <img 
                src={formData.thumbnailUrl} 
                alt="Thumbnail preview" 
                className="w-full max-w-md h-auto rounded-lg"
              />
            </div>
          )}

          <ImageUpload
            label={t('thumbnail') + ' (Custom)'}
            value={formData.thumbnailUrl}
            onChange={(url) => setFormData({...formData, thumbnailUrl: url})}
            folder="videos"
          />

          <div className="grid grid-cols-2 gap-4">
            <FormSelect
              label={t('platform')}
              name="videoPlatform"
              value={formData.videoPlatform}
              onChange={(e) => setFormData({...formData, videoPlatform: e.target.value})}
              options={[
                { value: 'YOUTUBE', label: 'YouTube' },
                { value: 'VIMEO', label: 'Vimeo' },
                { value: 'EXTERNAL', label: 'External' },
                { value: 'SELF_HOSTED', label: 'Self Hosted' }
              ]}
            />
            <FormSelect
              label={t('type')}
              name="type"
              value={formData.type}
              onChange={(e) => setFormData({...formData, type: e.target.value})}
              options={[
                { value: 'INTRODUCTION', label: t('introduction') },
                { value: 'TUTORIAL', label: t('tutorial') },
                { value: 'TESTIMONIAL', label: t('testimonial') },
                { value: 'EVENT', label: t('event') },
                { value: 'NEWS', label: t('news') },
                { value: 'OTHER', label: t('other') }
              ]}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <FormInput
              label={t('author')}
              name="author"
              value={formData.author}
              onChange={(e) => setFormData({...formData, author: e.target.value})}
            />
            <FormInput
              label={t('publishedDate')}
              name="publishedDate"
              type="date"
              value={formData.publishedDate}
              onChange={(e) => setFormData({...formData, publishedDate: e.target.value})}
            />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <FormInput
              label={t('displayOrder')}
              name="displayOrder"
              type="number"
              value={formData.displayOrder}
              onChange={(e) => setFormData({...formData, displayOrder: parseInt(e.target.value)})}
            />
            <FormSelect
              label={t('status')}
              name="isActive"
              value={formData.isActive}
              onChange={(e) => setFormData({...formData, isActive: e.target.value === 'true'})}
              options={[
                { value: 'true', label: t('active') },
                { value: 'false', label: t('inactive') }
              ]}
            />
            <FormSelect
              label={t('featured')}
              name="isFeatured"
              value={formData.isFeatured}
              onChange={(e) => setFormData({...formData, isFeatured: e.target.value === 'true'})}
              options={[
                { value: 'true', label: t('yes') },
                { value: 'false', label: t('no') }
              ]}
            />
          </div>
        </form>
      </Modal>
    </div>
  )
}

export default VideoManagement
