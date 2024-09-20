import { useMutation } from '@tanstack/react-query'
import { GenerateLeaderboard } from './generateLeaderboard'

export const useLeaderboard = () => {
  const mutation = useMutation({
    mutationFn: GenerateLeaderboard,
  })
  return mutation
}
