import { Flex,Square,Text,Stack,Box,Card, CardHeader, CardBody, CardFooter, Button, Heading, VStack } from '@chakra-ui/react'
import QuizCard from "../quizCard"
const VerticalScrollView=()=>{
    return(
        <Box overflowY="scroll" maxH="54vh" bg="white" p={4} width="78%" sx={{ "&::-webkit-scrollbar": { display: "none" } }}>
      <VStack>
        <Box><QuizCard/></Box>
        <Box><QuizCard/></Box>
        <Box><QuizCard/></Box>
        <Box><QuizCard/></Box>
        <Box><QuizCard/></Box>
        <Box><QuizCard/></Box>
        <Box><QuizCard/></Box>
        <Box><QuizCard/></Box>
        <Box><QuizCard/></Box>
      </VStack>
    </Box>
    )
}

export default VerticalScrollView