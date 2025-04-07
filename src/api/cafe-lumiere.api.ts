import axios from 'axios'

const cafeLumiereApi = axios.create({ baseURL: 'http://localhost:3000/api' })

export default cafeLumiereApi
