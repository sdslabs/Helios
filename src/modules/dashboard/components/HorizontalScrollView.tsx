import { Flex, Box } from '@chakra-ui/react'
import QuizCard from './QuizCard'
import QuizCardProps from './QuizCardProps'

interface HorizontalScrollViewProps {
  QuizCards: QuizCardProps[]
}

const HorizontalScrollView = ({ QuizCards }: HorizontalScrollViewProps) => {
  return (
    <Box overflowX='scroll' bg='white' pt={4} sx={{ '&::-webkit-scrollbar': { display: 'none' } }}>
      <Flex>
        {QuizCards.map(({ HeadingText, DescriptionText, StartTime, ButtonText, QuizID }) => (
          <Box key={QuizID}>
            <QuizCard
              HeadingText={HeadingText}
              DescriptionText={DescriptionText}
              StartTime={StartTime}
              ButtonText={ButtonText}
              QuizID={QuizID}
            />
          </Box>
        ))}
      </Flex>
    </Box>
  )
}

export default HorizontalScrollView
