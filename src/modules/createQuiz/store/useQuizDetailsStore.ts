import { create } from 'zustand'

export interface QuizDetails {
  name?: string
  managers?: string[]
  description?: string
  instructions?: string
  startDate?: string
  startTime?: string
  endDate?: string
  endTime?: string
  duration?: string
  accessCode?: string
  bannerImage?: string
}

export interface QuizDetailsStore {
  details: QuizDetails
  quizId: string
  setDetails: (quizDetails: QuizDetails) => void
  setKey: (key: string, value: string) => void
  setQuizId: (quizId: string) => void
}

const useQuizDetailsStore = create<QuizDetailsStore>((set) => ({
  details: {},
  quizId: '',
  setDetails: (details) => set({ details }),
  setKey: (key, value) => set((state) => ({ details: { ...state.details, [key]: value } })),
  setQuizId: (quizId) => set({ quizId }),
}))

export default useQuizDetailsStore
