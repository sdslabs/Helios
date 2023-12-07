import useAuthStore from '@auth/store/authStore'
import { Flex } from '@chakra-ui/react'
import AttemptedQuizzesCard from '../components/AttemptedQuizzesCard'
import HostedQuizzesCard from '../components/HostedQuizzesCard'
import Navbar from '../components/Navbar'
import QuizStartedBanner from '../components/QuizStartedBanner'
import QuizTabs from '../components/QuizTabs'

export const Dashboard = () => {
  const authStore = useAuthStore()
  const attemptedQuantity = 3
  const hostedQuantity = 10
  console.log(authStore)
  return (
    <>
      <Navbar />
      <div style={{ paddingLeft: '12.5vw', paddingRight: '12.5vw', paddingTop: '8vh' }}>
        <Flex gap='2.3vh' marginBottom='5vh'>
          <QuizStartedBanner />
          <AttemptedQuizzesCard quantity={attemptedQuantity} />
          <HostedQuizzesCard quantity={hostedQuantity} />
        </Flex>
        <QuizTabs />
      </div>
    </>
  )
}
