import { Box, Text } from '@chakra-ui/react'
import { createColumnHelper } from '@tanstack/react-table'
import Table from '@checkQuiz/components/Table'
import QuestionCounter from './QuestionCounter'
import AssignView from './Assign'
import { Question as QuestionType, Section } from '@checkQuiz/types'
import { useNavigate } from 'react-router-dom'

const columnHelper = createColumnHelper<QuestionType>()

interface QuestionsBoardProps {
  quizID: string,
  Sections: Section[]
}

const QuestionsBoard: React.FC<QuestionsBoardProps> = ({ quizID, Sections }) => {
  const Navigate = useNavigate()

  const columns = [
    columnHelper.accessor('description', {
      cell: (info: any) => info.row.original.description,
      header: 'Question',
      enableColumnFilter: false,
    }),
    columnHelper.accessor('assignedTo', {
      cell: (info: any) => <AssignView AssignedTo={info.row.original.assignedTo} />,
      header: 'Assigned To',
      enableColumnFilter: false,
    }),
    columnHelper.accessor('checkedAttempts', {
      cell: (info: any) => (
        <div
          style={{ cursor: 'pointer', textDecoration: 'underline' }}
          onClick={() => Navigate(`/checkQuiz/${quizID}/${info.row.original._id}`)}
        >
          <QuestionCounter
            totalQuestions={info.row.original.totalAttempts}
            checkedQuestion={info.row.original.checkedAttempts}
          />
        </div>
      ),
      header: 'Questions Checked',
      enableColumnFilter: false,
    }),
  ]

  return (
    <>
      {Sections.map((section) => (
        <Box key={section.name}>
          <Text color={'v6'} fontWeight={600} mt={8}>
            {section.name}
          </Text>
          <Box mt={6}>
            <Table
              data={section.questions}
              columns={columns}
              fontSize={'1.1875rem'}
              showPagination={false}
            />
          </Box>
        </Box>
      ))}
    </>
  )
}

export default QuestionsBoard
