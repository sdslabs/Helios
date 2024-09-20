import { useQuery} from '@tanstack/react-query'
import { getAllResponse, getResponse } from './getResponse'

export const useAllResponse = ({ quizId, questionId }: { quizId: string; questionId: string }) => {
  const query = useQuery({
    queryKey: ['fetchAllResponse', quizId],
    queryFn: () => getAllResponse({ quizId, questionId }),
  })
  return query
}

export const useResponse = (responseId: string, quizId: string) => {
  const query = useQuery({
    queryKey: ['fetchResponse', responseId],
    queryFn: () => getResponse(responseId, quizId),
    enabled: !!responseId,
  })
  return query
}
