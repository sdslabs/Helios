import axios from 'axios'
import axiosInstance from './axiosInstance'

export const getDashboard = async (quizId: string, sectionIndex: number | null = null, searchQuery: string | null = null) => {
  try {
    if (sectionIndex === null && searchQuery === null) {
      const res = await axiosInstance.get(`/checkQuiz/dashboard/${quizId}/null`)
      return res.data
    } else if (sectionIndex !== null && searchQuery === null) {
      const res = await axiosInstance.get(`/checkQuiz/dashboard/${quizId}/${sectionIndex}`)
      return res.data
    } else if (sectionIndex === null && searchQuery !== null) {
      const res = await axiosInstance.get(`/checkQuiz/dashboard/${quizId}/null/?search=${searchQuery}`)
      return res.data
    } else {
      const res = await axiosInstance.get(`/checkQuiz/dashboard/${quizId}/${sectionIndex}?search=${searchQuery}`)
      return res.data
    }
  } catch (e: unknown) {
    if (axios.isAxiosError(e)) {
      return e.response?.data || e.message
    }
    throw e
  }
}
