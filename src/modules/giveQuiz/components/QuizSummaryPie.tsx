import { useState } from 'react'
import { Chart as ChartJS, ArcElement, Legend } from 'chart.js'
import { Pie } from 'react-chartjs-2'
import { Box, Flex } from '@chakra-ui/react'
import SummaryStats from './SummaryStats'
import useQuizStore from '@giveQuiz/store/QuizStore'

ChartJS.register(ArcElement, Legend)

const options = {
  plugins: {
    legend: {
      display: false,
    },
  },
}

function QuizSummaryPie() {
  const answeredQuestions = useQuizStore((state) => state.answeredQuestions)
  const totalQuestion = useQuizStore((state) => state.totalQuestion)
  const markedQuestions = useQuizStore((state) => state.markedQuestions)
  const markedAnsweredQuestions = useQuizStore((state) => state.markedAnsweredQuestions)
  const [summaryData, setSummaryData] = useState([
    totalQuestion -
      answeredQuestions.length -
      markedQuestions.length -
      markedAnsweredQuestions.length,
    answeredQuestions.length,
    markedQuestions.length,
    markedAnsweredQuestions.length,
  ]) // order according to labels
  const data = {
    labels: ['Unanswered', 'Answered', 'Marked for Review', 'Answered and Marked for Review'],
    datasets: [
      {
        data: summaryData,
        backgroundColor: ['#AD9EC9', '#22C35E', '#ECC94B', '#1DA1F2'], // pie chart colors
      },
    ],
  }

  return (
    <Flex flexDirection='row' alignItems='center' justifyContent='center' gap='4.5rem'>
      <Box w='10rem' h='10rem'>
        <Pie data={data} options={options} />
      </Box>
      <SummaryStats
        TotalQuestions={totalQuestion}
        SummaryData={summaryData}
        BgColor={data.datasets[0].backgroundColor}
      />
    </Flex>
  )
}

export default QuizSummaryPie
