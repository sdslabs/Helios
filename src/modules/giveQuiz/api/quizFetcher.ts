import axiosInstance from "./axiosInstance";
import { AxiosError } from "axios";

export const fetchQuestion = async (questionId : string) => {
    try {
      const response = await axiosInstance.get(`/giveQuiz/quiz/question/${questionId}`);
      return response.data;
    } catch (e: unknown) {
        if (e instanceof AxiosError) {
          return e.response?.data || e.message
        }
        throw e
      }
   };

   export const fetchQuiz = async (quizId : string) => {
    try {
      const response = await axiosInstance.get(`/giveQuiz/quiz/${quizId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching quiz:', error);
    }
   };