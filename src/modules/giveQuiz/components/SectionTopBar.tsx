import { useState } from 'react'
import { HStack, Box } from '@chakra-ui/react'
import Countdown from './Countdown'
import Bubble from './Bubble'

const SectionTopBar = () => {
  const [notVisitedQuestions, setNotVisitedQuestions] = useState(0)
  const [markedForReviewQuestions, setMarkedForReviewQuestions] = useState(0)
  const [answeredQuestions, setAnsweredQuestions] = useState(0)
  const [answeredAndMarkedForReviewQuestions, setAnsweredAndMarkedForReviewQuestions] = useState(0)

  return (
    <HStack
      top={0}
      id='top-nav'
      bg='white'
      justifyContent='space-between'
      position='sticky'
      width='100%'
      borderBottom='1px solid #F1EEF5'
      height='100%'
    >
      <HStack spacing='2.5rem' height='100%' px={12} py={3}>
        <Bubble
          Label='Not Visited'
          Value={notVisitedQuestions}
          BorderColor='v6'
          BgColor='white'
          FontColor='v6'
        />
        <Bubble
          Label='Marked for Review'
          Value={markedForReviewQuestions}
          BgColor='yellowMarkedForReview'
          BorderColor='markedForReviewBubbleBorder'
          FontColor='white'
        />
        <Bubble
          Label='Answered'
          Value={answeredQuestions}
          BgColor='green'
          BorderColor='answeredBubbleBorder'
          FontColor='white'
        />
        <Bubble
          Label='Answered & Marked for Review'
          Value={answeredAndMarkedForReviewQuestions}
          BgColor='yellowMarkedForReview'
          BorderColor='markedForReviewBubbleBorder'
          FontColor='white'
        />
      </HStack>
      <Box justifySelf='end' color='v6' bgColor='v1' py={5} px={4} height='100%'>
        <Countdown />
      </Box>
    </HStack>
  )
}

export default SectionTopBar
