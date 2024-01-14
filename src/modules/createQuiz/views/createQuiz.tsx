import { useEffect, useState } from 'react'
import WithSidebarWrapper from '@common/views/WithSidebarWrapper'
import SideNavContent from '../sideNav'
import { QuizCreationSteps } from '../types'
import { QuestionDetails, QuizDetails, RegistrationForm, SectionDetails } from '../forms'
import TopNav from '@common/components/TopNav'
import Registrants from '@createQuiz/forms/Registrants'
import { useParams } from 'react-router-dom'
import { useGetQuizDetails } from '@createQuiz/api/useQuiz'
import { Spinner } from '@chakra-ui/react'
import useQuizDetailsStore from '@createQuiz/store/useQuizDetailsStore'
import useRegistrationFormStore from '@createQuiz/store/useRegistrationFormStore'
import useSectionStore from '@createQuiz/store/useSectionStore'

const CreateQuiz = () => {
  const [quizStage, setQuizStage] = useState<QuizCreationSteps>(0)
  const { quizId } = useParams() as { quizId: string };
  const { data, isLoading } = useGetQuizDetails(quizId)
  const { setDetails, setQuizId } = useQuizDetailsStore((state) => state)
  const setRegistrationForm = useRegistrationFormStore((state) => state.setRegistrationForm)
  const setSections = useSectionStore((state) => state.setSections)
  useEffect(() => {
    if (data) {
      setDetails({...data.quizDetails})
      setRegistrationForm({
        customFields: data?.registrationForm?.customFields ?? [],
      })
      setQuizId(quizId)
      setSections(data?.sectionsDetails ?? [])
    }
  }, [data])

  const renderQuizForm = () => {
    switch (quizStage) {
      case QuizCreationSteps.info:
        return <QuizDetails setQuizStage={setQuizStage}/>
      case QuizCreationSteps.registrationForm:
        return <RegistrationForm setQuizStage={setQuizStage}/>
      case QuizCreationSteps.questions:
      case QuizCreationSteps.sectionDetails:
        return <SectionDetails />
      case QuizCreationSteps.questionDetails:
        return <QuestionDetails />
      case QuizCreationSteps.registrants:
        return <Registrants />
      default:
        return null
    }
  }
  if(isLoading) return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Spinner size='xl' />
    </div>
  )

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
