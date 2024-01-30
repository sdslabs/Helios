import { useQuery } from '@tanstack/react-query'
import * as fetchers from './quizFetcher'

export const useGetQuiz = (quizId: string) => {
  const query = useQuery({
    queryKey: ['quiz', quizId],
    queryFn: () => fetchers.getQuiz(quizId),
    staleTime: 1000 * 60 * 60 * 2,
  })
  return query
}

export const useGetQuestion = (questionId: string) => {
  const query = useQuery({
    queryKey: ['question', questionId],
    queryFn: () => fetchers.getQuestion(questionId),
    staleTime: 1000 * 60 * 60 * 2,
  })
  return query
}
