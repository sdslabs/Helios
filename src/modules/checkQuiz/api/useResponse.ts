import { useQuery, useMutation } from '@tanstack/react-query'
import axiosInstance from './axiosInstance'
import { getAllResponse, getResponse } from './getResponse'

export const useAllResponse = ({ quizID, questionID }: { quizID: string; questionID: string }) => {
  const query = useQuery({
    queryKey: ['fetchAllResponse', quizID],
    queryFn: () => getAllResponse({ quizID, questionID }),
  })
  return query
}

export const useResponse = (responseId: string) => {
  const query = useQuery({
    queryKey: ['fetchResponse', responseId],
    queryFn: () => getResponse(responseId),
    enabled: !!responseId,
  })
  return query
}
