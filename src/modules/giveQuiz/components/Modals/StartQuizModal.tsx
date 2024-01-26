import CustomInputWithLabel from '@common/components/CustomInputWithLabel'
import {
  Modal,
  ModalContent,
  ModalOverlay,
  ModalCloseButton,
  Text,
  Button,
  Flex,
  Alert,
  AlertIcon,
} from '@chakra-ui/react'

import { useState } from 'react'
import { useStartQuiz } from '@giveQuiz/api/useUser'
import { useNavigate } from 'react-router-dom'

interface StartModalProps {
  open: boolean
  close: () => void
  quizId: string
  isAccessCodePresent?: boolean
}

export const StartModal = ({ open, close, quizId, isAccessCodePresent }: StartModalProps) => {
  // TODO: Quiz without access code on starting goes for a blank page.
  const [accessCode, setAccessCode] = useState('')
  const [canClose, setCanClose] = useState(false)
  const [error, setError] = useState('')
  const { mutate } = useStartQuiz()
  const navigate = useNavigate()

  async function handleStartQuiz() {
    mutate(
      { quizId, accessCode },
      {
        onSuccess: (data) => {
          if (data.success) {
            setCanClose(true)
            navigate(`/give-quiz/${quizId}`)
          } else {
            setError(data.message)
          }
        },
      },
    )
  }

  return (
    <Modal isOpen={open} onClose={close} isCentered>
      <ModalOverlay />
      <ModalContent padding={6} borderRadius={0}>
        <Flex flexDirection='row' justifyContent='space-between' mb={4}>
          <Text fontSize='1.125rem' fontWeight='600'>
            Start Quiz
          </Text>
          <ModalCloseButton />
        </Flex>
        <Text fontSize='1rem' fontWeight='400' mb={4}>
          Are you sure you want to start this quiz?
        </Text>
        {isAccessCodePresent && (
          <CustomInputWithLabel
            label='Access Code'
            inputProps={{
              value: accessCode,
              onChange: (e) => (isAccessCodePresent ? setAccessCode(e.target.value) : null),
            }}
          />
        )}
        {error.length > 0 && (
          <Alert mt={4} variant='subtle' status='error'>
            <AlertIcon />
            {error}
          </Alert>
        )}
        <Button
          colorScheme='purple'
          bgColor='brand'
          alignSelf='flex-end'
          mt={4}
          borderRadius={3}
          onClick={handleStartQuiz}
        >
          Start Quiz
        </Button>
      </ModalContent>
    </Modal>
  )
}
