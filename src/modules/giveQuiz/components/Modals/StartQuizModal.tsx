import CustomInputWithLabel from '@common/components/CustomInputWithLabel'
import { Modal, ModalContent, ModalOverlay, Text, Button, Flex } from '@chakra-ui/react'
import { CloseIcon } from '@chakra-ui/icons'
import { useState } from 'react'
import { useAccessCode } from '@giveQuiz/api/useUser'
import * as io from 'socket.io-client'
import { useTimer } from '../TimerContext'
import { useNavigate } from 'react-router-dom'
import useAuthStore from '@auth/store/authStore'

interface StartModalProps {
  open: boolean
  toggleIsOpen: () => void
  quizId: any
}

export const StartModal = ({ open, toggleIsOpen, quizId }: StartModalProps) => {
  const [accessCode, setAccessCode] = useState('')
  const [isAccessCodeNeeded, setIsAccessCodeNeeded] = useState(true)
  const [canClose, setCanClose] = useState(false)
  const { mutate } = useAccessCode()
  const navigate = useNavigate()
  const { setTimer } = useTimer()
  const user = useAuthStore((state) => state.user)

  async function handleStartQuiz() {
    const body = {
      accessCode: accessCode,
    }
    mutate(
      { quizId, body },
      {
        onSuccess: (data) => {
          if (data) {
            setCanClose(true)
            navigate(`/giveQuiz/${quizId}`)
            const socket = io.connect('http://localhost:4000')
            socket.emit('join_quiz', { quizId: quizId, userId: user.userId })
            socket.on('sendTime', (timeLeft) => {
              setTimer(timeLeft)
            })
          }
        },
      },
    )
  }

  return (
    <Modal
      isOpen={open && !canClose}
      onClose={
        canClose
          ? toggleIsOpen
          : () => {
              console.log("can't close")
            }
      }
      isCentered
    >
      <ModalOverlay />
      <ModalContent padding={6} borderRadius={0}>
        <Flex flexDirection='row' justifyContent='space-between' mb={4}>
          <Text fontSize='1.125rem' fontWeight='600'>
            Start Quiz
          </Text>
          <CloseIcon color='crossBlack' w='0.875rem' h='0.875rem' alignSelf='center' />
        </Flex>
        <Text fontSize='1rem' fontWeight='400' mb={4}>
          Are you sure you want to start this quiz?
        </Text>
        {isAccessCodeNeeded ? (
          <CustomInputWithLabel
            label='Access Code'
            inputProps={{ value: accessCode, onChange: (e) => setAccessCode(e.target.value) }}
          />
        ) : null}
        <Button
          colorScheme='purple'
          bgColor='brand'
          alignSelf='flex-end'
          mt={4}
          onClick={handleStartQuiz}
        >
          Start Quiz
        </Button>
      </ModalContent>
    </Modal>
  )
}
