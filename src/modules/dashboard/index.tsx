import { useState } from 'react'
import { VStack,Text,Flex, Spacer,Box,Grid, GridItem,Stack,Button, ButtonGroup, Heading, Card, CardHeader, CardBody, CardFooter } from '@chakra-ui/react'
import QuizCard from "./quizCard"
import Highlight from "./highlight"
const Dashboard = () => {
    return (
        <>
        <Stack spacing={8}>
            <Box>Quizio</Box>

            <Highlight/>
{/* 
            <Box width={}  bg="#EBE7F2" display="flex" alignItems="center" justifyContent="center"> 
                <Text color='brand'>
                    Hehe
                </Text>
            </Box> */}



            {/* <Flex wrap="wrap">
                <QuizCard ></QuizCard>
                <Spacer/>
                <QuizCard></QuizCard>
                <Spacer/>
                <QuizCard></QuizCard>
                <Spacer/>
                <QuizCard></QuizCard>
                <Spacer/>
                <QuizCard></QuizCard>
            </Flex> */}



        </Stack>
        {/* <Card>
            <CardHeader>
    <Heading size='md'></Heading>
  </CardHeader>
        </Card>
        <Button>Hello</Button> */}
        </>
    )
}
export default Dashboard