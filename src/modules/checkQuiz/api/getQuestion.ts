import axios from 'axios'
import axiosInstance from './axiosInstance'

export const getQuestion = async (questionId: string) => {
  try {
    const res = await axiosInstance.get(`/giveQuiz/quiz/question/${questionId}`)
    return res.data
  } catch (e: any) {
    if (axios.isAxiosError(e)) {
      return e.response?.data || e.message
    }
    throw e
  }
}
