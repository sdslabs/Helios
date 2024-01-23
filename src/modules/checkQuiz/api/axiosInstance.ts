import axios from 'axios'
import Cookies from 'js-cookie'
import { baseURL } from '../../../config/config'

const axiosInstance = axios.create({
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  baseURL,
  withCredentials: false,
})

axiosInstance.interceptors.request.use((config) => {
  // const { jwtToken } = Cookies.get()
  // config.headers.Authorization = `Bearer ${jwtToken}`
  return config
})

export default axiosInstance