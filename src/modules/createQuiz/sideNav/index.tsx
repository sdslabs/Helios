import {
  Button,
  Heading,
  VStack,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  useDisclosure,
  FormControl,
  Input,
  FormLabel,
  Text,
} from '@chakra-ui/react'
import {
  PageInfoIcon,
  PagePersonIcon,
  RegistrantsOutlinedIcon,
} from '@common/components/Icons'
import BasicNavButton from '@common/components/BasicNavButton'
import { QuizCreationSteps } from '../types'
import QuestionsNavItem from './QuestionsNavItem'
import useQuizDetailsStore from '@createQuiz/store/useQuizDetailsStore'
import { usePublishQuiz, useUpdateQuizDetails } from '@createQuiz/api/useQuiz'
import { useNavigate } from 'react-router-dom'
import { displayErrorToast } from '@giveQuiz/utils/toastNotifications'

interface SideNavContentProps {
  stage: QuizCreationSteps
  setStage: (stage: QuizCreationSteps) => void
}

const SideNavContent = ({ stage, setStage }: SideNavContentProps) => {
  const quizId = useQuizDetailsStore((state) => state.quizId)
  const { mutate: mutatePublishQuiz } = usePublishQuiz()
  const { mutate: mutateUpdateQuizDetails } = useUpdateQuizDetails()
  const navigate = useNavigate()
  const { details, setKey } = useQuizDetailsStore()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { isOpen: isConfirmationOpen, onOpen: onConfirmationOpen, onClose: onConfirmationClose } = useDisclosure()

  const confirmPublishQuiz = () => {
    mutatePublishQuiz(
      { quizId },
    )
    onConfirmationClose()
  }

  const handleSaveDetails = () => {
    const { startDate, startTime, endDate, endTime, duration } = details

    if (!startDate || !startTime || !endDate || !endTime || !duration) {
      displayErrorToast('Please fill in all required fields before saving.')
    } else {
      const updatedFields: Record<string, any> = {}
    
      if (startDate && startTime) {
        updatedFields.startDateTimestamp = new Date(`${startDate} ${startTime}`).getTime()
      }
      if (endDate && endTime) {
        updatedFields.endDateTimestamp = new Date(`${endDate} ${endTime}`).getTime()
      }
      if (duration) {
        updatedFields.duration = parseInt(duration.split(':')[0], 10) * 60 + parseInt(duration.split(':')[1], 10)
      }

      mutateUpdateQuizDetails(
        { quizId, body: updatedFields },
      )
      onClose()
    }
  }

  const handlePublishQuiz = () => {
    const { startDate, startTime, endDate, endTime, duration } = details

    if (!startDate || !startTime || !endDate || !endTime || !duration) {
      onOpen()
    } else {
      onConfirmationOpen()
    }
  }

  return (
    <>
      <Heading fontSize='xl' color='brand' pl={10} pb={6}>
        Create New Quiz
      </Heading>
      <BasicNavButton
        leftIcon={<PageInfoIcon w={6} h={6} />}
        onClick={() => setStage(0)}
        isActive={stage === 0}
      >
        Quiz Details
      </BasicNavButton>
      <BasicNavButton
        leftIcon={<PagePersonIcon w={6} h={6} />}
        onClick={() => setStage(1)}
        isActive={stage === 1}
      >
        Registration Form
      </BasicNavButton>
      <QuestionsNavItem setStage={setStage} />
      <BasicNavButton
        leftIcon={<RegistrantsOutlinedIcon w={6} h={6} />}
        onClick={() => setStage(5)}
        isActive={stage === 5}
      >
        Registrants
      </BasicNavButton>
      <VStack flexGrow={1} justifyContent='flex-end' w='100%' alignItems='stretch'>
        <Button variant='outline' color='v6' borderColor='v6' onClick={handlePublishQuiz}>
          Publish Quiz
        </Button>
      </VStack>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Publish Quiz</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>The quiz is not yet scheduled. Please fill in the details below:</Text>
            <VStack spacing={4} mt={4} color={'gray'}>
              <FormControl>
                <FormLabel>Start Date</FormLabel>
                <Input
                  type="date"
                  value={details.startDate || ''}
                  onChange={(e) => setKey('startDate', e.target.value)}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Start Time</FormLabel>
                <Input
                  type="time"
                  value={details.startTime || ''}
                  onChange={(e) => setKey('startTime', e.target.value)}
                />
              </FormControl>
              <FormControl>
                <FormLabel>End Date</FormLabel>
                <Input
                  type="date"
                  value={details.endDate || ''}
                  onChange={(e) => setKey('endDate', e.target.value)}
                />
              </FormControl>
              <FormControl>
                <FormLabel>End Time</FormLabel>
                <Input
                  type="time"
                  value={details.endTime || ''}
                  onChange={(e) => setKey('endTime', e.target.value)}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Exam Duration</FormLabel>
                <Input
                  placeholder="HH:MM"
                  _placeholder={{ color: 'gray' }}
                  value={details.duration || ''}
                  onChange={(e) => setKey('duration', e.target.value)}
                />
              </FormControl>
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button color='brand' colorScheme='purple' fontWeight='400' variant='outline' onClick={onClose}>
              Cancel
            </Button>
            <Button
              color='white'
              colorScheme='purple'
              bgColor='brand'
              fontWeight='400'
              ml={3}
              onClick={handleSaveDetails}
            >
              Save Details
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Modal isOpen={isConfirmationOpen} onClose={onConfirmationClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Publish Quiz</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>Are you sure you want to publish the quiz?</Text>
          </ModalBody>
          <ModalFooter>
            <Button 
                color='white'
                colorScheme='purple'
                bgColor='brand'
                fontWeight='400' 
                onClick={confirmPublishQuiz}>
              Publish Quiz
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default SideNavContent
