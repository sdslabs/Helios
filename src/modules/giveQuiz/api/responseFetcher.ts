import axiosInstance from "./axiosInstance";
import { AxiosError } from "axios";

export const fetchGetResponse = async (quizId : string, questionId : string) => {
    try {
      const response = await axiosInstance.get(`/giveQuiz/response/${quizId}/${questionId}/`);
      return response.data;
    } catch (e: unknown) {
      if (e instanceof AxiosError) {
        return e.response?.data || e.message
      }
      throw e
    }
   };

   export const fetchCreateUpdateResponse= async ({
    quizId,
    questionId,
    responseData
  }: any) => {
    try {
        const res =await axiosInstance.post(`/giveQuiz/response/${quizId}/${questionId}/`, responseData)
      return res.data
    } catch (e: unknown) {
      if (e instanceof AxiosError) {
        return e.response?.data || e.message
      }
      throw e
    }
  }

   export const fetchDeleteResponse = async ({quizId, questionId} : any) => {
    try {
      const response = await axiosInstance.delete(`/giveQuiz/response/${quizId}/${questionId}/`);
      return response.data;
    } catch (e: unknown) {
      if (e instanceof AxiosError) {
        return e.response?.data || e.message
      }
      throw e
    }
   };