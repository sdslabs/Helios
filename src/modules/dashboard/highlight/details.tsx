import {Text,Button,Heading } from '@chakra-ui/react'

const quizDetails = () => {
    return(
        <>
            <Heading fontSize='2rem'>Maths Quiz has Started</Heading>
            <Text fontSize='larger' pb={4}>All the Best!</Text>
            <Button colorScheme='purple' bgColor='brand' px={10}> Start Quiz </Button> 
        </>
    )
}
export default quizDetails;
            