import axios from 'axios'
import { baseURL } from '../../../config/config'
import Cookies from 'js-cookie'

const axiosInstance = axios.create({
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  baseURL,
  withCredentials: true,
})

axiosInstance.interceptors.request.use((config) => {
  const { jwtToken } = Cookies.get()
  config.headers.Authorization = `Bearer ${jwtToken}`
  return config
})

export default axiosInstance
