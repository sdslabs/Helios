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
import VerticalScrollView from './verticalScrollView'
import Highlight from './highlight'
import TopNav from '@common/components/TopNav'

const Profile = () => {
  return (
    <>
      <Stack spacing={0}>
        <TopNav />

        <Box width='100%' display='flex' justifyContent='center' alignItems='center'>
          <Highlight />
        </Box>

        <Box width='100%' display='flex' justifyContent='center' alignItems='center'>
          <Box fontSize="1.2rem" fontWeight="semibold" mb={4} width='78%' display='flex'>
            <Text
              color='brand'
              py={2}
            >Attempted Quizzes
            </Text>
            
          </Box>
        </Box>

        <Box width="100%"  display='flex' justifyContent='center' alignItems='center'>
            <VerticalScrollView ></VerticalScrollView>
        </Box>

      </Stack>
    </>
  )
}
export default Profile
