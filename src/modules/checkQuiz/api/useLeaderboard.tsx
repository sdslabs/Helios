import { useMutation } from '@tanstack/react-query'
import axiosInstance from './axiosInstance'
import { GenerateLeaderboard } from './generateLeaderboard'

export const useLeaderboard = () => {
  const mutation = useMutation({
    mutationFn: GenerateLeaderboard,
  })
  return mutation;
}