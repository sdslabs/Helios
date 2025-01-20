import { Flex, Button, Text, Box, CheckboxGroup, Checkbox, Stack } from '@chakra-ui/react'
import CustomRichTextEditor, { renderPreview } from '@common/components/CustomRichTextEditor'
import { useState, useEffect } from 'react'
import useQuizStore from '../store/QuizStore'
import { useGetQuestion } from '../api/useQuiz'
import {
  useCreateUpdateResponse,
  useDeleteResponse,
  useGetResponse,
} from '@giveQuiz/api/useResponse'
import { SubmitQuizModal } from './Modals/SubmitQuizModal'
import { useParams } from 'react-router-dom'
import { Option,ResponseStatus } from '../../types'
import Fetching from '../../../animations/Fetching.jsx'
import removeFromArray from '@giveQuiz/utils/removeFromArray'
import { useQueryClient } from '@tanstack/react-query'
import { handleSaveButton } from '@giveQuiz/utils/handleSaveButton'
import { displayErrorToast } from '@giveQuiz/utils/toastNotifications'

const QuestionView = () => {
  const [questionType, setQuestionType] = useState('')
  const [questionNumber, setQuestionNumber] = useState(1)
  const [question, setQuestion] = useState('')
  const [options, setOptions] = useState<Option[]>([])
  const [answer, setAnswer] = useState<string | string[]>(questionType === 'mcq' ? [] : '')
  const [mark, setMark] = useState(4)
  const [isLastQuestion, setIsLastQuestion] = useState(false)
  const { mutate: deleteResponse } = useDeleteResponse()
  const {
    currentQuestion,
    currentSectionIndex,
    currentQuestionIndex,
    answeredQuestions,
    isCurrentQuestionMarked,
    sections,
    nextQuestion,
    setIsCurrentQuestionMarked,
    markedQuestions,
    markedAnsweredQuestions,
  } = useQuizStore()
  const { quizId } = useParams() as {
    quizId: string
  }
  const { mutate } = useCreateUpdateResponse()
  const queryClient = useQueryClient()
  const {
    data: questionData,
    isLoading: isQuestionDataLoading,
    isSuccess: isQuestionDataSuccess,
    error: isQuestionDataError,
  } = useGetQuestion(currentQuestion)
  const { setAnsweredQuestions, setMarkedQuestions, setMarkedAnsweredQuestions } = useQuizStore()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen)
  }

  const {
    data: getResponseData,
    isSuccess: isGetResponseSuccess,
    isLoading: isGetResponseLoading,
    error: isGetResponseError,
  } = useGetResponse(quizId, currentQuestion)

  const handleClearResponse = () => {
    setAnswer(questionType === 'mcq' ? [] : '')
    deleteResponse(
      {
        quizId,
        questionId: currentQuestion,
      },
      {
        onError: (error) => {
          displayErrorToast('Failed to clear response. Please try again.')
        },
      },
    )
    removeFromArray(answeredQuestions, currentQuestion, setAnsweredQuestions)
    removeFromArray(markedQuestions, currentQuestion, setMarkedQuestions)
    removeFromArray(markedAnsweredQuestions, currentQuestion, setMarkedAnsweredQuestions)
  }

  async function handleSave() {
    const answerValue = answer
    handleSaveButton(
      answerValue,
      isCurrentQuestionMarked,
      currentQuestion,
      quizId,
      mutate,
      deleteResponse,
      questionType,
      nextQuestion,
      setAnsweredQuestions,
      setMarkedQuestions,
      setMarkedAnsweredQuestions,
      markedAnsweredQuestions,
      answeredQuestions,
      markedQuestions,
      queryClient,
    )
  }

  useEffect(() => {
    setIsLastQuestion(
      currentQuestionIndex === sections[currentSectionIndex - 1].questions.length &&
        currentSectionIndex === sections.length,
    )
  }, [currentQuestionIndex, currentSectionIndex])

  useEffect(() => {
    if (isGetResponseSuccess) {
      if (isGetResponseSuccess && getResponseData?.response?.length > 0) {
        const firstItem = getResponseData.response[0]
        if (firstItem.selectedOptionId.length > 0) {
          setAnswer(
            Array.isArray(firstItem.selectedOptionId)
              ? firstItem.selectedOptionId
              : [firstItem.selectedOptionId],
          )
        } else if (firstItem.subjectiveAnswer) {
          setAnswer(firstItem.subjectiveAnswer)
        }
        if (
          firstItem.status === ResponseStatus.markedanswer ||
          firstItem.status === ResponseStatus.marked
        ) {
          setIsCurrentQuestionMarked(true)
        } else {
          setIsCurrentQuestionMarked(false)
        }
      } else {
        setAnswer(questionType === 'mcq' ? [] : '')
        setIsCurrentQuestionMarked(false)
      }
    }
  }, [isGetResponseSuccess, getResponseData])

  if (isGetResponseError) {
    displayErrorToast('Failed to fetch response data. Please reload.')
  }

  useEffect(() => {
    if (isQuestionDataSuccess) {
      setQuestion(questionData.question.description)
      setQuestionNumber(currentQuestionIndex as number)
      setOptions(questionData.question.options)
      setMark(questionData.question.maxMarks)
      setQuestionType(questionData.question.type)
    }
  }, [currentQuestionIndex, questionData])

  if (isQuestionDataLoading || isGetResponseLoading) {
    return <Fetching />
  }

  if (isQuestionDataError) {
    displayErrorToast('Failed to fetch question data. Please reload.')
  }

  return (
    <Box as='main' display='flex' mt={10} overflow='scroll'>
      <Flex flexDirection='column' alignItems='center' justifyContent='center' w={'full'}>
        <Flex
          width='min-content'
          flexDirection='column'
          alignItems='center'
          justifyContent='center'
        >
          <Text fontSize='2rem' fontWeight='700' mb={6} alignSelf='start'>
            {sections[currentSectionIndex - 1]?.name}
          </Text>
          <Flex flexDirection='row' w='full' justifyContent='space-between'>
            <Text fontSize='1rem' fontWeight='600' mb={6} alignSelf='self-start'>
              Question {questionNumber}
            </Text>
            <Text fontSize='1rem' fontWeight='600' color='v6' mb={6} alignSelf='self-start'>
              {mark} Marks
            </Text>
          </Flex>
          <Text
            fontSize='1rem'
            fontWeight='400'
            mb={6}
            w='58.5rem'
            p={4}
            bgColor='v1'
            overflow='scroll'
          >
            {renderPreview(question)}
          </Text>
          {questionType === 'mcq' ? (
            <Flex flexDirection='column' w={'full'} mb={4}>
              <CheckboxGroup
                value={Array.isArray(answer) ? answer : []} // answer should be string[]
                onChange={(selectedValues: string[]) => {
                  setAnswer(selectedValues)
                }}
              >
                <Stack direction='column'>
                  {options.map((option) => (
                    <Checkbox key={option.id} value={option.id.toString()} mb={4}>
                      {option.label}
                    </Checkbox>
                  ))}
                </Stack>
              </CheckboxGroup>

              <Button
                alignSelf='flex-end'
                variant={'ghost'}
                colorScheme='purple'
                width='min-content'
                onClick={handleClearResponse}
              >
                Clear Response
              </Button>
            </Flex>
          ) : (
            <Box w='full' height='max-content' mb={4}>
              <CustomRichTextEditor
                value={typeof answer === 'string' ? answer : ''}
                onChange={(value) => {
                  setAnswer(value ?? '')
                }}
              />
            </Box>
          )}
          <Flex flexDirection='row' w='full' justifyContent='flex-end'>
            <Button
              variant='outline'
              color='v6'
              borderColor='v6'
              mr={4}
              onClick={() => setIsCurrentQuestionMarked(!isCurrentQuestionMarked)}
            >
              {isCurrentQuestionMarked ? 'Unmark for Review' : 'Mark for Review'}
            </Button>
            <Button
              colorScheme='purple'
              bgColor='brand'
              alignSelf='flex-end'
              onClick={() => {
                handleSave()
              }}
            >
              {isLastQuestion ? 'Save' : 'Save & Next'}
            </Button>
          </Flex>
        </Flex>
      </Flex>
      <SubmitQuizModal open={isModalOpen} toggleIsOpen={toggleModal} />
    </Box>
  )
}

export default QuestionView
