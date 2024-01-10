import { Box, Grid, Heading, Text } from '@chakra-ui/react'
import { createColumnHelper } from '@tanstack/react-table'
import Table from '@checkQuiz/components/Table'

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
    enableColumnFilter: false,
  }),
  columnHelper.accessor('Name', {
    cell: (info) => info.row.index + 1,
    header: 'Name',
    enableColumnFilter: false,
  }),
  columnHelper.accessor('Rank', {
    cell: (info) => info.row.index + 1,
    header: 'Current rank',
    enableColumnFilter: false,
  }),
  columnHelper.accessor('Marks', {
    cell: (info) => info.getValue(),
    header: 'Current marks',
    enableColumnFilter: false,
  }),
  columnHelper.accessor('Checked', {
    cell: (info) => info.row.index + 1,
    header: 'Questions Checked',
    enableColumnFilter: false,
  }),
]

const Leaderboard = (leaderboard: any) => {
  return (
    <Box mx='auto' my='8vh'>
      <Table data={leaderboard} columns={columns} />
    </Box>
  )
}

export default Leaderboard
