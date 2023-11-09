import useAuthStore from '@auth/store/authStore'
import { Card, Flex, Heading } from '@chakra-ui/react'
import AttemptedQuizzesCard from '../components/AttemptedQuizzesCard'
import HostedQuizzesCard from '../components/HostedQuizzesCard'
import Navbar from '../components/Navbar'
import QuizSlider from '../components/QuizSlider'
import QuizStartedBanner from '../components/QuizStartedBanner'
import QuizTabs from '../components/QuizTabs'

export const Dashboard = () => {
  const authStore = useAuthStore();
  const attemptedQuantity = 3;
  const hostedQuantity = 10;
  console.log(authStore)
  return (
    <>
      <Navbar />
      <div style={{ paddingLeft: '250px', paddingRight: '250px', paddingTop: '79px' }}>
        <Flex gap='23px' marginBottom='50px'>
          <QuizStartedBanner/>
          <AttemptedQuizzesCard quantity={attemptedQuantity}/>
          <HostedQuizzesCard quantity={hostedQuantity}/>
        </Flex>
        <QuizTabs/>
      </div>
    </>
  )
}
