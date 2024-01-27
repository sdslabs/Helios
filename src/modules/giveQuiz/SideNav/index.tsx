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

const SideNavContent = ({ stage, setStage }: SideNavContentProps) => {
  useWindowFocus();
  const [isModalOpen, setIsModalOpen] = useState(false)
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen)
  }
  const sections = useQuizStore((state) => state.sections)
  const setCurrentQuestion = useQuizStore((state) => state.setCurrentQuestion)
  const setCurrentSection = useQuizStore((state) => state.setCurrentSection)
  const setCurrentQuestionIndex = useQuizStore((state) => state.setCurrentQuestionIndex)
  const setCurrentSectionIndex = useQuizStore((state) => state.setCurrentSectionIndex)

  const handleQuestionBubbleClick = (
    questionId: string,
    sectionName: string,
    questionIndex: number,
    sectionIndex: number,
  ): void => {
    setCurrentQuestion(questionId)
    setCurrentQuestionIndex(questionIndex)
    setCurrentSectionIndex(sectionIndex)
    setStage(2)
  }

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
          Quiz Name
        </Heading>
        <BasicNavButton isActive={stage == 0} mb={2} onClick={() => setStage(0)}>
          Instructions
        </BasicNavButton>
        {sections.map((section, sectionIndex) => (
          <Accordion key={sectionIndex} w='100%' allowToggle>
            <AccordionItem border='none'>
              <AccordionButton color='v6' onClick={() => handleSectionClick(sectionIndex + 1)}>
                <Text flexGrow={1} textAlign='left' fontWeight='600'>
                  {section.name}
                </Text>
                <AccordionIcon />
              </AccordionButton>
              <AccordionPanel pb={4} px={0}>
                {Array.isArray(section.questions)
                  ? section.questions.map((question, index) => (
                      <Button
                        key={index}
                        variant='outline'
                        colorScheme='purple'
                        rounded='full'
                        width='1'
                        ml={4}
                        onClick={() =>
                          handleQuestionBubbleClick(
                            question,
                            section.name,
                            index + 1,
                            sectionIndex + 1,
                          )
                        }
                      >
                        {index + 1}
                      </Button>
                    ))
                  : null}
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
        ))}
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
