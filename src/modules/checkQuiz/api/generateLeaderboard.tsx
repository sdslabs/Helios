import axios from 'axios'
import axiosInstance from './axiosInstance'

export const GenerateLeaderboard = async ({
  quizId,
  sectionIndex = null,
  searchQuery = null,
}: {
  quizId: string
  sectionIndex: number | null
  searchQuery: string | null
}) => {
  try {
    if (sectionIndex === null && searchQuery === null) {
      console.log(1)
      const res = await axiosInstance.patch(`/checkQuiz/leaderboard/${quizId}`)
      return res.data
    } else if (sectionIndex !== null && searchQuery === null) {
      console.log(2)
      const res = await axiosInstance.patch(
        `/checkQuiz/generateSectionLeaderboard/${quizId}/${sectionIndex}`,
      )
      return res.data
    } else if (sectionIndex === null && searchQuery !== null) {
      console.log(3)
      console.log(searchQuery)
      const res = await axiosInstance.patch(`/checkQuiz/leaderboard/${quizId}?search=${searchQuery}`)
      console.log(res)
      return res.data
    } else {
      console.log(4)
      const res = await axiosInstance.patch(
        `/checkQuiz/generateSectionLeaderboard/${quizId}/${sectionIndex}?search=${searchQuery}`,
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
