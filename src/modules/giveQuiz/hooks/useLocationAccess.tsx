import useLog from '@giveQuiz/api/useLog'
import { LogType } from '@giveQuiz/types'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import displayToast from '@giveQuiz/utils/toastNotifications'

const useLocationAccess = () => {
  const [hasLocationAccess, setHasLocationAccess] = useState(false)
  const { mutate: log } = useLog()
  const { quizId } = useParams() as { quizId: string }
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setHasLocationAccess(true)
          log({
            logType: LogType.Location,
            quizId: quizId,
            location: {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            },
          })
        },
        (error) => {
          console.error(error)
          setHasLocationAccess(false)
          displayToast('Please allow the location access for the quiz to start', {
            position: 'top-left',
            hideProgressBar: true,
            toastId: 'locationToast',
            type: 'error',
          });
          

        },
      )
    } else {
      displayToast('Please allow the location access for the quiz to start', {
        position: 'top-left',
        hideProgressBar: true,
        toastId: 'locationToast',
        type: 'error',
      });
    }
  }, [])
  return { hasLocationAccess }
}

export default useLocationAccess
