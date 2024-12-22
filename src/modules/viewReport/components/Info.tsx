import useQuizDetailsStore from '../store/QuizDetailsStore'
import { Flex } from '@chakra-ui/react'
import QuizDetailsCard from './Cards/QuizDetailsCard'
import NumberCard from './Cards/NumberCard'

const Info: React.FC = () => {
  const {
    quizName,
    creator,
    DateOfQuiz,
    DateOfResult,
    rank,
    marks,
    totalParticipants,
    totalMarks,
  } = useQuizDetailsStore((state) => {
    return {
      quizName: state.quizName,
      creator: state.creator,
      DateOfQuiz: state.dateOfQuiz,
      DateOfResult: state.dateOfResult,
      rank: state.rank,
      marks: state.marks,
      totalParticipants: state.totalParticipants,
      totalMarks: state.totalMarks,
    }
  })

  return (
    <Flex paddingBottom='3vh' justifyContent='space-between'>
      <Flex>
        <QuizDetailsCard
          quizName={quizName}
          creator={creator}
          DateOfQuiz={DateOfQuiz}
          DateOfResult={DateOfResult}
        />
      </Flex>
      <Flex paddingTop='2vh'>
        <NumberCard type='rank' quantity={rank} total={totalParticipants} />
      </Flex>
      <Flex paddingTop='2vh'>
        <NumberCard type='marks' quantity={marks} total={totalMarks} />
      </Flex>
    </Flex>
  )
}

export default Info
