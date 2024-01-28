import { useQuery, useMutation } from '@tanstack/react-query'
import * as fetchers from './responseFetcher'

export const useGetResponse = (quizId: string, questionId: string) => {
  const query = useQuery({
    queryKey: ['response', quizId, questionId],
    queryFn: () => fetchers.getResponse(quizId, questionId),
  })
  return query
}

export const useCreateUpdateResponse = () => {
  const mutation = useMutation({
    mutationFn: fetchers.createUpdateResponse,
  })
  return mutation
}

export const useDeleteResponse = () => {
  const mutation = useMutation({
    mutationFn: fetchers.deleteResponse,
  })
  return mutation
}
