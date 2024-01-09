import axios from "axios";
import axiosInstance from "./axiosInstance";

export const createSection = async ({ quizId } : { quizId: string }) => {
  try {
    const res = await axiosInstance.post(`/createQuiz/section/${quizId}`);
    return res.data;
  } catch (e: unknown) {
    if (axios.isAxiosError(e)) {
      return e.response?.data || e.message;
    }
    throw e;
  }
}

export const  getSection = async ({ queryKey }: {queryKey: [string, string, number]}) => {
  try {
    const res = await axiosInstance.get(`/createQuiz/section/${queryKey[1]}/`, {
      data: {
        sectionIdx: queryKey[2]
      }
    });
    return res.data;
  } catch (e: unknown) {
    if (axios.isAxiosError(e)) {
      return e.response?.data || e.message;
    }
    throw e;
  }
}

export const updateSection = async ({ quizId, sectionIdx, body } : any) => {
  try {
    const res = await axiosInstance.put(`/createQuiz/section/${quizId}`, {
      sectionIndex: sectionIdx,
      section: body
    });
    return res.data;
  } catch (e: unknown) {
    if (axios.isAxiosError(e)) {
      return e.response?.data || e.message;
    }
    throw e;
  }
}

export const deleteSection = async ({ quizId, sectionIdx } : any) => {
  try {
    const res = await axiosInstance.delete(`/createQuiz/section/${quizId}`, {
      data: {
        sectionIdx
      }
    });
    return res.data;
  } catch (e: unknown) {
    if (axios.isAxiosError(e)) {
      return e.response?.data || e.message;
    }
    throw e;
  }
}