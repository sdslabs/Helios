import { useQuery } from '@tanstack/react-query'
import * as fetchers from './managerFetcher'

export const useSearchUsers = (search: string) => {
  const query = useQuery({
    queryKey: ['searchUsers'],
    queryFn: () => fetchers.searchUsers(search),
  })
  return query
}
