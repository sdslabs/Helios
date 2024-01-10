import { useEffect, useState } from 'react'
import TopNav from '@common/components/TopNav'
import { Box, Button, Flex } from '@chakra-ui/react'
import DashboardHeader from '@checkQuiz/components/DashboardHeader'
import TabViewDashboard from '@checkQuiz/components/TabViewDashboard'
import { useFetchDashboard } from '@checkQuiz/api/useDashboard'
import axios from 'axios'
import giveQuiz from '@checkQuiz/components/giveQuiz/CheckQuestionView'
import { useParams } from 'react-router-dom'

const CheckQuiz = () => {
  const { quizID } = useParams() as { quizID: string }
  const { data, isLoading, isFetched, refetch, error } = useFetchDashboard(quizID)
  console.log('data all ', data, isLoading, isFetched, error, quizID, refetch)
  const [quizDetails, setQuizDetails] = useState({
    admin: '',
    scheduled: '',
    sections: [],
    participants: 0,
    checksCompleted: 0,
    leaderboard: [],
    name: '',
    totalAttempts: 0,
  })

  useEffect(() => {
    setQuizDetails(data)
  }, [data])

  useEffect(() => {
    console.log('Updated quizDetails:', quizDetails)
  }, [quizDetails])

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
            quizName={quizDetails && quizDetails.name}
            quizStartTime={quizDetails && quizDetails.scheduled}
            quizAdmin={quizDetails && quizDetails.admin}
            quizTotalParticipants={quizDetails && quizDetails.participants}
            quizTotalChecks={quizDetails && quizDetails.checksCompleted}
            totalAttempts={quizDetails && quizDetails.totalAttempts}
            checksCompleted={quizDetails && quizDetails.checksCompleted}
          />

          <TabViewDashboard
            quizID={quizID}
            leaderboard={quizDetails && quizDetails.leaderboard}
            sections={quizDetails && quizDetails.sections}
          />
        </Flex>
      </Flex>
    </>
  )
}

export default CheckQuiz
