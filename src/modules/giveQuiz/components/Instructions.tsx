import { Box, Button, Flex, Text } from '@chakra-ui/react'
import { useState, useEffect } from 'react'
import { GiveQuizSteps } from '../types'
import { useQuiz } from '../api/UseQuiz';


interface SideNavContentProps {
  stage: GiveQuizSteps
  setStage: (stage: GiveQuizSteps) => void
}
interface QuizData {
  quiz: {
    name: string;
    description: string;
    instructions: string;
  };
 }

const Instructions = ({ stage, setStage }: SideNavContentProps) => {
  const [quizInstructions, setQuizInstructions] = useState('')
  const [quizName, setQuizName] = useState('')
  const [quizDescription, setQuizDescription] = useState('')

  const quizId = '64f03422df4af65f96380c43';

  const {
    data: quizData,
    isLoading: isQuizDataLoading,
    isSuccess: isQuizDataSuccess,
    error: quizError,
  } = useQuiz(quizId as string) as { data: QuizData, isLoading: boolean, isSuccess: boolean, error: Error | null; };

  console.log(quizId);
  useEffect(() => {
    if (isQuizDataSuccess) {
      setQuizName(quizData.quiz.name)
       setQuizDescription(quizData.quiz.description)
       setQuizInstructions(quizData.quiz.instructions)
       console.log(quizId);
       console.log("*****",quizData);
       console.log(quizData.quiz.name);

    }
  }, [isQuizDataSuccess, quizData]);

  if (isQuizDataLoading) {
    // Change later
    return <p>Loading...</p>;
  }
  
  if (!isQuizDataSuccess) {
    // Change later
    console.error('Error loading quiz data:', quizError);
    return <p>Error loading quiz data</p>;
  }

  return (

    <>
      <Box as='main' display='flex' mt={12}>
        <Flex flexDirection='column' alignItems='center' justifyContent='center' w={'full'}>
          <Flex
            width='min-content'
            flexDirection='column'
            alignItems='center'
            justifyContent='center'
          >
            <Text fontSize='2rem' fontWeight='700' mb={4} alignSelf='start'>
              {quizName}
            </Text>
            <Text fontSize='1rem' fontWeight='400' mb={4} w='58.5rem' color='GrayText' style={{ whiteSpace: 'pre-wrap' }}>
              {quizDescription}
            </Text>
            <Text fontSize='1.5rem' fontWeight='600' mb={4} alignSelf='self-start'>
              Instructions
            </Text>
            <Text fontSize='1rem' fontWeight='400' mb={4} w='58.5rem' color='GrayText' style={{ whiteSpace: 'pre-wrap' }}>
              {quizInstructions}
            </Text>
            <Button
              colorScheme='purple'
              bgColor='brand'
              alignSelf='flex-end'
              mt={4}
              onClick={() => {
                setStage(1)
              }}
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
