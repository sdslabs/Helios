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
} from '@chakra-ui/react'
import { useState } from 'react'
import BasicNavButton from '@common/components/BasicNavButton'
import { GiveQuizSteps } from '../types'
import { SubmitQuizModal } from '../components/Modals/SubmitQuizModal'
import useQuizStore from '@giveQuiz/store/QuizStore'
import useWindowFocus from '@giveQuiz/hooks/useWindowFocus'

interface SideNavContentProps {
  stage: GiveQuizSteps
  setStage: (stage: GiveQuizSteps) => void
}

interface QuestionBubbleProps {
  stage: GiveQuizSteps
  setStage: (stage: GiveQuizSteps) => void
  question: string
  sectionName: string
  questionIndex: number
  sectionIndex: number
}

const QuestionBubble = (props: QuestionBubbleProps) => {
  const {
    currentQuestionIndex,
    currentSectionIndex,
    markedQuestions,
    markedAnsweredQuestions,
    answeredQuestions,
    setCurrentQuestion,
    setCurrentQuestionIndex,
    setCurrentSectionIndex,
  } = useQuizStore()

  const handleQuestionBubbleClick = (
    questionId: string,
    sectionName: string,
    questionIndex: number,
    sectionIndex: number,
  ): void => {
    setCurrentQuestion(questionId)
    setCurrentQuestionIndex(questionIndex)
    setCurrentSectionIndex(sectionIndex)
    props.setStage(2)
  }

  const isCurrentQuestion =
    props.questionIndex + 1 == currentQuestionIndex && props.sectionIndex + 1 == currentSectionIndex
  const isAnswered = answeredQuestions.includes(props.question)
  const isMarked = markedQuestions.includes(props.question)
  const isMarkedAndAnswered = markedAnsweredQuestions.includes(props.question)
  const isNotVisited = !isAnswered && !isMarked && !isMarkedAndAnswered

  return (
    <>
      <Button
        variant={isNotVisited && !isCurrentQuestion ? 'ghost' : 'solid'}
        colorScheme={
          isMarkedAndAnswered ? 'twitter' : isMarked ? 'yellow' : isAnswered ? 'whatsapp' : 'purple'
        }
        rounded='full'
        boxShadow={isCurrentQuestion ? 'lg' : 'inset 0 4px 4px 0 rgba(0,0,0,0.1)'}
        width='1'
        textColor={isNotVisited && !isCurrentQuestion ? 'v6' : 'white'}
        ml={4}
        onClick={() =>
          handleQuestionBubbleClick(
            props.question,
            props.sectionName,
            props.questionIndex + 1,
            props.sectionIndex + 1,
          )
        }
      >
        {props.questionIndex + 1}
      </Button>
    </>
  )
}

const SideNavContent = ({ stage, setStage }: SideNavContentProps) => {
  useWindowFocus()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen)
  }

  const { quizName } = useQuizStore()
  const { sections, setCurrentSection, setCurrentSectionIndex } = useQuizStore()

  const handleSectionClick = (sectionIndex: number): void => {
    setStage(1)
    setCurrentSection(sections[sectionIndex - 1])
    setCurrentSectionIndex(sectionIndex)
  }

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
        <Heading fontSize='xl' color='brand' pl={4} pb={6}>
          {quizName}
        </Heading>
        <BasicNavButton isActive={stage == 0} mb={2} onClick={() => setStage(0)}>
          Instructions
        </BasicNavButton>
        <Accordion w='100%' allowMultiple>
          {sections.map((section, sectionIndex) => (
            <AccordionItem key={sectionIndex} border='none'>
              {({ isExpanded }) => (
                <>
                  <AccordionButton
                    color='v6'
                    onClick={() => {
                      handleSectionClick(sectionIndex + 1)
                    }}
                  >
                    <Text flexGrow={1} textAlign='left' fontWeight='600'>
                      {section.name}
                    </Text>
                    <AccordionIcon />
                  </AccordionButton>
                  <AccordionPanel pb={4} px={0}>
                    {Array.isArray(section.questions)
                      ? section.questions.map((question, index) => (
                          <QuestionBubble
                            key={index}
                            stage={stage}
                            setStage={setStage}
                            question={question}
                            sectionName={section.name}
                            questionIndex={index}
                            sectionIndex={sectionIndex}
                          />
                        ))
                      : null}
                  </AccordionPanel>
                </>
              )}
            </AccordionItem>
          ))}
        </Accordion>
        <VStack flexGrow={1} justifyContent='flex-end' w='100%' alignItems='stretch'>
          <Button variant='outline' color='v6' borderColor='v6' onClick={toggleModal}>
            Submit Quiz
          </Button>
        </VStack>
      </Flex>
      <SubmitQuizModal open={isModalOpen} toggleIsOpen={toggleModal} />
    </>
  )
}

export default SideNavContent
