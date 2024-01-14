import { Box, Grid, Heading, Text } from '@chakra-ui/react'
import { createColumnHelper } from '@tanstack/react-table'
import Table from '../components/Table'
import data from './MOCK_DATA.json'

enum Status {
  Registered = 'Registered',
  Submitted = 'Submitted',
  Started = 'Started',
}

type Registrant = {
  Sr: number
  Name: string
  StartTime: string
  SubmissionTime: string
  Status: string
}

const columnHelper = createColumnHelper<Registrant>()

const columns = [
  columnHelper.accessor('Sr', {
    cell: (info) => info.getValue(),
    header: 'Sr.',
    enableColumnFilter: false,
  }),
  columnHelper.accessor('Name', {
    cell: (row) => {
      return <Text color='#604195'>{row.getValue()}</Text>
    },
    header: 'Name',
    enableColumnFilter: false,
  }),
  columnHelper.accessor('StartTime', {
    cell: (info) => info.getValue(),
    header: 'Start Time',
    enableColumnFilter: false,
  }),
  columnHelper.accessor('SubmissionTime', {
    cell: (info) => info.getValue(),
    header: 'Submission Time',
    enableColumnFilter: false,
  }),
  columnHelper.accessor('Status', {
    cell: (row) => {
      return (
        <Text
          color={
            row.getValue() === 'Submitted'
              ? '#006F16'
              : row.getValue() === 'Started'
              ? '#604195'
              : '#191919'
          }
          fontWeight='600'
        >
          {row.getValue().toUpperCase()}
        </Text>
      )
    },
    header: 'Status',
    enableColumnFilter: true,
  }),
]

const Registrants = () => {
  return (
    <Box w='48vw' mx='auto' my='8vh'>
      <Heading>Registrants</Heading>
      <Table data={data} columns={columns} />
    </Box>
  )
}

export default Registrants
