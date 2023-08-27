import { AddIcon } from '@chakra-ui/icons'
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Button,
  IconButton,
  Text,
  Wrap,
} from '@chakra-ui/react'
import { useState } from 'react'
import { AddQuestionIcon } from '@common/components/Icons'
import useSectionStore from '../hooks/useSectionStore'
import { QuizCreationSteps } from '../types'

interface QuestionsNavItemProps {
  setStage: (stage: QuizCreationSteps) => void
}

const QuestionsNavItem = ({ setStage }: QuestionsNavItemProps) => {
  const { addSection, sections, setCurrentSectionIdx } = useSectionStore()
  const [ques, setQues] = useState<number[]>([])

  const renderQuestions = () => {
    return ques.map((q, i) => (
      <Button
        key={i}
        variant='outline'
        colorScheme='purple'
        rounded='full'
        width='1'
        onClick={() => setStage(4)}
      >
        {i}
      </Button>
    ))
  }

  const renderSections = () => {
    if (!sections) {
      return null
    }

    return sections.map((section, idx) => (
      <AccordionItem border='none' key={section.id}>
        {({ isExpanded }) => (
          <>
            <AccordionButton
              color='v6'
              onClick={() => {
                setStage(3)
                setCurrentSectionIdx(idx)
              }}
              bgColor={isExpanded ? 'v1' : 'transparent'}
              borderRadius={4}
            >
              <Text flexGrow={1} textAlign='left' pl={2} fontWeight='600'>
                {section.title ?? `Section ${section.id}`}
              </Text>
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel>
              <Wrap pt={3}>
                {renderQuestions()}
                <IconButton
                  icon={<AddIcon w={3} h={3} />}
                  variant='outline'
                  colorScheme='purple'
                  aria-label=''
                  rounded='full'
                  onClick={() => {
                    setQues((prev) => [...prev, idx])
                  }}
                />
              </Wrap>
            </AccordionPanel>
          </>
        )}
      </AccordionItem>
    ))
  }

  return (
    <Accordion w='100%' allowToggle>
      <AccordionItem border='none'>
        <AccordionButton color='v6' onClick={() => setStage(2)}>
          <AddQuestionIcon w={6} h={6} />
          <Text flexGrow={1} textAlign='left' pl={2} fontWeight='600'>
            Questions
          </Text>
          <AccordionIcon />
        </AccordionButton>
        <AccordionPanel borderLeft='2px solid' borderColor='v1'>
          <Accordion allowToggle>{renderSections()}</Accordion>
          <Button bgColor='v1' color='brand' w='100%' onClick={addSection}>
            + Add Section
          </Button>
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  )
}

export default QuestionsNavItem
