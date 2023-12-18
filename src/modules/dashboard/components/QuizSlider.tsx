import { Flex } from '@chakra-ui/react'
import { QuizDetails, QuizType } from '../types'
import NoQuizzesCard from './Cards/NoQuizzesCard'
import QuizCard from './Cards/QuizCard'

interface QuizSliderProps {
  data:QuizDetails[]
  type:string
}

const QuizSlider: React.FC<QuizSliderProps> = ({data,type}:QuizSliderProps) => {
  return (
    <Flex zIndex='5'>
      <Flex
        overflowY='scroll'
        gap='1vh'
        backgroundImage='linear-gradient(to right, rgba(255, 255, 255, 0), rgba(255, 255, 255, 0),rgba(255, 255, 255, 0),rgba(255, 255, 255, 0), rgba(255, 255, 255, 0.8))'
      >
        {data.length!=0?data.map((card:QuizDetails, index:number) => (
          <QuizCard title={card.name} key={index} content={card.description} time={card.startDateTimestamp} image={card.bannerImage} btnText={type=QuizType.ongoing?(card.submitted?"Completed":"Start Quiz"):(card.registered?"Registered":"Register")}/>
        )):<NoQuizzesCard/>}
      </Flex>
    </Flex>
  )
}

export default QuizSlider
