import { useState } from 'react'
import TopNav from '@common/components/TopNav'
import { Box, Button, Flex } from '@chakra-ui/react'
import DashboardHeader from '@checkQuiz/components/dashboardHeader'
import TabView from '@checkQuiz/components/tabView'

const CheckQuiz = () => {
  const [quizName, setQuizName] = useState('Maths Quiz')
  const [quizStartTime, setQuizStartTime] = useState(' 26 June 2021, 03:00 PM')
  const [quizAdmin, setQuizAdmin] = useState('Lakshya Shishir')
  const [quizTotalParticipants, setQuizTotalParticipants] = useState(1000)
  const [quizTotalChecks, setQuizTotalChecks] = useState(999)

  return (
    <>
      <TopNav isDashboard isAdmin />
      <Flex flexDirection={'column'} alignItems={'center'}>
        <Flex
          w='80%'
          h='100%'
          flexDirection={'column'}
          justifyContent={'center'}
          alignItems={'center'}
          marginY={'20'}
        >
          <DashboardHeader
            quizName={quizName}
            quizStartTime={quizStartTime}
            quizAdmin={quizAdmin}
            quizTotalParticipants={quizTotalParticipants}
            quizTotalChecks={quizTotalChecks}
          />
          <TabView />
        </Flex>
      </Flex>
    </>
  )
}

export default CheckQuiz
