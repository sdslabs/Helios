import { Box, Text } from '@chakra-ui/react'
import { createColumnHelper } from '@tanstack/react-table'
import Table from '@checkQuiz/components/Table'
import QuestionCounter from './QuestionCounter'
import AssignView from './Assign'
import { Question as QuestionType, Section } from '@checkQuiz/types'
import { useNavigate } from 'react-router-dom'
import useCheckQuizStore from '@checkQuiz/store/checkQuizStore'

const columnHelper = createColumnHelper<QuestionType>()

interface QuestionsBoardProps {
  quizId: string
}

const QuestionsBoard: React.FC<QuestionsBoardProps> = ({ quizId }) => {
  const Navigate = useNavigate()
  const [sections] = useCheckQuizStore((state) => [state.sections])
  const [
    setCurrentSection,
    setCurrentSectionIndex,
    setCurrentQuestionIndex,
  ] = useCheckQuizStore((state) => [
    state.setCurrentSection,
    state.setCurrentSectionIndex,
    state.setCurrentQuestionIndex,
  ])

  const handleQuestionClick = (info: any) => {
    sections.forEach((section: Section, index: number) => {
      section.questions.forEach((question: QuestionType, questionIndex: number) => {
        if (question._id === info._id) {
          setCurrentSectionIndex(index + 1)
          setCurrentQuestionIndex(questionIndex + 1)
          setCurrentSection(sections[index])
          Navigate(`/check-quiz/${quizId}/${info._id}`)
        }
      })
    })
  }
  const columns = [
    columnHelper.accessor('description', {
      cell: (info: any) => info.row.original.description,
      header: 'Question',
      enableColumnFilter: false,
    }),
    // columnHelper.accessor('assignedTo', {
    //   cell: (info: any) => <AssignView AssignedTo={info.row.original.assignedTo} />,
    //   header: 'Assigned To',
    //   enableColumnFilter: false,
    // }),
    columnHelper.accessor('checkedAttempts', {
      cell: (info: any) => (
        <div
          style={{ cursor: 'pointer', textDecoration: 'underline' }}
          onClick={() => handleQuestionClick(info.row.original)}
        >
          <QuestionCounter
            totalQuestions={info.row.original.totalAttempts}
            checkedQuestion={info.row.original.checkedAttempts}
          />
        </div>
      ),
      header: 'Questions Checked',
      enableColumnFilter: true,
    }),
  ]

  return (
    <>
      {sections.map((section: Section) => (
        <Box key={section.name}>
          <Text color={'v6'} fontWeight={600} mt={8}>
            {section.name}
          </Text>
          <Box mt={6}>
            <Table
              data={section.questions}
              columns={columns}
              fontSize={'1.1875rem'}
              showPagination={true}
            />
          </Box>
        </Box>
      ))}
    </>
  )
}

export default QuestionsBoard
