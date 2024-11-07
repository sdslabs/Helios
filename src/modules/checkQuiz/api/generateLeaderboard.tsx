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
    console.log(`/checkQuiz/leaderboard/${quizId}/${sectionIndex}`)
    const res = await axiosInstance.patch(
      sectionIndex
        ? `/checkQuiz/leaderboard/${quizId}/${sectionIndex}`
        : `/checkQuiz/leaderboard/${quizId}/`,
    )
    return res.data
  } catch (e: any) {
    if (axios.isAxiosError(e)) {
      return e.response?.data || e.message
    }
    throw e
  }
}
