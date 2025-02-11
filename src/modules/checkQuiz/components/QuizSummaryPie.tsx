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

interface QuizSummaryPieProps {
  summaryData: number[]
}

const QuizSummaryPie: React.FC<QuizSummaryPieProps> = ({ summaryData }) => {
  const data = {
    labels: ['Checked', 'Unchecked'],
    datasets: [
      {
        data: summaryData,
        backgroundColor: ['#27A624', '#FF8900'], 
      },
    ],
  }

  return (
    <Flex flexDirection='row' alignItems='center' justifyContent='center' gap='4.5rem'>
      <Box w='10rem' h='10rem'>
        <Pie data={data} options={options} />
      </Box>
      <SummaryStats
        SummaryData={summaryData}
        BgColor={data.datasets[0].backgroundColor}
      />
    </Flex>
  )
}

export default QuizSummaryPie
