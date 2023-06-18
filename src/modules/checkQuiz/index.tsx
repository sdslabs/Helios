import { useState } from 'react'
import {
  Stack,
  Text,
  Box,
  Heading,
} from '@chakra-ui/react'
import HighlightContent from './highlight'
import TopNav from '../topNav'

const Dashboard = () => {
  return (
    <>
      <Stack spacing={0}>
        <TopNav />
        <Box width='100%' display='flex' justifyContent='center' alignItems='center'>
            <HighlightContent />
        </Box>
      </Stack>
    </>
  )
}
export default Dashboard
