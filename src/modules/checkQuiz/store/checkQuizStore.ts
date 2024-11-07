import { create, SetState } from 'zustand'
import { Section } from '@checkQuiz/types'

interface CheckQuizStore {
  sections: Section[]
  currentQuestionIndex: number
  currentSection: Section
  currentSectionIndex: number
  totalQuestion: number
  checkedAnsweredQuestions: string[]
  isCurrentQuestionchecked: string
  leaderboard: any
  leaderboardUserDetails: any
  admin: string
  quizName: string
  totalAttempts: number
  checksCompleted: number
  scheduled: string
  totalParticipants: number
  quizId: string
  currentResponse: string
  currentResponseIndex: number
  allResponsesId: string[]
  allResponsesStatus: string[]

  setSections: (to: Section[]) => void
  setCurrentQuestionIndex: (to: number) => void
  setCurrentSection: (to: Section) => void
  setCurrentSectionIndex: (to: number) => void
  setTotalQuestion: (to: number) => void
  setcheckedAnsweredQuestions: (to: string[]) => void
  setIsCurrentQuestionchecked: (to: string) => void
  setLeaderboard: (to: any) => void
  setLeaderboardUserDetails: (to: any) => void
  setAdmin: (to: string) => void
  setQuizName: (to: string) => void
  setTotalAttempts: (to: number) => void
  setChecksCompleted: (to: number) => void
  setScheduled: (to: string) => void
  setTotalParticipants: (to: number) => void
  setQuizId: (to: string) => void
  setcurrentResponse: (to: string) => void
  setcurrentResponseIndex: (to: number) => void
  setallResponsesId: (to: string[]) => void
  setallResponsesStatus: (to: string[]) => void
}

const useCheckQuizStore = create<CheckQuizStore>((set: SetState<CheckQuizStore>) => {
  const initialState: CheckQuizStore = {
    sections: [],
    currentQuestionIndex: 1,
    currentSection: { name: '', description: '', questions: [] },
    currentSectionIndex: 1,
    totalQuestion: 0,
    checkedAnsweredQuestions: [],
    isCurrentQuestionchecked: 'answered',
    leaderboard: [],
    leaderboardUserDetails: [],
    admin: '',
    quizName: '',
    totalAttempts: 0,
    checksCompleted: 0,
    scheduled: '',
    totalParticipants: 0,
    quizId: '',
    currentResponse: '',
    currentResponseIndex: 0,
    allResponsesId: [],
    allResponsesStatus: [],

    setSections: (to: Section[]) => set({ sections: to }),
    setCurrentQuestionIndex: (to: number) => set({ currentQuestionIndex: to }),
    setCurrentSection: (to: Section) => set({ currentSection: to }),
    setCurrentSectionIndex: (to: number) => set({ currentSectionIndex: to }),
    setTotalQuestion: (to: number) => set({ totalQuestion: to }),
    setcheckedAnsweredQuestions: (to: string[]) => set({ checkedAnsweredQuestions: to }),
    setIsCurrentQuestionchecked: (to: string) => set({ isCurrentQuestionchecked: to }),
    setLeaderboard: (to: any) => set({ leaderboard: to }),
    setLeaderboardUserDetails: (to: any) => set({ leaderboardUserDetails: to }),
    setAdmin: (to: string) => set({ admin: to }),
    setQuizName: (to: string) => set({ quizName: to }),
    setTotalAttempts: (to: number) => set({ totalAttempts: to }),
    setChecksCompleted: (to: number) => set({ checksCompleted: to }),
    setScheduled: (to: string) => set({ scheduled: to }),
    setTotalParticipants: (to: number) => set({ totalParticipants: to }),
    setQuizId: (to: string) => set({ quizId: to }),
    setcurrentResponse: (to: string) => set({ currentResponse: to }),
    setcurrentResponseIndex: (to: number) => set({ currentResponseIndex: to }),
    setallResponsesId: (to: string[]) => set({ allResponsesId: to }),
    setallResponsesStatus: (to: string[]) => set({ allResponsesStatus: to }),
  }

  return initialState
})

export default useCheckQuizStore
