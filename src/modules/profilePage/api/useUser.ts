import { useMutation } from '@tanstack/react-query'
import * as fetchers from './userFetcher'

export const useUpdateUser = () => {
    const mutation = useMutation({
      mutationFn: fetchers.updateUser,
    })
    return mutation
  }
  