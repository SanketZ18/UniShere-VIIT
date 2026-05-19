import api from './api'

export const fetchNotices = async (department) => {
  const params = department ? { department } : {}
  const response = await api.get('/notices', { params })
  return response.data.data
}

export const uploadNotice = async (formData) => {
  const response = await api.post('/notices', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
  return response.data.data
}

export const deleteNotice = async (id) => {
  await api.delete(`/notices/${id}`)
}
