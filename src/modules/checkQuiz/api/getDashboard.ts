import axios from 'axios'
import axiosInstance from './axiosInstance'

export const getDashboard = async (quizId: string) => {
  try {
    const res = await axiosInstance.get(`/checkQuiz/dashboard/${quizId}`)
    return res.data
  } catch(e: any) {
    if(axios.isAxiosError(e)){
      return e.response?.data || e.message
    }
    throw e;
  }
}