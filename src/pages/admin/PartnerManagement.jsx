import React, { useState, useEffect } from 'react'
import DataTable from '../../components/admin/DataTable'
import Modal from '../../components/admin/Modal'
import FormInput from '../../components/admin/FormInput'
import FormSelect from '../../components/admin/FormSelect'
import ImageUpload from '../../components/admin/ImageUpload'
import { partnerService } from '../../services/contentService'
import toast from '../../utils/toast'

const PartnerManagement = () => {
  const [partners, setPartners] = useState([])
  const [loading, setLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingPartner, setEditingPartner] = useState(null)
  const [formData, setFormData] = useState({
    name: '', nameEn: '', logoUrl: '', websiteUrl: '', description: '', descriptionEn: '',
    type: 'UNIVERSITY', displayOrder: 0, isActive: true, isFeatured: false
  })

  useEffect(() => { fetchPartners() }, [])

  const fetchPartners = async () => {
    try {
      const response = await partnerService.getAllPartners()
      if (response.success) setPartners(response.data)
    } catch (error) {
      toast.error('Error fetching partners')
    } finally {
      setLoading(false)
    }
  }

  const handleCreate = () => {
    setEditingPartner(null)
    setFormData({ name: '', nameEn: '', logoUrl: '', websiteUrl: '', description: '', descriptionEn: '', type: 'UNIVERSITY', displayOrder: 0, isActive: true, isFeatured: false })
    setIsModalOpen(true)
  }

  const handleEdit = (partner) => { setEditingPartner(partner); setFormData(partner); setIsModalOpen(true) }

  const handleDelete = async (partner) => {
    if (!confirm(`Delete partner "${partner.name}"?`)) return
    try {
      await partnerService.deletePartner(partner.id)
      toast.success('Partner deleted successfully')
      fetchPartners()
    } catch (error) {
      toast.error('Error deleting partner')
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (editingPartner) {
        await partnerService.updatePartner(editingPartner.id, formData)
        toast.success('Partner updated successfully')
      } else {
        await partnerService.createPartner(formData)
        toast.success('Partner created successfully')
      }
      setIsModalOpen(false)
      fetchPartners()
    } catch (error) {
      toast.error('Error saving partner')
    }
  }

  const columns = [
    { key: 'id', label: 'ID', sortable: true },
    { key: 'logoUrl', label: 'Logo', render: (value) => <img src={value} alt="" className="w-20 h-12 object-contain rounded" /> },
    { key: 'name', label: 'Name', sortable: true },
    { key: 'type', label: 'Type', render: (value) => <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">{value}</span> },
    { key: 'isActive', label: 'Status', render: (value) => <span className={`px-2 py-1 text-xs rounded-full ${value ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>{value ? 'Active' : 'Inactive'}</span> },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Partner Management</h1>
          <p className="text-gray-600 mt-1">Manage partner organizations</p>
        </div>
        <button onClick={handleCreate} className="flex items-center gap-2 px-4 py-2 bg-mekong-blue text-white rounded-lg hover:bg-blue-700 transition-colors">
          <i className="fas fa-plus"></i><span>Add Partner</span>
        </button>
      </div>
      <DataTable columns={columns} data={partners} loading={loading} onEdit={handleEdit} onDelete={handleDelete} />
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={editingPartner ? 'Edit Partner' : 'Create Partner'} size="lg"
        footer={<><button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">Cancel</button>
        <button type="submit" form="partner-form" className="px-4 py-2 bg-mekong-blue text-white rounded-lg hover:bg-700 transition-colors">{editingPartner ? 'Update' : 'Create'}</button></>}>
        <form id="partner-form" onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <FormInput label="Name (VI)" name="name" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} required />
            <FormInput label="Name (EN)" name="nameEn" value={formData.nameEn} onChange={(e) => setFormData({...formData, nameEn: e.target.value})} />
          </div>
          <ImageUpload label="Logo" value={formData.logoUrl} onChange={(url) => setFormData({...formData, logoUrl: url})} folder="partners" />
          <FormInput label="Website URL" name="websiteUrl" value={formData.websiteUrl} onChange={(e) => setFormData({...formData, websiteUrl: e.target.value})} />
          <div className="grid grid-cols-2 gap-4">
            <FormSelect label="Type" name="type" value={formData.type} onChange={(e) => setFormData({...formData, type: e.target.value})} options={[
              { value: 'UNIVERSITY', label: 'University' }, { value: 'CORPORATE', label: 'Corporate' }, { value: 'GOVERNMENT', label: 'Government' }, { value: 'NGO', label: 'NGO' }, { value: 'STRATEGIC', label: 'Strategic' }, { value: 'OTHER', label: 'Other' }
            ]} required />
            <FormInput label="Display Order" name="displayOrder" type="number" value={formData.displayOrder} onChange={(e) => setFormData({...formData, displayOrder: parseInt(e.target.value)})} />
          </div>
        </form>
      </Modal>
    </div>
  )
}

export default PartnerManagement
