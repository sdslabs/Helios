import { useMutation } from '@tanstack/react-query'
import * as fetchers from './userFetcher'

export const useStartQuiz = () => {
  const mutation = useMutation({
    mutationFn: fetchers.startQuiz,
  })
  return mutation
}

export const useRegisterUser = () => {
  const mutation = useMutation({
    mutationFn: fetchers.registerUser,
  })
  return mutation
}

export const useSubmitQuiz = () => {
  const mutation = useMutation({
    mutationFn: fetchers.submitQuiz,
  })
  return mutation
}

export const useGetStartTime = () => {
  const mutation = useMutation({
    mutationFn: fetchers.getStartTime,
  })
  return mutation
}
