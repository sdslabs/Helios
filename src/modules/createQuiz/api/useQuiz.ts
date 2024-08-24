import { useQuery, useMutation } from '@tanstack/react-query'
import * as fetchers from './quizFetcher'

export const useHostQuiz = () => {
  const mutation = useMutation({
    mutationFn: fetchers.hostQuiz,
  })
  return mutation
}

export const useUpdateQuizDetails = () => {
  const mutation = useMutation({
    mutationFn: fetchers.updateQuizDetails,
  })
  return mutation
}

export const useGetQuizDetails = (quizId: string) => {
  const query = useQuery({
    queryKey: ['quizDetails', quizId],
    queryFn: () => fetchers.getQuizDetails(quizId),
  })
  return query
}

export const usePublishQuiz = () => {
  const mutation = useMutation({
    mutationFn: fetchers.publishQuiz,
  })
  return mutation
}
