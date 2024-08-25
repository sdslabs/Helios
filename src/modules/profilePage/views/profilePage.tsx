import Spin from '@common/components/Spinner'
import TopNav from '@common/components/TopNav'
import useAuthStore from '@auth/store/authStore'
import { useEffect } from 'react'
import { useProfilePage } from '../api/useProfilePage'
import useUserDetailsStore from '../store/UserDetailsStore'
import { UserRoles } from '../../types'
import Info from '../components/Info'
import UserQuizzes from '../components/UserQuizzes'
import { useParams } from 'react-router-dom'
import useQuizDetailsStore from '../store/QuizDetailsStore'

const ProfilePage = () => {
  const { data, isLoading } = useProfilePage()
  const setUserDetails = useUserDetailsStore((state) => state.setDetails)
  const setQuizDetails = useQuizDetailsStore((state) => state.setDetails)
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
      setUserDetails(data.userDetails)
    }
  }, [data])

  useEffect(() => {
    if (data) {
      setQuizDetails(data.quizzes)
    }
  }, [data])

  const { attemptedQuizzes, attemptedQuizzesNo } = useQuizDetailsStore((state) => {
    return { attemptedQuizzes: state.quizzes, attemptedQuizzesNo: state.attemptedQuizzes }
  })

  return isLoading ? (
    <Spin />
  ) : (
    <>
      <TopNav isDashboard={false} isAdmin={isAdmin} />
      <div style={{ paddingLeft: '12.4vw', paddingRight: '12.4vw', paddingTop: '8vh' }}>
        <Info />
        <UserQuizzes attemptedQuizzes={attemptedQuizzes} attemptedQuizzesNo={attemptedQuizzesNo}/>
      </div>
    </>
  )
}

export default ProfilePage
