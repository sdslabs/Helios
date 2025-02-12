import Spin from '@common/components/Spinner'
import TopNav from '@common/components/TopNav'
import useAuthStore from '@auth/store/authStore'
import { useEffect } from 'react'
import { useProfilePage } from '../api/useProfilePage'
import useUserDetailsStore from '../store/UserDetailsStore'
import { UserRoles } from '../../types'
import Info from '../components/Info'
import UserQuizzes from '../components/UserQuizzes'
import useQuizDetailsStore from '../store/QuizDetailsStore'
import useSocialHandlesStore from '@auth/store/SocialHandlesStore'

const ProfilePage = () => {
  const { data, isLoading } = useProfilePage()
  const setUserDetails = useUserDetailsStore((state) => state.setDetails)
  const setQuizDetails = useQuizDetailsStore((state) => state.setDetails)
  const setSocialMediaDetails = useSocialHandlesStore((state) => state.updateHandle)
  const { user } = useAuthStore()
  const isAdmin = user.role === UserRoles.admin
  
  const getPlatformLabel = {
    github: 'Github',
    codeforces: 'Code Forces',
    codechef: 'Code Chef',
    linkedin: 'Linkedin',
    instagram: 'Instagram',
    facebook: 'Facebook',
    behance: 'Behance',
    dribble: 'Dribble',
  }

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

  useEffect(() => {
    if (data) {
      data.userDetails.socialHandles.map((socialMedia: any, index: number) => {
        const key: keyof typeof getPlatformLabel = socialMedia.type
        setSocialMediaDetails(index, {
          platformLabel: getPlatformLabel[key],
          platformValue: socialMedia.type,
          link: socialMedia.handle,
        })
      })
    }
  })

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
        <UserQuizzes attemptedQuizzes={attemptedQuizzes} attemptedQuizzesNo={attemptedQuizzesNo} />
      </div>
    </>
  )
}

export default ProfilePage
