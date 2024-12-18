import Spin from '@common/components/Spinner'
import TopNav from '@common/components/TopNav'
import useAuthStore from '@auth/store/authStore'
import { useViewReport } from '../api/useViewReport'
import { useEffect } from 'react'
import Info from '../components/Info'
import QuizTabs from '../components/QuizTabs'
import useQuizDetailsStore from '../store/QuizDetailsStore'
import { UserRoles } from '../../types'
import { useParams } from 'react-router-dom'

const ViewReport = () => {
  const { quizId } = useParams() as { quizId: string }
  const { data, isLoading } = useViewReport({ quizId: quizId })
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
      setQuizDetails(data.quizDetails)
    }
  }, [data])

  return isLoading ? (
    <Spin />
  ) : (
    <>
      <TopNav isDashboard={false} isAdmin={isAdmin} />
      <div style={{ paddingLeft: '12.4vw', paddingRight: '12.4vw', paddingTop: '8vh' }}>
        <Info />
        <QuizTabs />
      </div>
    </>
  )
}

export default ViewReport
