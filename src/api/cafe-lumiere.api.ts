import axios from 'axios'

const cafeLumiereApi = axios.create({ baseURL: import.meta.env.VITE_CAFE_LUMIERE_API })

cafeLumiereApi.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

export default cafeLumiereApi
