import { Modal, ModalContent, ModalOverlay, Text, Button, Flex } from '@chakra-ui/react'
import { useState } from 'react'
import { TimeIcon, CloseIcon } from '@chakra-ui/icons'
import QuizSummaryPie from '../QuizSummaryPie'

interface PublishResultModalProps {
  open: boolean
  toggleIsOpen: () => void
  totalAttempts: number
  checkedQuestions: number
}

export const PublishResultModal = ({
  open,
  toggleIsOpen,
  totalAttempts,
  checkedQuestions,
}: PublishResultModalProps) => {
  const isAllChecked = totalAttempts === checkedQuestions
  const [summaryData, setSummaryData] = useState([
    totalAttempts,
    checkedQuestions,
    totalAttempts - checkedQuestions,
    20,
  ])

  const handlePublish = () => {
    toggleIsOpen()
  }

  return (
    <Modal isOpen={open} onClose={toggleIsOpen} isCentered size='3xl'>
      <ModalOverlay />
      <ModalContent padding={6} borderRadius={0}>
        <Flex flexDirection='row' justifyContent='space-between' mb={6}>
          <Text fontSize='1.125rem' fontWeight='600'>
            Publish Quiz Results
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
          bg={isAllChecked ? '#E5F4E5' : 'v1'}
          px={8}
          py={4}
        >
          <TimeIcon color={isAllChecked ? 'answeredBubbleBorder' : 'v5'} w={14} h={14} />
          <Flex
            flexDirection='column'
            alignItems='flex-start'
            justifyContent='center'
            w='full'
            ml={6}
          >
            {isAllChecked ? (
              <Text fontSize='1.25rem' fontWeight='600' mb={1} color='answeredBubbleBorder'>
                You have checked all the submissions
              </Text>
            ) : (
              <Text fontSize='1.25rem' fontWeight='600' mb={1} color='v5'>
                You still have {summaryData[2]} incomplete checks!
              </Text>
            )}
            <Text
              fontSize='1rem'
              fontWeight='400'
              color={isAllChecked ? 'answeredBubbleBorder' : 'v5'}
            >
              Are you sure you want to publish results ?
            </Text>
          </Flex>
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
            onClick={handlePublish}
          >
            Submit
          </Button>
        </Flex>
      </ModalContent>
    </Modal>
  )
}
