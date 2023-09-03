import { Flex, Button, Text, Box, RadioGroup, Radio } from '@chakra-ui/react'
import CustomRichTextEditor from '@common/components/CustomRichTextEditor'
import { useState } from 'react'
import { QuestionType } from '../../types'

const QuestionView = () => {
  const [questionType, setQuestionType] = useState(QuestionType.SUB)
  const [sectionNumber, setSectionNumber] = useState(1)
  const [questionNumber, setQuestionNumber] = useState(1)
  const [question, setQuestion] = useState('')
  const [options, setOptions] = useState([])
  const [answer, setAnswer] = useState<string>('')
  const [mark, setMark] = useState(4)

  const handleClearResponse = () => {
    setAnswer('')
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
            Section {sectionNumber}
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
          {questionType === QuestionType.MCQ ? (
            <Flex flexDirection='column' w={'full'} mb={4}>
              <RadioGroup
                name='form-name'
                display={'flex'}
                flexDirection={'column'}
                value={answer}
                onChange={(event) => setAnswer(event)}
              >
                {options.map((option) => (
                  <Radio key={option} value={option} mb={4}>
                    {option}
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
