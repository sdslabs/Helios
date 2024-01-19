import { useState } from 'react'
import { HStack, Box } from '@chakra-ui/react'
import Bubble from './Bubble'
import useCheckQuizStore from '@checkQuiz/store/checkQuizStore'

const SectionTopBar = () => {
  const [checksCompleted, allResponsesID] = useCheckQuizStore((state) => [
    state.checksCompleted,
    state.allResponsesID,
  ])

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
        Value={allResponsesID.length - checksCompleted}
        BgColor='yellowMarkedForReview'
        BorderColor='markedForReviewBubbleBorder'
        FontColor='white'
      />
      <Bubble
        Label='Checked'
        Value={checksCompleted}
        BgColor='green'
        BorderColor='answeredBubbleBorder'
        FontColor='white'
      />
    </HStack>
  )
}

export default SectionTopBar
