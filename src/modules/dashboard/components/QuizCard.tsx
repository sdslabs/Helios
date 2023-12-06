import React from 'react'
import { Card, CardBody, CardFooter, Image, Stack, Heading, Text, Button, Flex } from '@chakra-ui/react'

const QuizCard: React.FC<any> = ({ title, content,time }) => {
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
        src='https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60'
        alt='Caffe Latte'
      />

      <Stack>
        <CardBody>
          <Heading fontSize='14px' fontWeight='600'>
            {title}
          </Heading>

          <Text color='#939393' marginBottom='16px' fontSize='14px'>
            {content}
          </Text>
        <Text fontSize='14px'>
          Scheduled:{time}
        </Text>
        <Button colorScheme='purple' color='white' bgColor='brand' height='3.2vh' width='5.2vw' fontSize='12px' marginTop='1.6vh'>
          Start Quiz
        </Button>

        </CardBody>
      </Stack>
    </Card>
      </Flex>
  )
}

export default QuizCard
