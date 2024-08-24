import { useQuery, useMutation } from '@tanstack/react-query'
// import axiosInstance from './axiosInstance'
import { getQuestion } from './getQuestion'

export const useQuestion = (questionId: string) => {
  const query = useQuery({
    queryKey: ['fetchResponse', questionId],
    queryFn: () => getQuestion(questionId),
  })
  return query
}
