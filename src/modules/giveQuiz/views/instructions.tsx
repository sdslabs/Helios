import {
  Box,
  Button,
  Flex,
  Text,
} from '@chakra-ui/react'
import { useState } from 'react'
import { GiveQuizSteps } from '../types'

interface SideNavContentProps {
  stage: GiveQuizSteps
  setStage: (stage: GiveQuizSteps) => void
}


const Instructions = ({ stage, setStage }: SideNavContentProps) => {
  const [quizInstructions, setQuizInstructions] = useState(`Paper: There were two papers in JEE Advanced 2020 exam which are Paper 1 and Paper 2. Duration of Exam: The exam will be conducted for 3 hours for each paper. Type of questions: The JEE Advanced 2020 question paper has both multiple-choice questions and numerical type questions. Subjects: The exam is conducted for three subjects which are Physics, Chemistry and Mathematics. Shifts: Both the papers will be conducted on the same day which is 17th May 2020. The shifts are different for each paper like Paper 1 will be conducted from 9:00 am-12:00 pm and paper 2 will be conducted from 2:30 pm-5:30 pm. Negative Marking: There is negative marking in JEE Advanced and it is not same for all the papers it differs from paper to paper. Details of the marking scheme will be mentioned at the instructions page at the beginning of the examination. The number of questions: Paper consists of three sections and each section contains its own questions. Section 1 consists of 4 multiple choice questions where each question will be provided with four options to choose from. Section 2 consists of 8 multiple choice questions. One or more options will be correct for each question. Section 3 consists of 6 questions and the answer to each question will be in numerical format.`) 
  const [quizName,setQuizName] = useState('Quiz Name')
  const [quizDescription, setQuizDescription] = useState('There were two papers in JEE Advanced 2020 exam which are Paper 1 and Paper 2. Aspirants must attempt both the papers to qualify for the exam.')

  return (
    <>
      <Box as='main' display='flex' mt={12}>
        <Flex
          flexDirection='column'
          alignItems='center'
          justifyContent='center'
          w={'full'}
        >
          <Flex
            width='min-content'
            flexDirection='column'
            alignItems='center'
            justifyContent='center'
          >
            <Text fontSize='2rem' fontWeight='700' mb={4} alignSelf='start'>
              {quizName}
            </Text>
            <Text fontSize='1rem' fontWeight='400' mb={4} w='58.5rem' color='GrayText'>
              {quizDescription}
            </Text>
            <Text fontSize='1.5rem' fontWeight='600' mb={4} alignSelf='self-start'>
              Instructions
            </Text>
            <Text fontSize='1rem' fontWeight='400' mb={4} w='58.5rem' color='GrayText'>
              {quizInstructions}
            </Text>
            <Button
              colorScheme='purple'
              bgColor='brand'
              alignSelf='flex-end'
              mt={4}
              onClick={()=>{setStage(1)}}
            >
              Continue
            </Button>
          </Flex>
        </Flex>
      </Box>
    </>
  )
}

export default Instructions
