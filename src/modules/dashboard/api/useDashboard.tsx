import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import axiosInstance from '../../auth/api/axiosInstance'

export const useDashboard = () => {
  const query = useQuery({
    queryKey: ['dashboard'],
    queryFn: async () => {
      try {
        const res = await axiosInstance.get('/auth')
        return res.data
      } catch (e: unknown) {
        if (axios.isAxiosError(e)) {
          return e.response?.data || e.message
        }
        throw e
      }
    },
  })
  return query
}
