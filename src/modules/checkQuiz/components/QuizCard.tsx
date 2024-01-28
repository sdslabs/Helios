import { Box, Button, Flex, HStack, Text, Badge } from '@chakra-ui/react'
import PropTypes from 'prop-types'

interface QuizCardProps {
  quizName: string
  quizStartTime: string
  quizDescription: string
  quizIcon: string
  quizId: string
}

const QuizCard: React.FC<QuizCardProps> = ({
  quizName,
  quizStartTime,
  quizDescription,
  quizIcon,
  quizId,
}) => {
  return (
    <Box p={4} borderRadius={2} border={'1px'} borderColor={'v1'}>
      <Flex flexDirection='row' gap={4}>
        <Box width={'12rem'}>
          <img
            src={'https://i.postimg.cc/G3JzmVBr/Group-1198.png'}
            alt='quiz icon'
            style={{ height: '100%', objectFit: 'cover' }}
          />
        </Box>
        <Flex flexDirection='column'>
          <Flex flexDirection='row' gap={2} mb={'0.62rem'} alignItems={'center'}>
            <Text fontSize='1rem' fontWeight={650} color='accentBlack'>
              {quizName}
            </Text>
            <Badge
              color={'markedForReviewBubbleBorder'}
              py={'0.25rem'}
              px={'0.62rem'}
              style={{
                borderRadius: '0.25rem',
                fontSize: '0.875rem',
                backgroundColor: 'markedForReviewBubbleBorder',
              }}
            >
              Completed
            </Badge>
            <Badge
              color={'#775BA4'}
              py={'0.25rem'}
              px={'0.62rem'}
              style={{ borderRadius: '0.25rem', fontSize: '0.875rem', backgroundColor: 'v1' }}
            >
              Result Published
            </Badge>
          </Flex>
          <Text fontSize='0.875rem' color='N6' mb={'0.5rem'}>
            {quizDescription}
          </Text>
          <HStack mb={'0.62rem'}>
            <Text fontSize='0.875rem' color='N6'>
              Scheduled:
            </Text>
            <Text fontSize='0.875rem' color='accentBlack'>
              {quizStartTime}
            </Text>
          </HStack>
          <Button colorScheme='purple' bgColor='brand' px={6} py={'0.875rem'} width='9rem'>
            Check Quiz
          </Button>
        </Flex>
      </Flex>
    </Box>
  )
}

QuizCard.propTypes = {
  quizName: PropTypes.string.isRequired,
  quizStartTime: PropTypes.string.isRequired,
  quizDescription: PropTypes.string.isRequired,
  quizIcon: PropTypes.string.isRequired,
  quizId: PropTypes.string.isRequired,
}

export default QuizCard
