import { useCallback, useState, useEffect } from 'react'
import WithSidebarWrapper from '@common/views/WithSidebarWrapper'
import { GiveQuizSteps } from '../types'
import Instructions from '@giveQuiz/components/Instructions'
import TopNav from '@common/components/TopNav'
import SideNavContent from '@giveQuiz/sideNav'
import SectionTopBar from '@giveQuiz/components/SectionTopBar'
import SectionInstructions from '@giveQuiz/components/SectionInstructions'
import QuestionView from '@giveQuiz/components/QuestionView'
import { TimerProvider } from '@giveQuiz/components/TimerContext'
import { FullScreen, useFullScreenHandle } from 'react-full-screen'
import useLocationAccess from '@giveQuiz/hooks/useLocationAccess'
import useKeyLogging from '@giveQuiz/hooks/useKeyLogging'
import MediaAccess from '@giveQuiz/components/MediaAccess'
import { ToastContainer, toast } from 'react-toastify'
import { useParams } from 'react-router-dom';
import useQuizStore from '@giveQuiz/store/QuizStore'
import 'react-toastify/dist/ReactToastify.css';
import useLog from '@giveQuiz/api/useLog'

const   giveQuiz = () => {
  const { quizId } = useParams() as { quizId: string }
  const { setQuizId, currentQuestion } = useQuizStore((state) => ({
    setQuizId: state.setQuizId,
    currentQuestion: state.currentQuestion
  }))
  const { mutate: log } = useLog()
  setQuizId(quizId)
  const [quizStage, setQuizStage] = useState<GiveQuizSteps>(0)
  const fullScreenHandle = useFullScreenHandle()
  const [isOnFS, setIsOnFS] = useState<boolean>(false);
  const [isMediaPermission, setIsMediaPermission] = useState<boolean>(false);
  const { hasLocationAccess } = useLocationAccess();
  const handleBlur = () => {
    toast.warn(
      'Action logged (TAB CHANGE), avoid using any other tab/window/program during quiz.',
      {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      },
    );
    log({
      questionId: currentQuestion,
      logType: 'tabChange',
      quizId: quizId
    })
  }
  const reportChange = useCallback(
    (state: boolean) => {
      if (state === false) {
        setIsOnFS(false);
        toast.dark(
          'Quiz must be given on Full Screen. Press `Ctrl + F` to go to Fullscreen',
          {
            position: 'top-center',
            autoClose: false,
            hideProgressBar: true,
            closeOnClick: false,
            closeButton: false,
            progress: undefined,
            toastId: 'fsToast',
          },
        );
      } else {
        toast.dismiss('fsToast');
      }
    },
    [fullScreenHandle],
  );

  useKeyLogging({ handle: fullScreenHandle, setIsOnFS });
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

  useEffect(() => {
    if (!isMediaPermission) {
      toast.error(
        'Please allow microphone and camera access for the quiz to start',
        {
          position: 'top-right',
          autoClose: false,
          hideProgressBar: true,
          closeOnClick: false,
          closeButton: false,
          progress: undefined,
          toastId: 'mediaToast',
        },
      );
    } else {
      toast.dismiss('mediaToast');
      toast.info('Microphone and Camera access detected!', {
        position: 'top-right',
        autoClose: false,
        hideProgressBar: false,
        closeOnClick: false,
        closeButton: false,
        progress: undefined,
      });
    }
  }, [isMediaPermission]);
  useEffect(() => {
    if (hasLocationAccess) {
      toast.dismiss('locationToast');
      toast.info(
        'Location access detected!',
        {
          position: 'top-left',
          autoClose: false,
          hideProgressBar: false,
          closeOnClick: false,
          closeButton: false,
          progress: undefined
        },
      );
    }
  }, [hasLocationAccess]);
  if (!isOnFS) {
    return (
      <>
        <ToastContainer />
        <MediaAccess
          setIsMediaPermission={setIsMediaPermission}
          hidden={false}
        />
        <FullScreen handle={fullScreenHandle} onChange={reportChange}> 
        </FullScreen>
      </>
    );
  }

  if (!isMediaPermission) {
    return (
      <>
        <ToastContainer />
        <MediaAccess
          setIsMediaPermission={setIsMediaPermission}
          hidden={false}
        />
      </>
    );
  }

  if (!hasLocationAccess) {
    return (
      <>
        <ToastContainer />
        <MediaAccess
          setIsMediaPermission={setIsMediaPermission}
          hidden={false}
        />
      </>
    );
  }
  return (
    <>
      <TimerProvider handleBlur={handleBlur}>
        <ToastContainer />
        <MediaAccess setIsMediaPermission={setIsMediaPermission} hidden={true} />
        <FullScreen handle={fullScreenHandle} onChange={reportChange}>
          <TopNav />
          <WithSidebarWrapper
            sidebarContent={<SideNavContent stage={quizStage} setStage={setQuizStage} />}
          >
            <SectionTopBar />
            {renderQuiz()}
          </WithSidebarWrapper>
        </FullScreen>
      </TimerProvider>
    </>
  )
}

export default giveQuiz
