import { Box, Grid, Heading, Text } from '@chakra-ui/react'
import { createColumnHelper } from '@tanstack/react-table'
import Table from '@checkQuiz/components/Table'
import QuestionCounter from './QuestionCounter'
import useCheckQuizStore from '@checkQuiz/store/checkQuizStore'
import { useEffect, useState } from 'react'

type Leaderboard = {
  Sr: number
  userId: string
  rank: number
  marks: string
  questionsAttempted: number
  questionsChecked: number
  name: string
  phoneNumber: string
}

const Leaderboard = () => {
  const [leaderboard] = useCheckQuizStore((state) => [state.leaderboard])
  const [leaderboardUserDetails] = useCheckQuizStore((state) => [state.leaderboardUserDetails])
  const [_, refresh] = useState<number>(0)
  useEffect(() => {
    refresh((state) => {
      return state++
    })
  }, [leaderboard])

  const columnHelper = createColumnHelper<Leaderboard>()

  const columns = [
    columnHelper.accessor('Sr', {
      cell: (info) => info.row.index + 1,
      header: 'Sr.',
      enableColumnFilter: false,
    }),

    columnHelper.accessor('name', {
      cell: (info) => {
        const userDetail = leaderboardUserDetails.find(
          (user: any) => user.userId === info.row.original.userId,
        )
        if (userDetail) {
          return userDetail.name
        } else {
          return ''
        }
      },
      header: 'Name',
      enableColumnFilter: false,
    }),
    columnHelper.accessor('phoneNumber', {
      cell: (info) => {
        const userDetail = leaderboardUserDetails.find(
          (user: any) => user.userId === info.row.original.userId,
        )
        if (userDetail) {
          return userDetail.phoneNumber
        } else {
          return ''
        }
      },
      header: 'Phone Number',
      enableColumnFilter: false,
    }),

    columnHelper.accessor('rank', {
      cell: (info) => info.row.index + 1,
      header: 'Current rank',
      enableColumnFilter: false,
    }),
    columnHelper.accessor('marks', {
      cell: (info) => info.row.original.marks,
      header: 'Current marks',
      enableColumnFilter: false,
    }),
    columnHelper.accessor('questionsAttempted', {
      cell: (info: any) => (
        <div style={{ cursor: 'pointer', textDecoration: 'underline' }}>
          <QuestionCounter
            totalQuestions={info.row.original.questionsAttempted}
            checkedQuestion={info.row.original.questionsChecked}
          />
        </div>
      ),
      header: 'Questions Checked',
      enableColumnFilter: false,
    }),
  ]

  return (
    <Box mx='auto' my='8vh'>
      <Table data={leaderboard} columns={columns} />
    </Box>
  )
}

export default Leaderboard