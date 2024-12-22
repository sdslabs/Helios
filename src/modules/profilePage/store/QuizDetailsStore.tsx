import { create } from 'zustand'
import { Quiz } from '../types'

interface QuizDetailsStore {
  createdQuizzes: Quiz[]
  quizzes: Quiz[]
  attemptedQuizzes: number
  hostedQuizzes: number
  setCreatedQuizzes: (createdQuizzes: Quiz[]) => void
  setQuizzes: (quizzes: Quiz[]) => void
  setAttemptedQuizzes: (attemptedQuizzes: number) => void
  setHostedQuizzes: (hostedQuizzes: number) => void
  setDetails: (details: QuizDetailsStore) => void
}

const useQuizDetailsStore = create<QuizDetailsStore>((set) => ({
  createdQuizzes: [],
  quizzes: [],
  attemptedQuizzes: 0,
  hostedQuizzes: 0,
  setCreatedQuizzes: (createdQuizzes: Quiz[]) => set({ createdQuizzes: createdQuizzes }),
  setQuizzes: (quizzes: Quiz[]) => set({ quizzes: quizzes }),
  setAttemptedQuizzes: (attemptedQuizzes: number) => set({ attemptedQuizzes: attemptedQuizzes }),
  setHostedQuizzes: (hostedQuizzes: number) => set({ hostedQuizzes: hostedQuizzes }),
  setDetails: (details: QuizDetailsStore) => set(details),
}))

export default useQuizDetailsStore
