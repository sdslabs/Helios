import { useEffect } from 'react'
import useQuizStore from '@giveQuiz/store/QuizStore'
import useLog from '@giveQuiz/api/useLog'
import { LogType } from '@giveQuiz/types'
import {displayToast} from '@giveQuiz/utils/toastNotifications'

const handleBlur = (currentQuestion: string, quizId: string, log: any) => {
  displayToast('Quiz must be given on Full Screen. Press `Ctrl + F` to go to Fullscreen', {
    autoClose: 5000,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
  });
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
