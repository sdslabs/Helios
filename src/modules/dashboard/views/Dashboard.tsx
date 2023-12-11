import { Flex, Spinner } from '@chakra-ui/react'
import { useEffect } from 'react'
import { useDashboard } from '../api/useDashboard'
import AttemptedQuizzesCard from '../components/AttemptedQuizzesCard'
import HostedQuizzesCard from '../components/HostedQuizzesCard'
import Navbar from '../components/Navbar'
import QuizStartedBanner from '../components/QuizStartedBanner'
import QuizTabs from '../components/QuizTabs'

const Dashboard = () => {
  const { data, isLoading } = useDashboard();
  return isLoading ? (
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
  ) : (
    <>
      <Navbar />
      <div style={{ paddingLeft: '12.4vw', paddingRight: '12.4vw', paddingTop: '8vh' }}>
        <Flex gap='2.4vh' marginBottom='5vh'>
          <QuizStartedBanner />
          <AttemptedQuizzesCard quantity={data.attemptedQuizzes} />
          <HostedQuizzesCard quantity={data.hostedQuizzes} />
        </Flex>
        <QuizTabs quizzes={data.quizzes} createdQuizzes={data.createdQuizzes} />
      </div>
    </>
  )
}

export default Dashboard
