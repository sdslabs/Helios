import axiosInstance from './axiosInstance'
import { AxiosError } from 'axios'
import { useMutation } from '@tanstack/react-query'
type Location = {
  latitude: number
  longitude: number
}
interface Log {
  quizId: string
  questionId?: string
  logType: string
  location?: Location
  key?: string
  ip?: string
}

const createLog = async (log: Log) => {
  try {
    const response = await axiosInstance.post('/log', log)
    return response.data
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      throw error
    }
    throw error
  }
}

const useLog = () => {
  const mutation = useMutation({
    mutationFn: createLog,
  })
  return mutation
}

export default useLog
