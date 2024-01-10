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
import { useResponse } from '@checkQuiz/api/useResponse'
import { set } from 'lodash'

interface QuestionViewProps {
  quizID: string
  questionID: string
}

interface Option {
  _id: string
  id: string
  label: string
}

const QuestionView: React.FC<QuestionViewProps> = ({ quizID, questionID }) => {
  const {
    data: questionData,
    isLoading: questionIsLoading,
    isFetched: questionIsFetched,
    refetch: questionRefetch,
    error: questionError,
  } = useQuestion(questionID)
  const {
    data: responseData,
    isLoading: responseIsLoading,
    isFetched: responseIsFetched,
    refetch: responseRefetch,
    error: responseError,
  } = useResponse('659c272eb623f7a2cf558fbf')
  const [questionType, setQuestionType] = useState(QuestionType.MCQ)
  const [participantName, setParticipantName] = useState('Lakshya Shishir')
  const [sectionNumber, setSectionNumber] = useState(1)
  const [questionNumber, setQuestionNumber] = useState(1)
  const [question, setQuestion] = useState('')
  const [options, setOptions] = useState<Option[]>([])
  const [answer, setAnswer] = useState<string>('')
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null)
  const [mark, setMark] = useState(4)
  const [chekcedBy, setCheckedBy] = useState('Lakshya')
  const [isChecked, setIsChecked] = useState(true)
  const [isQuestionCheckModalOpen, setIsQuestionCheckModalOpen] = useState(false)

  useEffect(() => {
    if (questionIsFetched && questionData) {
      setQuestionType(questionData.question.type)
      setQuestion(questionData.question.description)
      setOptions(questionData.question.options)
      setMark(questionData.question.mark)
    }
  }, [questionIsFetched, questionData])

  useEffect(() => {
    if (responseIsFetched && responseData) {
      setAnswer(responseData.response.answer)
      setSelectedOptionId(responseData.response.selectedOptionId)
      setCheckedBy(responseData.response.checkedBy)
      setIsChecked(responseData.response.isChecked)
    }
  }, [responseIsFetched, responseData])

  const handleClearResponse = () => {
    setAnswer('')
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
          <Text fontSize='2rem' fontWeight='700' mb={6} alignSelf='start'>
            {participantName}
          </Text>
          <Flex flexDirection='row' w='full' justifyContent='space-between'>
            <Text
              fontSize='1rem'
              fontWeight='600'
              mb={6}
              alignSelf='self-start'
              color={'accentBlack'}
            >
              <Text as={'span'} fontWeight={700}>
                Section {sectionNumber}-
              </Text>{' '}
              Question {questionNumber}
            </Text>
            {isChecked ? (
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
            {question}
          </Text>
          {questionType === QuestionType.MCQ ? (
            <Flex flexDirection='column' w={'full'} mb={4}>
              <RadioGroup
                name='form-name'
                display={'flex'}
                flexDirection={'column'}
                value={selectedOptionId?.toString() || ''}
                onChange={(value) => {
                  if (isChecked) {
                    setSelectedOptionId(value)
                  }
                }}
              >
                {options.map((option) => (
                  <Radio
                    key={option._id}
                    value={option.label}
                    mb={4}
                    isDisabled={!isChecked}
                    isChecked={selectedOptionId === option.label}
                  >
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
              <Textarea value={answer} readOnly color={'N6'} height={'max-content'} />
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
                Marks (out of {mark}) :
              </Text>
              <Input width={'2.5rem'} ml={3} colorScheme='N6'></Input>
            </Flex>
            <Text colorScheme='accentBlack' fontSize={'0.875rem'}>
              Checked by :{' '}
              <Text as='span' color={'v6'}>
                {chekcedBy}
              </Text>
            </Text>
          </Flex>
          <Flex flexDirection='row' w='full' justifyContent='flex-end'>
            <Button
              colorScheme='purple'
              bgColor='brand'
              alignSelf='flex-end'
              mb={6}
              onClick={toggleQuestionCheckModal}
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
