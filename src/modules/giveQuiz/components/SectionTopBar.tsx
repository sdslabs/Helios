import { memo, useEffect, useState } from 'react'
import { HStack, Box } from '@chakra-ui/react'
import Countdown from './Countdown'
import Bubble from './Bubble'
import useQuizStore from '../store/QuizStore'

interface BubbleProps {
  label: string;
  value: number;
  colorScheme: string;
  variant: string;
  textColor: string;
}

const BubbleComponent = memo(({ label, value, colorScheme, variant, textColor }: BubbleProps) => (
  <Bubble
    label={label}
    value={value}
    colorScheme={colorScheme}
    variant={variant}
    textColor={textColor}
  />
))

BubbleComponent.displayName = 'Bubble'

const SectionTopBar = () => {
  const answeredQuestions = useQuizStore((state) => state.answeredQuestions)
  const totalQuestion = useQuizStore((state) => state.totalQuestion)
  const markedQuestions = useQuizStore((state) => state.markedQuestions)
  const markedAnsweredQuestions = useQuizStore((state) => state.markedAnsweredQuestions)
  const [notVisitedQuestions, setNotVisitedQuestions] = useState(0)
  const [markedForReviewQuestions, setMarkedForReviewQuestions] = useState(0)
  const [answeredQuestion, setAnsweredQuestion] = useState(0)
  const [answeredAndMarkedForReviewQuestions, setAnsweredAndMarkedForReviewQuestions] = useState(0)

  useEffect(() => {
    setAnsweredQuestion(answeredQuestions.length)
  }, [answeredQuestions])

  useEffect(() => {
    setMarkedForReviewQuestions(markedQuestions.length)
  }, [markedQuestions])

  useEffect(() => {
    setAnsweredAndMarkedForReviewQuestions(markedAnsweredQuestions.length)
  }, [markedAnsweredQuestions])

  useEffect(() => {
    setNotVisitedQuestions(
      totalQuestion -
        answeredQuestions.length -
        markedQuestions.length -
        markedAnsweredQuestions.length,
    )
  }, [answeredQuestions, totalQuestion, markedQuestions, markedAnsweredQuestions])

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
        <BubbleComponent
          label='Unanswered'
          value={notVisitedQuestions}
          colorScheme='purple'
          variant='ghost'
          textColor='v6'
        />
        <BubbleComponent
          label='Marked for Review'
          value={markedForReviewQuestions}
          colorScheme='yellow'
          variant='solid'
          textColor='white'
        />
        <BubbleComponent
          label='Answered'
          value={answeredQuestion}
          colorScheme='whatsapp'
          variant='solid'
          textColor='white'
        />
        <BubbleComponent
          label='Answered & Marked for Review'
          value={answeredAndMarkedForReviewQuestions}
          colorScheme='twitter'
          variant='solid'
          textColor='white'
        />
      </HStack>
      <Box justifySelf='end' color='v6' bgColor='v1' py={5} px={4} height='100%'>
        <Countdown />
      </Box>
    </HStack>
  )
}

export default memo(SectionTopBar)