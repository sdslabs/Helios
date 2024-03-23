import { Flex, Button, Text, Box, RadioGroup, Radio } from '@chakra-ui/react'
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
import { Option, QuestionType, ResponseStatus } from '../../types'
import { toast } from 'react-toastify'
import Fetching from '../../../animations/Fetching'
import removeFromArray from '@giveQuiz/utils/removeFromArray'
import handleQuestionShift from '@giveQuiz/utils/handleQuestionShift'
import { useQueryClient } from '@tanstack/react-query'

const QuestionView = () => {
  const [questionType, setQuestionType] = useState('')
  const [questionNumber, setQuestionNumber] = useState(1)
  const [question, setQuestion] = useState('')
  const [options, setOptions] = useState<Option[]>([])
  const [answer, setAnswer] = useState('')
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
    setAnswer('')
    deleteResponse(
      {
        quizId,
        questionId: currentQuestion,
      },
      {
        onError: (error) => {
          console.error('Error deleting response:', error)
          toast.error('Failed to delete response. Please try again.', {
            position: 'bottom-center',
            autoClose: 1000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
          })
        },
      },
    )
    removeFromArray(answeredQuestions, currentQuestion, setAnsweredQuestions)
    removeFromArray(markedQuestions, currentQuestion, setMarkedQuestions)
    removeFromArray(markedAnsweredQuestions, currentQuestion, setMarkedAnsweredQuestions)
  }

  const handleSaveButton = async () => {
    let status: ResponseStatus = ResponseStatus.unanswered
    if (!answer && !isCurrentQuestionMarked) {
      toast.info('This question is unanswered and not marked for review', {
        position: 'bottom-center',
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        theme: 'colored',
      })
    } else if (!answer && isCurrentQuestionMarked) {
      status = ResponseStatus.marked
    } else if (answer && !isCurrentQuestionMarked) {
      status = ResponseStatus.answered
    } else if (answer && isCurrentQuestionMarked) {
      status = ResponseStatus.markedanswer
    }
    handleQuestionShift(
      markedAnsweredQuestions,
      answeredQuestions,
      markedQuestions,
      setMarkedAnsweredQuestions,
      setAnsweredQuestions,
      setMarkedQuestions,
      currentQuestion,
      status,
    )
    if (status === ResponseStatus.unanswered) {
      deleteResponse(
        {
          quizId,
          questionId: currentQuestion,
        },
        {
          onError: (error) => {
            console.error('Error deleting response:', error)
            toast.error('Failed to delete response. Please try again.', {
              position: 'bottom-center',
              autoClose: 1000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
            })
          },
        },
      )
      return nextQuestion()
    }
    const responseData = {
      selectedOptionId: questionType === QuestionType.MCQ ? answer : undefined,
      subjectiveAnswer: questionType !== QuestionType.MCQ ? answer : undefined,
      status: status,
    }
    mutate(
      {
        quizId,
        questionId: currentQuestion,
        responseData,
      },
      {
        onSuccess: () => {
          toast.success('Response Saved Successfully', {
            position: 'bottom-center',
            autoClose: 1000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
          })
          nextQuestion()
          useQueryClient().invalidateQueries({
            exact: true,
            queryKey: ['response', quizId, currentQuestion],
          })
        },
        onError: (error) => {
          console.error('Error saving response:', error)
          toast.error('Failed to save response. Please try again.', {
            position: 'bottom-center',
            autoClose: 1000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
          })
        },
      },
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
        if (firstItem.selectedOptionId) {
          setAnswer(firstItem.selectedOptionId)
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
        setAnswer('')
        setIsCurrentQuestionMarked(false)
      }
    }
  }, [isGetResponseSuccess, getResponseData])

  if (isGetResponseLoading) {
    return <Fetching />
  }
  if (isGetResponseError) {
    console.error('Error fetching response data:')
    toast.error('Failed to fetch response data. Please reload.', {
      position: 'bottom-center',
      autoClose: 1000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
    })
  }

  useEffect(() => {
    if (isQuestionDataSuccess) {
      setQuestion(questionData.question.description)
      setQuestionNumber(currentQuestionIndex as number)
      setOptions(questionData.question.options)
      setMark(questionData.question.maxMarks)
      setQuestionType(questionData.question.type)
    }
  }, [isQuestionDataSuccess, currentQuestionIndex, questionData])

  if (isQuestionDataLoading) {
    return <Fetching />
  }
  if (isQuestionDataError) {
    console.error('Error fetching question data')
    toast.error('Failed to fetch question data. Please reload.', {
      position: 'bottom-center',
      autoClose: 1000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
    })
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
              <RadioGroup
                name='form-name'
                display={'flex'}
                flexDirection={'column'}
                value={answer}
                onChange={(event) => setAnswer(event)}
              >
                {options.map((option) => (
                  <Radio key={option.label} value={option.id} mb={4}>
                    {option.label}
                  </Radio>
                ))}
              </RadioGroup>
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
              <CustomRichTextEditor value={answer} onChange={(value) => setAnswer(value ?? '')} />
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
              onClick={handleSaveButton}
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
