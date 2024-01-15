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
import useWindowFocus from '@giveQuiz/hooks/useWindowFocus'
import MediaAccess from '@giveQuiz/components/MediaAccess'
import { ToastContainer, toast } from 'react-toastify'
import { Button } from '@chakra-ui/react'

const   giveQuiz = () => {
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
    //TODO: update logs in the database
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

  useKeyLogging({ handle: fullScreenHandle, setIsOnFS});
  useWindowFocus(handleBlur);
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
        <FullScreen handle={fullScreenHandle} onChange={reportChange}>
          <Button onClick={fullScreenHandle.enter}>Enter fullscreen</Button>
          <MediaAccess
            setIsMediaPermission={setIsMediaPermission}
            hidden={false}
          />
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
      <TimerProvider>
        <ToastContainer />
        <MediaAccess setIsMediaPermission={setIsMediaPermission} hidden={true} />
        <FullScreen handle={fullScreenHandle} onChange={reportChange} className="bg-white">
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
