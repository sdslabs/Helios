import { useQuery} from '@tanstack/react-query'
import { getDashboard } from './getDashboard'

export const useFetchDashboard = (quizId: string, sectionIndex: number | "" = "", searchQuery: string | null = null) => {
  const query = useQuery({
    queryKey: ['fetchDashboard', quizId, sectionIndex, searchQuery],
    queryFn: () => getDashboard(quizId, sectionIndex, searchQuery),
  })
  return query
}
