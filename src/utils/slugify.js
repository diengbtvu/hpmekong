/**
 * Generate URL-friendly slug from Vietnamese text
 * @param {string} text - Input text to convert to slug
 * @returns {string} - URL-friendly slug
 */
export const generateSlug = (text) => {
  if (!text) return ''
  
  return text
    .toLowerCase()
    .normalize('NFD') // Normalize unicode characters
    .replace(/[\u0300-\u036f]/g, '') // Remove diacritics
    .replace(/đ/g, 'd') // Replace Vietnamese đ
    .replace(/Đ/g, 'd') // Replace Vietnamese Đ
    .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
    .replace(/^-+/, '') // Trim hyphens from start
    .replace(/-+$/, '') // Trim hyphens from end
    .trim()
}

export default generateSlug
