import axios from 'axios'
import axiosInstance from './axiosInstance'

export const FetchAutocheck = async (quizId: string) => {
  try {
    const res = await axiosInstance.post(`/checkQuiz/autocheck/${quizId}`)
    return res.data
  } catch(e: any) {
    if(axios.isAxiosError(e)){
      return e.response?.data || e.message
    }
    throw e;
  }
}