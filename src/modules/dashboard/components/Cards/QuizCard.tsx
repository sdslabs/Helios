import React from 'react'
import {
  Card,
  CardBody,
  Image,
  Stack,
  Heading,
  Text,
  Button,
  Flex,
} from '@chakra-ui/react'

const QuizCard: React.FC<any> = ({ title, content, time,image }) => {
  return (
    <Flex zIndex='-1'>
      <Card
        direction={{ base: 'column', sm: 'row' }}
        overflow='hidden'
        variant='outline'
        width='30vw'
        height='22vh'
        p='1.6vh'
        marginY='2.4vh'
      >
        <Image
          objectFit='cover'
          w='10vw'
          src={image}
          alt='banner image'
        />

        <Stack>
          <CardBody>
            <Heading fontSize='1.2vh' fontWeight='600'>
              {title}
            </Heading>

            <Text color='#939393' marginBottom='1.6vh' fontSize='1.2vh'>
              {content}
            </Text>
            <Text fontSize='1.2vh'>Scheduled:{time}</Text>
            <Button
              colorScheme='purple'
              color='white'
              bgColor='brand'
              height='3.2vh'
              width='5.2vw'
              fontSize='1.2vh'
              marginTop='1.6vh'
            >
              Start Quiz
            </Button>
          </CardBody>
        </Stack>
      </Card>
    </Flex>
  )
}

export default QuizCard
