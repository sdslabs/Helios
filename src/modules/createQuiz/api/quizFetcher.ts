import { isAxiosError } from 'axios'
import axiosInstance from './axiosInstance'

export const hostQuiz = async () => {
  try {
    const res = await axiosInstance.post('/createQuiz/quiz/host')
    return res.data
  } catch(e: unknown) {
    if(isAxiosError(e)){
      return e.response?.data || e.message
    }
    throw e;
  }
}

export const getQuizDetails = async ({ queryKey }: { queryKey: [string, string] }) => {
  try {
    const res = await axiosInstance.get(`/createQuiz/quiz/${queryKey[1]}`);
    return res.data;
  } catch (e: unknown) {
    if (isAxiosError(e)) {
      return e.response?.data || e.message;
    }
    throw e;
  }
};


export const updateQuizDetails = async({quizId, body} : any) => {
  try{
    const res = await axiosInstance.put(`/createQuiz/quiz/${quizId}`, body);
    return res.data
  } catch(e: unknown) {
    if(isAxiosError(e)){
      return e.response?.data || e.message
    }
    throw e;
  }
}