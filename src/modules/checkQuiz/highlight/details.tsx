import {Text,Button,Heading } from '@chakra-ui/react'

const cardContents = {
    quizName : "Maths Quiz",
    scheduled : "25 June 2023, 03:00 PM",
    createdBy : "Reeshita Paul",
    isPublished : false,
    publishedBy : "Reeshita Paul"
}
const quizDetails = () => {
    return(
        <>
            <Heading fontSize='2rem'>{cardContents.quizName}</Heading>
            <Text fontSize='larger' color='accentBlack'>Scheduled on: {cardContents.scheduled}</Text>
            <Text fontSize='larger' color='accentBlack'>Created By: {cardContents.createdBy}</Text>
            {/* <Text fontSize='larger' color='accentBlack'>Published By: {cardContents.publishedBy}</Text> */}
        </>
    )
}
export default quizDetails;
            