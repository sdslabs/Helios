import { useQuery, useMutation } from '@tanstack/react-query'
import * as fetchers from './questionFetcher'

export const useCreateQuestion = () => {
  const mutation = useMutation({
    mutationFn: fetchers.createQuestion,
  })
  return mutation
}

export const useUpdateQuestion = () => {
  const mutation = useMutation({
    mutationFn: fetchers.updateQuestion,
  })
  return mutation
}

export const useGetQuestion = (questionId: string) => {
  const query = useQuery({
    queryKey: ['question', questionId],
    queryFn: () => fetchers.getQuestion(questionId),
  })
  return query
}

export const useDeleteQuestion = () => {
  const mutation = useMutation({
    mutationFn: fetchers.deleteQuestion,
  })
  return mutation
}
