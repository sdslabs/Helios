import { useState } from 'react'
import WithSidebarWrapper from '../../common/views/WithSidebarWrapper'
import SideNavContent from '../../modules/createQuiz/sideNav'
import { QuizCreationSteps } from '../../modules/createQuiz/types'
import { QuestionDetails, QuizDetails, RegistrationForm, SectionDetails } from '../../modules/createQuiz/forms'
import TopNav from "../../modules/createQuiz/topNav"
import { useRouter } from 'next/router';

const CreateQuiz = () => {
  const [quizStage, setQuizStage] = useState<QuizCreationSteps>(0)
  const router = useRouter();
  const { quizID } = router.query;  
  console.log(quizID)
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
