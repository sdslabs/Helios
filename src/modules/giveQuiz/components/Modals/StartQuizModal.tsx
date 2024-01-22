import CustomInputWithLabel from '@common/components/CustomInputWithLabel'
import { Modal, ModalContent, ModalOverlay, ModalCloseButton, Text, Button, Flex } from '@chakra-ui/react'
import { useState } from 'react'
import { useStartQuiz } from '@giveQuiz/api/useUser'
import { useNavigate } from 'react-router-dom'

interface StartModalProps {
  open: boolean
  close: () => void
  quizId: string
}

export const StartModal = ({ open, close, quizId }: StartModalProps) => {
  const [accessCode, setAccessCode] = useState('')
  const [isAccessCodeNeeded, setIsAccessCodeNeeded] = useState(true)
  const [canClose, setCanClose] = useState(false)
  const { mutate } = useStartQuiz()
  const navigate = useNavigate()

  async function handleStartQuiz() {
    mutate(
      { quizId, accessCode },
      {
        onSuccess: (data) => {
          console.log(data)
          if (data) {
            setCanClose(true)
            navigate(`/give-quiz/${quizId}`)
          }
        },
      },
    )
  }

  return (
    <Modal
      isOpen={open}
      onClose={close}
      isCentered
    >
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
          borderRadius={3}
          onClick={handleStartQuiz}
        >
          Start Quiz
        </Button>
      </ModalContent>
    </Modal>
  )
}
