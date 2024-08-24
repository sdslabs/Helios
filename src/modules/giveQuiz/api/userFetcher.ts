import axiosInstance from './axiosInstance'
import { AxiosError } from 'axios'

export const startQuiz = async ({ quizId, accessCode }: { quizId: string; accessCode: string }) => {
  try {
    const res = await axiosInstance.post(`/giveQuiz/user/start/${quizId}`, { accessCode })
    return res.data
  } catch (e: unknown) {
    if (e instanceof AxiosError) {
      return e.response?.data || e.message
    }
    throw e
  }
}

export const registerUser = async ({ quizId, body }: { quizId: string; body: any }) => {
  try {
    const res = await axiosInstance.post(`/giveQuiz/user/register/${quizId}`, body)
    return res.data
  } catch (e: unknown) {
    if (e instanceof AxiosError) {
      return e.response?.data || e.message
    }
    throw e
  }
}

export const submitQuiz = async (quizId: string) => {
  try {
    const res = await axiosInstance.post(`/giveQuiz/user/submit/${quizId}`)
    return res.data
  } catch (e: unknown) {
    if (e instanceof AxiosError) {
      return e.response?.data || e.message
    }
    throw e
  }
}
