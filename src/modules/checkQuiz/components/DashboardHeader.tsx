import { useState } from 'react'
import { Box, Button, Flex, Text, HStack } from '@chakra-ui/react'
import HighlightCard from './HighlightCard'
import { PublishResultModal } from './Modals/PublishQuizModal'
import useCheckQuizStore from '../store/checkQuizStore'

const DashboardHeader = () => {
  const [isPublishModalOpen, setIsPublishModalOpen] = useState(false)

  const formatDate = (date: string) => {
    const formattedDate = new Date(date).toLocaleString('en-IN', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    })

    return formattedDate.replace(' at', ',')
  }

  const [
    quizName,
    quizAdmin,
    quizStartTime,
    quizTotalParticipants,
    quizTotalChecks,
    totalAttempts,
  ] = useCheckQuizStore((state) => [
    state.quizName,
    state.admin,
    state.scheduled,
    state.totalParticipants,
    state.checksCompleted,
    state.totalAttempts,
  ])

  const togglePublishModal = () => {
    setIsPublishModalOpen(!isPublishModalOpen)
  }

  return (
    <Flex flexDirection='row' gap={10}>
      <Box bgColor='v1' px={10} py={6} borderRadius={4} width='50rem'>
        <Flex flexDirection='column'>
          <Text fontSize='2rem' fontWeight={600} color='v6'>
            {quizName}
          </Text>
          <Text fontSize='1.25rem' color='accentBlack'>
            Scheduled on: {formatDate(quizStartTime || '')}
          </Text>
          <HStack>
            <Text fontSize='1.25rem' color='accentBlack'>
              Created by:{' '}
            </Text>
            <Text fontSize='1.25rem' color='v6'>
              {quizAdmin}
            </Text>
          </HStack>
          <Button
            colorScheme='purple'
            bgColor='brand'
            px={6}
            py={3}
            width='9rem'
            mt={4}
            onClick={togglePublishModal}
          >
            Publish Results
          </Button>
        </Flex>
      </Box>
      <PublishResultModal
        open={isPublishModalOpen}
        toggleIsOpen={togglePublishModal}
        totalAttempts={totalAttempts}
        checkedQuestions={quizTotalChecks}
      />
      {['Total Participating', 'Total Checks'].map((title, index) => (
        <HighlightCard
          key={index}
          title={title}
          value={index === 0 ? quizTotalParticipants : quizTotalChecks}
        />
      ))}
    </Flex>
  )
}

export default DashboardHeader
