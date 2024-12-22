import { QuestionType } from '../types'

export interface Question {
  status: string
  description: string
  type: string
  marksObtained: number
  maximumMarks: number
}

export interface Section {
  name: string
  marksObtained: number
  maximumMarks: number
  percentage: number
  rank: number
  questions: Question[]
}

export enum NumberCardType {
  rank = 'rank',
  marks = 'marks',
}
