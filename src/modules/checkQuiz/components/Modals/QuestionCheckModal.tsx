import { Modal, ModalContent, ModalOverlay, Text, Button, Flex } from '@chakra-ui/react'
import { useState } from 'react'
import { TimeIcon, CloseIcon } from '@chakra-ui/icons'
import QuizSummaryPie from '../QuizSummaryPie'

interface QuestionsCheckModalProps {
  open: boolean
  toggleIsOpen: () => void
}

export const QuestionsCheckModal = ({ open, toggleIsOpen }: QuestionsCheckModalProps) => {
  const [isQuizSubmitted, setIsQuizSubmitted] = useState(false)
  const [summaryData, setSummaryData] = useState([20, 10, 5, 5])

  const handleQuizSubmit = () => {
    setIsQuizSubmitted(true)
    // TODO: submit quiz and route to quiz summary modal
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
          <QuizSummaryPie summaryData={summaryData}/>
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
