import { useCallback, useState, useEffect } from 'react'
import WithSidebarWrapper from '@common/views/WithSidebarWrapper'
import { GiveQuizSteps, LogType } from '../types'
import Instructions from '@giveQuiz/components/Instructions'
import TopNav from '@common/components/TopNav'
import SideNavContent from '@giveQuiz/SideNav'
import SectionTopBar from '@giveQuiz/components/SectionTopBar'
import SectionInstructions from '@giveQuiz/components/SectionInstructions'
import QuestionView from '@giveQuiz/components/QuestionView'
import { useTimer } from '@giveQuiz/components/TimerContext'
import { FullScreen, useFullScreenHandle } from 'react-full-screen'
import useLocationAccess from '@giveQuiz/hooks/useLocationAccess'
import useKeyLogging from '@giveQuiz/hooks/useKeyLogging'
import MediaAccess from '@giveQuiz/components/MediaAccess'
import { ToastContainer, toast } from 'react-toastify'
import { useParams, useNavigate } from 'react-router-dom'
import useQuizStore from '@giveQuiz/store/QuizStore'
import 'react-toastify/dist/ReactToastify.css'
import useLog from '@giveQuiz/api/useLog'
import useAuthStore from '@auth/store/authStore'
import { useSubmitQuiz, useGetStartTime } from '@giveQuiz/api/useUser'
import { displayToast, displayErrorToast } from '@giveQuiz/utils/toastNotifications'
import useLogIP from '@giveQuiz/hooks/useLogIP'
import useMedia from '@giveQuiz/hooks/useMedia'

const giveQuiz = () => {
  const { quizId } = useParams() as { quizId: string }
  const { setQuizId, currentQuestion } = useQuizStore((state) => ({
    setQuizId: state.setQuizId,
    currentQuestion: state.currentQuestion,
  }))
  const { mutate: log } = useLog()
  const [quizStage, setQuizStage] = useState<GiveQuizSteps>(-1)
  const [count, setCount] = useState<number>(0)
  const fullScreenHandle = useFullScreenHandle()
  const { hasLocationAccess } = useLocationAccess()
  const { setTimer } = useTimer()
  const user = useAuthStore((state) => state.user)
  const isStarted = useQuizStore((state) => state.isStarted)
  const { setIsStarted } = useQuizStore()
  const { mutate } = useSubmitQuiz()
  const { mutate: getStartTime } = useGetStartTime()
  const navigate = useNavigate()
  const { isMediaPermission } = useMedia()

  const reportChange = useCallback(
    (state: boolean) => {
      if (state === false) {
        setQuizStage(GiveQuizSteps.AccessWindow)
        displayToast('Quiz must be given on Full Screen. Press `Ctrl + F` to go to Fullscreen', {
          toastId: 'fsToast',
          hideProgressBar: true,
        })
      } else {
        toast.dismiss('fsToast')
        //TODO: use something more robust than settimeout
        if (count) {
          setTimeout(() => {
            displayToast('Action Logged (FullScreen Exit), avoid exiting fullscreen during quiz', {
              position: 'top-center',
              autoClose: 5000,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
            })
          }, 2000)
          log(
            {
              questionId: currentQuestion,
              logType: LogType.FullScreenExit,
              quizId: quizId,
            },
            {
              onError: (error) => {
                console.error('An error occurred while logging:', error)
              },
            },
          )
        }
        setCount(count + 1)
        setQuizStage(GiveQuizSteps.Instructions)
        getStartTime(
          { quizId: quizId, body: { userId: user.userId } },
          {
            onSuccess: (data) => {
              setTimer(data.userLeftTime)
              if (data.userLeftTime < 0) {
                if (quizId) {
                  mutate(quizId, {
                    onSuccess: () => {
                      navigate('/dashboard')
                    },
                    onError: (error) => {
                      displayErrorToast('Failed to submit quiz. Please try again.')
                    },
                  })
                }
              }
              setIsStarted(true)
            },
            onError: (error) => {
              displayErrorToast('Failed to get time left. Please try again.')
            },
          },
        )
      }
    },
    [fullScreenHandle],
  )

  useKeyLogging({ handle: fullScreenHandle })

  useEffect(() => {
    if (!isMediaPermission) {
      displayToast('Please allow microphone and camera access for the quiz to start', {
        toastId: 'mediaToast',
        hideProgressBar: true,
        type: 'error',
      })
    } else {
      toast.dismiss('mediaToast')
      displayToast('Microphone and Camera access detected!', {
        position: 'top-right',
        type: 'info',
      })
    }
  }, [isMediaPermission])

  useEffect(() => {
    if (hasLocationAccess) {
      toast.dismiss('locationToast')
      displayToast('Location access detected!', {
        position: 'top-left',
        type: 'info',
      })
    }
  }, [hasLocationAccess])

  //TODO: refactor
  useEffect(() => {
    setQuizId(quizId)
  }, [quizId])

  useLogIP()

  const renderQuiz = () => {
    switch (quizStage) {
      case GiveQuizSteps.Instructions:
        return <Instructions stage={quizStage} setStage={setQuizStage} />
      case GiveQuizSteps.Sections:
        return <SectionInstructions stage={quizStage} setStage={setQuizStage} />
      case GiveQuizSteps.Questions:
        return <QuestionView />
      default:
        return null
    }
  }

  if (!hasLocationAccess || !isMediaPermission) {
    return (
      <>
        <ToastContainer />
        <MediaAccess hidden={false} />
      </>
    )
  }

  const renderQuizGivingPage = () => {
    if (quizStage < 0) {
      return (
        <>
          <ToastContainer />
          <MediaAccess hidden={false} />
          <FullScreen handle={fullScreenHandle} onChange={reportChange} className='bg-white'>
            {' '}
          </FullScreen>
        </>
      )
    }
    return (
      <>
        <ToastContainer />
        <MediaAccess hidden={false} />
        <FullScreen handle={fullScreenHandle} onChange={reportChange} className='bg-white'>
          <ToastContainer />
          <TopNav />
          <WithSidebarWrapper
            sidebarContent={<SideNavContent stage={quizStage} setStage={setQuizStage} />}
          >
            <SectionTopBar />
            {renderQuiz()}
          </WithSidebarWrapper>
        </FullScreen>
      </>
    )
  }
  return <>{renderQuizGivingPage()}</>
}

export default giveQuiz
