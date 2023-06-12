import { useState } from 'react'
import { Stack,Button, ButtonGroup, Heading, Card, CardHeader, CardBody, CardFooter } from '@chakra-ui/react'
import QuizCard from "./quizCard"
const Dashboard = () => {
    return (
        <>
        <Stack direction="row">
        <QuizCard></QuizCard>
        <QuizCard></QuizCard>
        <QuizCard></QuizCard>
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