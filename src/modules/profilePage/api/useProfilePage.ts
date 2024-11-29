import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import axiosInstance from '../../auth/api/axiosInstance'

export const useProfilePage = () => {
  const query = useQuery({
    queryKey: ['profilePage'],
    queryFn: async () => {
      try {
        const res = await axiosInstance.get('/profile')
        return res.data
      } catch (e: unknown) {
        if (axios.isAxiosError(e)) {
          return e.response?.data || e.message
        }
        throw e
      }
    },
    staleTime: 1000 * 60 * 60 * 3,
  })
  return query
}