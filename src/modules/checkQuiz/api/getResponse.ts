import axios from 'axios'
import axiosInstance from './axiosInstance'

export const getResponse = async (responseId: string) => {
  try {
    const res = await axiosInstance.get(`/checkQuiz/response/getResponse/${responseId}`)
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
  questionID,
}: {
  quizId: string
  questionID: string
}) => {
  try {
    const res = await axiosInstance.get(`checkQuiz/response/reponses/${quizId}/${questionID}`)
    return res.data
  } catch (e: any) {
    if (axios.isAxiosError(e)) {
      return e.response?.data || e.message
    }
    throw e
  }
}
