import { useQuery } from '@tanstack/react-query'
import * as fetchers from './managerFetcher'

export const useSearchUsers = <T extends 'ids' | 'query'>({
  by,
  searchParams,
}: {
  by: T
  searchParams: T extends 'ids' ? string[] : string
}) => {
  if (by === 'ids') {
    return useQuery({
      queryKey: ['searchUsers', by, searchParams],
      queryFn: () => fetchers.searchUsers({ ids: searchParams as string[] }),
    })
  } else {
    return useQuery({
      queryKey: ['searchUsers', by, searchParams],
      queryFn: () => fetchers.searchUsers({ query: searchParams as string }),
    })
  }
}
