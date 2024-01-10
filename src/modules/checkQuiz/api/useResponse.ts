import { useQuery, useMutation } from '@tanstack/react-query'
import axiosInstance from './axiosInstance'
import { getAllResponse, getResponse } from './getResponse'

export const useAllResponse = ({ quizId, questionID }: { quizId: string; questionID: string }) => {
  const query = useQuery({
    queryKey: ['fetchDashboard', quizId],
    queryFn: () => getAllResponse({ quizId, questionID }),
  })
  return query
}

export const useResponse = (responseId: string) => {
  const query = useQuery({
    queryKey: ['fetchResponse', responseId],
    queryFn: () => getResponse(responseId),
  })
  return query
}
