export enum QuestionType {
  MCQ = "mcq",
  SUB = 'Subjective',
}

export type Question = {
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
  
export type Section = {
    name: string
    description: string
    questions: Question[]
  }
