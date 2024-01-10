import { useQuery, useMutation } from '@tanstack/react-query'
import axiosInstance from './axiosInstance'
import { getQuestion } from './getQuestion'

export const useQuestion = (questionID: string) => {
  const query = useQuery({
    queryKey: ['fetchResponse', questionID],
    queryFn: () => getQuestion(questionID),
  })
  return query
}
