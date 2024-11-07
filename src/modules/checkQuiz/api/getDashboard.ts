import axios from 'axios'
import axiosInstance from './axiosInstance'

export const getDashboard = async (
  quizId: string,
  sectionIndex: number | '' = '',
  searchQuery: string | null = null,
) => {
  try {
    if (sectionIndex !== '') {
      const res = await axiosInstance.get(
        searchQuery
          ? `/checkQuiz/dashboard/${quizId}/${sectionIndex}?search=${searchQuery}`
          : `/checkQuiz/dashboard/${quizId}/${sectionIndex}`,
      )
      return res.data
    } else {
      const res = await axiosInstance.get(
        searchQuery
          ? `/checkQuiz/dashboard/${quizId}/?search=${searchQuery}`
          : `/checkQuiz/dashboard/${quizId}/`,
      )
      return res.data
    }
  } catch (e: unknown) {
    if (axios.isAxiosError(e)) {
      return e.response?.data || e.message
    }
    throw e
  }
}
