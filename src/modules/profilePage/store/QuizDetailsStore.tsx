import { create } from 'zustand'

interface QuizDetailsStore {
    createdQuizzes: any
    quizzes: any
    attemptedQuizzes: number
    hostedQuizzes: number
    setCreatedQuizzes: (createdQuizzes: any) => void
    setQuizzes: (quizzes: any) => void
    setAttemptedQuizzes: (attemptedQuizzes: any) => void
    setHostedQuizzes: (hostedQuizzes: any) => void
    setDetails: (details: QuizDetailsStore) => void
}

const useQuizDetailsStore = create<QuizDetailsStore>((set) => ({
    createdQuizzes: [],
    quizzes: [],
    attemptedQuizzes: 0,
    hostedQuizzes: 0,
    setCreatedQuizzes: (createdQuizzes) => set(createdQuizzes),
    setQuizzes: (quizzes) => set(quizzes),
    setAttemptedQuizzes: (attemptedQuizzes) => set(attemptedQuizzes),
    setHostedQuizzes: (hostedQuizzes) => set(hostedQuizzes),
    setDetails: (details) => set(details),
}))

export default useQuizDetailsStore
