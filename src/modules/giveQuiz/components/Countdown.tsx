import { memo, useCallback, useState, useEffect } from 'react'
import { TimeIcon } from '@chakra-ui/icons'
import { Flex } from '@chakra-ui/react'
import { useTimer } from './TimerContext'
import { useParams, useNavigate } from 'react-router-dom'
import useQuizStore from '@giveQuiz/store/QuizStore'
import { QuizSummaryModal } from './Modals/QuizSummaryModal'
import { useSubmitQuiz } from '@giveQuiz/api/useUser'
import { useQueryClient } from '@tanstack/react-query'
import { useCountdown } from '../hooks/useCountdown'

const Countdown = memo(() => {
  const { timerValue } = useTimer()
  const queryClient = useQueryClient()
  const { setTimer } = useQuizStore()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { mutate } = useSubmitQuiz()
  const { quizId } = useParams()
  const navigate = useNavigate()

  const handleComplete = useCallback(() => {
    if (quizId) {
      mutate(quizId, {
        onSuccess: () => {
          queryClient.invalidateQueries({ exact: true, queryKey: ['dashboard'] })
          queryClient.invalidateQueries({ exact: true, queryKey: ['quiz', quizId] })
          navigate(`/dashboard`)
        },
      })
    }
  }, [quizId, mutate, queryClient, navigate])

  const { hours, minutes, seconds } = useCountdown(timerValue, handleComplete)
  
  const toggleModal = useCallback(() => {
    setIsModalOpen(prev => !prev)
  }, [])

  useEffect(() => {
    if (timerValue !== null) {
      setTimer(timerValue)
    }
  }, [timerValue, setTimer])

  return (
    <Flex bgColor='v1' justifyContent='center' alignItems='center' gap='0.3rem' height='100%'>
      <div style={{ display: 'flex', alignItems: 'center', whiteSpace: 'nowrap' }}>
        <TimeIcon color='v6' style={{ marginRight: '0.5rem' }} />
        {hours === '00' && minutes === '00' && seconds === '00' ? (
          <span>Loading</span>
        ) : (
          <span>{`${hours} : ${minutes} : ${seconds}`}</span>
        )}
      </div>
      <QuizSummaryModal open={isModalOpen} toggleIsOpen={toggleModal} />
    </Flex>
  )
})

Countdown.displayName = 'Countdown'

export default Countdown