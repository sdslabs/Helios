import {  Text, Button, Flex, Box } from '@chakra-ui/react'
import { useState, useEffect } from 'react'
import { TimeIcon, CloseIcon } from '@chakra-ui/icons'
import QuizSummaryPie from '../QuizSummaryPie'
import * as io from 'socket.io-client'
import { useParams, useNavigate } from 'react-router-dom'
import { useSubmitQuiz } from '../../api/useUser'
import useQuizStore from '@giveQuiz/store/QuizStore'
import { reactAppURL } from '../../../../config/config'
import { useQueryClient } from '@tanstack/react-query'
import { stopMedia } from '@giveQuiz/utils/mediaControls'

interface SubmitQuizModalProps {
  open: boolean
  toggleIsOpen: () => void
}

export const SubmitQuizModal = ({ open, toggleIsOpen }: SubmitQuizModalProps) => {
  const queryClient = useQueryClient()
  const [timeLeft, setTimeLeft] = useState('00 : 00 : 00')
  const [isQuizSubmitted, setIsQuizSubmitted] = useState(false)
  const timer = useQuizStore((state) => state.timer)
  const { quizId } = useParams()
  const { mutate } = useSubmitQuiz()
  const navigate = useNavigate();

  const handleQuizSubmit = async () => {
    if (quizId) {
      mutate(quizId, {
        onSuccess: () => {
          stopMedia()
          setIsQuizSubmitted(true)
          queryClient.invalidateQueries({ exact: true, queryKey: ['dashboard'] })
          queryClient.invalidateQueries({ exact: true, queryKey: ['quiz', quizId] })
          navigate(`${reactAppURL}/dashboard`);
        },
      })
    }
  }

  function convertMillisecondsToTime(milliseconds: number): string {
    const totalSeconds = Math.floor(milliseconds / 1000)
    const seconds = String(totalSeconds % 60).padStart(2, '0')
    const totalMinutes = Math.floor(totalSeconds / 60)
    const minutes = String(totalMinutes % 60).padStart(2, '0')
    const totalHours = Math.floor(totalMinutes / 60)
    const hours = String(totalHours % 24).padStart(2, '0')

    return `${hours}:${minutes}:${seconds}`
  }

  useEffect(() => {
    setTimeLeft(convertMillisecondsToTime(timer))
  }, [timer])

  return (
    <>
      {open ? (
        <Flex
          pos='fixed'
          w='100vw'
          h='100vh'
          justify='center'
          align='center'
          top={0}
          left={0}
          bg='rgba(0, 0, 0, 0.5)'
        >
          <Box minW={'40vw'} bg='white' p={6} boxShadow='xl' borderRadius={8}>
            <Flex flexDirection='row' justifyContent='space-between' mb={6}>
              <Text fontSize='1.125rem' fontWeight='600'>
                Submit Quiz
              </Text>
              <CloseIcon
                onClick={toggleIsOpen}
                color='crossBlack'
                w='0.875rem'
                h='0.875rem'
                alignSelf='center'
              />
            </Flex>
            <Flex
              flexDirection='row'
              alignItems='center'
              justifyContent='center'
              w='full'
              bg='v1'
              px={8}
              py={4}
            >
              <TimeIcon color='v5' w={14} h={14} />
              <Flex
                flexDirection='column'
                alignItems='flex-start'
                justifyContent='center'
                w='full'
                ml={6}
              >
                <Text fontSize='1.25rem' fontWeight='600' mb={1} color='v5'>
                  You still have {timeLeft} left
                </Text>
                <Text fontSize='1rem' fontWeight='400' color='v5'>
                  Are you sure you want to submit ?
                </Text>
              </Flex>
            </Flex>
            <Flex flexDirection='row' alignItems='center' justifyContent='center' mt={9}>
              <QuizSummaryPie />
            </Flex>

            <Flex flexDirection='row' justifyContent='flex-end'>
              <Button
                variant='outline'
                color='v6'
                borderColor='v6'
                alignSelf='flex-end'
                mt={4}
                mr={4}
                onClick={toggleIsOpen}
              >
                Cancel
              </Button>
              <Button
                colorScheme='purple'
                bgColor='brand'
                alignSelf='flex-end'
                mt={4}
                onClick={handleQuizSubmit}
              >
                Submit
              </Button>
            </Flex>
          </Box>
        </Flex>
      ) : null}
    </>
  )
}
