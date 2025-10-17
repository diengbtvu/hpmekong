import React, { useState, useEffect } from 'react'
import DataTable from '../../components/admin/DataTable'
import Modal from '../../components/admin/Modal'
import FormInput from '../../components/admin/FormInput'
import FormSelect from '../../components/admin/FormSelect'
import ImageUpload from '../../components/admin/ImageUpload'
import { achievementService } from '../../services/contentService'
import toast from '../../utils/toast'

const AchievementManagement = () => {
  const [achievements, setAchievements] = useState([])
  const [loading, setLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingItem, setEditingItem] = useState(null)
  const [formData, setFormData] = useState({
    title: '', titleEn: '', imageUrl: '', description: '', descriptionEn: '',
    achievementDate: '', type: 'AWARD', displayOrder: 0, isActive: true, isFeatured: false
  })

  useEffect(() => { fetchData() }, [])

  const fetchData = async () => {
    try {
      const response = await achievementService.getAllAchievements()
      if (response.success) setAchievements(response.data)
    } catch (error) { toast.error('Error fetching achievements') }
    finally { setLoading(false) }
  }

  const handleCreate = () => {
    setEditingItem(null)
    setFormData({ title: '', titleEn: '', imageUrl: '', description: '', descriptionEn: '', achievementDate: '', type: 'AWARD', displayOrder: 0, isActive: true, isFeatured: false })
    setIsModalOpen(true)
  }

  const handleEdit = (item) => { setEditingItem(item); setFormData(item); setIsModalOpen(true) }

  const handleDelete = async (item) => {
    if (!confirm(`Delete "${item.title}"?`)) return
    try {
      await achievementService.deleteAchievement(item.id)
      toast.success('Achievement deleted')
      fetchData()
    } catch (error) { toast.error('Error deleting') }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (editingItem) {
        await achievementService.updateAchievement(editingItem.id, formData)
        toast.success('Updated successfully')
      } else {
        await achievementService.createAchievement(formData)
        toast.success('Created successfully')
      }
      setIsModalOpen(false)
      fetchData()
    } catch (error) { toast.error('Error saving') }
  }

  const columns = [
    { key: 'id', label: 'ID', sortable: true },
    { key: 'imageUrl', label: 'Image', render: (v) => <img src={v} alt="" className="w-20 h-12 object-cover rounded" /> },
    { key: 'title', label: 'Title', sortable: true },
    { key: 'type', label: 'Type', render: (v) => <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full">{v}</span> },
    { key: 'isActive', label: 'Status', render: (v) => <span className={`px-2 py-1 text-xs rounded-full ${v ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>{v ? 'Active' : 'Inactive'}</span> },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div><h1 className="text-2xl font-bold text-gray-900">Achievement Management</h1><p className="text-gray-600 mt-1">Manage company achievements</p></div>
        <button onClick={handleCreate} className="flex items-center gap-2 px-4 py-2 bg-mekong-blue text-white rounded-lg hover:bg-blue-700"><i className="fas fa-plus"></i><span>Add Achievement</span></button>
      </div>
      <DataTable columns={columns} data={achievements} loading={loading} onEdit={handleEdit} onDelete={handleDelete} />
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={editingItem ? 'Edit Achievement' : 'Create Achievement'} size="lg"
        footer={<><button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">Cancel</button><button type="submit" form="form" className="px-4 py-2 bg-mekong-blue text-white rounded-lg hover:bg-blue-700">{editingItem ? 'Update' : 'Create'}</button></>}>
        <form id="form" onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <FormInput label="Title (VI)" name="title" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} required />
            <FormInput label="Title (EN)" name="titleEn" value={formData.titleEn} onChange={(e) => setFormData({...formData, titleEn: e.target.value})} />
          </div>
          <ImageUpload label="Achievement Image" value={formData.imageUrl} onChange={(url) => setFormData({...formData, imageUrl: url})} folder="achievements" />
          <div className="grid grid-cols-2 gap-4">
            <FormInput label="Date" name="achievementDate" type="date" value={formData.achievementDate} onChange={(e) => setFormData({...formData, achievementDate: e.target.value})} />
            <FormSelect label="Type" name="type" value={formData.type} onChange={(e) => setFormData({...formData, type: e.target.value})} options={[
              { value: 'AWARD', label: 'Award' }, { value: 'CERTIFICATE', label: 'Certificate' }, { value: 'RECOGNITION', label: 'Recognition' }, { value: 'MILESTONE', label: 'Milestone' }, { value: 'OTHER', label: 'Other' }
            ]} required />
          </div>
        </form>
      </Modal>
    </div>
  )
}

export default AchievementManagement
