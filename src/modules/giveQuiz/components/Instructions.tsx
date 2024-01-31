import { Box, Button, Flex, Spinner, Text } from '@chakra-ui/react'
import { useState, useEffect } from 'react'
import { GiveQuizSteps } from '../types'
import { useGetQuiz } from '../api/useQuiz'
import useQuizStore from '../store/QuizStore'
import { useNavigate, useParams } from 'react-router-dom'
import { renderPreview } from '@common/components/CustomRichTextEditor'

interface SideNavContentProps {
  stage: GiveQuizSteps
  setStage: (stage: GiveQuizSteps) => void
}
interface QuizData {
  quiz: {
    name: string
    description: string
    instructions: string
    sections: [
      {
        name: string
        description: string
        questions: [
          {
            question: string
            options: string[]
            answer: string
            mark: number
          },
        ]
      },
    ]
  }
  answeredQuestionIds: string[]
  markedAnsweredQuestionIds: string[]
  markedQuestionIds: string[]
}

const Instructions = ({ stage, setStage }: SideNavContentProps) => {
  const [quizInstructions, setQuizInstructions] = useState('')
  const [quizDescription, setQuizDescription] = useState('')
  const {
    quizName,
    setSections,
    setTotalQuestion,
    setQuizName,
    setCurrentSection,
    setCurrentSectionIndex,
    sections,
    setAnsweredQuestions,
    setMarkedQuestions,
    setMarkedAnsweredQuestions,
  } = useQuizStore()
  const { quizId } = useParams() as { quizId: string }
  const {
    data: quizData,
    isLoading: isQuizDataLoading,
    isSuccess: isQuizDataSuccess,
    isError: isQuizDataError,
    error: quizError,
  } = useGetQuiz(quizId) as unknown as {
    data: QuizData
    isLoading: boolean
    isError: boolean
    isSuccess: boolean
    error: Error
  }
  const navigate = useNavigate()

  useEffect(() => {
    if (isQuizDataSuccess) {
      setQuizName(quizData.quiz.name)
      setQuizDescription(quizData.quiz.description)
      setQuizInstructions(quizData.quiz.instructions)
      setAnsweredQuestions(quizData.answeredQuestionIds)
      setMarkedQuestions(quizData.markedQuestionIds)
      setMarkedAnsweredQuestions(quizData.markedAnsweredQuestionIds)
      const sectionData = quizData.quiz.sections.map((section) => {
        return {
          name: section.name,
          description: section.description,
          questions: section.questions,
        }
      })
      setSections(sectionData)
      const totalQuestions = sectionData.reduce(
        (total, section) => total + section.questions.length,
        0,
      )
      setTotalQuestion(totalQuestions)
    }
  }, [isQuizDataSuccess, quizData])

  useEffect(() => {
    if (isQuizDataError) {
      navigate('/dashboard', { replace: true })
    }
  }, [isQuizDataError, quizError])

  if (!quizData || isQuizDataLoading) {
    return(
    <div
      style={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Spinner size='xl' />
    </div>
    )
  }

  const handleContinueClick = () => {
    setStage(1)
    setCurrentSectionIndex(1)
    setCurrentSection(sections[0])
  }

  return (
    <>
      <Box as='main' display='flex' mt={12}>
        <Flex flexDirection='column' alignItems='center' justifyContent='center' w={'full'}>
          <Flex
            width='min-content'
            flexDirection='column'
            alignItems='center'
            justifyContent='center'
          >
            <Text fontSize='2rem' fontWeight='700' mb={4} alignSelf='start'>
              {quizName}
            </Text>
            <Text
              fontSize='1rem'
              fontWeight='400'
              mb={4}
              w='58.5rem'
              color='GrayText'
              style={{ whiteSpace: 'pre-wrap' }}
            >
              {renderPreview(quizDescription)}
            </Text>
            <Text fontSize='1.5rem' fontWeight='600' mb={4} alignSelf='self-start'>
              Instructions
            </Text>
            <Text
              fontSize='1rem'
              fontWeight='400'
              mb={4}
              w='58.5rem'
              color='GrayText'
              style={{ whiteSpace: 'pre-wrap' }}
            >
              {renderPreview(quizInstructions)}
            </Text>
            <Button
              colorScheme='purple'
              bgColor='brand'
              alignSelf='flex-end'
              mt={4}
              onClick={handleContinueClick}
            >
              Continue
            </Button>
          </Flex>
        </Flex>
      </Box>
    </>
  )
}

export default Instructions
