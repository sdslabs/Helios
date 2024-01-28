import { useEffect } from 'react'
import { tinykeys } from 'tinykeys'
import { toast } from 'react-toastify'
import { FullScreenHandle } from 'react-full-screen'
import useLog from '@giveQuiz/api/useLog'
import useQuizStore from '@giveQuiz/store/QuizStore'
import { LogType } from '@giveQuiz/types'

const useKeyLogging = ({ handle }: { handle: FullScreenHandle }) => {
  const { mutate: log } = useLog()
  const { currentQuestion, quizId } = useQuizStore((state) => ({
    currentQuestion: state.currentQuestion,
    quizId: state.quizId,
  }))
  const handleSusAction = (logType: string, key: string) => {
    toast.warn(`Action logged (${logType}), avoid using suspicious key presses during quiz.`, {
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
      logType: LogType.SusKey,
      quizId: quizId,
      key: key,
    })
  }
  const handleContextMenu = (e: MouseEvent) => {
    e.preventDefault()
    toast.warn('Action logged (RIGHT CLICK), avoid using right click during quiz.', {
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
      logType: LogType.RightClick,
      quizId: quizId,
    })
  }

  useEffect(() => {
    const unsubscribe = tinykeys(window, {
      '$mod+KeyF': async (event) => {
        event.preventDefault()
        if (!handle.active) {
          await handle.enter()
        }
      },
      '$mod+KeyC': () => {
        handleSusAction('COPY', '$mod+KeyC')
      },
      '$mod+KeyV': () => {
        handleSusAction('PASTE', '$mod+KeyV')
      },
      '$mod+Shift+KeyI': (event) => {
        event.preventDefault()
        handleSusAction('DEVTOOLS', 'Control+Shift+KeyI')
      },
      '$mod+Shift+KeyJ': (event) => {
        event.preventDefault()
        handleSusAction('DEVTOOLS', 'Control+Shift+KeyJ')
      },
      'Alt+Tab': (event) => {
        event.preventDefault()
        handleSusAction('ALT+TAB', 'Alt+Tab')
      },

      F1: async (event) => event.preventDefault(),
      F2: async (event) => event.preventDefault(),
      F3: async (event) => event.preventDefault(),
      F4: async (event) => event.preventDefault(),
      F5: async (event) => event.preventDefault(),
      F6: async (event) => event.preventDefault(),
      F7: async (event) => event.preventDefault(),
      F8: async (event) => event.preventDefault(),
      F9: async (event) => event.preventDefault(),
      F10: async (event) => event.preventDefault(),
      F11: async (event) => event.preventDefault(),
      F12: async (event) => event.preventDefault(),
    })
    document.addEventListener('contextmenu', handleContextMenu)
    return () => {
      unsubscribe()
      document.removeEventListener('contextmenu', handleContextMenu)
    }
  }, [])
}

export default useKeyLogging
