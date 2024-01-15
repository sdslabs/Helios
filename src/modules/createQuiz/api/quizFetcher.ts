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

export const getQuizDetails = async (quizId: string) => {
  try {
    const res = await axiosInstance.get(`/createQuiz/quiz/${quizId}`);
    return res.data;
  } catch (e: unknown) {
    if (isAxiosError(e)) {
      return e.response?.data || e.message;
    }
    throw e;
  }
};


export const updateQuizDetails = async({ quizId, body } : any) => {
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

export const publishQuiz = async({ quizId } : { quizId : string }) => {
  try{
    const res = await axiosInstance.patch(`/createQuiz/quiz/${quizId}`);
    return res.data
  } catch(e: unknown) {
    if(isAxiosError(e)){
      return e.response?.data || e.message
    }
    throw e;
  }
}