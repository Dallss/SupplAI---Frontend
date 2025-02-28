import axios from 'axios'

const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/api', // Update with your actual API
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Optional: Interceptors for handling auth tokens
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token') // Example: Get token from storage
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export default api
