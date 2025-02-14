import { Flex, Button, Text, Box, CheckboxGroup, Checkbox, Stack } from '@chakra-ui/react'
import CustomRichTextEditor, { renderPreview } from '@common/components/CustomRichTextEditor'
import { useState, useEffect, useCallback, useMemo, memo } from 'react'
import useQuizStore from '../store/QuizStore'
import { useGetQuestion } from '../api/useQuiz'
import {
  useCreateUpdateResponse,
  useDeleteResponse,
  useGetResponse,
} from '@giveQuiz/api/useResponse'
import { SubmitQuizModal } from './Modals/SubmitQuizModal'
import { useParams } from 'react-router-dom'
import { Option, ResponseStatus } from '../../types'
import Fetching from '../../../animations/Fetching.jsx'
import removeFromArray from '@giveQuiz/utils/removeFromArray'
import { useQueryClient } from '@tanstack/react-query'
import { handleSaveButton } from '@giveQuiz/utils/handleSaveButton'
import { displayErrorToast } from '@giveQuiz/utils/toastNotifications'

// eslint-disable-next-line react/display-name
const MemoizedOption = memo(({ option, checked, onChange }: { 
  option: Option; 
  checked: boolean;
  onChange: (value: string) => void;
}) => (
  <Checkbox 
    key={option.id} 
    value={option.id.toString()} 
    isChecked={checked}
    onChange={(e) => onChange(e.target.value)}
  >
    {option.label}
  </Checkbox>
));

// eslint-disable-next-line react/display-name
const QuestionText = memo(({ text }: { text: string }) => (
  <Text
    fontSize="1rem"
    fontWeight="400"
    mb={6}
    w="58.5rem"
    p={4}
    bgColor="v1"
    overflow="auto"
  >
    {renderPreview(text)}
  </Text>
));

// eslint-disable-next-line react/display-name
const MemoizedRichTextEditor = memo(({ value, onChange }: {
  value: string;
  onChange: (value: string) => void;
}) => (
  <Box w="full" height="max-content" mb={4}>
    <CustomRichTextEditor
      value={value}
      onChange={(newValue) => onChange(newValue ?? '')}
    />
  </Box>
));

const QuestionView = () => {
  const [questionType, setQuestionType] = useState('')
  const [questionNumber, setQuestionNumber] = useState(1)
  const [question, setQuestion] = useState('')
  const [options, setOptions] = useState<Option[]>([])
  const [answer, setAnswer] = useState<string | string[]>(questionType === 'mcq' ? [] : '')
  const [mark, setMark] = useState(4)
  const [isLastQuestion, setIsLastQuestion] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  
  console.log("component question view rendered")

  const { quizId } = useParams() as { quizId: string }
  const queryClient = useQueryClient()
  
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
    setAnsweredQuestions,
    setMarkedQuestions,
    setMarkedAnsweredQuestions
  } = useQuizStore()

  const { mutate: deleteResponse } = useDeleteResponse()
  const { mutate } = useCreateUpdateResponse()

  const {
    data: questionData,
    isLoading: isQuestionDataLoading,
    isSuccess: isQuestionDataSuccess,
    error: isQuestionDataError,
  } = useGetQuestion(currentQuestion)

  const {
    data: getResponseData,
    isSuccess: isGetResponseSuccess,
    isLoading: isGetResponseLoading,
    error: isGetResponseError,
  } = useGetResponse(quizId, currentQuestion)

  const handleClearResponse = useCallback(() => {
    setAnswer(questionType === 'mcq' ? [] : '')
    deleteResponse(
      {
        quizId,
        questionId: currentQuestion,
      },
      {
        onError: (error) => {
          if (error.response?.status === 500) {
            displayErrorToast('Failed to clear response. Please try again.')
          }
        },
      },
    )
    removeFromArray(answeredQuestions, currentQuestion, setAnsweredQuestions)
    removeFromArray(markedQuestions, currentQuestion, setMarkedQuestions)
    removeFromArray(markedAnsweredQuestions, currentQuestion, setMarkedAnsweredQuestions)
  }, [questionType, quizId, currentQuestion, answeredQuestions, markedQuestions, markedAnsweredQuestions])

  const handleSaveCallback = useCallback(async () => {
    handleSaveButton(
      answer,
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
  }, [answer, isCurrentQuestionMarked, currentQuestion, quizId, questionType])

  const handleMarkReview = useCallback(() => {
    setIsCurrentQuestionMarked(!isCurrentQuestionMarked)
  }, [isCurrentQuestionMarked])

  const handleRichTextChange = useCallback((value: string) => {
    setAnswer(value ?? '')
  }, [])

  const handleCheckboxChange = useCallback((selectedValues: string[]) => {
    setAnswer(selectedValues)
  }, [])

  useEffect(() => {
    setIsLastQuestion(
      currentQuestionIndex === sections[currentSectionIndex - 1].questions.length &&
        currentSectionIndex === sections.length,
    )
  }, [currentQuestionIndex, currentSectionIndex, sections])

  useEffect(() => {
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
      setIsCurrentQuestionMarked(
        firstItem.status === ResponseStatus.markedanswer ||
        firstItem.status === ResponseStatus.marked
      )
    } else {
      setAnswer(questionType === 'mcq' ? [] : '')
      setIsCurrentQuestionMarked(false)
    }
  }, [isGetResponseSuccess, getResponseData, questionType])

  useEffect(() => {
    if (isQuestionDataSuccess) {
      setQuestion(questionData.question.description)
      setQuestionNumber(currentQuestionIndex as number)
      setOptions(questionData.question.options)
      setMark(questionData.question.maxMarks)
      setQuestionType(questionData.question.type)
    }
  }, [currentQuestionIndex, questionData, isQuestionDataSuccess])

  const sectionName = useMemo(() => 
    sections[currentSectionIndex - 1]?.name, 
    [sections, currentSectionIndex]
  )

  if (isQuestionDataLoading || isGetResponseLoading) {
    return <Fetching />
  }

  if (isQuestionDataError) {
    displayErrorToast('Failed to fetch question data. Please reload.')
    return null
  }

  if (isGetResponseError) {
    displayErrorToast('Failed to fetch response data. Please reload.')
    return null
  }

  return (
    <Box as="main" display="flex" my={10} overflow="auto">
      <Flex flexDirection="column" alignItems="center" justifyContent="center" w="full">
        <Flex
          width="min-content"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
        >
          <Text fontSize="2rem" fontWeight="700" mb={6} alignSelf="start">
            {sectionName}
          </Text>
          <Flex flexDirection="row" w="full" justifyContent="space-between">
            <Text fontSize="1rem" fontWeight="600" mb={6} alignSelf="self-start">
              Question {questionNumber}
            </Text>
            <Text fontSize="1rem" fontWeight="600" color="v6" mb={6} alignSelf="self-start">
              {mark} Marks
            </Text>
          </Flex>
          
          <QuestionText text={question} />

          {questionType === 'mcq' ? (
            <Flex flexDirection="column" w="full" mb={4}>
              <CheckboxGroup
                value={Array.isArray(answer) ? answer : []}
                onChange={handleCheckboxChange}
              >
                <Stack direction="column">
                  {options.map((option) => (
                    <MemoizedOption
                      key={option.id}
                      option={option}
                      checked={Array.isArray(answer) && answer.includes(option.id.toString())}
                      onChange={(value) => {
                        const newAnswer = Array.isArray(answer) ? [...answer] : [];
                        if (newAnswer.includes(value)) {
                          newAnswer.splice(newAnswer.indexOf(value), 1);
                        } else {
                          newAnswer.push(value);
                        }
                        setAnswer(newAnswer);
                      }}
                    />
                  ))}
                </Stack>
              </CheckboxGroup>

              <Button
                alignSelf="flex-end"
                variant="ghost"
                colorScheme="purple"
                width="min-content"
                onClick={handleClearResponse}
              >
                Clear Response
              </Button>
            </Flex>
          ) : (
            <MemoizedRichTextEditor
              value={typeof answer === 'string' ? answer : ''}
              onChange={handleRichTextChange}
            />
          )}

          <Flex flexDirection="row" w="full" justifyContent="flex-end">
            <Button
              variant="outline"
              color="v6"
              borderColor="v6"
              mr={4}
              onClick={handleMarkReview}
            >
              {isCurrentQuestionMarked ? 'Unmark for Review' : 'Mark for Review'}
            </Button>
            <Button
              colorScheme="purple"
              bgColor="brand"
              alignSelf="flex-end"
              onClick={handleSaveCallback}
            >
              {isLastQuestion ? 'Save' : 'Save & Next'}
            </Button>
          </Flex>
        </Flex>
      </Flex>
      <SubmitQuizModal open={isModalOpen} toggleIsOpen={() => setIsModalOpen(!isModalOpen)} />
    </Box>
  )
}

export default memo(QuestionView)