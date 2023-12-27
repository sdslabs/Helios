import { useEffect, useState } from "react";
import { useGetQuizDetails } from "@createQuiz/api/useQuiz";

const useFetchDetails = (quizId : string) => {
  const [details, setDetails] = useState({
    quizName: '',
    startDate: '',
    startTime: '',
    endDate: '',
    endTime: '',
    quizDuration: '',
    managers: [],
    accessCode: '',
    quizDescription: '',
  })
  const [quizInstructions, setQuizInstructions] = useState<string>('')
  const { data, isLoading } = useGetQuizDetails(quizId)
  useEffect(() => {
    if (!isLoading && data) {
      setQuizInstructions(data.quizInstructions)
      setDetails(data)
    }
  }, [isLoading, data])
  return {
    details,
    quizInstructions,
    isLoading,
    setDetails,
    setQuizInstructions,
  }
}

export default useFetchDetails