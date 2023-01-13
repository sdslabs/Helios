import { useState } from 'react'
import WithSidebarWrapper from '../../common/views/WithSidebarWrapper'
import SideNavContent from './sideNav'
import { QuizCreationSteps } from './types'
import { QuestionDetails, QuizDetails, RegistrationForm, SectionDetails } from './forms'
import TopNav from '../topNav'

const CreateQuiz = () => {
  const [quizStage, setQuizStage] = useState<QuizCreationSteps>(0)

  const renderQuizForm = () => {
    switch (quizStage) {
      case QuizCreationSteps.info:
        return <QuizDetails />
      case QuizCreationSteps.registrationForm:
        return <RegistrationForm />
      case QuizCreationSteps.questions:
      case QuizCreationSteps.sectionDetails:
        return <SectionDetails />
      case QuizCreationSteps.questionDetails:
        return <QuestionDetails />
      default:
        return null
    }
  }

  return (
    <>
      <TopNav />
      <WithSidebarWrapper
        sidebarContent={<SideNavContent stage={quizStage} setStage={setQuizStage} />}
      >
        {renderQuizForm()}
      </WithSidebarWrapper>
    </>
  )
}

export default CreateQuiz
