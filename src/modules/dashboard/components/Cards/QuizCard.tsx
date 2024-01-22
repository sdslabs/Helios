import React, { useState } from 'react'
import {
  Card,
  CardBody,
  Image,
  Stack,
  Heading,
  Text,
  Button,
  Flex,
  useDisclosure,
} from '@chakra-ui/react'
import { ButtonType } from '../../types'
import { StartModal } from '@giveQuiz/components/Modals/StartQuizModal'
import { RegisterModal } from '../RegisterModal'
import useQuizStore from '@giveQuiz/store/QuizStore'
import { useNavigate } from 'react-router-dom'
import defaultQuizBg from '@assets/images/default-quiz-bg.png'

interface QuizCardProps {
  title: string
  registered: boolean
  content: string
  time: Date
  image: string
  btnText: string
  quizId?: any
  registrationMetadata?: any
}

const QuizCard: React.FC<QuizCardProps> = ({
  title,
  content,
  time,
  image,
  btnText,
  quizId,
  registrationMetadata,
}: QuizCardProps) => {
  const formattedTime = new Intl.DateTimeFormat('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
    timeZone: 'IST',
  }).format(new Date(time))

  const {
    isOpen: isStartModalOpen,
    onOpen: onStartModalOpen,
    onClose: onStartModalClose,
  } = useDisclosure()

  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false)
  const toggleRegisterModal = () => {
    setIsRegisterModalOpen(!isRegisterModalOpen)
  }
  const navigate = useNavigate()

  const handleClick = () => {
    if (btnText == ButtonType.start) {
      onStartModalOpen()
    }
    if (btnText === ButtonType.register) {
      setIsRegisterModalOpen(true)
    }
  }

  return (
    <>
      <Card
        flexShrink={0}
        direction={{ base: 'column', sm: 'row' }}
        padding={4}
        variant='outline'
        my={4}
        width='48rem'
      >
        <Image
          src={image ? image : defaultQuizBg}
          alt='Quiz Banner'
          objectFit='cover'
          borderRadius={4}
          minW='36%'
        />
        <Stack>
          <CardBody>
            <Flex gap={2} alignItems='center'>
              <Heading size='sm' textTransform='capitalize'>
                {title}
              </Heading>
            </Flex>
            <Text pt='2' color='n6'>
              {content}
            </Text>
            <Text pt='2' color='n6'>
              Schedule : <span style={{ color: '#191919' }}> {formattedTime} </span>
            </Text>

            <Button
              colorScheme='purple'
              bgColor='brand'
              px={6}
              borderRadius={3}
              size={'sm'}
              mt={4}
              isDisabled={btnText === ButtonType.completed || btnText === ButtonType.registered}
              onClick={handleClick}
            >
              {btnText}
              <StartModal open={isStartModalOpen} close={onStartModalClose} quizId={quizId} />
              <RegisterModal
                open={isRegisterModalOpen}
                toggleIsOpen={toggleRegisterModal}
                quizId={quizId}
                additionalDetails={registrationMetadata.customFields}
              />
            </Button>
          </CardBody>
        </Stack>
      </Card>
    </>
  )
}

export default QuizCard
