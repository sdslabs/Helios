import { Button, Heading, VStack } from '@chakra-ui/react'
import { PageInfoIcon, PagePersonIcon, RegistrantsOutlinedIcon } from '@common/components/Icons'
import BasicNavButton from '@common/components/BasicNavButton'
import { QuizCreationSteps } from '../types'
import QuestionsNavItem from './QuestionsNavItem'
import useQuizDetailsStore from '@createQuiz/store/useQuizDetailsStore'
import { usePublishQuiz } from '@createQuiz/api/useQuiz'
import { useNavigate } from 'react-router-dom'

interface SideNavContentProps {
  stage: QuizCreationSteps
  setStage: (stage: QuizCreationSteps) => void
}

const SideNavContent = ({ stage, setStage }: SideNavContentProps) => {
  const quizId = useQuizDetailsStore((state) => state.quizId)
  const { mutate: mutatePublishQuiz } = usePublishQuiz()
  // TODO: publish quiz in the backend to check that the quiz is perfect in nature
  // TODO: handle the onSucess and onError also 
  const navigate = useNavigate()
  const handlePublishQuiz = () => {
    mutatePublishQuiz({ quizId }, {
      onSuccess: () => {
        console.log('Quiz published successfully')
        navigate('/')
      },
      onError: () => {
        console.log('Quiz publish failed')
        navigate('/')
      }
    })
  }
  return (
    <>
      <Heading fontSize='xl' color='brand' pl={10} pb={6}>
        Create New Quiz
      </Heading>
      <BasicNavButton
        leftIcon={<PageInfoIcon w={6} h={6} />}
        onClick={() => setStage(0)}
        isActive={stage === 0}
      >
        Quiz Details
      </BasicNavButton>
      <BasicNavButton
        leftIcon={<PagePersonIcon w={6} h={6} />}
        onClick={() => setStage(1)}
        isActive={stage === 1}
      >
        Registration Form
      </BasicNavButton>
      <QuestionsNavItem setStage={setStage} />
      <BasicNavButton
        leftIcon={<RegistrantsOutlinedIcon w={6} h={6}/>}
        onClick={() => setStage(5)} isActive={stage === 5}
      >
        Registrants
      </BasicNavButton>
      <VStack flexGrow={1} justifyContent='flex-end' w='100%' alignItems='stretch'>
        <Button variant='outline' color='v6' borderColor='v6' onClick={handlePublishQuiz}>
          Publish Quiz
        </Button>
      </VStack>
    </>
  )
}

export default SideNavContent
