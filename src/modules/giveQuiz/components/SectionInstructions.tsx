import { Box, Button, Flex, Text } from '@chakra-ui/react'
import { useState } from 'react'
import { GiveQuizSteps } from '../types'

interface SideNavContentProps {
  stage: GiveQuizSteps
  setStage: (stage: GiveQuizSteps) => void
}

const SectionInstructions = ({ stage, setStage }: SideNavContentProps) => {
  const [sectionInstructions, setSectionInstructions] = useState('')
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