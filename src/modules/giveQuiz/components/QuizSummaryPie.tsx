import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Pie } from 'react-chartjs-2'
import { Box, Flex, Text } from '@chakra-ui/react'

ChartJS.register(ArcElement, Legend)

export const data = {
  labels: [
    'Not visited',
    'Answered questions',
    'Marked for review',
    'Answered and marked for review',
  ],
  datasets: [
    {
      data: [20, 70, 10, 20],
      backgroundColor: ['#AD9EC9', '#27A624', '#FF8900', '#604195'],
    },
  ],
}

function QuizSummaryPie() {
  return (
    <Flex flexDirection={'row'} alignItems={'center'} justifyContent={'center'} gap='4.5rem'>
        <Box w={'10rem'} h={'10rem'} >
      <Pie data={data} />
        </Box>
        <Flex flexDirection={'column'} alignItems={'flex-start'} justifyContent={'center'}>
            <Flex flexDirection={'row'} alignItems={'center'} justifyContent={'center'} mb={5}>
            <Text fontSize={'1.25rem'} fontWeight={'400'} color={'accentBlack'}>
                Total number of Questions:&nbsp;
            </Text>
            <Text fontSize={'1.25rem'} fontWeight={'600'} color={'accentBlack'}>
                100%
            </Text>
            </Flex>
            <Flex flexDirection={'row'} alignItems={'center'} justifyContent={'center'} mb={3}>
            <Box bgColor={'#AD9EC9'} w={'1rem'} h={'1rem'} borderRadius={'20%'} alignSelf={'center'} />
            <Text fontSize={'0.875rem'} fontWeight={'400'} ml={3} color={'accentBlack'}>
            Not visited:&nbsp;
            </Text>
            <Text fontSize={'0.875rem'} fontWeight={'600'} color={'accentBlack'}>
            20%
            </Text>
            </Flex>
            <Flex flexDirection={'row'} alignItems={'center'} justifyContent={'center'} mb={3}>
            <Box bgColor={'#27A624'} w={'1rem'} h={'1rem'} borderRadius={'20%'} alignSelf={'center'} />
            <Text fontSize={'0.875rem'} fontWeight={'400'} ml={3} color={'accentBlack'}>
            Answered questions:&nbsp;
            </Text>
            <Text fontSize={'0.875rem'} fontWeight={'600'} color={'accentBlack'} >
            70%
            </Text>
            </Flex>
            <Flex flexDirection={'row'} alignItems={'center'} justifyContent={'center'} mb={3}>
            <Box bgColor={'#FF8900'} w={'1rem'} h={'1rem'} borderRadius={'20%'} alignSelf={'center'} />
            <Text fontSize={'0.875rem'} fontWeight={'400'} ml={3} color={'accentBlack'}>
            Marked for review:&nbsp;
            </Text>
            <Text fontSize={'0.875rem'} fontWeight={'600'} color={'accentBlack'}>
            10%
            </Text>
            </Flex>
            <Flex flexDirection={'row'} alignItems={'center'} justifyContent={'center'} mb={3}>
            <Box bgColor={'#604195'} w={'1rem'} h={'1rem'} borderRadius={'20%'} alignSelf={'center'} />
            <Text fontSize={'0.875rem'} fontWeight={'400'} ml={3} color={'accentBlack'}>
            Answered and marked for review:&nbsp;
            </Text>
            <Text fontSize={'0.875rem'} fontWeight={'600'} color={'accentBlack'}>
            20%
            </Text>
            </Flex>
        </Flex>
    </Flex>
  )
}

export default QuizSummaryPie
