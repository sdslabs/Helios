import { useQuery } from '@tanstack/react-query'
import axiosInstance from './axiosInstance'
import { FetchAutocheck } from './FetchAutocheck'

export const useAutocheck = (quizId: string) => {
  const query = useQuery({
    queryKey: ['fetchAutocheck', quizId],
    queryFn: () => FetchAutocheck(quizId),
  })
  return query
}
