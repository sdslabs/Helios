import React, { useState } from 'react'
import theme from '@common/theme'
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
import handleTime from '../../utils/handleTime'

interface QuizCardProps {
  quizId: string
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
  quizId,
  name,
  description,
  creator,
  time,
  image,
  btnText,
  rank,
  totalParticipants,
}: QuizCardProps) => {
  const formattedTime = handleTime(time)

  const navigate = useNavigate()

  const handleClick = () => {
    navigate(`/view-report/${quizId}`)
  }

  return (
    <>
      <Card
        flexShrink={0}
        direction={{ base: 'column', sm: 'row' }}
        padding={4}
        variant='outline'
        width='full'
        height='22vh'
        justifyContent='space-between'
        shadow='sm'
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
            <CardBody paddingTop={-1} fontSize='2vh'>
              <Flex gap={2} alignItems='center'>
                <Heading size='sm'>{name} |</Heading>
                <Text>Created by:</Text>
                <Text color='brand'>{creator}</Text>
              </Flex>
              <Text pt='2' color='n6'>
                {description}
              </Text>
              <Text pt='2' color='n6'>
                Scheduled :{' '}
                <span style={{ color: theme.colors.accentBlack }}> {formattedTime} </span>
              </Text>

              {btnText === ButtonType.unchecked ? (
                <Text color='brand' fontSize='2.2vh' fontWeight='600' paddingTop='1vh'>
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
        <Card boxShadow='none' justify='center' rowGap='0.5vw' padding='2vh'>
          <Heading fontSize='2.5vh' textAlign='center' fontWeight='400' color={theme.colors.v6}>
            Rank
          </Heading>
          <Heading fontSize='5vh' textAlign='center' fontWeight='600' color={theme.colors.v6}>
            {rank}
          </Heading>
          <Heading fontSize='1.6vh' textAlign='center' fontWeight='200' color={theme.colors.v6}>
            (Out of {totalParticipants})
          </Heading>
        </Card>
      </Card>
    </>
  )
}

export default QuizCard
