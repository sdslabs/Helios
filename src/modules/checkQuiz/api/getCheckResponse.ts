import axios from 'axios'
import axiosInstance from './axiosInstance'

export const FetchCheckResponse = async (quizId: string, responseId: string) => {
  try {
    const res = await axiosInstance.post(`/checkQuiz/response/check/${quizId}/${responseId}`)
    return res.data
  } catch(e: any) {
    if(axios.isAxiosError(e)){
      return e.response?.data || e.message
    }
    throw e;
  }
}