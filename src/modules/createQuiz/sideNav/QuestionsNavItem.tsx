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
import { AddQuestionIcon } from '@common/components/Icons'
import useSectionStore from '../store/useSectionStore'
import { QuizCreationSteps } from '../types'
import useQuizDetailsStore from '@createQuiz/store/useQuizDetailsStore'
import { useCreateSection } from '@createQuiz/api/useSection'
import { useCreateQuestion } from '@createQuiz/api/useQuestion'

interface QuestionsNavItemProps {
  setStage: (stage: QuizCreationSteps) => void
}

const QuestionsNavItem = ({ setStage }: QuestionsNavItemProps) => {
  const quizId = useQuizDetailsStore((state) => state.quizId)
  const { mutate: mutateSection } = useCreateSection()
  const { mutate: mutateQuestion } = useCreateQuestion()
  const { addSection, sections, setCurrentSectionIdx, addQuestion, setCurrentQuestionIdx } =
    useSectionStore()

  const renderQuestions = (idx: number) => {
    return sections[idx]?.questions?.map((q, i) => (
      <Button
        key={i}
        variant='outline'
        colorScheme='purple'
        rounded='full'
        width='1'
        onClick={() => {
          setCurrentQuestionIdx(i)
          setStage(4)
        }}
      >
        {i + 1}
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
                {section.name ?? `Section ${section.id}`}
              </Text>
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel>
              <Wrap pt={3}>
                {renderQuestions(idx)}
                <IconButton
                  icon={<AddIcon w={3} h={3} />}
                  variant='outline'
                  colorScheme='purple'
                  aria-label=''
                  rounded='full'
                  onClick={() => {
                    mutateQuestion(
                      { quizId, sectionIdx: idx },
                      {
                        onSuccess: (data) => {
                          addQuestion(idx, data.questionId)
                          setCurrentQuestionIdx(sections[idx].questions.length-1) // Set current question index to the newly added question
                          setStage(4)
                        },
                        onError: (err) => {
                          // TODO: handle error using toast or something else
                        },
                      },
                    )
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
          <Button
            bgColor='v1'
            color='brand'
            w='100%'
            onClick={() => {
              addSection()
              mutateSection({ quizId })
            }}
          >
            + Add Section
          </Button>
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  )
}

export default QuestionsNavItem
