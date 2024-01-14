import { Flex, Box, Text } from '@chakra-ui/react'
import useQuizStore from '@giveQuiz/store/QuizStore'

interface SummaryStatsProps {
  TotalQuestions: number
  SummaryData: number[]
  BgColor: string[]
}

const SummaryStats = ({ TotalQuestions, SummaryData, BgColor }: SummaryStatsProps) => {
  const answeredQuestions = useQuizStore((state) => state.answeredQuestions)
  const markedAnsweredQuestions = useQuizStore((state) => state.markedAnsweredQuestions)
  const markedQuestions = useQuizStore((state) => state.markedQuestions)
  const totalQuestion = useQuizStore((state) => state.totalQuestion)
  const notVisitedQuestions = totalQuestion - answeredQuestions.length

  return (
    <Flex flexDirection='column' alignItems='flex-start' justifyContent='center'>
      <Flex flexDirection='row' alignItems='center' justifyContent='center' mb={5}>
        <Text fontSize='1.25rem' fontWeight='400' color='accentBlack'>
          Total number of Questions:&nbsp;
        </Text>
        <Text fontSize='1.25rem' fontWeight='600' color='accentBlack'>
          {totalQuestion}
        </Text>
      </Flex>
      <Flex flexDirection='row' alignItems='center' justifyContent='center' mb={3}>
        <Box bgColor={BgColor[0]} w='1rem' h='1rem' borderRadius='20%' alignSelf='center' />
        <Text fontSize='0.875rem' fontWeight='400' ml={3} color='accentBlack'>
          Not visited:&nbsp;
        </Text>
        <Text fontSize='0.875rem' fontWeight='600' color='accentBlack'>
          {notVisitedQuestions}
        </Text>
      </Flex>
      <Flex flexDirection='row' alignItems='center' justifyContent='center' mb={3}>
        <Box bgColor={BgColor[1]} w='1rem' h='1rem' borderRadius='20%' alignSelf='center' />
        <Text fontSize='0.875rem' fontWeight='400' ml={3} color='accentBlack'>
          Answered questions:&nbsp;
        </Text>
        <Text fontSize='0.875rem' fontWeight='600' color='accentBlack'>
          {answeredQuestions.length}
        </Text>
      </Flex>
      <Flex flexDirection='row' alignItems='center' justifyContent='center' mb={3}>
        <Box bgColor={BgColor[2]} w='1rem' h='1rem' borderRadius='20%' alignSelf='center' />
        <Text fontSize='0.875rem' fontWeight='400' ml={3} color='accentBlack'>
          Marked for review:&nbsp;
        </Text>
        <Text fontSize='0.875rem' fontWeight='600' color='accentBlack'>
          {markedQuestions.length}
        </Text>
      </Flex>
      <Flex flexDirection='row' alignItems='center' justifyContent='center' mb={3}>
        <Box bgColor={BgColor[3]} w='1rem' h='1rem' borderRadius='20%' alignSelf='center' />
        <Text fontSize='0.875rem' fontWeight='400' ml={3} color='accentBlack'>
          Answered and marked for review:&nbsp;
        </Text>
        <Text fontSize='0.875rem' fontWeight='600' color='accentBlack'>
          {markedAnsweredQuestions.length}
        </Text>
      </Flex>
    </Flex>
  )
}

export default SummaryStats
