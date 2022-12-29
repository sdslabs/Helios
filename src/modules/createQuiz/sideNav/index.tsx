import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  Button,
  Heading,
  Text,
  VStack,
} from '@chakra-ui/react'
import {
  PageInfoIcon,
  PagePersonIcon,
  AddQuestionIcon,
  RegistrantsOutlinedIcon,
} from '../../../common/components/Icons'
import BasicNavButton from '../../../common/components/sideNav/BasicNavButton'
import { QuizCreationSteps } from '../types'

interface SideNavContentProps {
  stage: QuizCreationSteps
  setStage: (stage: QuizCreationSteps) => void
}

const SideNavContent = ({ stage, setStage }: SideNavContentProps) => {
  return (
    <>
      <Heading fontSize='xl' color='brand' pl={10} pb={6}>
        Create New Quiz
      </Heading>
      <BasicNavButton
        leftIcon={<PageInfoIcon w={6} h={6} />}
        onClick={() => setStage(0)}
        isActive={stage === 0}
      >
        Quiz Details
      </BasicNavButton>
      <BasicNavButton
        leftIcon={<PagePersonIcon w={6} h={6} />}
        onClick={() => setStage(1)}
        isActive={stage === 1}
      >
        Registration Form
      </BasicNavButton>
      <Accordion w='100%' allowToggle>
        <AccordionItem>
          <AccordionButton color='v6' onClick={() => setStage(2)}>
            <AddQuestionIcon w={6} h={6} />
            <Text flexGrow={1} textAlign='left' pl={2} fontWeight='600'>
              Questions
            </Text>
            <AccordionIcon />
          </AccordionButton>
        </AccordionItem>
      </Accordion>
      <BasicNavButton leftIcon={<RegistrantsOutlinedIcon w={6} h={6} />}>
        Registrants
      </BasicNavButton>
      <VStack flexGrow={1} justifyContent='flex-end' w='100%' alignItems='stretch'>
        <Button variant='outline' color='v6' borderColor='v6'>
          Publish Quiz
        </Button>
      </VStack>
    </>
  )
}

export default SideNavContent
