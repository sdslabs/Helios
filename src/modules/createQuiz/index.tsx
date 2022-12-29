import { Text } from '@chakra-ui/react'
import { useState } from 'react'
import WithSidebarWrapper from '../../common/views/WithSidebarWrapper'
import QuizDetails from './forms/QuizDetails'
import SideNavContent from './sideNav'
import { QuizCreationSteps } from './types'

const CreateQuiz = () => {
  const [quizStage, setQuizStage] = useState<QuizCreationSteps>(0)

  const renderQuizForm = () => {
    switch (quizStage) {
      case QuizCreationSteps.info:
        return <QuizDetails />
      case QuizCreationSteps.registrationForm:
        return <Text>Registration Form</Text>
      case QuizCreationSteps.questions:
        return <Text>Questions</Text>
      default:
        return null
    }
  }

  return (
    <WithSidebarWrapper
      sidebarContent={<SideNavContent stage={quizStage} setStage={setQuizStage} />}
    >
      {renderQuizForm()}
    </WithSidebarWrapper>
  )
}

export default CreateQuiz
