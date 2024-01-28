import { useEffect } from 'react'
import { toast } from 'react-toastify'
import useQuizStore from '@giveQuiz/store/QuizStore'
import useLog from '@giveQuiz/api/useLog'
import { LogType } from '@giveQuiz/types'

const handleBlur = (currentQuestion: string, quizId: string, log: any) => {
  toast.warn('Action logged (TAB CHANGE), avoid using any other tab/window/program during quiz.', {
    position: 'top-center',
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  })
  log({
    questionId: currentQuestion,
    logType: LogType.TabSwitch,
    quizId: quizId,
  })
}

const useWindowFocus = () => {
  const { currentQuestion, quizId } = useQuizStore((state) => ({
    currentQuestion: state.currentQuestion,
    quizId: state.quizId,
  }))
  const { mutate: log } = useLog()
  const onBlur = () => {
    handleBlur(currentQuestion, quizId, log)
  }

  useEffect(() => {
    window.addEventListener('blur', onBlur)

    return () => {
      window.removeEventListener('blur', onBlur)
    }
  }, [handleBlur])
}

export default useWindowFocus
