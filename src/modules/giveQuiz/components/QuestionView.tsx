import { Flex, Button, Text, Box, RadioGroup, Radio } from '@chakra-ui/react'
import CustomRichTextEditor from '@common/components/CustomRichTextEditor'
import { useState, useEffect } from 'react'
import useQuizStore from '../store/QuizStore'
import { useQuestion } from '../api/UseQuestion'
import {
  useCreateUpdateResponse,
  useDeleteResponse,
  useGetResponse,
} from '@giveQuiz/api/UseResponse'
import { SubmitQuizModal } from './Modals/SubmitQuizModal'
import { useParams } from 'react-router-dom'
import useAuthStore from '@auth/store/authStore'

const QuestionView = () => {
  const [questionType, setQuestionType] = useState('')
  const [sectionName, setSectionName] = useState('')
  const [questionNumber, setQuestionNumber] = useState(1)
  const [question, setQuestion] = useState('')
  const [options, setOptions] = useState([
    {
      label: '',
    },
  ])
  const [answer, setAnswer] = useState('')
  const [mark, setMark] = useState(4)
  const [isLastQuestion, setIsLastQuestion] = useState(false)
  const { mutate: deleteResponse } = useDeleteResponse()
  const handleClearResponse = () => {
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
  const { quizId } = useParams()
  const { mutate } = useCreateUpdateResponse()
  const {
    data: questionData,
    isLoading: isQuestionDataLoading,
    isSuccess: isQuestionDataSuccess,
    error: questionError,
  } = useQuestion(currentQuestion as string)
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
      if (isGetResponseSuccess && getResponseData.response.length > 0) {
        const firstItem = getResponseData.response[0]
        if (firstItem.selectedOptionId) {
          setAnswer(firstItem.selectedOptionId)
        } else if (firstItem.subjectiveAnswer) {
          setAnswer(firstItem.subjectiveAnswer)
        }
      } else {
        setAnswer('')
      }
    }
  }, [isGetResponseSuccess, getResponseData])

  async function handleSaveButton() {
    const questionId = currentQuestion as string
    let status = 'unanswered'
    if (answer) {
      status = 'answered'
      if (!answeredQuestions.includes(currentQuestion)) {
        setAnsweredQuestions([...answeredQuestions, currentQuestion])
      }

      if (markedAnsweredQuestions.includes(currentQuestion)) {
        status = 'marked-answered'
        if (!answeredQuestions.includes(currentQuestion)) {
          setAnsweredQuestions([...answeredQuestions, currentQuestion])
        }
      }
      if (markedQuestions.includes(currentQuestion)) {
        status = 'marked-answered'
        const indexInMarkedQuestions = markedQuestions.indexOf(currentQuestion)
        setMarkedQuestions(markedQuestions.filter((_, i) => i !== indexInMarkedQuestions))
        if (!markedAnsweredQuestions.includes(currentQuestion)) {
          setMarkedAnsweredQuestions([...markedAnsweredQuestions, currentQuestion])
        }
      }
    }
    if (markedQuestions.includes(currentQuestion) && !answer) {
      status = 'marked'
    }
    if (status === 'unanswered' || status === 'marked') {
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
      nextQuestion()
    } else {
      const responseData = {
        user: {
          userId: user.userId,
          emailAdd: user.emailAdd,
          role: user.role,
        },
        selectedOptionId: questionType === 'mcq' ? answer : undefined,
        subjectiveAnswer: questionType !== 'mcq' ? answer : undefined,
        status: status,
      }

      mutate(
        { quizId, questionId, responseData },
        {
          onSuccess: () => {
            nextQuestion()
            setAnswer('')

            if (isLastQuestion) {
              toggleModal()
            }
          },
        },
      )
    }
  }

  useEffect(() => {
    setIsLastQuestion(
      currentQuestionIndex === sections[currentSectionIndex - 1].questions.length &&
        currentSectionIndex === sections.length,
    )
  }, [currentQuestionIndex, currentSectionIndex])

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
            {sectionName}
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
                  <Radio key={option.label} value={option.label} mb={4}>
                    {option.label}
                  </Radio>
                ))}
              </RadioGroup>
              <Button
                alignSelf='flex-end'
                bg='none'
                width='min-content'
                onClick={handleClearResponse}
              >
                <Text fontSize='1rem' color='accentBlack' fontWeight='400'>
                  Clear Response
                </Text>
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
              {isCurrentQuestionMarked ? 'Unmark for Review' : 'Marked for Review'}
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
