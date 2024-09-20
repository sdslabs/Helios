import React from 'react'
import { Box, Flex, Text, Progress } from '@chakra-ui/react'

interface QuestionCounterProps {
  checkedQuestion: number
  totalQuestions: number
}

const QuestionCounter: React.FC<QuestionCounterProps> = ({ checkedQuestion, totalQuestions }) => {
  if (checkedQuestion === totalQuestions) {
    return (
      <Text fontSize='0.875rem' fontWeight={'600'} color={'answeredBubbleBorder'}>
        COMPLETED
      </Text>
    )
  }

  if (checkedQuestion === 0) {
    return (
      <Text fontSize='0.875rem' fontWeight={'600'} color={'markedForReviewBubbleBorder'}>
        NOT STARTED
      </Text>
    )
  }

  return (
    <Flex flexDirection='column' alignItems='center' width={'7.75rem'}>
      <Text fontSize='0.75rem' alignSelf={'flex-end'} color={'v6'}>
        {checkedQuestion}/{totalQuestions}
      </Text>
      <Box width={'7.75rem'} height={'0.5rem'}>
        <Progress
          value={checkedQuestion}
          max={totalQuestions}
          colorScheme={'purple'} // TODO: Change color scheme
          border={'1px solid'}
          borderRadius={5}
          size='sm'
          borderColor={'v6'}
        />
      </Box>
    </Flex>
  )
}

export default QuestionCounter
