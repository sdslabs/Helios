import { useState, useEffect } from 'react'
import { TimeIcon } from '@chakra-ui/icons'
import { Flex } from '@chakra-ui/react'
import { useTimer } from './TimerContext'
import { useParams, useNavigate } from 'react-router-dom'
import useQuizStore from '@giveQuiz/store/QuizStore'
import { QuizSummaryModal } from './Modals/QuizSummaryModal'
import { useSubmitQuiz } from '@giveQuiz/api/useUser'
import * as io from 'socket.io-client'
import { baseURL, reactAppURL } from '../../../config/config'
import { useQueryClient } from '@tanstack/react-query'

const socket = io.connect(`${baseURL}`)

function Countdown() {
  const { timerValue } = useTimer()
  const queryClient = useQueryClient()
  const [duration, setDuration] = useState(0)
  const [countHours, setCountHours] = useState('00')
  const [countMinutes, setCountMinutes] = useState('00')
  const [countSeconds, setCountSeconds] = useState('00')
  const { setTimer } = useQuizStore()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { mutate } = useSubmitQuiz()
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen)
  }
  const { quizId } = useParams()
  const navigate = useNavigate();

  useEffect(() => {
    setDuration((prevDuration) => (timerValue !== null ? timerValue : prevDuration))
  }, [timerValue])

  useEffect(() => {
    const interval = setInterval(() => {
      const seconds = Math.floor((duration / 1000) % 60)
      const minutes = Math.floor((duration / 1000 / 60) % 60)
      const hours = Math.floor((duration / (1000 * 60 * 60)) % 24)

      if (duration <= 0) {
        clearInterval(interval)
      } else {
        setCountHours(hours.toString().padStart(2, '0'))
        setCountMinutes(minutes.toString().padStart(2, '0'))
        setCountSeconds(seconds.toString().padStart(2, '0'))
        setDuration((prevDuration) => (prevDuration !== null ? prevDuration - 1000 : prevDuration))
        if (duration <= 1000) {
          socket.disconnect()
          if (quizId) {
            mutate(quizId, {
              onSuccess: () => {
                queryClient.invalidateQueries({ exact: true, queryKey: ['dashboard'] })
                queryClient.invalidateQueries({ exact: true, queryKey: ['quiz', quizId] })
                navigate(`${reactAppURL}/dashboard`);
              },
            })
          }
          clearInterval(interval)
        }
        setTimer(duration)
      }
    }, 1000)
    return () => clearInterval(interval)
  }, [duration])

  return (
    <Flex bgColor='v1' justifyContent='center' alignItems='center' gap='0.3rem' height='100%'>
      <div style={{ display: 'flex', alignItems: 'center', whiteSpace: 'nowrap' }}>
        <TimeIcon color='v6' style={{ marginRight: '0.5rem' }} />
        {countHours === '00' && countMinutes === '00' && countSeconds === '00' ? (
          <span> Loading</span>
        ) : (
          <span>{`${countHours} : ${countMinutes} : ${countSeconds}`}</span>
        )}
      </div>
      <QuizSummaryModal open={isModalOpen} toggleIsOpen={toggleModal} />
    </Flex>
  )
}

export default Countdown
