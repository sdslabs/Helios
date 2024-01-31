import axios from 'axios'
import axiosInstance from './axiosInstance'

export const GenerateLeaderboard = async ({
  quizId,
  sectionIndex = null,
}: {
  quizId: string
  sectionIndex: number | null
}) => {
  try {
    if (sectionIndex === null) {
      const res = await axiosInstance.patch(`/checkQuiz/leaderboard/${quizId}`)
      return res.data
    } else {
      const res = await axiosInstance.patch(
        `/checkQuiz/generateSectionLeaderboard/${quizId}/${sectionIndex}`,
      )
      return res.data
    }
  } catch (e: any) {
    if (axios.isAxiosError(e)) {
      return e.response?.data || e.message
    }
    throw e
  }
}
