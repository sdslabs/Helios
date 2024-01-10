import { QuestionType } from '../types'

export type Question = {
    type: QuestionType
    description: string
    options: { id: string; label: string }[]
    correctAnswer: string
    maxMarks: number
    notes: string
    autoCheck: boolean
    totalAttempts: number
    checkedAttempts: number
    assignedTo: string[]
  }
  
export  type Section = {
    name: string
    description: string
    questions: Question[]
  }
