import { Flex } from '@chakra-ui/react'
import { ButtonType, QuizDetails, QuizType } from '../types'
import NoQuizzesCard from './Cards/NoQuizzesCard'
import QuizCard from './Cards/QuizCard'

interface QuizSliderProps {
  data: QuizDetails[]
  type: string
}

const QuizSlider: React.FC<QuizSliderProps> = ({ data, type }: QuizSliderProps) => {
  return (
    <Flex
      overflowX='scroll'
      gap={4}
      css={{
        scrollbarWidth: 'none',
        msOverflowStyle: 'none',
        '&::-webkit-scrollbar': {
          display: 'none',
        },
      }}
    >
      {data?.length != 0 ? (
        data.map((card: QuizDetails, index: number) => (
          <QuizCard
            title={card.name}
            quizId={card._id}
            registered={card.registered}
            key={index}
            content={card.description}
            time={card.startDateTimestamp}
            image={card.bannerImage}
            registrationMetadata={card.registrationMetadata}
            btnText={
              type == QuizType.ongoing
                ? card.submitted
                  ? ButtonType.completed
                  : ButtonType.start
                : card.registered
                ? ButtonType.registered
                : ButtonType.register
            }
          />
        ))
      ) : (
        <NoQuizzesCard />
      )}
    </Flex>
  )
}

export default QuizSlider
