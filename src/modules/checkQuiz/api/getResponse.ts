import axios from 'axios'
import axiosInstance from './axiosInstance'

export const getResponse = async (responseId: string, quizId: string) => {
  try {
    const res = await axiosInstance.get(`/checkQuiz/response/response/${quizId}/${responseId}`)
    return res.data
  } catch (e: any) {
    if (axios.isAxiosError(e)) {
      return e.response?.data || e.message
    }
    throw e
  }
}

export const getAllResponse = async ({
  quizId,
  questionId,
}: {
  quizId: string
  questionId: string
}) => {
  try {
    const res = await axiosInstance.get(`checkQuiz/response/${quizId}/${questionId}`)
    return res.data
  } catch (e: any) {
    if (axios.isAxiosError(e)) {
      return e.response?.data || e.message
    }
    throw e
  }
}
