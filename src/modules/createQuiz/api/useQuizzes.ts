import { useQuery, useMutation } from '@tanstack/react-query'
import * as fetchers from './quizFetcher'

export const useHostQuiz = () => {
  const mutation = useMutation({
    mutationFn: fetchers.hostQuiz
  })
  return mutation;
}