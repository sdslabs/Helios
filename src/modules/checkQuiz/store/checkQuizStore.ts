import { create } from 'zustand'
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
  goToNextQuestion: () => void
  goToPrevQuestion: () => void
}

const useCheckQuizStore = create<CheckQuizStore>((set, get) => ({
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

  setSections: (to) => set({ sections: to }),
  setCurrentQuestionIndex: (to) => set({ currentQuestionIndex: to }),
  setCurrentSection: (to) => set({ currentSection: to }),
  setCurrentSectionIndex: (to) => set({ currentSectionIndex: to }),
  setTotalQuestion: (to) => set({ totalQuestion: to }),
  setcheckedAnsweredQuestions: (to) => set({ checkedAnsweredQuestions: to }),
  setIsCurrentQuestionchecked: (to) => set({ isCurrentQuestionchecked: to }),
  setLeaderboard: (to) => set({ leaderboard: to }),
  setLeaderboardUserDetails: (to) => set({ leaderboardUserDetails: to }),
  setAdmin: (to) => set({ admin: to }),
  setQuizName: (to) => set({ quizName: to }),
  setTotalAttempts: (to) => set({ totalAttempts: to }),
  setChecksCompleted: (to) => set({ checksCompleted: to }),
  setScheduled: (to) => set({ scheduled: to }),
  setTotalParticipants: (to) => set({ totalParticipants: to }),
  setQuizId: (to) => set({ quizId: to }),
  setcurrentResponse: (to) => set({ currentResponse: to }),
  setcurrentResponseIndex: (to) => set({ currentResponseIndex: to }),
  setallResponsesId: (to) => set({ allResponsesId: to }),
  setallResponsesStatus: (to) => set({ allResponsesStatus: to }),
  
  goToNextQuestion: () => {
    const state = get()
    const currentSection = state.sections[state.currentSectionIndex - 1]
    if (!currentSection) return
    
    const nextQuestionIndex = state.currentQuestionIndex + 1
    
    if (nextQuestionIndex > currentSection.questions.length) {
      if (state.currentSectionIndex >= state.sections.length) return
      
      set({
        currentSectionIndex: state.currentSectionIndex + 1,
        currentQuestionIndex: 1,
        currentResponseIndex: 0,
        allResponsesId: [],
        allResponsesStatus: []
      })
    } else {
      set({
        currentQuestionIndex: nextQuestionIndex,
        currentResponseIndex: 0,
        allResponsesId: [],
        allResponsesStatus: []
      })
    }
  },
  
  goToPrevQuestion: () => {
    const state = get()
    const prevQuestionIndex = state.currentQuestionIndex - 1
    
    if (prevQuestionIndex < 1) {
      if (state.currentSectionIndex <= 1) return
      const prevSection = state.sections[state.currentSectionIndex - 2]
      set({
        currentSectionIndex: state.currentSectionIndex - 1,
        currentQuestionIndex: prevSection.questions.length
      })
    } else {
      set({ currentQuestionIndex: prevQuestionIndex })
    }
  }
}))

export default useCheckQuizStore