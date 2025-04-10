import {
  Box,
  Button,
  Divider,
  Editable,
  EditableInput,
  EditablePreview,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  IconButton,
  Input,
  List,
  ListIcon,
  ListItem,
  Select,
  Switch,
  Text,
  VStack,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Checkbox,
} from '@chakra-ui/react'
import select from 'react-select'
import { useEffect, useState } from 'react'
import CustomRichTextEditor from '@common/components/CustomRichTextEditor'
import { QuestionType, Option } from '../../types'
import { DeleteIcon } from '@chakra-ui/icons'
import { CircleIconOutlined } from '@common/components/Icons'
import useSectionStore from '@createQuiz/store/useSectionStore'
import useQuizDetailsStore from '@createQuiz/store/useQuizDetailsStore'
import { useGetQuestion, useUpdateQuestion } from '@createQuiz/api/useQuestion'
import Spin from '@common/components/Spinner';
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const QuestionDetails = () => {
  const [description, setDescription] = useState<string>('')
  const [notes, setNotes] = useState<string>('')
  const [type, setType] = useState<QuestionType>(QuestionType.SUB)
  const [marks, setMarks] = useState<number>(0)
  const [autoCheck, setAutoCheck] = useState<boolean>(false)
  const [options, setOptions] = useState<Option[]>([])
  const [answer, setAnswer] = useState<string[]>([]);

  const { sections, currentSectionIdx, currentQuestionIdx } = useSectionStore((state) => state)
  const activeSection = sections[currentSectionIdx ?? 0]
  const activeQuestionId = activeSection?.questions[currentQuestionIdx ?? 0]
  const { data, isLoading, isFetched, refetch } = useGetQuestion(activeQuestionId)
  const { mutate: mutateQuestion } = useUpdateQuestion()
  const quizId = useQuizDetailsStore((state) => state.quizId)

  const handleChangeDescription = (value?: string) => {
    setDescription(value ?? '')
  }
  const handleChangeNotes = (value?: string) => {
    setNotes(value ?? '')
  }
  const handleChangeType = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setType(e.target.value as QuestionType)
  }
  const handleDiscardChanges = async () => {
    setDescription(data?.question.description ?? '')
    setNotes(data?.question.checkersNotes ?? '')
    setType(data?.question.type ?? QuestionType.SUB)
    setMarks(data?.question.maxMarks ?? 0)
    setAutoCheck(data?.question?.autoCheck ?? false)
    setOptions(data?.question?.options ?? [])
    setAnswer(Array.isArray(data.question?.correctAnswer) ? data.question.correctAnswer : [data.question?.correctAnswer ?? '']);
  }
  const handleEdit = (id: string, newLabel: string) => {
    setOptions((prevOptions) =>
      prevOptions.map((option) => (option.id === id ? { ...option, label: newLabel } : option)),
    )
  }
  const handleDelete = (id: string) => {
    const newOptions = options.filter((option) => option.id !== id)
    newOptions.forEach((option, idx) => {
      option.id = '' + (idx + 1)
    })
    setOptions(newOptions)
  }
  const handleSaveQuestion = () => {
    const updatedQuestion = {
      description,
      type,
      maxMarks: marks,
      correctAnswer: type === QuestionType.SUB ? '' : answer ?? '1',
      autoCheck: type === QuestionType.SUB ? false : autoCheck,
      options: type === QuestionType.SUB ? [] : options,
      checkersNotes: type === QuestionType.SUB ? notes : '',
    }
    mutateQuestion({ questionId: activeQuestionId, body: updatedQuestion, quizId: quizId }, {
      onSuccess: () => {
        toast.success('Question Saved')
      },
      onError: (error) => {
        toast.error('Failed to save question')
      }
    })
  }

  useEffect(() => {
    if (isFetched && !isLoading && !data) {
      refetch()
    } else if (isFetched && !isLoading && data) {
      setDescription(data.question?.description)
      setType(data.question?.type)
      setMarks(data.question?.maxMarks)
      setAutoCheck(data.question?.autoCheck)
      setOptions(data.question?.options)
      setNotes(data.question?.checkersNotes)
      setAnswer(Array.isArray(data.question?.correctAnswer) ? data.question.correctAnswer : [data.question?.correctAnswer ?? '']);
    }
  }, [isFetched, isLoading, data])

  const renderCorrectAnswerMenu = () => {
    if (type === QuestionType.SUB) return null;

    return (
      <HStack>
        <Text color='accentBlack' fontSize='sm'>
          Answer:
        </Text>
        <Box w='full'>
          <Menu>
            <MenuButton as={Button}
              color='white'
              colorScheme='purple'
              bgColor='brand'
              fontWeight='400'
            >
              {answer.length > 0 ? `${answer.length} selected` : 'Select correct answers'}
            </MenuButton>
            <MenuList>
              {options.map((option) => (
                <MenuItem key={option.id} closeOnSelect={false}>
                  <Checkbox
                    isChecked={answer.includes(option.id)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setAnswer((prev) => [...prev, option.id]);
                      } else {
                        setAnswer((prev) => prev.filter((id) => id !== option.id));
                      }
                    }}
                  >
                    {option.label}
                  </Checkbox>
                </MenuItem>
              ))}
            </MenuList>
          </Menu>
        </Box>
      </HStack>
    );
  };

  const renderChoiceBuilder = () => {
    if (type === QuestionType.SUB) return null

    return (
      <>
        <List spacing={3}>
          {options?.map((option) => (
            <ListItem key={option.id} as={HStack}>
              <ListIcon as={CircleIconOutlined} opacity={0.5} />
              <Editable
                defaultValue={option.label}
                flexGrow={1}
                fontSize='sm'
                onChange={(value) => handleEdit(option.id, value)}
              >
                <EditablePreview bgColor='purple.50' w='100%' px={2} />
                <EditableInput px={2} />
              </Editable>
              <IconButton
                icon={<DeleteIcon />}
                aria-label=''
                variant='ghost'
                color='brand'
                size='sm'
                opacity={0.8}
                onClick={() => handleDelete(option.id)}
              />
            </ListItem>
          ))}
        </List>
        <Button
          variant='outline'
          colorScheme='purple'
          color='brand'
          w='max-content'
          size='sm'
          fontWeight='400'
          onClick={() =>
            setOptions((prevOptions) => [
              ...prevOptions,
              { id: '' + (prevOptions.length + 1), label: `Option ${prevOptions.length + 1}` },
            ])
          }
        >
          + Add Option
        </Button>
      </>
    )
  }
  // TODO: use the fetching animation instead of loading spinner
  if (isLoading) {
    return (
      <Spin />
    )
  }

  return (
    <Box w='930px' mx='auto' my={14}>
      <ToastContainer autoClose={3000} />
      <Heading fontSize='3xl' color='accentBlack'>
        {activeSection?.name}
      </Heading>
      <VStack gap={4} mt={8} alignItems='stretch'>
        <HStack justifyContent='space-between'>
          <Text color='accentBlack' fontWeight='600'>
            Question {(currentQuestionIdx ?? 0) + 1}
          </Text>
          <Select value={type} onChange={handleChangeType} w={48}>
            <option value={QuestionType.SUB}>{'Subjective'}</option>
            <option value={QuestionType.MCQ}>{'Multi Choice'}</option>
          </Select>
        </HStack>
        <FormControl>
          <FormLabel fontWeight='400' fontSize='sm' color='gray.500'>
            Question Description
          </FormLabel>
          <CustomRichTextEditor value={description} onChange={handleChangeDescription} />
        </FormControl>
        {renderChoiceBuilder()}
        <Divider borderWidth={1} borderColor='v1' />
      </VStack>
      <HStack my={8} justifyContent='space-between'>
        <HStack>
          <Text color='accentBlack' fontSize='sm'>
            Marks:
          </Text>
          <Input
            type='number'
            w={20}
            value={marks}
            onChange={(e) => setMarks(parseInt(e.target.value, 10))}
          />
        </HStack>
        {type === QuestionType.MCQ && (
          <>
            <HStack>
              <Text color='accentBlack' fontSize='sm'>
                Autocheck:
              </Text>
              <Switch
                colorScheme='purple'
                isChecked={autoCheck}
                onChange={(e) => setAutoCheck(e.target.checked)}
              />
            </HStack>
            {renderCorrectAnswerMenu()}
          </>
        )}
      </HStack>

      {type === QuestionType.SUB && (
        <FormControl>
          <FormLabel fontWeight='400' fontSize='sm' color='gray.500'>
            Checker&#39;s notes
          </FormLabel>
          <CustomRichTextEditor value={notes} onChange={handleChangeNotes} />
        </FormControl>
      )}
      <HStack justifyContent='end' my={12} gap={3}>
        <Button
          color='brand'
          colorScheme='purple'
          fontWeight='400'
          variant='outline'
          onClick={handleDiscardChanges}
        >
          Discard changes
        </Button>
        <Button
          color='white'
          colorScheme='purple'
          bgColor='brand'
          fontWeight='400'
          onClick={handleSaveQuestion}
        >
          Save changes
        </Button>
      </HStack>
    </Box>
  )
}

export default QuestionDetails
