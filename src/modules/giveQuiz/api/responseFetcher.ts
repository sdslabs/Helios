import axiosInstance from "./axiosInstance";
import { AxiosError } from "axios";

export const getResponse = async (quizId : string, questionId : string) => {
  try {
    const res = await axiosInstance.get(`/giveQuiz/response/${quizId}/${questionId}`);
    return res.data;
  } catch (e: unknown) {
    if (e instanceof AxiosError) {
      return e.response?.data || e.message;
    }
    throw e;
  }
}

export const createUpdateResponse = async (
  { quizId, questionId, responseData }: {quizId: string, questionId: string, responseData: any})=> {
  try {
    const res = await axiosInstance.post(`/giveQuiz/response/${quizId}/${questionId}`, responseData)
    return res.data
  }
  catch(e: unknown){
    if (e instanceof AxiosError) {
      return e.response?.data || e.message;
    }
    throw e;
  }
}

export const deleteResponse = async ({ quizId, questionId }: {quizId: string, questionId: string} ) => {
  try {
    const res = await axiosInstance.delete(`/giveQuiz/response/${quizId}/${questionId}`);
    return res.data;
  } catch (e: unknown) {
    if (e instanceof AxiosError) {
      return e.response?.data || e.message;
    }
    throw e;
  }
}