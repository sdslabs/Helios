import React from 'react'
import { Card, CardBody, CardFooter, Image, Stack, Heading, Text, Button } from '@chakra-ui/react'

const QuizCard: React.FC<any> = ({ title, content,time }) => {
  return (
    <Card
      direction={{ base: 'column', sm: 'row' }}
      overflow='hidden'
      variant='outline'
      width='560px'
      height='220px'
      p='16px'
      marginY='24px'
    >
      <Image
        objectFit='cover'
        w='200px'
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
        <Button colorScheme='purple' color='white' bgColor='brand' height='32px' width='104px' fontSize='12px' marginTop='16px'>
          Start Quiz
        </Button>

        </CardBody>
      </Stack>
    </Card>
  )
}

export default QuizCard
