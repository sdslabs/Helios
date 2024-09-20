import { useEffect } from 'react'
import TopNav from '@common/components/TopNav'
import { Flex } from '@chakra-ui/react'
import DashboardHeader from '@checkQuiz/components/DashboardHeader'
import TabViewDashboard from '@checkQuiz/components/TabViewDashboard'
import { useFetchDashboard } from '@checkQuiz/api/useDashboard'
import { useParams } from 'react-router-dom'
import useCheckQuizStore from '@checkQuiz/store/checkQuizStore'

const CheckQuiz = () => {
  const { quizId } = useParams() as { quizId: string }
  const { data, isFetched } = useFetchDashboard(quizId)
  const [setLeaderboard] = useCheckQuizStore((state) => [state.setLeaderboard])
  const [setSections] = useCheckQuizStore((state) => [state.setSections])
  const [setLeaderboardUserDetails] = useCheckQuizStore((state) => [
    state.setLeaderboardUserDetails,
  ])
  const [setTotalParticipants] = useCheckQuizStore((state) => [state.setTotalParticipants])
  const [setChecksCompleted] = useCheckQuizStore((state) => [state.setChecksCompleted])
  const [setTotalAttempts] = useCheckQuizStore((state) => [state.setTotalAttempts])
  const [setAdmin] = useCheckQuizStore((state) => [state.setAdmin])
  const [setQuizName] = useCheckQuizStore((state) => [state.setQuizName])
  const [setScheduled] = useCheckQuizStore((state) => [state.setScheduled])
  const [setQuizId] = useCheckQuizStore((state) => [state.setQuizId])

  useEffect(() => {
    if (isFetched && data) {
      setLeaderboard(data?.leaderboard[0]?.participants || [])
      setLeaderboardUserDetails(data.users)
      setSections(data.sections)
      setTotalParticipants(data.participants)
      setChecksCompleted(data.checksCompleted)
      setTotalAttempts(data.totalAttempts)
      setAdmin(data.admin)
      setQuizName(data.name)
      setScheduled(data.scheduled)
      setQuizId(quizId)
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
