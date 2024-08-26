import { useQuery, useMutation } from '@tanstack/react-query'
import axiosInstance from './axiosInstance'
import { getDashboard } from './getDashboard'

export const useFetchDashboard = (quizId: string, sectionIndex: number | null = null, searchQuery: string | null = null) => {
  console.log('useFetchDashboard', quizId, sectionIndex, searchQuery)
  const query = useQuery({
    queryKey: ['fetchDashboard', quizId, sectionIndex, searchQuery],
    queryFn: () => getDashboard(quizId, sectionIndex, searchQuery),
  })
  return query
}
