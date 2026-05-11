import api from './api'

export const fetchDashboardSummary = async () => {
  const response = await api.get('/dashboard/summary')
  return response.data.data
}

export const fetchStudents = async () => {
  const response = await api.get('/students')
  return response.data.data
}

export const updateStudent = async (id, payload) => {
  const response = await api.put(`/students/${id}`, payload)
  return response.data.data
}
