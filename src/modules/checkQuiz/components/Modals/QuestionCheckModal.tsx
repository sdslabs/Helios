import { Modal, ModalContent, ModalOverlay, Text, Button, Flex } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { TimeIcon, CloseIcon } from '@chakra-ui/icons'
import QuizSummaryPie from '../QuizSummaryPie'
import useCheckQuizStore from '@checkQuiz/store/checkQuizStore'
import { useNavigate } from 'react-router-dom'

interface QuestionsCheckModalProps {
  open: boolean
  toggleIsOpen: () => void
}

export const QuestionsCheckModal = ({ open, toggleIsOpen }: QuestionsCheckModalProps) => {
  const [quizId, allResponsesId] = useCheckQuizStore((state) => [
    state.quizId,
    state.allResponsesId,
  ])

  const [summaryData, setSummaryData] = useState([0, 0, 0, 0])

  useEffect(() => {
    if (allResponsesId.length > 0) {
      setSummaryData([allResponsesId.length, 0, 0, 20])
    }
  }, [allResponsesId])

  const Navigate = useNavigate()

  const handleQuizSubmit = () => {
    Navigate(`/check-quiz/${quizId}`)
  }

  return (
    <Modal isOpen={open} onClose={toggleIsOpen} isCentered size='3xl'>
      <ModalOverlay />
      <ModalContent padding={6} borderRadius={0}>
        <Flex flexDirection='row' justifyContent='space-between' mb={6}>
          <Text fontSize='1.125rem' fontWeight='600'>
            Quiz Checking
          </Text>
          <CloseIcon
            onClick={toggleIsOpen}
            color='crossBlack'
            w='0.875rem'
            h='0.875rem'
            alignSelf='center'
          />
        </Flex>
        <Flex flexDirection='row' alignItems='center' justifyContent='center' mt={9}>
          <QuizSummaryPie summaryData={summaryData} />
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
      </ModalContent>
    </Modal>
  )
}
