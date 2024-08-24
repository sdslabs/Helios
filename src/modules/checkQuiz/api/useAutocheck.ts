import { useMutation } from '@tanstack/react-query'
import axiosInstance from './axiosInstance'
import { FetchAutocheck } from './FetchAutocheck'

export const useAutocheck = () => {
  const query = useMutation({
    mutationFn: FetchAutocheck,
  })
  return query
}
