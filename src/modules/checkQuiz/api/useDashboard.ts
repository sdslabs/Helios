import { useQuery, useMutation } from '@tanstack/react-query'
import axiosInstance from './axiosInstance'
import { getDashboard } from './getDashboard'

export const useFetchDashboard = (quizId: string) => {
  const query = useQuery({  
    queryKey: ['fetchDashboard', quizId],
    queryFn: () => getDashboard(quizId),
  })
  return query
}
