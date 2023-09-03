import { Box, Button, Flex, Text } from '@chakra-ui/react'
import { useState } from 'react'
import { GiveQuizSteps } from '../types'

interface SideNavContentProps {
  stage: GiveQuizSteps
  setStage: (stage: GiveQuizSteps) => void
}

const Instructions = ({ stage, setStage }: SideNavContentProps) => {
  const [quizInstructions, setQuizInstructions] = useState('')
  const [quizName, setQuizName] = useState('')
  const [quizDescription, setQuizDescription] = useState('')

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
