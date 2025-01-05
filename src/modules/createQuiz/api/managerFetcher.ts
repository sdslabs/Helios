import { isAxiosError } from 'axios'
import axiosInstance from './axiosInstance'

export const searchUsers = async (query: string) => {
  try {
    const res = await axiosInstance.get(`/common/searchUsers?query=${query}`)
    return res.data
  } catch (e: unknown) {
    if (isAxiosError(e)) {
      return e.response?.data || e.message
    }
    throw e
  }
}
