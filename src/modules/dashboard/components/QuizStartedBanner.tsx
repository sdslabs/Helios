import { Card, Flex, Heading, Text } from '@chakra-ui/react'

const QuizStartedBanner: React.FC = () => {
  return (
    <Card w='1130px' h='208px' backgroundColor='#EBE7F2' boxShadow='none' padding='66px'>
      <Flex flexDirection='column' gap='8px'>
        <Heading color='#604195' fontSize='32px' fontWeight='600'>
          Register For a Quiz
        </Heading>
        <Text color='#604195' fontSize='20px'>
          You have not registered for any quiz
        </Text>
      </Flex>
    </Card>
  )
}

export default QuizStartedBanner
