import React from 'react'
import { Card, Text, Flex, Heading } from '@chakra-ui/react'
import theme from '@common/theme'
import handleTime from '../../utils/handleTime'

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
  const formattedDateOfQuiz = handleTime(DateOfQuiz)
  const formattedDateOfResult = handleTime(DateOfResult)

  return (
    <>
      <Card w='48vw' h='28vh' backgroundColor={theme.colors.v1} boxShadow='none' padding={8} my={4}>
        <Flex flexDirection='column' gap='0.8vh'>
          <Heading color={theme.colors.v6} fontSize='3.2vh' fontWeight='700' paddingBottom='1vh'>
            {quizName}
          </Heading>
          <Flex>
            <Text fontSize='2vh' fontWeight='500'>
              Created by:
            </Text>
            <Text color={theme.colors.v6} fontSize='2vh' fontWeight='500' paddingLeft='0.8vh'>
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
