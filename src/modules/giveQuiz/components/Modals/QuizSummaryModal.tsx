import { Modal, ModalContent, ModalOverlay, Text, Button, Flex } from '@chakra-ui/react'
import { TimeIcon, CloseIcon } from '@chakra-ui/icons'
import QuizSummaryPie from '../QuizSummaryPie'
import { useNavigate } from 'react-router-dom';
import { useSubmitQuiz } from '../../api/UseSubmitQuiz';
import * as io from "socket.io-client";

interface QuizSummaryModalProps {
  open: boolean
  toggleIsOpen: () => void
}

const socket = io.connect("http://localhost:4000");

export const QuizSummaryModal = ({ open, toggleIsOpen }: QuizSummaryModalProps) => {
  const labelColor = '#27A624'
  const lableBgColor = '#E5F4E5'

  const navigate = useNavigate(); 
  const {mutate} = useSubmitQuiz();
  const quizId = '64f03422df4af65f96380c43';

  const handleReturnDashboard = async () => {
    //TODO: route to dashboard
        socket.disconnect();
        mutate(quizId, { onSuccess:()=>{
          console.log(quizId);
          console.log({ quizId});
            navigate('/')
          }
        })
      }
  

  return (
    <Modal isOpen={open} onClose={toggleIsOpen} isCentered size='3xl'>
      <ModalOverlay />
      <ModalContent padding={6} borderRadius={0}>
        <Flex flexDirection='row' justifyContent='space-between' mb={4}>
          <Text fontSize='1.125rem' fontWeight='600'>
            Quiz Summary
          </Text>
          <CloseIcon
            onClick={toggleIsOpen}
            color='crossBlack'
            w='0.875rem'
            h='0.875rem'
            alignSelf='center'
          />
        </Flex>
        <Flex
          flexDirection='row'
          alignItems='center'
          justifyContent='center'
          w='full'
          bg={lableBgColor}
          px={8}
          py={4}
        >
          <TimeIcon color={labelColor} w={14} h={14} />
          <Flex
            flexDirection='column'
            alignItems='flex-start'
            justifyContent='center'
            w='full'
            ml={6}
          >
            <Text fontSize='1.25rem' fontWeight='600' mb={1} color={labelColor}>
              Time’s up!
            </Text>
            <Flex flexDirection='row'>
              <Text fontSize='1rem' fontWeight='400' color={labelColor}>
                Your quiz have been
              </Text>
              <Text fontSize='1rem' fontWeight='700' color={labelColor} ml={1}>
                successfully submitted.
              </Text>
            </Flex>
          </Flex>
        </Flex>
        <Flex flexDirection='row' alignItems='center' justifyContent='center' mt={9}>
          <QuizSummaryPie />
        </Flex>
        <Flex flexDirection='row' justifyContent='flex-end'>
          <Button
            variant='outline'
            color='v6'
            borderColor='v6'
            mt={4}
            mr={4}
            onClick={handleReturnDashboard}
          >
            Return to Dashboard
          </Button>
        </Flex>
      </ModalContent>
    </Modal>
  )
}
