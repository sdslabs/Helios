import { Box, Grid, Heading, Text } from '@chakra-ui/react'
import { createColumnHelper } from '@tanstack/react-table'
import Table from './Table'
import data from "./MOCK_DATA.json"

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

// const data: Registrant[] = [
//   {
//     Sr: 1,
//     Name: '<NAME>',
//     StartTime: '<START_TIME>',
//     SubmissionTime: '<SUB>',
//     Status: Status.Submitted,
//   },
//   {
//     Sr: 2,
//     Name: '<NAME>',
//     StartTime: '<START_TIME>',
//     SubmissionTime: '<SUB>',
//     Status: Status.Submitted,
//   },
//   {
//     Sr: 3,
//     Name: '<NAME>',
//     StartTime: '<START_TIME>',
//     SubmissionTime: '<SUB>',
//     Status: Status.Submitted,
//   }
//   ,
//   {
//     Sr: 3,
//     Name: '<NAME>',
//     StartTime: '<START_TIME>',
//     SubmissionTime: '<SUB>',
//     Status: Status.Submitted,
//   },
//   {
//     Sr: 3,
//     Name: '<NAME>',
//     StartTime: '<START_TIME>',
//     SubmissionTime: '<SUB>',
//     Status: Status.Submitted,
//   },
//   {
//     Sr: 3,
//     Name: '<NAME>',
//     StartTime: '<START_TIME>',
//     SubmissionTime: '<SUB>',
//     Status: Status.Submitted,
//   },
//   {
//     Sr: 3,
//     Name: '<NAME>',
//     StartTime: '<START_TIME>',
//     SubmissionTime: '<SUB>',
//     Status: Status.Submitted,
//   },
//   {
//     Sr: 3,
//     Name: '<NAME>',
//     StartTime: '<START_TIME>',
//     SubmissionTime: '<SUB>',
//     Status: Status.Submitted,
//   },
//   {
//     Sr: 3,
//     Name: '<NAME>',
//     StartTime: '<START_TIME>',
//     SubmissionTime: '<SUB>',
//     Status: Status.Submitted,
//   },
//   {
//     Sr: 3,
//     Name: '<NAME>',
//     StartTime: '<START_TIME>',
//     SubmissionTime: '<SUB>',
//     Status: Status.Submitted,
//   },
//   {
//     Sr: 3,
//     Name: '<NAME>',
//     StartTime: '<START_TIME>',
//     SubmissionTime: '<SUB>',
//     Status: Status.Submitted,
//   },
//   {
//     Sr: 3,
//     Name: '<NAME>',
//     StartTime: '<START_TIME>',
//     SubmissionTime: '<SUB>',
//     Status: Status.Submitted,
//   },
//   {
//     Sr: 3,
//     Name: '<NAME>',
//     StartTime: '<START_TIME>',
//     SubmissionTime: '<SUB>',
//     Status: Status.Submitted,
//   },
//   {
//     Sr: 3,
//     Name: '<NAME>',
//     StartTime: '<START_TIME>',
//     SubmissionTime: '<SUB>',
//     Status: Status.Submitted,
//   },
//   {
//     Sr: 3,
//     Name: '<NAME>',
//     StartTime: '<START_TIME>',
//     SubmissionTime: '<SUB>',
//     Status: Status.Submitted,
//   }
// ]



const columnHelper = createColumnHelper<Registrant>()

const columns = [
  columnHelper.accessor('Sr', {
    cell: (info) => info.getValue(),
    header: 'Sr.',
  }),
  columnHelper.accessor('Name', {
    cell: (row) => {
      return(
        <Text color='#604195'>{row.getValue()}</Text>
      )
    },
    header: 'Name',
  }),
  columnHelper.accessor('StartTime', {
    cell: (info) => info.getValue(),
    header: 'Start Time',
  }),
  columnHelper.accessor('SubmissionTime', {
    cell: (info) => info.getValue(),
    header: 'Submission Time',
  }),
  columnHelper.accessor("Status", {
    cell: (row) => {
      return (
        <Text color={row.getValue()==='Submitted'?'#006F16':row.getValue()==='Started'?'#604195':'#191919'} fontWeight='600'>{row.getValue().toUpperCase()}</Text>
      )
    },
    header: "Status",
  })
]

const Registrants = () => {
  return (
    <Box w='930px' mx='auto' my={14}>
      <Heading>Registrants</Heading>
      <Table data={data} columns={columns} />
    </Box>
  )
}

export default Registrants
