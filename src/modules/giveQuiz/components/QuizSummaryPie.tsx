import { useState } from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend, plugins } from 'chart.js'
import { Pie } from 'react-chartjs-2'
import { background, Box, Flex, Text } from '@chakra-ui/react'

ChartJS.register(ArcElement, Legend)

const options = {
  plugins: {
    legend: {
      display: false,
    },
  },
}

function QuizSummaryPie() {
  const [summaryData, setSummaryData] = useState([20, 70, 10, 20]) // order according to labels
  const [totalQuestions, setTotalQuestions] = useState(100)

  const data = {
    labels: ['Not Visited', 'Answered', 'Marked for Review', 'Answered and Marked for Review'],
    datasets: [
      {
        data: summaryData,
        backgroundColor: ['#AD9EC9', '#27A624', '#FF8900', '#604195'], // pie chart colors
      },
    ],
  }

  return (
    <Flex flexDirection={'row'} alignItems={'center'} justifyContent={'center'} gap='4.5rem'>
      <Box w={'10rem'} h={'10rem'}>
        <Pie data={data} options={options} />
      </Box>
      <Flex flexDirection={'column'} alignItems={'flex-start'} justifyContent={'center'}>
        <Flex flexDirection={'row'} alignItems={'center'} justifyContent={'center'} mb={5}>
          <Text fontSize={'1.25rem'} fontWeight={'400'} color={'accentBlack'}>
            Total number of Questions:&nbsp;
          </Text>
          <Text fontSize={'1.25rem'} fontWeight={'600'} color={'accentBlack'}>
            {totalQuestions}
          </Text>
        </Flex>
        <Flex flexDirection={'row'} alignItems={'center'} justifyContent={'center'} mb={3}>
          <Box
            bgColor={data.datasets[0].backgroundColor[0]}
            w={'1rem'}
            h={'1rem'}
            borderRadius={'20%'}
            alignSelf={'center'}
          />
          <Text fontSize={'0.875rem'} fontWeight={'400'} ml={3} color={'accentBlack'}>
            Not visited:&nbsp;
          </Text>
          <Text fontSize={'0.875rem'} fontWeight={'600'} color={'accentBlack'}>
            {summaryData[0]}
          </Text>
        </Flex>
        <Flex flexDirection={'row'} alignItems={'center'} justifyContent={'center'} mb={3}>
          <Box
            bgColor={data.datasets[0].backgroundColor[1]}
            w={'1rem'}
            h={'1rem'}
            borderRadius={'20%'}
            alignSelf={'center'}
          />
          <Text fontSize={'0.875rem'} fontWeight={'400'} ml={3} color={'accentBlack'}>
            Answered questions:&nbsp;
          </Text>
          <Text fontSize={'0.875rem'} fontWeight={'600'} color={'accentBlack'}>
            {summaryData[1]}
          </Text>
        </Flex>
        <Flex flexDirection={'row'} alignItems={'center'} justifyContent={'center'} mb={3}>
          <Box
            bgColor={data.datasets[0].backgroundColor[2]}
            w={'1rem'}
            h={'1rem'}
            borderRadius={'20%'}
            alignSelf={'center'}
          />
          <Text fontSize={'0.875rem'} fontWeight={'400'} ml={3} color={'accentBlack'}>
            Marked for review:&nbsp;
          </Text>
          <Text fontSize={'0.875rem'} fontWeight={'600'} color={'accentBlack'}>
            {summaryData[2]}
          </Text>
        </Flex>
        <Flex flexDirection={'row'} alignItems={'center'} justifyContent={'center'} mb={3}>
          <Box
            bgColor={data.datasets[0].backgroundColor[3]}
            w={'1rem'}
            h={'1rem'}
            borderRadius={'20%'}
            alignSelf={'center'}
          />
          <Text fontSize={'0.875rem'} fontWeight={'400'} ml={3} color={'accentBlack'}>
            Answered and marked for review:&nbsp;
          </Text>
          <Text fontSize={'0.875rem'} fontWeight={'600'} color={'accentBlack'}>
            {summaryData[3]}
          </Text>
        </Flex>
      </Flex>
    </Flex>
  )
}

export default QuizSummaryPie
