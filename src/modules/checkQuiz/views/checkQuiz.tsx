import { useEffect, useState } from 'react'
import TopNav from '@common/components/TopNav'
import { Box, Button, Flex } from '@chakra-ui/react'
import DashboardHeader from '@checkQuiz/components/DashboardHeader'
import TabViewDashboard from '@checkQuiz/components/TabViewDashboard'
import { useFetchDashboard } from '@checkQuiz/api/useDashboard'
import axios from 'axios'
import giveQuiz from '@checkQuiz/components/giveQuiz/CheckQuestionView'
import { useParams } from 'react-router-dom'
import useCheckQuizStore from '@checkQuiz/store/checkQuizStore'

const CheckQuiz = () => {
  const { quizID } = useParams() as { quizID: string }
  const { data, isLoading, isFetched, refetch, error } = useFetchDashboard(quizID)
  const [leaderboard, setLeaderboard] = useCheckQuizStore((state) => [
    state.leaderboard,
    state.setLeaderboard,
  ])
  const [sections, setSections] = useCheckQuizStore((state) => [state.sections, state.setSections])
  const [totalParticipants, setTotalParticipants] = useCheckQuizStore((state) => [
    state.totalParticipants,
    state.setTotalParticipants,
  ])
  const [checksCompleted, setChecksCompleted] = useCheckQuizStore((state) => [
    state.checksCompleted,
    state.setChecksCompleted,
  ])
  const [totalAttempts, setTotalAttempts] = useCheckQuizStore((state) => [
    state.totalAttempts,
    state.setTotalAttempts,
  ])
  const [admin, setAdmin] = useCheckQuizStore((state) => [state.admin, state.setAdmin])
  const [quizName, setQuizName] = useCheckQuizStore((state) => [state.quizName, state.setQuizName])
  const [scheduled, setScheduled] = useCheckQuizStore((state) => [
    state.scheduled,
    state.setScheduled,
  ])
  const [setQuizID] = useCheckQuizStore((state) => [state.setQuizID])

  useEffect(() => {
    if (isFetched && data) {
      setLeaderboard(data.leaderboard[0].participants)
      setSections(data.sections)
      setTotalParticipants(data.participants)
      setChecksCompleted(data.checksCompleted)
      setTotalAttempts(data.totalAttempts)
      setAdmin(data.admin)
      setQuizName(data.name)
      setScheduled(data.scheduled)
      setQuizID(quizID)
    }
  }, [isFetched, data])

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
          <DashboardHeader />
          <TabViewDashboard />
        </Flex>
      </Flex>
    </>
  )
}

export default CheckQuiz
