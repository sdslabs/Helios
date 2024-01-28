import { create } from 'zustand'

interface Section {
  name: string
  description: string
  questions: any[]
}

interface QuizStore {
  quizId: string
  currentQuestion: string
  timer: number
  sections: Section[]
  currentQuestionIndex: number
  currentSection: Section
  currentSectionIndex: number
  totalQuestion: number
  answeredQuestions: string[]
  markedQuestions: string[]
  markedAnsweredQuestions: string[]
  isStarted: boolean
  isCurrentQuestionMarked: boolean

  setQuizId: (to: string) => void
  setCurrentQuestion: (to: string) => void
  setTimer: (to: number) => void
  setSections: (to: Section[]) => void
  setCurrentQuestionIndex: (to: number) => void
  setCurrentSection: (to: Section) => void
  setCurrentSectionIndex: (to: number) => void
  setTotalQuestion: (to: number) => void
  setAnsweredQuestions: (to: string[]) => void
  setMarkedQuestions: (to: string[]) => void
  setMarkedAnsweredQuestions: (to: string[]) => void
  setIsStarted: (to: boolean) => void
  setIsCurrentQuestionMarked: (to: boolean) => void

  nextQuestion: () => {
    currentQuestion: string
    currentQuestionIndex: number
    currentSectionIndex: number
    currentSection?: string
  } | void
}

const useQuizStore = create<QuizStore>((set) => ({
  quizId: '',
  sections: [],
  currentQuestion: '',
  currentQuestionIndex: 1,
  timer: 0,
  currentSection: { name: '', description: '', questions: [] },
  currentSectionIndex: 1,
  totalQuestion: 0,
  answeredQuestions: [],
  markedQuestions: [],
  markedAnsweredQuestions: [],
  isStarted: false,
  isCurrentQuestionMarked: false,

  setQuizId: (to: string) => set({ quizId: to }),
  setCurrentQuestion: (to: string) => set({ currentQuestion: to }),
  setTimer: (to: number) => set({ timer: to }),
  setSections: (to: Section[]) => set({ sections: to }),
  setCurrentQuestionIndex: (to: number) => set({ currentQuestionIndex: to }),
  setCurrentSection: (to: Section) => set({ currentSection: to }),
  setCurrentSectionIndex: (to: number) => set({ currentSectionIndex: to }),
  setTotalQuestion: (to: number) => set({ totalQuestion: to }),
  setAnsweredQuestions: (to: string[]) => set({ answeredQuestions: to }),
  setMarkedQuestions: (to: string[]) => set({ markedQuestions: to }),
  setMarkedAnsweredQuestions: (to: string[]) => set({ markedAnsweredQuestions: to }),
  setIsStarted: (to: boolean) => set({ isStarted: to }),
  setIsCurrentQuestionMarked: (to: boolean) => set({ isCurrentQuestionMarked: to }),

  nextQuestion: () =>
    set((state) => {
      if (
        state.currentQuestionIndex >= state.sections[state.currentSectionIndex - 1].questions.length
      ) {
        if (state.currentSectionIndex < state.sections.length) {
          return {
            currentSectionIndex: state.currentSectionIndex + 1,
            currentQuestionIndex: 1,
            currentQuestion: state.sections[state.currentSectionIndex].questions[0],
          }
        } else {
          return {}
        }
      } else {
        return {
          currentQuestionIndex: state.currentQuestionIndex + 1,
          currentQuestion:
            state.sections[state.currentSectionIndex - 1].questions[state.currentQuestionIndex], // And here
        }
      }
    }),
}))

export default useQuizStore
