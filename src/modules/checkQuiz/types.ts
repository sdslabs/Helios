import { QuestionType } from "../types"

export interface Question {
  _id: string
  type: QuestionType
  description: string
  options: { id: string; label: string }[]
  correctAnswer: string
  maxMarks?: number
  notes?: string
  autoCheck?: boolean
  totalAttempts?: number
  checkedAttempts?: number
  assignedTo?: string[]
}

export interface Section {
  name: string
  description: string
  questions: Question[]
}
