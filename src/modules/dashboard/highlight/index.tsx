import { useState } from 'react'
import { VStack,Text,Flex, Spacer,Box,Grid, GridItem,Stack,Button, ButtonGroup, Heading, Card, CardHeader, CardBody, CardFooter } from '@chakra-ui/react'

const Highlight = () => {
    return(
        <>
        <Box width="78%" height={200}>
            <Flex ml="14%" height="100%">
                <Box width="66%" bg="#EBE7F2">
                <VStack alignItems='flex-start' color='brand' pt={12} pl={20}>
                    <Heading fontSize='larger'>Maths Quiz has Started</Heading>
                    <Text pb={4}>All the Best!</Text>
                    <Button colorScheme='purple' bgColor='brand' px={10}>
                        Start Quiz
                    </Button>
                </VStack>
                </Box>
                <Spacer/>
                <Box width="15%" bg="#EBE7F2">
                <VStack alignItems='center' color='brand' pt={12}>
                    <Heading fontSize='3rem' pb={2}>3</Heading>
                    <Text align='center' width="60%" pb={4}>Attempted Quizes</Text>
                </VStack>
                </Box>
                <Spacer/>
                <Box width="15%" bg='#EBE7F2'> 
                <VStack alignItems='center' color='brand' pt={12}>
                    <Heading fontSize='3rem' pb={2}>10</Heading>
                    <Text align='center' width="60%" pb={4}>quizzes created</Text>
                </VStack></Box>  
            </Flex>
        </Box>
        </>
    )

}
export default Highlight