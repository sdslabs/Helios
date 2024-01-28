import { useQuery } from '@tanstack/react-query'
import * as fetchers from './quizFetcher'

export const useGetQuiz = (quizId: string) => {
  const query = useQuery({
    queryKey: ['quiz', quizId],
    queryFn: () => fetchers.getQuiz(quizId),
  })
  return query
}

export const useGetQuestion = (questionId: string) => {
  const query = useQuery({
    queryKey: ['question', questionId],
    queryFn: () => fetchers.getQuestion(questionId),
  })
  return query
}
