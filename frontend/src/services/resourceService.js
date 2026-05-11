import api from './api'

export const fetchResources = async (params) => {
  const response = await api.get('/resources', { params })
  return response.data.data
}

export const fetchResourceById = async (id) => {
  const response = await api.get(`/resources/${id}`)
  return response.data.data
}

export const fetchMyResources = async () => {
  const response = await api.get('/staff/resources')
  return response.data.data
}

export const uploadResource = async (formData) => {
  const response = await api.post('/staff/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
  return response.data.data
}

export const deleteResource = async (id) => {
  await api.delete(`/resources/${id}`)
}

export const toggleBookmark = async (resourceId) => {
  const response = await api.post(`/bookmarks/${resourceId}`)
  return response.data.data
}

export const fetchBookmarks = async () => {
  const response = await api.get('/bookmarks')
  return response.data.data
}

const extractFileName = (headerValue, fallbackName) => {
  const match = headerValue?.match(/filename="?(?<filename>[^"]+)"?/)
  return match?.groups?.filename || fallbackName
}

export const downloadResource = async (resourceId, fallbackName = 'resource') => {
  const response = await api.get(`/resources/${resourceId}/download`, {
    responseType: 'blob',
  })

  const url = window.URL.createObjectURL(new Blob([response.data]))
  const link = document.createElement('a')
  link.href = url
  link.download = extractFileName(response.headers['content-disposition'], fallbackName)
  document.body.appendChild(link)
  link.click()
  link.remove()
  window.URL.revokeObjectURL(url)
}
