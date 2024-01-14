import { Flex, Spinner } from '@chakra-ui/react'
import TopNav from '@common/components/TopNav'
import { useDashboard } from '../api/useDashboard'
import QuizTabs from '../components/QuizTabs'
import useAuthStore from '@auth/store/authStore'
import Hero from '../components/Hero'
import { UserRoles } from '../../types'
import { TimerProvider } from '@giveQuiz/components/TimerContext'

const Dashboard = () => {
  const { data, isLoading } = useDashboard()
  const { user } = useAuthStore()
  const isAdmin = user.role === UserRoles.admin ? true : false
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
     <TimerProvider>
      <TopNav isDashboard={true} isAdmin={isAdmin} />
      <div style={{ paddingLeft: '12.4vw', paddingRight: '12.4vw', paddingTop: '8vh' }}>
        <Hero
          isAdmin={isAdmin}
          attemptedQuizzes={data.attemptedQuizzes}
          hostedQuizzes={data.hostedQuizzes}
        />
        <QuizTabs isAdmin={isAdmin} quizzes={data.quizzes} createdQuizzes={data.createdQuizzes} />
      </div>
      </TimerProvider>
    </>    
  )
}

export default Dashboard
