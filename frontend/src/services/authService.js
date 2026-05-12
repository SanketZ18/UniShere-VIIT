import api from './api'

export const loginUser = async (credentials) => {
  const response = await api.post('/auth/login', credentials)
  return response.data.data
}

export const fetchCurrentUser = async () => {
  const response = await api.get('/auth/me')
  return response.data.data
}

export const registerUser = async (payload) => {
  const response = await api.post('/auth/register', payload)
  return response.data.data
}

export const updateProfile = async (payload) => {
  const response = await api.put('/auth/profile', payload)
  return response.data.data
}

export const fetchAllUsers = async () => {
  const response = await api.get('/auth/users')
  return response.data.data
}

export const deleteUserAccount = async (id) => {
  const response = await api.delete(`/auth/${id}`)
  return response.data.data
}

export const toggleUserStatus = async (id) => {
  const response = await api.post(`/auth/${id}/toggle-status`)
  return response.data.data
}

export const bulkDeleteStudentsByBatch = async (batchYear) => {
  const response = await api.delete(`/auth/bulk-delete-students`, { params: { batchYear } })
  return response.data.data
}

export const bulkRegisterStudents = async (formData) => {
  const response = await api.post('/auth/bulk-register-students', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
  return response.data // Returning full response to get message
}
