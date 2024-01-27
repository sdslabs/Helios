import axios from 'axios'
import axiosInstance from './axiosInstance'

export const FetchCheckResponse = async ({quizId, responseId, body}:any) => {
  try {
    const res = await axiosInstance.post(`/checkQuiz/response/check/${quizId}/${responseId}`, body)
    return res.data
  } catch(e: any) {
    if(axios.isAxiosError(e)){
      return e.response?.data || e.message
    }
    throw e;
  }
}