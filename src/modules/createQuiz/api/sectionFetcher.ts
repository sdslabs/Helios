import { isAxiosError } from 'axios'
import axiosInstance from './axiosInstance'

export const createSection = async ({ quizId }: { quizId: string }) => {
  try {
    const res = await axiosInstance.post(`/createQuiz/section/${quizId}`)
    return res.data
  } catch (e: unknown) {
    if (isAxiosError(e)) {
      return e.response?.data || e.message
    }
    throw e
  }
}

export const getSection = async (quizId: string, sectionIdx: number) => {
  try {
    const res = await axiosInstance.get(`/createQuiz/section/${quizId}/${sectionIdx}`)
    return res.data
  } catch (e: unknown) {
    if (isAxiosError(e)) {
      return e.response?.data || e.message
    }
    throw e
  }
}

export const updateSection = async ({ quizId, sectionIdx, body }: any) => {
  try {
    const res = await axiosInstance.put(`/createQuiz/section/${quizId}`, {
      sectionIndex: sectionIdx,
      section: body,
    })
    return res.data
  } catch (e: unknown) {
    if (isAxiosError(e)) {
      return e.response?.data || e.message
    }
    throw e
  }
}

export const deleteSection = async ({ quizId, sectionIdx }: any) => {
  try {
    const res = await axiosInstance.delete(`/createQuiz/section/${quizId}/${sectionIdx}`)
    return res.data
  } catch (e: unknown) {
    if (isAxiosError(e)) {
      return e.response?.data || e.message
    }
    throw e
  }
}
