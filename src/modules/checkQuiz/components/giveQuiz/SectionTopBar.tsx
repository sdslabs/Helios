import { useState } from 'react'
import { HStack, Box } from '@chakra-ui/react'
import Bubble from './Bubble'

const SectionTopBar = () => {
  const [markedForReviewQuestions, setMarkedForReviewQuestions] = useState(0)
  const [answeredQuestions, setAnsweredQuestions] = useState(0)

  return (
    <HStack
      top={0}
      id='top-nav'
      bg='white'
      justifyContent='center'
      position='sticky'
      width='100%'
      borderBottom='1px solid #F1EEF5'
      height='100%'
      spacing='2.5rem'
      zIndex={1}
      py={2}
    >
        <Bubble
          Label='Unchecked'
          Value={markedForReviewQuestions}
          BgColor='yellowMarkedForReview'
          BorderColor='markedForReviewBubbleBorder'
          FontColor='white'
        />
        <Bubble
          Label='Checked'
          Value={answeredQuestions}
          BgColor='green'
          BorderColor='answeredBubbleBorder'
          FontColor='white'
        />
    </HStack>
  )
}

export default SectionTopBar
