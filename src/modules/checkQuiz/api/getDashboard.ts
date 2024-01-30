import axios from 'axios'
import axiosInstance from './axiosInstance'

export const getDashboard = async (quizId: string, sectionIndex: number | null = null) => {
  try {

    if (sectionIndex===null) {
      const res = await axiosInstance.get(`/checkQuiz/dashboard/${quizId}`)
      return res.data
    } else {
      const res = await axiosInstance.get(`/checkQuiz/sectionLeaderboard/${quizId}/${sectionIndex}`)
      return res.data
    }
  } catch (e: unknown) {
    if (axios.isAxiosError(e)) {
      return e.response?.data || e.message
    }
    throw e
  }
}
