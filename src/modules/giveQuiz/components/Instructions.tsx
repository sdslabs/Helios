import { Box, Button, Flex, Text, useDisclosure } from '@chakra-ui/react'
import { useState, useEffect } from 'react';
import { GiveQuizSteps } from '../types';
import { useGetQuiz } from '../api/useQuiz';
import useQuizStore from '../store/QuizStore';
import { useParams } from 'react-router-dom';
import { StartModal } from './Modals/StartQuizModal';

interface SideNavContentProps {
  stage: GiveQuizSteps
  setStage: (stage: GiveQuizSteps) => void
}
interface QuizData {
  quiz: {
    name: string;
    description: string;
    instructions: string;
    sections: [
      {
        name: string;
        description: string;
        questions: [
          {
            question: string;
            options: string[];
            answer: string;
            mark: number;
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
  const [quizName, setQuizName] = useState('')
  const [quizDescription, setQuizDescription] = useState('')
  const setCurrentSection = useQuizStore((state) => state.setCurrentSection)
  const setCurrentSectionIndex = useQuizStore((state) => state.setCurrentSectionIndex)
  const sections = useQuizStore((state) => state.sections)
  const isStarted = useQuizStore((state) => state.isStarted)
  const { setAnsweredQuestions, setMarkedQuestions, setMarkedAnsweredQuestions, setIsStarted } =
    useQuizStore()
  const { quizId } = useParams() as { quizId: string }
  const {
    data: quizData,
    isLoading: isQuizDataLoading,
    isSuccess: isQuizDataSuccess,
    error: quizError,
  } = useGetQuiz(quizId as string) as {
    data: QuizData
    isLoading: boolean
    isSuccess: boolean
    error: Error | null
  }

  const {
    isOpen: isStartModalOpen,
    onOpen: onStartModalOpen,
    onClose: onStartModalClose,
  } = useDisclosure()
  const openStartModal = () => {
    // setIsStartModalOpen(!isStartModalOpen)
    onStartModalOpen()
  }

  useEffect(() => {
    if (isStarted) {
      // setIsStartModalOpen(true)
      onStartModalOpen()
      setIsStarted(false)
    }
  }, [])

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
      useQuizStore.getState().setSections(sectionData)
      const totalQuestions = sectionData.reduce(
        (total, section) => total + section.questions.length,
        0,
      )
      useQuizStore.getState().setTotalQuestion(totalQuestions)
    }
  }, [isQuizDataSuccess, quizData])

  if (isQuizDataLoading) {
    // Change later
    return <p>Loading...</p>
  }

  if (!isQuizDataSuccess) {
    // Change later
    console.error('Error loading quiz data:', quizError)
    return <p>Error loading quiz data</p>
  }

  async function handleContinueClick() {
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
              {quizDescription}
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
              {quizInstructions}
            </Text>
            <Button
              colorScheme='purple'
              bgColor='brand'
              alignSelf='flex-end'
              mt={4}
              onClick={() => {
                handleContinueClick()
              }}
            >
              Continue
              <StartModal open={isStartModalOpen} close={onStartModalClose} quizId={quizId} />
            </Button>
          </Flex>
        </Flex>
      </Box>
    </>
  )
}

export default Instructions
