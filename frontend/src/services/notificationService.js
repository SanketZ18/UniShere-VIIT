import axios from 'axios'

const API_URL = '/api/notifications'

export const fetchNotifications = async () => {
  const response = await axios.get(API_URL)
  return response.data
}

export const fetchUnreadCount = async () => {
  const response = await axios.get(`${API_URL}/unread-count`)
  return response.data
}

export const markAsRead = async (id) => {
  await axios.put(`${API_URL}/${id}/read`)
}

export const markAllAsRead = async () => {
  await axios.put(`${API_URL}/read-all`)
}
