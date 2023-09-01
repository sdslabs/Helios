import {
  Modal,
  ModalContent,
  ModalOverlay,
  Text,
  Button,
  Flex,
} from '@chakra-ui/react'
// import { LabelModal } from './LabelModal'
import { useState } from 'react'
import { TimeIcon } from '@chakra-ui/icons'
import { QuizSummaryModal } from './QuizSummaryModal'
import QuizSummaryPie from './QuizSummaryPie'

interface SubmitQuizModalProps {
  open: boolean
  toggleIsOpen: () => void
}

export const SubmitQuizModal = ({ open, toggleIsOpen }: SubmitQuizModalProps) => {
  const [headingText, setHeadingText] = useState('You still have 00 : 00 : 00 left')
    const [subheadingText, setSubheadingText] = useState('Are you sure you want to submit ?')
    const [color, setColor] = useState('v5')
    const [isQuizSubmitted, setIsQuizSubmitted] = useState(false)


    const handleQuizSubmit = () => {
        setIsQuizSubmitted(true)
    }

  return (
    <Modal isOpen={open} onClose={toggleIsOpen} isCentered size={'3xl'}>
      <ModalOverlay />
      <ModalContent padding={6} borderRadius={0}>
        <Text fontSize='1.125rem' fontWeight='600' mb={6}>
          Submit Quiz
        </Text>
        <Flex
            flexDirection='row'
            alignItems='center'
            justifyContent='center'
            w={'full'}
            bg='v1'
            px={8}
            py={4}
        >
            <TimeIcon color={color} w={14} h={14}/>
            <Flex flexDirection='column' alignItems='flex-start' justifyContent='center' w={'full'} ml={6}>
            <Text fontSize='1.25rem' fontWeight='600' mb={1} color={color}>
                {headingText}
            </Text>
            <Text fontSize='1rem' fontWeight='400' color={color}>
                {subheadingText}
            </Text>
            </Flex>
        </Flex>
        <Flex flexDirection='row' alignItems='center' justifyContent='center' mt={9}>
        <QuizSummaryPie/>
        </Flex>

        <Flex flexDirection={'row'} justifyContent='flex-end'>
          <Button  variant='outline' color='v6' borderColor='v6' alignSelf='flex-end' mt={4} mr={4} onClick={toggleIsOpen} >
            Cancel
          </Button>
          <Button colorScheme='purple' bgColor='brand' alignSelf='flex-end' mt={4} onClick={handleQuizSubmit}>
            Submit
          </Button>
        </Flex>
      </ModalContent>
    </Modal>
  )
}
