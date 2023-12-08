import useAuthStore from '@auth/store/authStore'
import { Flex } from '@chakra-ui/react'
import { useDashboard } from '../api/useDashboard'
import AttemptedQuizzesCard from '../components/AttemptedQuizzesCard'
import HostedQuizzesCard from '../components/HostedQuizzesCard'
import Navbar from '../components/Navbar'
import QuizStartedBanner from '../components/QuizStartedBanner'
import QuizTabs from '../components/QuizTabs'

export const Dashboard = () => {
  const {data,isLoading} :any = useDashboard();
  if(isLoading)return(
    <div>Loading</div>
  )
  else
  return (
    <>
      <Navbar />
      <div style={{ paddingLeft: '12.5vw', paddingRight: '12.5vw', paddingTop: '8vh' }}>
        <Flex gap='2.3vh' marginBottom='5vh'>
          <QuizStartedBanner />
          <AttemptedQuizzesCard quantity={data.attemptedQuizzes} />
          <HostedQuizzesCard quantity={data.hostedQuizzes} />
        </Flex>
        <QuizTabs quizzes={data.quizzes} createdQuizzes={data.createdQuizzes}/>
      </div>
    </>
  )
}
