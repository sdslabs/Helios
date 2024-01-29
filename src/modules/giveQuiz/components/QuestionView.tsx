import { Flex, Button, Text, Box, RadioGroup, Radio } from '@chakra-ui/react'
import CustomRichTextEditor from '@common/components/CustomRichTextEditor'
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
import useAuthStore from '@auth/store/authStore'
import { QuestionType, ResponseStatus } from '../../types'
import { toast } from 'react-toastify'
import Fetching from '../../../animations/Fetching'

const QuestionView = () => {
  const [questionType, setQuestionType] = useState('')
  const [questionNumber, setQuestionNumber] = useState(1)
  const [question, setQuestion] = useState('')
  const [options, setOptions] = useState([
    {
      label: '',
      id: '',
    },
  ])
  const [answer, setAnswer] = useState('')
  const [mark, setMark] = useState(4)
  const [isLastQuestion, setIsLastQuestion] = useState(false)
  const { mutate: deleteResponse } = useDeleteResponse()
  const handleClearResponse = () => {
    if (isCurrentQuestionMarked) removeFromMarkedQuestions()
    setAnswer('')
    const questionId = currentQuestion as string
    deleteResponse({ quizId, questionId })
    const markedIndex = markedQuestions.indexOf(currentQuestion)
    const markedAnsweredIndex = markedAnsweredQuestions.indexOf(currentQuestion)
    const answeredIndex = answeredQuestions.indexOf(currentQuestion)

    if (markedIndex !== -1) {
      setMarkedQuestions(markedQuestions.filter((_, i) => i !== markedIndex))
    }
    if (markedAnsweredIndex !== -1) {
      setMarkedAnsweredQuestions(
        markedAnsweredQuestions.filter((_, i) => i !== markedAnsweredIndex),
      )
    }
    if (answeredIndex !== -1) {
      setAnsweredQuestions(answeredQuestions.filter((_, i) => i !== answeredIndex))
    }
  }

  const currentQuestion = useQuizStore((state) => state.currentQuestion)
  const currentSection = useQuizStore((state) => state.currentSection)
  const currentSectionIndex = useQuizStore((state) => state.currentSectionIndex)
  const currentQuestionIndex = useQuizStore((state) => state.currentQuestionIndex)
  const answeredQuestions = useQuizStore((state) => state.answeredQuestions)
  const isCurrentQuestionMarked = useQuizStore((state) => state.isCurrentQuestionMarked)
  const sections = useQuizStore((state) => state.sections)
  const { nextQuestion, setIsCurrentQuestionMarked } = useQuizStore()
  const markedQuestions = useQuizStore((state) => state.markedQuestions)
  const markedAnsweredQuestions = useQuizStore((state) => state.markedAnsweredQuestions)
  const user = useAuthStore((state) => state.user)
  const { quizId } = useParams() as { quizId: string }
  const { mutate } = useCreateUpdateResponse()
  const {
    data: questionData,
    isLoading: isQuestionDataLoading,
    isSuccess: isQuestionDataSuccess,
    error: questionError,
  } = useGetQuestion(currentQuestion as string)
  const { setAnsweredQuestions, setMarkedQuestions, setMarkedAnsweredQuestions } = useQuizStore()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen)
  }

  function handleMarkedForReviewButton() {
    setIsCurrentQuestionMarked(true)
    const indexInMarkedQuestions = markedQuestions.indexOf(currentQuestion)
    const indexInMarkedAnsweredQuestions = markedAnsweredQuestions.indexOf(currentQuestion)
    if (answer) {
      if (indexInMarkedQuestions !== -1) {
        setMarkedQuestions(markedQuestions.filter((_, i) => i !== indexInMarkedQuestions))
        if (!markedAnsweredQuestions.includes(currentQuestion)) {
          setMarkedAnsweredQuestions([...markedAnsweredQuestions, currentQuestion])
        }
      }
      if (!markedAnsweredQuestions.includes(currentQuestion)) {
        setMarkedAnsweredQuestions([...markedAnsweredQuestions, currentQuestion])
      }
    } else {
      if (indexInMarkedAnsweredQuestions !== -1) {
        setMarkedAnsweredQuestions(
          markedAnsweredQuestions.filter((_, i) => i !== indexInMarkedAnsweredQuestions),
        )
        if (!markedQuestions.includes(currentQuestion)) {
          setMarkedQuestions([...markedQuestions, currentQuestion])
        }
      }
      if (!markedQuestions.includes(currentQuestion)) {
        setMarkedQuestions([...markedQuestions, currentQuestion])
      }
    }
  }

  async function removeFromMarkedQuestions() {
    setIsCurrentQuestionMarked(false)
    const markedIndex = markedQuestions.indexOf(currentQuestion)
    const markedAnsweredIndex = markedAnsweredQuestions.indexOf(currentQuestion)

    if (markedIndex !== -1) {
      setMarkedQuestions(markedQuestions.filter((_, i) => i !== markedIndex))
    }
    if (markedAnsweredIndex !== -1) {
      setMarkedAnsweredQuestions(
        markedAnsweredQuestions.filter((_, i) => i !== markedAnsweredIndex),
      )
    }
  }

  useEffect(() => {
    if (isQuestionDataSuccess) {
      setQuestion(questionData.question.description)
      setQuestionNumber(currentQuestionIndex as number)
      setOptions(questionData.question.options)
      setMark(questionData.question.maxMarks)
      setQuestionType(questionData.question.type)
    }
  }, [isQuestionDataSuccess, currentQuestion, currentSection, currentQuestionIndex, questionData])

  const { data: getResponseData, isSuccess: isGetResponseSuccess } = useGetResponse(
    quizId || '',
    currentQuestion || '',
  )

  useEffect(() => {
    if (isGetResponseSuccess) {
      if (isGetResponseSuccess && getResponseData?.response?.length > 0) {
        const firstItem = getResponseData.response[0]
        if (firstItem.selectedOptionId) {
          setAnswer(firstItem.selectedOptionId)
        } else if (firstItem.subjectiveAnswer) {
          setAnswer(firstItem.subjectiveAnswer)
        }
        if(firstItem.status === ResponseStatus.markedanswer || firstItem.status === ResponseStatus.marked){
          console.log('here')
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

  async function handleSaveButton() {
    const questionId = currentQuestion as string
    let status: ResponseStatus = ResponseStatus.unanswered
    if (answer) {
      status = ResponseStatus.answered
      if (!answeredQuestions.includes(currentQuestion)) {
        setAnsweredQuestions([...answeredQuestions, currentQuestion])
      }

      if (markedAnsweredQuestions.includes(currentQuestion)) {
        status = ResponseStatus.markedanswer
        if (!answeredQuestions.includes(currentQuestion)) {
          setAnsweredQuestions([...answeredQuestions, currentQuestion])
        }
      }
      if (markedQuestions.includes(currentQuestion)) {
        status = ResponseStatus.markedanswer
        const indexInMarkedQuestions = markedQuestions.indexOf(currentQuestion)
        setMarkedQuestions(markedQuestions.filter((_, i) => i !== indexInMarkedQuestions))
        if (!markedAnsweredQuestions.includes(currentQuestion)) {
          setMarkedAnsweredQuestions([...markedAnsweredQuestions, currentQuestion])
        }
      }
    }
    if (markedQuestions.includes(currentQuestion) && !answer) {
      status = ResponseStatus.marked
    }
    // if (status === ResponseStatus.unanswered || status === ResponseStatus.marked) {
      const answeredIndex = answeredQuestions.indexOf(currentQuestion)
      const markedAnsweredIndex = markedAnsweredQuestions.indexOf(currentQuestion)

      if (answeredIndex !== -1) {
        setMarkedQuestions(answeredQuestions.filter((_, i) => i !== answeredIndex))
      }
      if (markedAnsweredIndex !== -1) {
        setMarkedAnsweredQuestions(
          markedAnsweredQuestions.filter((_, i) => i !== markedAnsweredIndex),
        )
      }
    // } else {
      const responseData = {
        user: {
          userId: user.userId,
          emailAdd: user.emailAdd,
          role: user.role,
        },
        selectedOptionId: questionType === QuestionType.MCQ ? answer : undefined,
        subjectiveAnswer: questionType !== QuestionType.MCQ ? answer : undefined,
        status: status,
      }
      console.log(responseData)
      mutate(
        { quizId, questionId, responseData },
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
          },
        },
      )
    // }
  }

  useEffect(() => {
    setIsLastQuestion(
      currentQuestionIndex === sections[currentSectionIndex - 1].questions.length &&
        currentSectionIndex === sections.length,
    )
  }, [currentQuestionIndex, currentSectionIndex])

  if (isQuestionDataLoading) {
    return <Fetching />
  }

  return (
    <Box as='main' display='flex' mt={10}>
      <Flex flexDirection='column' alignItems='center' justifyContent='center' w={'full'}>
        <Flex
          width='min-content'
          flexDirection='column'
          alignItems='center'
          justifyContent='center'
        >
          <Text fontSize='2rem' fontWeight='700' mb={6} alignSelf='start'>
            {currentSection?.name}
          </Text>
          <Flex flexDirection='row' w='full' justifyContent='space-between'>
            <Text fontSize='1rem' fontWeight='600' mb={6} alignSelf='self-start'>
              Question {questionNumber}
            </Text>
            <Text fontSize='1rem' fontWeight='600' color='v6' mb={6} alignSelf='self-start'>
              {mark} Marks
            </Text>
          </Flex>
          <Text fontSize='1rem' fontWeight='400' mb={6} w='58.5rem' p={4} bgColor='v1'>
            {question}
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
              onClick={
                isCurrentQuestionMarked ? removeFromMarkedQuestions : handleMarkedForReviewButton
              }
            >
              {isCurrentQuestionMarked ? 'Unmark for Review' : 'Mark for Review'}
            </Button>

            <Button
              colorScheme='purple'
              bgColor='brand'
              alignSelf='flex-end'
              //TODO:  on click save and next
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
