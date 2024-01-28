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
  const [
    sections,
    quizId,
    currentSection,
    currentQuestionIndex,
    currentSectionIndex,
    quizName,
    totalParticipants,
    checksCompleted,
    totalAttempts,
    allResponsesId,
    currentResponseIndex,
    allResponsesStatus,
    setChecksCompleted,
    setcurrentResponseIndex,
    setCurrentQuestionIndex,
    setCurrentSectionIndex,
    setCurrentSection,
  ] = useCheckQuizStore((state) => [
    state.sections,
    state.quizId,
    state.currentSection,
    state.currentQuestionIndex,
    state.currentSectionIndex,
    state.quizName,
    state.totalParticipants,
    state.checksCompleted,
    state.totalAttempts,
    state.allResponsesId,
    state.currentResponseIndex,
    state.allResponsesStatus,
    state.setChecksCompleted,
    state.setcurrentResponseIndex,
    state.setCurrentQuestionIndex,
    state.setCurrentSectionIndex,
    state.setCurrentSection,
  ])
  const Navigate = useNavigate()

  const NextQuestion = () => {
    if (
      currentSectionIndex < sections.length &&
      currentQuestionIndex === currentSection.questions.length
    ) {
      setCurrentSectionIndex(currentSectionIndex + 1)
      setCurrentSection(sections[currentSectionIndex])
      setCurrentQuestionIndex(1)
    } else {
      if (currentQuestionIndex == currentSection.questions.length) {
        setCurrentQuestionIndex(currentSection.questions.length)
      } else {
        setCurrentQuestionIndex(currentQuestionIndex + 1)
      }
    }
    Navigate(`/check-quiz/${quizId}/${currentSection.questions[currentQuestionIndex - 1]._id}`)
  }

  const PrevQuestion = () => {
    if (currentQuestionIndex > 1) {
      setCurrentQuestionIndex(currentQuestionIndex - 1)
    } else {
      if (currentSectionIndex > 1) {
        const previousSection = sections[currentSectionIndex - 2]
        setCurrentSectionIndex(currentSectionIndex - 1)
        setCurrentSection(previousSection)
        setCurrentQuestionIndex(previousSection.questions.length)
      } else {
        setCurrentQuestionIndex(1)
      }
    }
    Navigate(`/check-quiz/${quizId}/${currentSection.questions[currentQuestionIndex - 1]._id}`)
  }

  useEffect(() => {
    if (allResponsesStatus.length > 0) {
      const checkedResponses = allResponsesStatus.filter(
        (status) => status === ResponseStatus.checked,
      )
      setChecksCompleted(checkedResponses.length)
    }
  }, [allResponsesStatus])

  return (
    <>
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
          {/* TODO: FIx this */}
          {/* <ChevronLeftIcon w={8} h={8} color={'v6'} /> */}
          <Text color={'v6'} fontSize={'1.25rem'} fontWeight={600}>
            Section {currentSectionIndex} - Question {currentQuestionIndex}
          </Text>
          {/* <ChevronRightIcon w={8} h={8} color={'v6'} /> */}
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
        {/* <Flex flexDirection={'row'} w={'full'} alignItems={'center'} mb={5}>
          <Text color={'accentBlack'} fontSize={'0.875rem'} mr={2}>
            Assigned to:
          </Text>
          <AssignView AssignedTo={['Lakshya', 'Nova']} />
        </Flex> */}
        <Flex mb={4}>
          <Checkbox w={6} h={6} colorScheme='purple' />
          <Text fontSize={'0.875rem'} color={'accentBlack'}>
            Show only unchecked questions
          </Text>
        </Flex>
        <Flex
          bgColor={'v1'}
          color={'v6'}
          fontWeight={600}
          w={'full'}
          borderRadius={'0.25rem'}
          px={7}
          h={'3rem'}
          alignItems={'center'}
        >
          Total Response
        </Flex>
        <VStack flexGrow={1} w='100%' mt={8}>
          {allResponsesId?.map((response, index) => (
            <Flex
              key={index}
              flexDirection='row'
              w='100%'
              alignItems={'center'}
              backgroundColor={currentResponseIndex == index ? 'v1' : undefined}
              padding={2}
              borderRadius={'0.25rem'}
              onClick={() => {
                setcurrentResponseIndex(index)
              }}
            >
              <Button
                bgColor={
                  allResponsesStatus[index] == ResponseStatus.checked
                    ? 'green'
                    : 'yellowMarkedForReview'
                }
                rounded={'full'}
                variant='outline'
                size={'sm'}
                borderColor={
                  allResponsesStatus[index] == ResponseStatus.checked
                    ? 'answeredBubbleBorder'
                    : 'markedForReviewBubbleBorder'
                }
                _hover={{}}
                _focus={{}}
              />
              <Text color={'accentBlack'} ml={2}>
                {index + 1}
              </Text>
            </Flex>
          ))}
        </VStack>
      </Flex>
    </>
  )
}

export default SideNavContent
