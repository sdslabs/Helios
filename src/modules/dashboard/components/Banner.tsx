import { Card, Flex, Heading, Text } from '@chakra-ui/react'

const Banner: React.FC = () => {
  return (
    <Card w='60vw' backgroundColor='#EBE7F2' boxShadow='none' padding='6.4vh'>
      <Flex flexDirection='column' gap='0.8vh'>
        <Heading color='#604195' fontSize='3.2vh' fontWeight='600'>
          Register For a Quiz
        </Heading>
        <Text color='#604195' fontSize='2vh'>
          You have not registered for any quiz
        </Text>
      </Flex>
    </Card>
  )
}

export default Banner
