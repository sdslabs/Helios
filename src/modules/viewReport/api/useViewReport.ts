import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import axiosInstance from '../../auth/api/axiosInstance'

export const useViewReport = ({ quizId }: { quizId: string }) => {
  const query = useQuery({
    queryKey: ['viewReport'],
    queryFn: async () => {
      try {
        const res = await axiosInstance.get(`/view-report/${quizId}`)
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
