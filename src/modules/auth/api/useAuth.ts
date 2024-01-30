import { useMutation, useQuery } from '@tanstack/react-query'
import * as fetchers from '@auth/api/authFetcher'

export const useAuth = () => {
  const query = useQuery({
    queryKey: ['auth'],
    queryFn: fetchers.checkAuth,
    staleTime: 1000 * 60 * 60 * 24 * 7,
  })
  return query
}

export const useOnboard = () => {
  const mutation = useMutation({
    mutationFn: fetchers.onboard,
  })

  return mutation
}
