import React from 'react'
import { Flex, Text } from '@chakra-ui/react'
import HighlightCard from './HighlightCard'

interface CreatedQuizHeaderProps {
  attemptedQuiz: number
  hostedQuiz: number
}

const CreatedQuizHeader: React.FC<CreatedQuizHeaderProps> = ({ attemptedQuiz, hostedQuiz }) => {
  return (
    <Flex flexDirection='row' gap={10}>
      <Flex
        bgColor='v1'
        px={10}
        py={6}
        borderRadius={4}
        width='50rem'
        flexDirection={'column'}
        justifyContent={'center'}
      >
        <Flex flexDirection='column'>
          <Text fontSize='2rem' fontWeight={600} color='v6'>
            Register for a Quiz
          </Text>
          <Text fontSize='1.25rem' color='v6'>
            You have not registered for any quiz
          </Text>
        </Flex>
      </Flex>

      {['Attempted Quizzes', 'Hosted Quizzes'].map((title, index) => (
        <HighlightCard key={index} title={title} value={index === 0 ? attemptedQuiz : hostedQuiz} />
      ))}
    </Flex>
  )
}

export default CreatedQuizHeader
