import { isAxiosError } from "axios";
import axiosInstance from "./axiosInstance";

export const createQuestion = async ({ quizId, sectionIdx }: { quizId: string, sectionIdx: number }) => {
  try {
    const res = await axiosInstance.post(`/createQuiz/question/${quizId}`, {
      sectionIndex: sectionIdx
    });
    return res.data;
  } catch (e: unknown) {
    if (isAxiosError(e)) {
      return e.response?.data || e.message;
    }
    throw e;
  }
}

export const getQuestion = async (questionId: string) => {
  try {
    const res = await axiosInstance.get(`/createQuiz/question/${questionId}`);
    return res.data;
  } catch (e: unknown) {
    if (isAxiosError(e)) {
      return e.response?.data || e.message;
    }
    throw e;
  }
}

export const updateQuestion = async ({ questionId, quizId, body }: {questionId: string, quizId: string, body: any}) => {
  try {
    const res = await axiosInstance.put(`/createQuiz/question/${quizId}`, {
      questionId,
      question: body
    });
    return res.data;
  } catch (e: unknown) {
    if (isAxiosError(e)) {
      return e.response?.data || e.message;
    }
    throw e;
  }
}

export const deleteQuestion = async ({ questionId, quizId }: {questionId : string, quizId: string}) => {
  try {
    const res = await axiosInstance.delete(`/createQuiz/question/${quizId}/${questionId}`);
    return res.data;
  } catch (e: unknown) {
    if (isAxiosError(e)) {
      return e.response?.data || e.message;
    }
    throw e;
  }
}