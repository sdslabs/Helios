import { useState } from 'react'
import useQuizDetailsStore from '../store/QuizDetailsStore'
import { TriangleDownIcon } from '@chakra-ui/icons'
import theme from '@common/theme'
import { Section, Question } from '../types'
import {
  Grid,
  GridItem,
  Button,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Image,
  Text,
} from '@chakra-ui/react'
import correct from '@assets/images/correct.svg'
import incorrect from '@assets/images/incorrect.svg'
import partial from '@assets/images/partial.svg'
import unattempted from '@assets/images/unattempted.svg'

const QuestionsScroll: React.FC = () => {
  const { sections } = useQuizDetailsStore((state) => {
    return {
      sections: state.sections,
    }
  })

  const statusIcon = {
    correct: correct,
    incorrect: incorrect,
    partial: partial,
    unattempted: unattempted,
  }

  const [sectionType, setSectionType] = useState('All sections')
  const [questionType, setQuestionType] = useState('All questions')

  const [questionNumber, incrementQuestionNumber] = useState(1)

  return (
    <>
      <>
        <Flex justifyContent='space-between'>
          <Flex>
            <Flex>
              <Menu>
                <MenuButton
                  as={Button}
                  bg='white'
                  fontWeight='400'
                  fontSize='2vh'
                  border='0.1vh solid'
                  borderRadius='md'
                  borderColor='grey'
                  w='12vw'
                  rightIcon={<TriangleDownIcon color='grey' h='1.5vh' />}
                >
                  {sectionType}
                </MenuButton>
                <MenuList>
                  <MenuItem fontSize='2vh' onClick={() => setSectionType('All sections')}>
                    All sections
                  </MenuItem>
                  {sections.map((section: Section, key: number) => (
                    <MenuItem key={key} fontSize='2vh' onClick={() => setSectionType(section.name)}>
                      {section.name}
                    </MenuItem>
                  ))}
                </MenuList>
              </Menu>
            </Flex>
            <Flex paddingLeft='2vh'>
              <Menu>
                <MenuButton
                  as={Button}
                  bg='white'
                  fontWeight='400'
                  fontSize='2vh'
                  border='0.1vh solid'
                  borderRadius='md'
                  borderColor='grey'
                  w='12vw'
                  rightIcon={<TriangleDownIcon color='grey' h='1.5vh' />}
                >
                  {questionType}
                </MenuButton>
                <MenuList>
                  <MenuItem
                    fontSize='2vh'
                    onClick={() => {
                      setQuestionType('All questions')
                    }}
                  >
                    All questions
                  </MenuItem>
                  <MenuItem
                    fontSize='2vh'
                    onClick={() => {
                      setQuestionType('Correct')
                    }}
                  >
                    Correct
                  </MenuItem>
                  <MenuItem
                    fontSize='2vh'
                    onClick={() => {
                      setQuestionType('Incorrect')
                    }}
                  >
                    Incorrect
                  </MenuItem>
                  <MenuItem
                    fontSize='2vh'
                    onClick={() => {
                      setQuestionType('Partial')
                    }}
                  >
                    Partial
                  </MenuItem>
                  <MenuItem
                    fontSize='2vh'
                    onClick={() => {
                      setQuestionType('Unattempted')
                    }}
                  >
                    Unattempted
                  </MenuItem>
                </MenuList>
              </Menu>
            </Flex>
          </Flex>
          <Flex paddingTop='1.5vh'>
            <Flex>
              <Image src={correct} w='5vh' h='3vh' />
              <Text fontSize='2vh'> Correct </Text>
            </Flex>
            <Flex paddingLeft='1.5vh'>
              <Image src={incorrect} w='5vh' h='3vh' />
              <Text fontSize='2vh'> Incorrect </Text>
            </Flex>
            <Flex paddingLeft='1.5vh'>
              <Image src={partial} w='5vh' h='3vh' />
              <Text fontSize='2vh'> Partial </Text>
            </Flex>
            <Flex paddingLeft='1.5vh'>
              <Image src={unattempted} w='5vh' h='3vh' />
              <Text fontSize='2vh'> Unattempted </Text>
            </Flex>
          </Flex>
        </Flex>
      </>
      <Grid paddingRight='5vh' paddingTop='2vh' autoRows='1vh'>
        <GridItem>
          <Flex w='100%' padding='2vh'>
            <Text fontWeight='600' fontSize='2vh' w='10%' textAlign='left'>
              Q. No.
            </Text>
            <Text fontWeight='600' fontSize='2vh' w='70%' textAlign='center'>
              Question
            </Text>
            <Text fontWeight='600' fontSize='2vh' w='10%' textAlign='center'>
              Marks
            </Text>
            <Text fontWeight='600' fontSize='2vh' w='10%' textAlign='right'>
              Status
            </Text>
          </Flex>
        </GridItem>
      </Grid>
      {/* TO DO: Question wise analysis modal */}
      <Grid paddingRight='5vh' paddingTop='5vh' paddingBottom='10vh' autoRows='15vh'>
        <>
        {sections.map((section: Section) => {
          section.questions.map((question: Question, key: number) => {
            {
              ;(question.status == questionType || questionType == 'All questions') &&
                (section.name == sectionType || sectionType == 'All sections') && (
                  <GridItem>
                    <Flex
                      w='100%'
                      backgroundColor={
                        key % 2 == 0 ? theme.colors.listItemColor1 : theme.colors.listItemColor2
                      }
                      padding='2vh'
                      borderRadius={6}
                    >
                      <Text key={key} fontSize='2vh' w='10%' textAlign='left' paddingLeft='1vw'>
                        Q{questionNumber}
                      </Text>
                      <Flex w='70%' flexDirection='column' gap={3}>
                        <Flex w='100%'>
                          <Text key={key} fontSize='2vh' color={theme.colors.v6} noOfLines={2}>
                            {question.description}
                          </Text>
                        </Flex>
                        <Flex flexDirection='row'>
                          <Text fontSize='1.7vh'>Section: </Text>
                          <Text fontWeight='600' fontSize='1.7vh' paddingLeft='0.6vh'>
                            {section.name} |{' '}
                          </Text>
                          <Text fontSize='1.7vh' paddingLeft='0.6vh'>
                            Type:{' '}
                          </Text>
                          <Text fontWeight='600' fontSize='1.7vh' paddingLeft='0.6vh'>
                            {question.type}
                          </Text>
                        </Flex>
                      </Flex>
                      <Text key={key} fontSize='2vh' w='10%' textAlign='center'>
                        {question.marksObtained}/{question.maximumMarks}
                      </Text>
                      <Flex w='10%' justifyContent='right'>
                        <Image
                          src={statusIcon[question.status as keyof typeof statusIcon]}
                          w='5vh'
                          h='3vh'
                        />
                      </Flex>
                    </Flex>
                  </GridItem>
                )
              incrementQuestionNumber(questionNumber + 1)
            }
          })
        })}
        </>
      </Grid>
    </>
  )
}

export default QuestionsScroll
