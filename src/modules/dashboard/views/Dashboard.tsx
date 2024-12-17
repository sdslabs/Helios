import Spin from '@common/components/Spinner';
import TopNav from '@common/components/TopNav'
import { useDashboard } from '../api/useDashboard'
import QuizTabs from '../components/QuizTabs'
import useAuthStore from '@auth/store/authStore'
import Hero from '../components/Hero'
import { UserRoles } from '../../types'
import useUserDetailsStore from '@dashboard/store/UserDetailsStore'
import { useEffect } from 'react'

const Dashboard = () => {
  const { data, isLoading,refetch } = useDashboard()
  const setDetails = useUserDetailsStore((state) => state.setDetails)
  const { user } = useAuthStore()
  const isAdmin = user.role === UserRoles.admin
  navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((stream) => {
    stream.getTracks().forEach((track) => {
      track.stop()
      track.enabled = false
    })
  })

  useEffect(() => {
    if (data) {
      setDetails(data.userDetails)
      refetch()
    }
  }, [])

  return isLoading ? (
    <Spin />
  ) : (
    <>
      <TopNav isDashboard={true} isAdmin={isAdmin} />
      <div style={{ paddingLeft: '12.4vw', paddingRight: '12.4vw', paddingTop: '8vh' }}>
        <Hero
          isAdmin={isAdmin}
          attemptedQuizzes={data.attemptedQuizzes}
          hostedQuizzes={data.hostedQuizzes}
        />
        <QuizTabs isAdmin={isAdmin} quizzes={data.quizzes} createdQuizzes={data.createdQuizzes} />
      </div>
    </>
  )
}

export default Dashboard
