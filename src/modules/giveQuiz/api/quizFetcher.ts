import axiosInstance from "./axiosInstance";
import { AxiosError } from "axios";

export const getQuestion = async (questionId : string) => {
  try {
    const res = await axiosInstance.get(`/giveQuiz/quiz/question/${questionId}`);
    return res.data;
  } catch (e: unknown) {
    if (e instanceof AxiosError) {
      return e.response?.data || e.message;
    }
    throw e;
  }
}

export const getQuiz = async (quizId : string) => {
  try {
    const res = await axiosInstance.get(`/giveQuiz/quiz/quiz/${quizId}`);
    return res.data;
  } catch (e: unknown) {
    if (e instanceof AxiosError) {
      return e.response?.data || e.message;
    }
    throw e;
  }
}