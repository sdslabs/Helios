import { Flex, Heading } from '@chakra-ui/react'
import QuizCard from './Cards/QuizCard'
import theme from '@common/theme'
import { Quiz } from '../types'

interface UserQuizzesProps {
  attemptedQuizzes: Quiz[]
  attemptedQuizzesNo: number
}

const UserQuizzes: React.FC<UserQuizzesProps> = ({
  attemptedQuizzes,
  attemptedQuizzesNo,
}: UserQuizzesProps) => {
  return (
    <>
      <Flex padding='2vh'>
        <Heading fontSize='3vh' fontWeight='600' color={theme.colors.v6}>
          Attempted Quizzes
        </Heading>
      </Flex>
      <Flex
        padding='2vh'
        paddingBottom='10vh'
        rowGap='2vh'
        direction={{ base: 'row', sm: 'column' }}
      >
        {attemptedQuizzes.map(
          (quiz: Quiz, index: number) =>
            quiz &&
            quiz._id && (
              <QuizCard
                key={index}
                quizId={quiz._id}
                name={quiz.name}
                description={quiz.description}
                creator={quiz.creator}
                time={quiz.startDateTimestamp}
                image={quiz.bannerImage}
                btnText={quiz.resultsPublished ? 'View Report' : 'unchecked'}
                rank={quiz.rank}
                totalParticipants={quiz.totalParticipants}
              />
            ),
        )}
      </Flex>
    </>
  )
}

export default UserQuizzes
