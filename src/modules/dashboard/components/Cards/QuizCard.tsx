import React, { useState } from 'react';
import { Card, CardBody, Image, Stack, Heading, Text, Button, Flex } from '@chakra-ui/react'
import { ButtonType } from '../../types'
import { StartModal } from '@giveQuiz/components/Modals/StartQuizModal'
import { RegisterModal } from '@giveQuiz/components/Modals/RegistrationModal'
import useQuizStore from '@giveQuiz/store/QuizStore';
import { useNavigate } from 'react-router-dom';

interface QuizCardProps {
  title: string
  registered: boolean
  content: string
  time: Date
  image: string
  btnText: string
  quizId?: any
}

const QuizCard: React.FC<QuizCardProps> = ({
  title,
  content,
  time,
  image,
  btnText,
  quizId,

}: QuizCardProps) => {
  const formattedTime = time.toLocaleString('en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  })

  const [isStartModalOpen, setIsStartModalOpen] = useState(false);
  const toggleStartModal = () => {
    setIsStartModalOpen(!isStartModalOpen)
  }
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const toggleRegisterModal = () => {
    setIsRegisterModalOpen(!isRegisterModalOpen)
  }
  const navigate = useNavigate();

  const {setIsStarted} = useQuizStore();

  const handleClick = () => {
    if (btnText === ButtonType.start){
      setIsStarted(true);
      navigate(`/giveQuiz/${quizId}`)

    }
    if (btnText === ButtonType.register){
      setIsRegisterModalOpen(true);
    }
    
  };
   
  return (
    
      <Card
        direction={{ base: 'column', sm: 'row' }}
        overflow='hidden'
        variant='outline'
        width='30vw'
        height='22vh'
        p='1.6vh'
        marginY='2.4vh'
      >
        <Image objectFit='cover' w='10vw' src={image} alt='banner image' />

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
              isDisabled={btnText === ButtonType.completed || btnText === ButtonType.registered}
              onClick={handleClick}
            >
              {btnText}
              <StartModal open={isStartModalOpen} toggleIsOpen={toggleStartModal} quizId={quizId} />
              <RegisterModal open={isRegisterModalOpen} toggleIsOpen={toggleRegisterModal} quizId={quizId} />
            </Button>       
          </CardBody>  
        </Stack>    
      </Card>  
  )
}

export default QuizCard
