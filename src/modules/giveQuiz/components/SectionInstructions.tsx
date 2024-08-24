import { Box, Button, Flex, Text } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { GiveQuizSteps } from '../types'
import useQuizStore from '@giveQuiz/store/QuizStore'
import { renderPreview } from '@common/components/CustomRichTextEditor'

interface SideNavContentProps {
  stage: GiveQuizSteps
  setStage: (stage: GiveQuizSteps) => void
}

const SectionInstructions = ({ stage, setStage }: SideNavContentProps) => {
  const [sectionInstructions, setSectionInstructions] = useState('')
  const { currentSection, currentSectionIndex, setCurrentQuestion, setCurrentQuestionIndex } =
    useQuizStore()

  async function handleButtonClick() {
    setCurrentQuestion(currentSection.questions[0])
    setCurrentQuestionIndex(1)
  }
  useEffect(() => {
    setSectionInstructions(currentSection?.description)
    setCurrentQuestion(currentSection.questions[0])
    setCurrentQuestionIndex(1)
  }, [currentSection, currentSectionIndex])

  return (
    <>
      <Box as='main' display='flex' mt={14}>
        <Flex flexDirection='column' alignItems='center' justifyContent='center' w={'full'}>
          <Flex
            width='min-content'
            flexDirection='column'
            alignItems='center'
            justifyContent='center'
          >
            <Text fontSize='2rem' fontWeight='700' mb={4} alignSelf='start'>
              {currentSection?.name}
            </Text>
            <Text fontSize='1.5rem' fontWeight='600' mb={4} alignSelf='self-start'>
              Section Instructions
            </Text>
            <Text
              fontSize='1rem'
              fontWeight='400'
              mb={4}
              w='58.5rem'
              color='GrayText'
              style={{
                whiteSpace: 'pre-wrap',
              }}
            >
              {renderPreview(sectionInstructions)}
            </Text>
            <Button
              colorScheme='purple'
              bgColor='brand'
              alignSelf='flex-end'
              mt={12}
              onClick={() => {
                handleButtonClick()
                setStage(2)
              }}
            >
              Start Answering
            </Button>
          </Flex>
        </Flex>
      </Box>
    </>
  )
}

export default SectionInstructions
