import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Button,
  Flex,
  Heading,
  VStack,
  Text,
  Checkbox,
  Box,
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import BasicNavButton from '@common/components/BasicNavButton'
import { GiveQuizSteps } from '@giveQuiz/types'
import AssignView from '@checkQuiz/components/Assign'
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons'
import useCheckQuizStore from '@checkQuiz/store/checkQuizStore'
import { useNavigate } from 'react-router-dom'
import { ResponseStatus } from '../../../../types'

const SideNavContent = () => {
  const navigate = useNavigate()
  const [isNavigating, setIsNavigating] = useState(false)
  
  const {
    sections,
    quizId,
    currentSection,
    currentQuestionIndex,
    currentSectionIndex,
    quizName,
    totalParticipants,
    checksCompleted,
    allResponsesId,
    currentResponseIndex,
    allResponsesStatus,
    setChecksCompleted,
    setcurrentResponseIndex,
    setCurrentQuestionIndex,
    setCurrentSectionIndex,
    setCurrentSection,
    setallResponsesId,
    setallResponsesStatus
  } = useCheckQuizStore(state => ({
    sections: state.sections,
    quizId: state.quizId,
    currentSection: state.currentSection,
    currentQuestionIndex: state.currentQuestionIndex,
    currentSectionIndex: state.currentSectionIndex,
    quizName: state.quizName,
    totalParticipants: state.totalParticipants,
    checksCompleted: state.checksCompleted,
    allResponsesId: state.allResponsesId,
    currentResponseIndex: state.currentResponseIndex,
    allResponsesStatus: state.allResponsesStatus,
    setChecksCompleted: state.setChecksCompleted,
    setcurrentResponseIndex: state.setcurrentResponseIndex,
    setCurrentQuestionIndex: state.setCurrentQuestionIndex,
    setCurrentSectionIndex: state.setCurrentSectionIndex,
    setCurrentSection: state.setCurrentSection,
    setallResponsesId: state.setallResponsesId,
    setallResponsesStatus: state.setallResponsesStatus
  }))

  const handleNavigation = async (targetSectionIndex: number, targetQuestionIndex: number) => {
    if (isNavigating) return
    
    setIsNavigating(true)
    
    try {
      const targetSection = sections[targetSectionIndex - 1]
      if (!targetSection) {
        console.error('Target section not found')
        return
      }
      
      const targetQuestion = targetSection.questions[targetQuestionIndex - 1]
      if (!targetQuestion) {
        console.error('Target question not found')
        return
      }

      setallResponsesId([])
      setallResponsesStatus([])
      setcurrentResponseIndex(0)

      setCurrentSectionIndex(targetSectionIndex)
      setCurrentQuestionIndex(targetQuestionIndex)
      setCurrentSection(targetSection)

      const newUrl = `/check-quiz/${quizId}/${targetQuestion._id}`
      navigate(newUrl, { replace: true })
      
    } catch (error) {
      console.error('Navigation error:', error)
    } finally {
      setIsNavigating(false)
    }
  }

  const NextQuestion = () => {
    if (!sections.length || isNavigating) return

    const currentSection = sections[currentSectionIndex - 1]
    if (!currentSection) return

    if (currentQuestionIndex < currentSection.questions.length) {
      handleNavigation(currentSectionIndex, currentQuestionIndex + 1)
    } else if (currentSectionIndex < sections.length) {
      handleNavigation(currentSectionIndex + 1, 1)
    }
  }

  const PrevQuestion = () => {
    if (!sections.length || isNavigating) return

    if (currentQuestionIndex > 1) {
      handleNavigation(currentSectionIndex, currentQuestionIndex - 1)
    } else if (currentSectionIndex > 1) {
      const prevSection = sections[currentSectionIndex - 2]
      handleNavigation(currentSectionIndex - 1, prevSection.questions.length)
    }
  }

  const handleResponseClick = (index: number) => {
    if (isNavigating) return
    setcurrentResponseIndex(index)
  }

  useEffect(() => {
    if (allResponsesStatus.length > 0) {
      const checkedCount = allResponsesStatus.filter(
        status => status === ResponseStatus.checked
      ).length
      setChecksCompleted(checkedCount)
    }
  }, [allResponsesStatus, setChecksCompleted])

  return (
    <Flex
      flexDirection='column'
      justifyContent='center'
      alignItems='flex-start'
      w='100%'
      h='100%'
      pl={6}
    >
      <Heading fontSize='xl' color='brand' pl={4} pb={6} mb={'1.5rem'}>
        {quizName}
      </Heading>
      
      <Flex flexDirection={'row'} mb={4} w={'full'} alignItems={'center'}>
        <ChevronLeftIcon 
          w={8} 
          h={8} 
          color={isNavigating ? 'gray.400' : 'v6'} 
          cursor={isNavigating ? 'not-allowed' : 'pointer'}
          onClick={PrevQuestion}
        />
        <Text color={'v6'} fontSize={'1.25rem'} fontWeight={600}>
          Section {currentSectionIndex} - Question {currentQuestionIndex}
        </Text>
        <ChevronRightIcon 
          w={8} 
          h={8} 
          color={isNavigating ? 'gray.400' : 'v6'}
          cursor={isNavigating ? 'not-allowed' : 'pointer'}
          onClick={NextQuestion}
        />
      </Flex>

      <Flex flexDirection={'row'} mb={5} bgColor={'v1'} p={3} w={'full'} borderRadius={'0.25rem'}>
        <Flex flexDirection={'column'} gap={2}>
          <Text fontSize={'0.75rem'} color={'accentBlack'}>
            Total Students:{' '}
            <Text as={'span'} color={'v6'} fontWeight={600}>
              {totalParticipants}
            </Text>
          </Text>
          <Text fontSize={'0.75rem'} color={'accentBlack'}>
            Total Responses:{' '}
            <Text as={'span'} color={'v6'} fontWeight={600}>
              {allResponsesId.length}
            </Text>
          </Text>
        </Flex>
        <Flex flexDirection={'column'} ml={8} gap={2}>
          <Text fontSize={'0.75rem'} color={'accentBlack'}>
            Checked:{' '}
            <Text as={'span'} color={'v6'} fontWeight={600}>
              {checksCompleted}
            </Text>
          </Text>
          <Text fontSize={'0.75rem'} color={'accentBlack'}>
            Unchecked:{' '}
            <Text as={'span'} color={'v6'} fontWeight={600}>
              {allResponsesId.length - checksCompleted}
            </Text>
          </Text>
        </Flex>
      </Flex>

      <VStack flexGrow={1} w='100%' mt={8} overflowY={'auto'}>
        {allResponsesId?.map((response, index) => (
          <Flex
            key={response}
            flexDirection='row'
            w='100%'
            alignItems={'center'}
            backgroundColor={currentResponseIndex === index ? 'v1' : undefined}
            padding={2}
            borderRadius={'0.25rem'}
            cursor={isNavigating ? 'not-allowed' : 'pointer'}
            onClick={() => handleResponseClick(index)}
          >
            <Button
              bgColor={
                allResponsesStatus[index] === ResponseStatus.checked
                  ? 'green'
                  : 'yellowMarkedForReview'
              }
              rounded={'full'}
              variant='outline'
              size={'sm'}
              borderColor={
                allResponsesStatus[index] === ResponseStatus.checked
                  ? 'answeredBubbleBorder'
                  : 'markedForReviewBubbleBorder'
              }
              _hover={{}}
              _focus={{}}
              isDisabled={isNavigating}
            />
            <Text color={'accentBlack'} ml={2}>
              {index + 1}
            </Text>
          </Flex>
        ))}
      </VStack>
    </Flex>
  )
}

export default SideNavContent