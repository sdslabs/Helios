import { Flex, Button, Text, Box, RadioGroup, Radio, Input, Badge, Spinner } from '@chakra-ui/react'
import CustomRichTextEditor from '@common/components/CustomRichTextEditor'
import { useState, useEffect, useCallback } from 'react'
import { QuestionType, ResponseStatus, Option } from '../../../types'
import { QuestionsCheckModal } from '../Modals/QuestionCheckModal'
import { useQuestion } from '@checkQuiz/api/useQuestion'
import { useResponse, useAllResponse } from '@checkQuiz/api/useResponse'
import useCheckQuizStore from '@checkQuiz/store/checkQuizStore'
import useCheckResponse from '@checkQuiz/api/useCheckResponse'

interface QuestionViewProps {
  quizId: string
  questionId: string
}

const LoadingSpinner = () => (
  <div
    style={{
      width: '100%',
      height: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '400px',
    }}
  >
    <Spinner size='xl' />
  </div>
)

const ErrorDisplay = ({ onRetry }: { onRetry: () => void }) => (
  <Flex direction='column' align='center' justify='center' minHeight='400px'>
    <Text mb={4}>There was an error loading the question. Please try again.</Text>
    <Button onClick={onRetry} colorScheme='purple'>
      Retry
    </Button>
  </Flex>
)

const QuestionView: React.FC<QuestionViewProps> = ({ quizId, questionId }) => {
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [isQuestionCheckModalOpen, setIsQuestionCheckModalOpen] = useState(false)

  const {
    currentQuestionIndex,
    currentSectionIndex,
    currentResponseIndex,
    allResponsesId,
    allResponsesStatus,
    checksCompleted,
    setChecksCompleted,
    setcurrentResponseIndex,
    setallResponsesId,
    setallResponsesStatus,
  } = useCheckQuizStore()

  const { data: questionData, isLoading: questionIsLoading, refetch: questionRefetch } = useQuestion(questionId)
  const { mutate: mutateResponse } = useCheckResponse(allResponsesId[currentResponseIndex] || '')
  
  const {
    data: allResponses,
    isLoading: allResponsesIsLoading,
    refetch: allResponsesRefetch,
  } = useAllResponse({ quizId, questionId })

  const {
    data: responseData,
    isLoading: responseIsLoading,
    refetch: responseRefetch,
  } = useResponse(allResponsesId[currentResponseIndex], quizId)

  const [question, setQuestion] = useState({
    description: '',
    options: [],
    type: QuestionType.MCQ,
    maxMarks: 0,
    checkersNotes: '',
  })

  const [response, setResponse] = useState({
    user: '',
    selectedOptionId: '',
    subjectiveAnswer: '',
    marksAwarded: 0,
    status: ResponseStatus.unanswered,
    checkedBy: '',
  })

  const loadData = useCallback(async () => {
    if (!questionId) return
    
    setIsLoading(true)
    setHasError(false)
    
    try {
      const [questionResult, responsesResult] = await Promise.all([
        questionRefetch(),
        allResponsesRefetch()
      ])

      if (questionResult.data?.question) {
        setQuestion(questionResult.data.question)
      }

      if (responsesResult.data?.responses) {
        const responses = responsesResult.data.responses
        setallResponsesId(responses.map((r: any) => r.responseId))
        setallResponsesStatus(responses.map((r: any) => r.status))
      }
    } catch (error) {
      console.error('Error loading data:', error)
      setHasError(true)
    } finally {
      setIsLoading(false)
    }
  }, [questionId, questionRefetch, allResponsesRefetch, setallResponsesId, setallResponsesStatus])

  useEffect(() => {
    const loadResponse = async () => {
      if (!allResponsesId[currentResponseIndex]) return
      
      try {
        const result = await responseRefetch()
        if (result.data?.response) {
          const newResponse = result.data.response
          setResponse(prev => ({
            ...newResponse,
            marksAwarded: newResponse.status === ResponseStatus.answered ? 0 : newResponse.marksAwarded,
          }))
        }
      } catch (error) {
        console.error('Error loading response:', error)
      }
    }

    loadResponse()
  }, [currentResponseIndex, allResponsesId, responseRefetch])

  useEffect(() => {
    loadData()
  }, [loadData])

  const handleMarksChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const marks = parseFloat(e.target.value)
    setResponse(prev => ({
      ...prev,
      marksAwarded: isNaN(marks) ? 0 : Math.min(marks, question.maxMarks),
    }))
  }

  const handleNextResponse = async () => {
    if (isSaving) return
    setIsSaving(true)
  
    const responseId = allResponsesId[currentResponseIndex]
    if (!responseId) {
      console.error('No response ID found')
      setIsSaving(false)
      return
    }
  
    try {
      await new Promise((resolve) => {
        mutateResponse(
          {
            quizId,
            responseId,
            body: { marksAwarded: response.marksAwarded },
          },
          {
            onSuccess: () => {
              if (allResponsesStatus[currentResponseIndex] === ResponseStatus.answered) {
                setChecksCompleted(checksCompleted + 1)
              }
  
              const newStatuses = [...allResponsesStatus]
              newStatuses[currentResponseIndex] = ResponseStatus.checked
              setallResponsesStatus(newStatuses)
  
              if (currentResponseIndex < allResponsesId.length - 1) {
                setcurrentResponseIndex(currentResponseIndex + 1)
              }
              resolve(undefined)
            },
            onError: (error) => {
              console.error('Error saving response:', error)
              resolve(undefined)
            },
          },
        )
      })
    } finally {
      setIsSaving(false)
    }
  }
  const toggleQuestionCheckModal = () => {
    setIsQuestionCheckModalOpen(!isQuestionCheckModalOpen)
  }

  if (isLoading || questionIsLoading || responseIsLoading || allResponsesIsLoading) {
    return <LoadingSpinner />
  }

  if (hasError) {
    return <ErrorDisplay onRetry={() => questionRefetch()} />
  }

  return (
    <Box as='main' display='flex' mt={10}>
      <Flex flexDirection='column' alignItems='center' justifyContent='center' w='full'>
        <Flex
          width='min-content'
          flexDirection='column'
          alignItems='center'
          justifyContent='center'
        >
          <Flex flexDirection='row' w='full' justifyContent='space-between'>
            <Text
              fontSize='1rem'
              fontWeight='600'
              mb={6}
              alignSelf='self-start'
              color='accentBlack'
            >
              <Text as='span' fontWeight={700}>
                Section {currentSectionIndex}-
              </Text>{' '}
              Question {currentQuestionIndex}
            </Text>
            <Badge
              colorScheme={response.status === ResponseStatus.checked ? 'whatsapp' : 'orange'}
              py='0.25rem'
              px='0.62rem'
              borderRadius='0.25rem'
              fontSize='0.875rem'
              height='max-content'
            >
              {response.status === ResponseStatus.checked ? 'Checked' : 'Unchecked'}
            </Badge>
          </Flex>

          <Text fontSize='1rem' fontWeight='400' mb={6} w='58.5rem' p={4} bgColor='v1'>
            {question.description}
          </Text>

          {question.type === QuestionType.MCQ ? (
            <Flex flexDirection='column' w='full' mb={4}>
              <RadioGroup
                name='form-name'
                display='flex'
                flexDirection='column'
                value={response.selectedOptionId?.toString() || ''}
              >
                {question.options.map((option: Option) => (
                  <Radio
                    key={option.id}
                    value={option.id}
                    mb={4}
                    isChecked={response.selectedOptionId === option.id}
                  >
                    {option.label}
                  </Radio>
                ))}
              </RadioGroup>
            </Flex>
          ) : (
            <Box w='full' height='max-content' mb={4}>
              <CustomRichTextEditor value={response.subjectiveAnswer} onChange={() => undefined} />
            </Box>
          )}

          <Flex
            flexDirection='row'
            w='full'
            justifyContent='space-between'
            alignItems='center'
            mb={6}
          >
            <Flex alignItems='center'>
              <Text colorScheme='accentBlack' fontSize='0.875rem'>
                Marks (out of {question.maxMarks}) :
              </Text>
              <Input
                colorScheme='accentBlack'
                type='number'
                fontSize='0.875rem'
                w='4rem'
                ml={2}
                step={0.1}
                value={response.marksAwarded}
                onChange={handleMarksChange}
                isDisabled={isSaving}
              />
            </Flex>
            <Text colorScheme='accentBlack' fontSize='0.875rem'>
              Checked by:{' '}
              <Text as='span' color='v6'>
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
              isLoading={isSaving}
              loadingText='Saving...'
            >
              Save & Next
            </Button>
          </Flex>

          <Flex flexDirection='column' fontSize='0.875rem' color='N6' alignItems='start' w='full'>
            <Text>Checker&apos;s notes</Text>
            <Input height='4rem' mb={8} disabled value={question.checkersNotes} />
          </Flex>
        </Flex>
      </Flex>

      <QuestionsCheckModal
        open={isQuestionCheckModalOpen}
        toggleIsOpen={toggleQuestionCheckModal}
      />
    </Box>
  )
}

export default QuestionView
