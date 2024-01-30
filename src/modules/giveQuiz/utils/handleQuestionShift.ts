import removeFromArray from './removeFromArray'
import { ResponseStatus } from '../../types'

const handleQuestionShift = (
  markedAnsweredQuestions: string[],
  answeredQuestions: string[],
  markedQuestions: string[],
  setMarkedAnsweredQuestions: (value: string[]) => void,
  setAnsweredQuestions: (value: string[]) => void,
  setMarkedQuestions: (value: string[]) => void,
  currentQuestion: string,
  status: ResponseStatus,
) => {
  removeFromArray(markedAnsweredQuestions, currentQuestion, setMarkedAnsweredQuestions)
  removeFromArray(answeredQuestions, currentQuestion, setAnsweredQuestions)
  removeFromArray(markedQuestions, currentQuestion, setMarkedQuestions)
  switch (status) {
    case ResponseStatus.marked:
      setMarkedQuestions([...markedQuestions, currentQuestion])
      break
    case ResponseStatus.answered:
      setAnsweredQuestions([...answeredQuestions, currentQuestion])
      break
    case ResponseStatus.markedanswer:
      setMarkedAnsweredQuestions([...markedAnsweredQuestions, currentQuestion])
      break
    default:
      break
  }
}

export default handleQuestionShift
