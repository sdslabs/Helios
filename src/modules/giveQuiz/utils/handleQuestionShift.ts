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
  const newMAQ = removeFromArray(
    markedAnsweredQuestions,
    currentQuestion,
    setMarkedAnsweredQuestions,
  )
  const newAQ = removeFromArray(answeredQuestions, currentQuestion, setAnsweredQuestions)
  const newMQ = removeFromArray(markedQuestions, currentQuestion, setMarkedQuestions)
  switch (status) {
    case ResponseStatus.marked:
      setMarkedQuestions([...newMQ, currentQuestion])
      break
    case ResponseStatus.answered:
      setAnsweredQuestions([...newAQ, currentQuestion])
      break
    case ResponseStatus.markedanswer:
      setMarkedAnsweredQuestions([...newMAQ, currentQuestion])
      break
    default:
      break
  }
}

export default handleQuestionShift
