import React, { useState } from 'react'
import {
  Card,
  CardBody,
  Image,
  Stack,
  Heading,
  Text,
  Button,
  Flex,
  useDisclosure,
} from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import defaultQuizBg from '@assets/images/default-quiz-bg.png'
import { ButtonType } from '../../types'

interface QuizCardProps {
  name: string
  description: string
  creator: string
  time: Date
  image: string
  btnText: string
  rank: number
  totalParticipants: number
}

const QuizCard: React.FC<QuizCardProps> = ({
  name,
  description,
  creator,
  time,
  image,
  btnText,
  rank,
  totalParticipants,
}: QuizCardProps) => {
  let formattedTime
  if (time) {
    formattedTime = new Intl.DateTimeFormat('en-US', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
      timeZone: 'IST',
    }).format(new Date(time))
  } else {
    formattedTime = 'Invalid'
  }

  const handleClick = () => {
    //Handle View Report
  }

  const navigate = useNavigate()

  return (
    <>
      <Card
        flexShrink={0}
        direction={{ base: 'column', sm: 'row' }}
        padding={4}
        variant='outline'
        width='full'
        justifyContent='space-between'
      >
        <Flex w='80%'>
          <Image
            src={image ? image : defaultQuizBg}
            alt='Quiz Banner'
            objectFit='cover'
            borderRadius={4}
            w='20%'
            h='100%'
          />
          <Stack>
            <CardBody>
              <Flex gap={2} alignItems='center'>
                <Heading size='sm'>
                  {name} |
                </Heading>
                <Text>
                 Created by: 
                </Text>
                <Text color='purple'>
                {creator}
                </Text>
              </Flex>
              <Text pt='2' color='n6'>
                {description}
              </Text>
              <Text pt='2' color='n6'>
                Schedule : <span style={{ color: '#191919' }}> {formattedTime} </span>
              </Text>

              {btnText === ButtonType.unchecked ? (
                <Text color='purple' fontWeight='400'>
                  Unchecked
                </Text>
              ) : (
                <Button
                  colorScheme='purple'
                  bgColor='brand'
                  px={6}
                  borderRadius={3}
                  size={'sm'}
                  mt={4}
                  isDisabled={btnText === ButtonType.unchecked}
                  onClick={handleClick}
                >
                  {btnText}
                </Button>
              )}
            </CardBody>
          </Stack>
        </Flex>
        <Card boxShadow='none' justify='center' rowGap='0.8vw' padding='2vh'>
          <Heading fontSize='2vh' textAlign='center' fontWeight='400' color='#604195'>
            Rank
          </Heading>
          <Heading fontSize='4vh' textAlign='center' fontWeight='600' color='#604195'>
            {rank}
          </Heading>
          <Heading fontSize='1.5vh' textAlign='center' fontWeight='200' color='#604195'>
            (Out of {totalParticipants})
          </Heading>
        </Card>
      </Card>
    </>
  )
}

export default QuizCard
