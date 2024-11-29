import { useMutation } from '@tanstack/react-query'
import * as fetchers from './userUpdate'

export const useUpdateUser = () => {
  const mutation = useMutation({
    mutationFn: fetchers.userUpdate,
  })
  return mutation
}
