import axios from "axios"
import axiosInstance from "./axiosInstance"

export const getParticipantResponses = async (quizId: string, userId: string) => {
  try {
    const res = await axiosInstance.get(`/checkQuiz/${quizId}/user/${userId}`)
    return res.data
  } catch (e: unknown) {
    if (axios.isAxiosError(e)) {
      return e.response?.data || e.message
    }
    throw e
  }
}

export const searchParticipant = async (quizId: string, query: string) => {
  try {
    const res = await axiosInstance.get(`/checkQuiz/${quizId}/search?query=${query}`)
    return res.data
  } catch (e: unknown) {
    if (axios.isAxiosError(e)) {
      return e.response?.data || e.message
    }
    throw e
  }
}