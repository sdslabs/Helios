import { Box, Button, Flex, Text } from '@chakra-ui/react'
import { useState } from 'react'
import { GiveQuizSteps } from '../types'

interface SideNavContentProps {
  stage: GiveQuizSteps
  setStage: (stage: GiveQuizSteps) => void
}

const SectionInstructions = ({ stage, setStage }: SideNavContentProps) => {
  const [sectionInstructions, setSectionInstructions] = useState(
    'Paper: There were two papers in JEE Advanced 2020 exam which are Paper 1 and Paper 2. Aspirants must attempt both the papers to qualify for the exam. Duration of Exam: The exam will be conducted for 3 hours for each paper. Type of questions: The JEE Advanced 2020 question paper has both multiple-choice questions and numerical type questions. Language: Based on the aspirants’ preference, they can choose the language either English or Hindi anytime during the exam.',
  )
  const [sectionNumber, setSectionNumber] = useState(1)

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
              Section {sectionNumber}
            </Text>
            <Text fontSize='1.5rem' fontWeight='600' mb={4} alignSelf='self-start'>
              Section Instructions
            </Text>
            <Text fontSize='1rem' fontWeight='400' mb={4} w='58.5rem' color='GrayText'>
              {sectionInstructions}
            </Text>
            <Button
              colorScheme='purple'
              bgColor='brand'
              alignSelf='flex-end'
              mt={12}
              onClick={() => {
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
