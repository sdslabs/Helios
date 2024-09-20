import { useQuery} from '@tanstack/react-query'
import { getDashboard } from './getDashboard'

export const useFetchDashboard = (quizId: string, sectionIndex: number | null = null) => {
  const query = useQuery({
    queryKey: ['fetchDashboard', quizId, sectionIndex],
    queryFn: () => getDashboard(quizId, sectionIndex),
  })
  return query
}
