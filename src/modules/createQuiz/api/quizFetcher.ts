import axios from 'axios'
import axiosInstance from './axiosInstance'

export const hostQuiz = async () => {
  try {
    const res = await axiosInstance.post('/createQuiz/quiz/host')
    return res.data
  } catch(e: unknown) {
    if(axios.isAxiosError(e)){
      return e.response?.data || e.message
    }
    throw e;
  }
}