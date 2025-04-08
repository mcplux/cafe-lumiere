import axios from 'axios'

const cafeLumiereApi = axios.create({ baseURL: import.meta.env.VITE_CAFE_LUMIERE_API })

export default cafeLumiereApi
