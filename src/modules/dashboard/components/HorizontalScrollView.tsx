import { Flex, Box } from '@chakra-ui/react'
import QuizCard from './QuizCard'
const HorizontalScrollView = () => {
  return (
    <Box overflowX='scroll' bg='white' pt={4} sx={{ '&::-webkit-scrollbar': { display: 'none' } }}>
      <Flex>
        <Box>
          <QuizCard />
        </Box>
        <Box>
          <QuizCard />
        </Box>
        <Box>
          <QuizCard />
        </Box>
        <Box>
          <QuizCard />
        </Box>
        <Box>
          <QuizCard />
        </Box>
        <Box>
          <QuizCard />
        </Box>
        <Box>
          <QuizCard />
        </Box>
        <Box>
          <QuizCard />
        </Box>
        <Box>
          <QuizCard />
        </Box>
      </Flex>
    </Box>
  )
}

export default HorizontalScrollView
