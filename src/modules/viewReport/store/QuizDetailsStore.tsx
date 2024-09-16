import { create } from 'zustand'

interface QuizDetailsStore {
  quizName: string
  creator: string
  dateOfQuiz: any
  dateOfResult: any
  rank: number
  marks: number
  totalParticipants: number
  totalMarks: number
  sections: any
  setQuizName: (quizName: any) => void
  setCreator: (creator: any) => void
  setDateOfQuiz: (dateOfQuiz: any) => void
  setDateOfResult: (dateOfResult: any) => void
  setRank: (rank: any) => void
  setMarks: (marks: any) => void
  setTotalParticipants: (totalParticipants: any) => void
  setTotalMarks: (totalMarks: any) => void
  setSections: (sections: any) => void
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
  sections: '',
  setQuizName: (quizName) => set(quizName),
  setCreator: (creator) => set(creator),
  setDateOfQuiz: (dateOfQuiz) => set(dateOfQuiz),
  setDateOfResult: (dateOfResult) => set(dateOfResult),
  setRank: (rank) => set(rank),
  setMarks: (marks) => set(marks),
  setTotalParticipants: (totalParticipants) => set(totalParticipants),
  setTotalMarks: (totalMarks) => set(totalMarks),
  setSections: (sections) => set(sections),
  setDetails: (details) => set(details),
}))

export default useQuizDetailsStore
