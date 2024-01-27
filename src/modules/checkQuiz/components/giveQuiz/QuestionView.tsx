import {
  Flex,
  Button,
  Text,
  Box,
  RadioGroup,
  Radio,
  Input,
  Badge,
  Textarea,
} from '@chakra-ui/react'
import CustomRichTextEditor from '@common/components/CustomRichTextEditor'
import { useState, useEffect } from 'react'
import { QuestionType } from '../../../types'
import { QuestionsCheckModal } from '../Modals/QuestionCheckModal'
import { useQuestion } from '@checkQuiz/api/useQuestion'
import { useResponse, useAllResponse } from '@checkQuiz/api/useResponse'
import useCheckQuizStore from '@checkQuiz/store/checkQuizStore'
import useCheckResponse from '@checkQuiz/api/useCheckResponse'

interface QuestionViewProps {
  quizId: string
  questionId: string
}

export enum ResponseStatus {
  unanswered = 'unanswered',
  answered = 'answered',
  checked = 'checked',
  markedanswer = 'marked-answered',
  marked = 'marked',
}

interface Option {
  _id: string
  id: string
  label: string
}

const QuestionView: React.FC<QuestionViewProps> = ({ quizId, questionId }) => {
  const {
    data: questionData,
    isLoading: questionIsLoading,
    isFetched: questionIsFetched,
    refetch: questionRefetch,
    error: questionError,
  } = useQuestion(questionId)

  const [question, setQuestion] = useState({
    description: '',
    options: [],
    type: QuestionType.MCQ,
    maxMarks: 0,
  })

  const [response, setResponse] = useState({
    user: '',
    selectedOptionId: '',
    subjectiveAnswer: '',
    marksAwarded: 0,
    status: ResponseStatus.unanswered,
    checkedBy: '',
  })

  const [currentQuestionIndex] = useCheckQuizStore((state) => [state.currentQuestionIndex])

  const [isQuestionCheckModalOpen, setIsQuestionCheckModalOpen] = useState(false)
  const [currentSectionIndex] = useCheckQuizStore((state) => [state.currentSectionIndex])

  const [currentResponseIndex, setCurrentResponseIndex] = useCheckQuizStore((state) => [
    state.currentResponseIndex,
    state.setcurrentResponseIndex,
  ])

  const [allResponsesId, allResponsesStatus, setAllResponsesId, setAllResponesesStatus] =
    useCheckQuizStore((state) => [
      state.allResponsesId,
      state.allResponsesStatus,
      state.setallResponsesId,
      state.setallResponsesStatus,
    ])

  const [checksCompleted, setChecksCompleted] = useCheckQuizStore((state) => [
    state.checksCompleted,
    state.setChecksCompleted,
  ])

  const {
    data: allResponses,
    isLoading: allResponsesIsLoading,
    isFetched: allResponsesIsFetched,
    refetch: allResponsesRefetch,
    error: allResponsesError,
  } = useAllResponse({ quizId, questionId })

  useEffect(() => {
    if (questionIsFetched && questionData) {
      setQuestion(questionData.question)
    }
  }, [questionIsFetched, questionData])

  useEffect(() => {
    setCurrentResponseIndex(0)
    if (allResponsesIsFetched && allResponses && Array.isArray(allResponses.responses)) {
      if (allResponses.questionId !== questionId) {
        window.location.reload()
      }
      setAllResponsesId(allResponses.responses.map((response: any) => response.responseId))
      setAllResponesesStatus(allResponses.responses.map((response: any) => response.status))
    }
  }, [allResponsesIsFetched])

  const { mutate: mutateResponse } = useCheckResponse(allResponsesId[currentResponseIndex])

  const {
    data: responseData,
    isLoading: responseIsLoading,
    isFetched: responseIsFetched,
    refetch: responseRefetch,
    error: responseError,
  } = useResponse(allResponsesId[currentResponseIndex], quizId)

  useEffect(() => {
    if (responseIsFetched && responseData) {
      setResponse(responseData.response)
      if (responseData.response.status === ResponseStatus.answered) {
        setQuestion({ ...question, maxMarks: 0 })
      }
    }
  }, [responseIsFetched, responseData])

  const handleNextResponse = () => {
    mutateResponse(
      {
        quizId: quizId,
        responseId: allResponsesId[currentResponseIndex],
        body: {
          marksAwarded: response.marksAwarded,
        },
      },
      {
        onSuccess: () => {
          if (currentResponseIndex < allResponsesId.length - 1) {
            if (allResponsesStatus[currentResponseIndex] === ResponseStatus.answered) {
              setChecksCompleted(checksCompleted + 1)
            }
            setAllResponesesStatus([
              ...allResponsesStatus.slice(0, currentResponseIndex),
              ResponseStatus.checked,
              ...allResponsesStatus.slice(currentResponseIndex + 1),
            ])
            setCurrentResponseIndex(currentResponseIndex + 1)
          } else {
            setIsQuestionCheckModalOpen(true)
          }
        },
      },
    )
  }

  const toggleQuestionCheckModal = () => {
    setIsQuestionCheckModalOpen(!isQuestionCheckModalOpen)
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
          {/* <Text fontSize='2rem' fontWeight='700' mb={6} alignSelf='start'>
            {participantName}
          </Text> */}
          <Flex flexDirection='row' w='full' justifyContent='space-between'>
            <Text
              fontSize='1rem'
              fontWeight='600'
              mb={6}
              alignSelf='self-start'
              color={'accentBlack'}
            >
              <Text as={'span'} fontWeight={700}>
                Section {currentSectionIndex}-
              </Text>{' '}
              Question {currentQuestionIndex}
            </Text>
            {response.status === ResponseStatus.checked ? (
              <Badge
                colorScheme='whatsapp'
                py='0.25rem'
                px='0.62rem'
                borderRadius='0.25rem'
                fontSize='0.875rem'
                height={'max-content'}
              >
                Checked
              </Badge>
            ) : (
              <Badge
                colorScheme='orange'
                py='0.25rem'
                px='0.62rem'
                borderRadius='0.25rem'
                fontSize='0.875rem'
                height={'max-content'}
              >
                Unchecked
              </Badge>
            )}
          </Flex>
          <Text fontSize='1rem' fontWeight='400' mb={6} w='58.5rem' p={4} bgColor='v1'>
            {question.description}
          </Text>
          {question.type === QuestionType.MCQ ? (
            <Flex flexDirection='column' w={'full'} mb={4}>
              <RadioGroup
                name='form-name'
                display={'flex'}
                flexDirection={'column'}
                value={response.selectedOptionId?.toString() || ''}
              >
                {question.options.map((option: Option) => (
                  <Radio
                    key={option._id}
                    value={option.label}
                    mb={4}
                    isDisabled
                    isChecked={response.selectedOptionId === option.label}
                  >
                    {option.label}
                  </Radio>
                ))}
              </RadioGroup>
            </Flex>
          ) : (
            <Box w='full' height='max-content' mb={4}>
              <Textarea
                value={response.subjectiveAnswer}
                readOnly
                color={'N6'}
                height={'max-content'}
              />
            </Box>
          )}
          <Flex
            flexDirection='row'
            w='full'
            justifyContent='space-between'
            alignItems={'center'}
            mb={6}
          >
            <Flex alignItems={'center'}>
              <Text colorScheme='accentBlack' fontSize={'0.875rem'}>
                Marks (out of {question.maxMarks}) :
              </Text>
              <Input
                colorScheme='accentBlack'
                fontSize={'0.875rem'}
                w={'4rem'}
                ml={2}
                value={response.marksAwarded}
                onChange={(e) => {
                  const marks = parseInt(e.target.value)
                  if (!isNaN(marks) && marks <= question.maxMarks) {
                    setResponse({ ...response, marksAwarded: marks })
                  } else {
                    setResponse({ ...response, marksAwarded: 0 })
                  }
                }}
              />
            </Flex>
            <Text colorScheme='accentBlack' fontSize={'0.875rem'}>
              Checked by :{' '}
              <Text as='span' color={'v6'}>
                {response.checkedBy}
              </Text>
            </Text>
          </Flex>
          <Flex flexDirection='row' w='full' justifyContent='flex-end'>
            <Button
              colorScheme='purple'
              bgColor='brand'
              alignSelf='flex-end'
              mb={6}
              onClick={handleNextResponse}
            >
              Save & Next
            </Button>
            <QuestionsCheckModal
              open={isQuestionCheckModalOpen}
              toggleIsOpen={toggleQuestionCheckModal}
            />
          </Flex>
          <Flex
            flexDirection={'column'}
            fontSize={'0.875rem'}
            color={'N6'}
            alignItems={'start'}
            w={'full'}
          >
            <Text>Checker&apos;s notes</Text>
            <Input height={'4rem'} mb={8}></Input>
          </Flex>
        </Flex>
      </Flex>
    </Box>
  )
}

export default QuestionView
