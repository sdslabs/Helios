import { useState } from 'react'
import {
  VStack,
  Text,
  Flex,
  Spacer,
  Box,
  Grid,
  GridItem,
  Stack,
  Button,
  ButtonGroup,
  Heading,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
} from '@chakra-ui/react'
import QuizCard from './quizCard'
import Highlight from './highlight'
import HorizontalScrollView from './horizontalScrollView'
import TopNav from '../topNav'

const Dashboard = () => {
  return (
    <>
      <Stack spacing={0}>
        <TopNav />

        <Box width='100%' display='flex' justifyContent='center' alignItems='center'>
          <Highlight />
        </Box>

        <Box width='100%' display='flex' justifyContent='center' alignItems='center'>
          <Box mb={4} width='78%' display='flex'>
            <Text
              color='brand'
              borderBottom='2px'
              borderBottomColor='brand'
              py={2}
            >
              Quizzes
            </Text>
            <Text borderBottom='2px' borderBottomColor='#939393' px={5} py={2}>
              Created Quizzes
            </Text>
          </Box>
        </Box>

        <Box width='100%' display='flex' justifyContent='center' alignItems='center'>
          <Box
            width='78%'
            height={12}
            bg='rgba(235, 231, 242, 0.4)'
            display='flex'
            alignItems='center'
            justifyContent='center'
          >
            <Heading opacity='2.5' fontSize='large' color='brand'>
              Ongoing Quizzes
            </Heading>
          </Box>
        </Box>

        <Box width='100%' display='flex' justifyContent='center' alignItems='center'>
          <HorizontalScrollView />
        </Box>

        <Box width='100%' display='flex' justifyContent='center' alignItems='center'>
          <Box
            width='78%'
            height={12}
            mt={4}
            bg='rgba(235, 231, 242, 0.4)'
            display='flex'
            alignItems='center'
            justifyContent='center'
          >
            <Heading opacity='2.5' fontSize='large' color='brand'>
              Upcoming Quizzes
            </Heading>
          </Box>
        </Box>

        <Box width='100%' display='flex' justifyContent='center' alignItems='center'>
          <HorizontalScrollView />
        </Box>
      </Stack>
    </>
  )
}
export default Dashboard
