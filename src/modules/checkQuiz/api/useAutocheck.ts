import { useMutation } from '@tanstack/react-query'
import axiosInstance from './axiosInstance'
import { FetchAutocheck } from './FetchAutocheck'

export const useAutocheck = (quizId: string) => {
  const query = useMutation({
    mutationKey: ['fetchAutocheck', quizId],
    mutationFn: () => FetchAutocheck(quizId),
  })
  return query
}
