import { Modal, ModalContent, ModalOverlay, Text, Button, Flex } from '@chakra-ui/react'
import { useState } from 'react'
import { TimeIcon, CloseIcon } from '@chakra-ui/icons'
import QuizSummaryPie from './QuizSummaryPie'

interface QuizSummaryModalProps {
  open: boolean
  toggleIsOpen: () => void
}

export const QuizSummaryModal = ({ open, toggleIsOpen }: QuizSummaryModalProps) => {
  const [headingText, setHeadingText] = useState('Submit Quiz')
  const [subheadingText, setSubheadingText] = useState('Are you sure you want to submit this quiz?')
  const [color, setColor] = useState('green')

  const handleReturnDashboard = () => {
    // route to dashboard
  }

  return (
    <Modal isOpen={open} onClose={toggleIsOpen} isCentered size={'3xl'}>
      <ModalOverlay />
      <ModalContent padding={6} borderRadius={0}>
        <Flex flexDirection='row' justifyContent='space-between' mb={4}>
          <Text fontSize='1.125rem' fontWeight='600'>
            Quiz Summary
          </Text>
          <CloseIcon
            onClick={toggleIsOpen}
            color='#B3B3B3'
            w={'0.875rem'}
            h={'0.875rem'}
            alignSelf='center'
          />
        </Flex>
        <Flex
          flexDirection='row'
          alignItems='center'
          justifyContent='center'
          w={'full'}
          bg='#e5f4e5'
          px={8}
          py={4}
        >
          <TimeIcon color={color} w={14} h={14} />
          <Flex
            flexDirection='column'
            alignItems='flex-start'
            justifyContent='center'
            w={'full'}
            ml={6}
          >
            <Text fontSize='1.25rem' fontWeight='600' mb={1} color={color}>
              {headingText}
            </Text>
            <Text fontSize='1rem' fontWeight='400' color={color}>
              {subheadingText}
            </Text>
          </Flex>
        </Flex>
        <Flex flexDirection='row' alignItems='center' justifyContent='center' mt={9}>
          <QuizSummaryPie />
        </Flex>
        <Flex flexDirection={'row'} justifyContent='flex-end'>
          <Button
            colorScheme='purple'
            bgColor='brand'
            alignSelf='flex-end'
            mt={4}
            mr={4}
            onClick={handleReturnDashboard}
          >
            Return to Dashboard
          </Button>
        </Flex>
      </ModalContent>
    </Modal>
  )
}
