import { create } from 'zustand'
import { Section } from '../types'
interface QuizDetailsStore {
  quizName: string
  creator: string
  dateOfQuiz: any
  dateOfResult: any
  rank: number
  marks: number
  totalParticipants: number
  totalMarks: number
  sections: Section[]
  setQuizName: (quizName: string) => void
  setCreator: (creator: string) => void
  setDateOfQuiz: (dateOfQuiz: any) => void
  setDateOfResult: (dateOfResult: any) => void
  setRank: (rank: number) => void
  setMarks: (marks: number) => void
  setTotalParticipants: (totalParticipants: number) => void
  setTotalMarks: (totalMarks: number) => void
  setSections: (sections: Section[]) => void
  setDetails: (details: QuizDetailsStore) => void
}

const useQuizDetailsStore = create<QuizDetailsStore>((set) => ({
  quizName: '',
  creator: '',
  dateOfQuiz: '',
  dateOfResult: '',
  rank: 0,
  marks: 0,
  totalParticipants: 0,
  totalMarks: 0,
  sections: [],
  setQuizName: (quizName: string) => set({ quizName: quizName }),
  setCreator: (creator: string) => set({ creator: creator }),
  setDateOfQuiz: (dateOfQuiz: any) => set(dateOfQuiz),
  setDateOfResult: (dateOfResult: any) => set(dateOfResult),
  setRank: (rank: number) => set({ rank: rank }),
  setMarks: (marks: number) => set({ marks: marks }),
  setTotalParticipants: (totalParticipants: number) =>
    set({ totalParticipants: totalParticipants }),
  setTotalMarks: (totalMarks: number) => set({ totalMarks: totalMarks }),
  setSections: (sections: Section[]) => set({ sections: sections }),
  setDetails: (details: QuizDetailsStore) => set(details),
}))

export default useQuizDetailsStore
