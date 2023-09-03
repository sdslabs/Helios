import { useState } from 'react'
import { Chart as ChartJS, ArcElement, Legend } from 'chart.js'
import { Pie } from 'react-chartjs-2'
import { Box, Flex } from '@chakra-ui/react'
import SummaryStats from './SummaryStats'

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
    <Flex flexDirection='row' alignItems='center' justifyContent='center' gap='4.5rem'>
      <Box w='10rem' h='10rem'>
        <Pie data={data} options={options} />
      </Box>
      <SummaryStats
        TotalQuestions={totalQuestions}
        SummaryData={summaryData}
        BgColor={data.datasets[0].backgroundColor}
      />
    </Flex>
  )
}

export default QuizSummaryPie
