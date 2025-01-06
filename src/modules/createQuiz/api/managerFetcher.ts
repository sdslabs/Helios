import { isAxiosError } from 'axios'
import axiosInstance from './axiosInstance'

export const searchUsers = async ({ query, ids }: { query?: string; ids?: string[] }) => {
  if (!query && !ids) {
    throw new Error('Either query or ids parameter is required')
  }
  try {
    const res = query
      ? await axiosInstance.get(`/common/searchUsers?query=${query}`)
      : await axiosInstance.get(`/common/searchUsers?ids=${ids?.join(',')}`)

    return res.data
  } catch (error: unknown) {
    if (isAxiosError(error)) {
      return error.response?.data || error.message
    }
    throw error
  }
}
