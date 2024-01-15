import { Box, Grid, Heading, Text } from '@chakra-ui/react'
import { createColumnHelper } from '@tanstack/react-table'
import Table from '@checkQuiz/components/Table'
import data from '../../createQuiz/forms/MOCK_DATA.json'
import QuestionCounter from './QuestionCounter'

type Leaderboard = {
  Sr: number
  Name: string
  Rank: string
  Marks: string
  Checked: string
}

const columnHelper = createColumnHelper<Leaderboard>()

const columns = [
  columnHelper.accessor('Sr', {
    cell: (info) => info.row.index + 1,
    header: 'Sr.',
    enableColumnFilter: true,
  }),
  columnHelper.accessor('Name', {
    cell: (info) => info.row.original.Name,
    header: 'Name',
    enableColumnFilter: false,
  }),
  columnHelper.accessor('Rank', {
    cell: (info) => info.row.original.Rank,
    header: 'Current rank',
    enableColumnFilter: false,
  }),
  columnHelper.accessor('Marks', {
    cell: (info) => info.row.original.Marks,
    header: 'Current marks',
    enableColumnFilter: false,
  }),
  columnHelper.accessor('Checked', {
    cell: (info: any) => (
      <div
        style={{ cursor: 'pointer', textDecoration: 'underline' }}
      >
        <QuestionCounter
          totalQuestions={info.row.index + 2}
          checkedQuestion={info.row.index}
        />
      </div>
    ),
    header: 'Questions Checked',
    enableColumnFilter: false,
  }),
]

const Leaderboard = (leaderboard: any) => {
  return (
    <Box mx='auto' my='8vh'>
      <Table data={data} columns={columns}/>
    </Box>
  )
}

export default Leaderboard
