import { Flex,Square,Text,Stack,Box,Card, CardHeader, CardBody, CardFooter, Button, Heading } from '@chakra-ui/react'
import QuizCard from "../quizCard"
const ScrollView=()=>{
    return(
        <Box overflowX="scroll" bg="white" p={4} width="80%" sx={{ "&::-webkit-scrollbar": { display: "none" } }}>
      <Flex>
        <Box > <QuizCard/></Box>
        <Box><QuizCard/></Box>
        <Box><QuizCard/></Box>
        <Box><QuizCard/></Box>
        <Box><QuizCard/></Box>
        <Box><QuizCard/></Box>
        <Box><QuizCard/></Box>
        <Box><QuizCard/></Box>
        <Box><QuizCard/></Box>
        {/* Add more components as needed */}
      </Flex>
    </Box>
    )
}

export default ScrollView