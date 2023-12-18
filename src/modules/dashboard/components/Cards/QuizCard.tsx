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

interface QuizCardProps {
  title:string,
  content:string,
  time:Date,
  image:string,
  btnText:string,
}

const QuizCard: React.FC<QuizCardProps> = ({ title, content, time,image,btnText }:QuizCardProps) => {
  const formattedTime = time.toLocaleString('en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });
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
            <Text fontSize='1.2vh'>Scheduled:{formattedTime}</Text>
            <Button
              colorScheme='purple'
              color='white'
              bgColor='brand'
              height='3.2vh'
              width='5.2vw'
              fontSize='1.2vh'
              marginTop='1.6vh'
            >
              {btnText}
            </Button>
          </CardBody>
        </Stack>
      </Card>
    </Flex>
  )
}

export default QuizCard
