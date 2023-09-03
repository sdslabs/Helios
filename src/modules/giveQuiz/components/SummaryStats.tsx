import { Flex, Box, Text } from '@chakra-ui/react'

interface SummaryStatsProps {
  TotalQuestions: number
  SummaryData: number[]
  BgColor: string[]
}

const SummaryStats = ({ TotalQuestions, SummaryData, BgColor }: SummaryStatsProps) => {
  return (
    <Flex flexDirection='column' alignItems='flex-start' justifyContent='center'>
      <Flex flexDirection='row' alignItems='center' justifyContent='center' mb={5}>
        <Text fontSize='1.25rem' fontWeight='400' color='accentBlack'>
          Total number of Questions:&nbsp;
        </Text>
        <Text fontSize='1.25rem' fontWeight='600' color='accentBlack'>
          {TotalQuestions}
        </Text>
      </Flex>
      <Flex flexDirection='row' alignItems='center' justifyContent='center' mb={3}>
        <Box bgColor={BgColor[0]} w='1rem' h='1rem' borderRadius='20%' alignSelf='center' />
        <Text fontSize='0.875rem' fontWeight='400' ml={3} color='accentBlack'>
          Not visited:&nbsp;
        </Text>
        <Text fontSize='0.875rem' fontWeight='600' color='accentBlack'>
          {SummaryData[0]}
        </Text>
      </Flex>
      <Flex flexDirection='row' alignItems='center' justifyContent='center' mb={3}>
        <Box bgColor={BgColor[1]} w='1rem' h='1rem' borderRadius='20%' alignSelf='center' />
        <Text fontSize='0.875rem' fontWeight='400' ml={3} color='accentBlack'>
          Answered questions:&nbsp;
        </Text>
        <Text fontSize='0.875rem' fontWeight='600' color='accentBlack'>
          {SummaryData[1]}
        </Text>
      </Flex>
      <Flex flexDirection='row' alignItems='center' justifyContent='center' mb={3}>
        <Box bgColor={BgColor[2]} w='1rem' h='1rem' borderRadius='20%' alignSelf='center' />
        <Text fontSize='0.875rem' fontWeight='400' ml={3} color='accentBlack'>
          Marked for review:&nbsp;
        </Text>
        <Text fontSize='0.875rem' fontWeight='600' color='accentBlack'>
          {SummaryData[2]}
        </Text>
      </Flex>
      <Flex flexDirection='row' alignItems='center' justifyContent='center' mb={3}>
        <Box bgColor={BgColor[3]} w='1rem' h='1rem' borderRadius='20%' alignSelf='center' />
        <Text fontSize='0.875rem' fontWeight='400' ml={3} color='accentBlack'>
          Answered and marked for review:&nbsp;
        </Text>
        <Text fontSize='0.875rem' fontWeight='600' color='accentBlack'>
          {SummaryData[3]}
        </Text>
      </Flex>
    </Flex>
  )
}

export default SummaryStats
