import axiosInstance from "./axiosInstance";
import { AxiosError } from "axios";

export const fetchAccessCode= async ({
    quizId,
    body}: any) => {
    try {
        const res =await axiosInstance.post(`/giveQuiz/user/start/${quizId}`, body)
      return res.data
    } catch (e: unknown) {
        if (e instanceof AxiosError) {
          return e.response?.data || e.message
        }
        throw e
      }
  }

  export const fetchRegisterUser= async ({
    quizId,
    body}: any) => {
    try {
        const res =await axiosInstance.post(`/giveQuiz/user/register/${quizId}`, body)
      return res.data
    } catch (e: unknown) {
        if (e instanceof AxiosError) {
          return e.response?.data || e.message
        }
        throw e
      }
  }

  export const submitQuiz = async (quizId : string) => {
    try {
        const res = await axiosInstance.post(`/giveQuiz/user/submit/${quizId}`);

        return res.data;
    } catch (e: unknown) {
        if (e instanceof AxiosError) {
          return e.response?.data || e.message
        }
        throw e
      }
};
