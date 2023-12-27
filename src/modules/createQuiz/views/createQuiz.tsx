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
import { IQuizDetails, IRegistrationForm } from '@giveQuiz/types'

const CreateQuiz = () => {
  const [quizStage, setQuizStage] = useState<QuizCreationSteps>(0)
  const { quizId } = useParams() as { quizId: string };
  const { data, isLoading } = useGetQuizDetails(quizId)
  const [quizDetails, setQuizDetails] = useState<IQuizDetails>({
    name: '',
    managers: [],
    description: '',
    instructions: '',
    startDate: '',
    startTime: '',
    endDate: '',
    endTime: '',
    duration: '',
    accessCode: '',
    bannerImage: '',
  })
  const [registrationForm, setRegistrationForm] = useState<IRegistrationForm>({
    customFields: [],
  })
  useEffect(() => {
    if (data) {
      console.log(data);
      setQuizDetails({...data.quizDetails})
      setRegistrationForm({
        customFields: data.registrationForm.customFields ?? [],
      })
    }
  }, [data])
  useEffect(() => {
    console.log('Updated quizDetails:', quizDetails);
  }, [quizDetails]);

  const renderQuizForm = () => {
    switch (quizStage) {
      case QuizCreationSteps.info:
        return <QuizDetails details={quizDetails} setDetails={setQuizDetails} quizId={quizId}/>
      case QuizCreationSteps.registrationForm:
        return <RegistrationForm form={registrationForm} setForm={setRegistrationForm}/>
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
