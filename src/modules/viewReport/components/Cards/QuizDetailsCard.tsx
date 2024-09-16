import React from 'react'
import { Card, Text, Flex, Heading } from '@chakra-ui/react'

interface QuizDetailsCardProps {
  quizName: string
  creator: string
  DateOfQuiz: Date
  DateOfResult: Date
}

const QuizDetailsCard: React.FC<QuizDetailsCardProps> = ({
  quizName,
  creator,
  DateOfQuiz,
  DateOfResult,
}: QuizDetailsCardProps) => {
  let formattedDateOfQuiz
  if (DateOfQuiz) {
    formattedDateOfQuiz = new Intl.DateTimeFormat('en-US', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
      timeZone: 'IST',
    }).format(new Date(DateOfQuiz))
  } else {
    formattedDateOfQuiz = 'Invalid'
  }

  let formattedDateOfResult
  if (DateOfResult) {
    formattedDateOfResult = new Intl.DateTimeFormat('en-US', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
      timeZone: 'IST',
    }).format(new Date(DateOfResult))
  } else {
    formattedDateOfResult = 'Invalid'
  }

  return (
    <>
      <Card w='48vw' h='28vh' backgroundColor='#EBE7F2' boxShadow='none' padding={8} my={4}>
        <Flex flexDirection='column' gap='0.8vh'>
          <Heading color='#604195' fontSize='3.2vh' fontWeight='700' paddingBottom='1vh'>
            {quizName}
          </Heading>
          <Flex>
            <Text fontSize='2vh' fontWeight='500'>
              Created by:
            </Text>
            <Text color='#604195' fontSize='2vh' fontWeight='500' paddingLeft='0.8vh'>
              {creator}
            </Text>
          </Flex>
          <Flex>
            <Text fontSize='2vh' fontWeight='500'>
              Date of Quiz:
            </Text>
            <Text fontSize='2vh' fontWeight='500' paddingLeft='0.8vh'>
              {formattedDateOfQuiz}
            </Text>
          </Flex>
          <Flex>
            <Text fontSize='2vh' fontWeight='500'>
              Result declared:
            </Text>
            <Text fontSize='2vh' fontWeight='500' paddingLeft='0.8vh'>
              {formattedDateOfResult}
            </Text>
          </Flex>
        </Flex>
      </Card>
    </>
  )
}

export default QuizDetailsCard
