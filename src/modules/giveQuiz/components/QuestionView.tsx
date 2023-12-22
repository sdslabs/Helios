import { Flex, Button, Text, Box, RadioGroup, Radio } from '@chakra-ui/react'
import CustomRichTextEditor from '@common/components/CustomRichTextEditor'
import { useState, useEffect } from 'react'
import useQuizStore from '../store/QuizStore'
import { useQuestion } from '../api/UseQuestion';
import { useCreateUpdateResponse, useGetResponse } from '@giveQuiz/api/UseResponse';


interface QuestionData {
  question: {
    type: string;
    description: string;
    options: {
      id: string;
      label: string;
    }[];
    maxMarks: number;
  };
 }
 
const QuestionView = () => {
  const [questionType, setQuestionType] = useState('')
  const [sectionName, setSectionName] = useState('')
  const [questionNumber, setQuestionNumber] = useState(1)
  const [question, setQuestion] = useState('')
  const [options, setOptions] = useState([
    {
      label: ""
    }
   ])
  const [answer, setAnswer] = useState('')
  const [mark, setMark] = useState(4)

  const handleClearResponse = () => {
    setAnswer('')
  }

  const currentQuestion = useQuizStore((state) => state.currentQuestion);
  const currentSection = useQuizStore((state) => state.currentSection);
  const currentQuestionIndex = useQuizStore((state) => state.currentQuestionIndex);
  
  console.log("currentQuestion",currentQuestion)

  const {
    data: questionData,
    isLoading: isQuestionDataLoading,
    isSuccess: isQuestionDataSuccess,
    error: questionError,
  } = useQuestion(currentQuestion as string) as { data: QuestionData, isLoading: boolean, isSuccess: boolean, error: Error | null; };

  console.log("##########",questionData);
  const getResponse = useGetResponse(currentQuestion, currentSection);
  // const createUpdateResponse = useCreateUpdateResponse(currentQuestion, currentSection,{answer});
  const { mutate } = useCreateUpdateResponse()
  

  useEffect(() => {
    if (isQuestionDataSuccess) {
      setQuestion(questionData.question.description)
      setSectionName(currentSection as string)
      setQuestionNumber(currentQuestionIndex as number)
      setOptions(questionData.question.options)
      setMark(questionData.question.maxMarks)
      setQuestionType(questionData.question.type)
      console.log(questionData.question.type)
    }
  }, [isQuestionDataSuccess, questionData]);

  if (isQuestionDataLoading) {
    // Change later
    return <p>Loading...</p>;
  }
  
  if (!isQuestionDataSuccess) {
    // Change later
    console.error('Error loading Question data:', questionError);
    return <p>Error loading Question data</p>;
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
          {questionType === "mcq" ? (
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
              //TODO: on click Marked for Review
            >
              Marked for Review
            </Button>
            <Button
              colorScheme='purple'
              bgColor='brand'
              alignSelf='flex-end'
              //TODO:  on click save and next
              onClick={() => {mutate({answer})
              if (getResponse.isSuccess) {
                setAnswer(getResponse.data.answer);
                setMark(getResponse.data.mark);
              }
              }}
            >
              Save & Next
            </Button>
          </Flex>
        </Flex>
      </Flex>
    </Box>
  )
}

export default QuestionView
