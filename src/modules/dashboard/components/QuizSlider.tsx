import { Flex } from '@chakra-ui/react'
import { QuizDetails } from '../types'
import NoQuizzesCard from './Cards/NoQuizzesCard'
import QuizCard from './Cards/QuizCard'

type Props ={
  data:QuizDetails[]
}

const QuizSlider: React.FC<Props> = ({data}:Props) => {
  return (
    <Flex zIndex='5'>
      <Flex
        overflowY='scroll'
        gap='1vh'
        backgroundImage='linear-gradient(to right, rgba(255, 255, 255, 0), rgba(255, 255, 255, 0),rgba(255, 255, 255, 0),rgba(255, 255, 255, 0), rgba(255, 255, 255, 0.8))'
      >
        {data.length!=0?data.map((card:QuizDetails, index:number) => (
          <QuizCard title={card.name} key={index} content={card.description} time={card.startDateTimestamp} image={card.bannerImage}/>
        )):<NoQuizzesCard/>}
      </Flex>
    </Flex>
  )
}

export default QuizSlider
