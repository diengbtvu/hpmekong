import React, { useState, useEffect } from 'react'
import DataTable from '../../components/admin/DataTable'
import Modal from '../../components/admin/Modal'
import FormInput from '../../components/admin/FormInput'
import FormSelect from '../../components/admin/FormSelect'
import ImageUpload from '../../components/admin/ImageUpload'
import RichTextEditor from '../../components/admin/RichTextEditor'
import api from '../../services/api'
import toast from '../../utils/toast'
import { useLanguage } from '../../i18n/config'
import { generateSlug } from '../../utils/slugify'

const PostManagement = () => {
  const { language } = useLanguage()
  const [posts, setPosts] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingPost, setEditingPost] = useState(null)
  const [formData, setFormData] = useState({
    title: '',
    titleEn: '',
    slug: '',
    excerpt: '',
    excerptEn: '',
    content: '',
    contentEn: '',
    featuredImageUrl: '',
    categoryId: '',
    status: 'DRAFT',
    isFeatured: false,
    isActive: true
  })

  const translations = {
    vi: {
      postManagement: 'Quản lý Bài viết',
      managePosts: 'Quản lý bài viết và tin tức',
      addPost: 'Thêm Bài viết',
      editPost: 'Sửa Bài viết',
      createPost: 'Tạo Bài viết',
      title: 'Tiêu đề',
      titleEn: 'Tiêu đề (EN)',
      slug: 'Slug (URL)',
      excerpt: 'Tóm tắt',
      excerptEn: 'Tóm tắt (EN)',
      content: 'Nội dung',
      contentEn: 'Nội dung (EN)',
      featuredImage: 'Ảnh đại diện',
      category: 'Danh mục',
      status: 'Trạng thái',
      featured: 'Nổi bật',
      active: 'Hoạt động',
      inactive: 'Tạm dừng',
      yes: 'Có',
      no: 'Không',
      cancel: 'Hủy',
      update: 'Cập nhật',
      create: 'Tạo',
      draft: 'Nháp',
      published: 'Đã xuất bản',
      archived: 'Lưu trữ',
      id: 'ID',
      image: 'Hình ảnh',
      views: 'Lượt xem',
      publishedAt: 'Ngày xuất bản',
      deletePostConfirm: 'Xóa bài viết',
      postDeletedSuccess: 'Đã xóa bài viết thành công',
      postUpdatedSuccess: 'Đã cập nhật bài viết thành công',
      postCreatedSuccess: 'Đã tạo bài viết thành công',
      errorFetchingPosts: 'Lỗi tải danh sách bài viết',
      errorDeletingPost: 'Lỗi xóa bài viết',
      errorSavingPost: 'Lỗi lưu bài viết'
    },
    en: {
      postManagement: 'Post Management',
      managePosts: 'Manage blog posts and news',
      addPost: 'Add Post',
      editPost: 'Edit Post',
      createPost: 'Create Post',
      title: 'Title',
      titleEn: 'Title (EN)',
      slug: 'Slug (URL)',
      excerpt: 'Excerpt',
      excerptEn: 'Excerpt (EN)',
      content: 'Content',
      contentEn: 'Content (EN)',
      featuredImage: 'Featured Image',
      category: 'Category',
      status: 'Status',
      featured: 'Featured',
      active: 'Active',
      inactive: 'Inactive',
      yes: 'Yes',
      no: 'No',
      cancel: 'Cancel',
      update: 'Update',
      create: 'Create',
      draft: 'Draft',
      published: 'Published',
      archived: 'Archived',
      id: 'ID',
      image: 'Image',
      views: 'Views',
      publishedAt: 'Published At',
      deletePostConfirm: 'Delete post',
      postDeletedSuccess: 'Post deleted successfully',
      postUpdatedSuccess: 'Post updated successfully',
      postCreatedSuccess: 'Post created successfully',
      errorFetchingPosts: 'Error fetching posts',
      errorDeletingPost: 'Error deleting post',
      errorSavingPost: 'Error saving post'
    }
  }

  const t = (key) => translations[language]?.[key] || translations['vi'][key] || key

  useEffect(() => {
    fetchPosts()
    fetchCategories()
  }, [])

  const fetchPosts = async () => {
    try {
      const response = await api.get('/admin/posts')
      if (response.data.success) {
        setPosts(response.data.data.content || response.data.data)
      }
    } catch (error) {
      toast.error(t('errorFetchingPosts'))
    } finally {
      setLoading(false)
    }
  }

  const fetchCategories = async () => {
    try {
      const response = await api.get('/categories')
      if (response.data.success) {
        setCategories(response.data.data)
      }
    } catch (error) {
      console.error('Error fetching categories:', error)
    }
  }

  const handleCreate = () => {
    setEditingPost(null)
    setFormData({
      title: '',
      titleEn: '',
      slug: '',
      excerpt: '',
      excerptEn: '',
      content: '',
      contentEn: '',
      featuredImageUrl: '',
      categoryId: '',
      status: 'DRAFT',
      isFeatured: false,
      isActive: true
    })
    setIsModalOpen(true)
  }

  const handleEdit = (post) => {
    setEditingPost(post)
    setFormData({
      title: post.title,
      titleEn: post.titleEn || '',
      slug: post.slug,
      excerpt: post.excerpt || '',
      excerptEn: post.excerptEn || '',
      content: post.content || '',
      contentEn: post.contentEn || '',
      featuredImageUrl: post.featuredImageUrl || '',
      categoryId: post.category?.id || '',
      status: post.status || 'DRAFT',
      isFeatured: post.isFeatured || false,
      isActive: post.isActive !== undefined ? post.isActive : true
    })
    setIsModalOpen(true)
  }

  const handleDelete = async (post) => {
    if (!confirm(`${t('deletePostConfirm')} "${post.title}"?`)) return

    try {
      await api.delete(`/admin/posts/${post.id}`)
      toast.success(t('postDeletedSuccess'))
      fetchPosts()
    } catch (error) {
      toast.error(t('errorDeletingPost'))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      if (editingPost) {
        await api.put(`/admin/posts/${editingPost.id}`, formData)
        toast.success(t('postUpdatedSuccess'))
      } else {
        await api.post('/admin/posts', formData)
        toast.success(t('postCreatedSuccess'))
      }
      setIsModalOpen(false)
      fetchPosts()
    } catch (error) {
      console.error('Error saving post:', error.response?.data || error)
      const errorMessage = error.response?.data?.error?.message || t('errorSavingPost')
      toast.error(errorMessage)
    }
  }

  const columns = [
    { key: 'id', label: t('id'), sortable: true },
    {
      key: 'featuredImageUrl',
      label: t('image'),
      render: (value) => value ? (
        <img src={value} alt="" className="w-20 h-12 object-cover rounded" />
      ) : (
        <div className="w-20 h-12 bg-gray-200 rounded flex items-center justify-center">
          <i className="fas fa-newspaper text-gray-400"></i>
        </div>
      )
    },
    { key: 'title', label: t('title'), sortable: true },
    {
      key: 'status',
      label: t('status'),
      render: (value) => (
        <span className={`px-2 py-1 text-xs rounded-full ${value === 'PUBLISHED' || value === 'published' ? 'bg-green-100 text-green-800' :
          value === 'DRAFT' || value === 'draft' ? 'bg-yellow-100 text-yellow-800' :
            'bg-gray-100 text-gray-800'
          }`}>
          {t((value || 'draft').toLowerCase())}
        </span>
      )
    },
    { key: 'viewCount', label: t('views'), sortable: true },
    {
      key: 'publishedAt',
      label: t('publishedAt'),
      render: (value) => value ? new Date(value).toLocaleDateString('vi-VN') : '-'
    },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{t('postManagement')}</h1>
          <p className="text-gray-600 mt-1">{t('managePosts')}</p>
        </div>
        <button
          onClick={handleCreate}
          className="flex items-center gap-2 px-4 py-2 bg-mekong-blue text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <i className="fas fa-plus"></i>
          <span>{t('addPost')}</span>
        </button>
      </div>

      {/* Data Table */}
      <DataTable
        columns={columns}
        data={posts}
        loading={loading}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {/* Create/Edit Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingPost ? t('editPost') : t('createPost')}
        size="2xl"
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
              form="post-form"
              className="px-4 py-2 bg-mekong-blue text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              {editingPost ? t('update') : t('create')}
            </button>
          </>
        }
      >
        <form id="post-form" onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <FormInput
              label={`${t('title')} *`}
              name="title"
              value={formData.title}
              onChange={(e) => {
                const title = e.target.value
                setFormData({
                  ...formData,
                  title: title,
                  slug: !editingPost ? generateSlug(title) : formData.slug
                })
              }}
              required
            />
            <FormInput
              label={t('titleEn')}
              name="titleEn"
              value={formData.titleEn}
              onChange={(e) => setFormData({ ...formData, titleEn: e.target.value })}
            />
          </div>

          <FormInput
            label={`${t('slug')} *`}
            name="slug"
            value={formData.slug}
            onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
            required
          />

          <FormInput
            label={t('excerpt')}
            name="excerpt"
            type="textarea"
            rows={3}
            value={formData.excerpt}
            onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
            placeholder="Mô tả ngắn gọn về bài viết (hiển thị ở danh sách bài viết)"
          />

          <FormInput
            label={t('excerptEn')}
            name="excerptEn"
            type="textarea"
            rows={3}
            value={formData.excerptEn}
            onChange={(e) => setFormData({ ...formData, excerptEn: e.target.value })}
          />

          <RichTextEditor
            label={`${t('content')} *`}
            value={formData.content}
            onChange={(content) => setFormData({ ...formData, content: content })}
            height={500}
          />

          <RichTextEditor
            label={t('contentEn')}
            value={formData.contentEn}
            onChange={(content) => setFormData({ ...formData, contentEn: content })}
            height={500}
          />

          <ImageUpload
            label={t('featuredImage')}
            value={formData.featuredImageUrl}
            onChange={(url) => setFormData({ ...formData, featuredImageUrl: url })}
            folder="posts"
          />

          <div className="grid grid-cols-3 gap-4">
            <FormSelect
              label={t('category')}
              name="categoryId"
              value={formData.categoryId}
              onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
              options={[
                { value: '', label: '-- Chọn danh mục --' },
                ...categories.map(c => ({ value: c.id, label: c.name }))
              ]}
            />
            <FormSelect
              label={t('status')}
              name="status"
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              options={[
                { value: 'DRAFT', label: t('draft') },
                { value: 'PUBLISHED', label: t('published') },
                { value: 'ARCHIVED', label: t('archived') }
              ]}
            />
            <FormSelect
              label={t('featured')}
              name="isFeatured"
              value={formData.isFeatured}
              onChange={(e) => setFormData({ ...formData, isFeatured: e.target.value === 'true' })}
              options={[
                { value: 'false', label: t('no') },
                { value: 'true', label: t('yes') }
              ]}
            />
          </div>
        </form>
      </Modal>
    </div>
  )
}

export default PostManagement
