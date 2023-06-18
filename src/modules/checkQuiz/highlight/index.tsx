import { useState } from 'react'
import { VStack,Text,Flex, Spacer,Box,Grid, GridItem,Stack,Button, ButtonGroup, Heading, Card, CardHeader, CardBody, CardFooter } from '@chakra-ui/react'

const Highlight = () => {
    return(
        <>
        <Box width="80%" margin={16} height={250}>
            <Flex height="100%">
                <Box width="51%" bg="rgba(235, 231, 242, 0.4)">
                <VStack alignItems='flex-start' color='brand' pt={12} pl={20}>
                    <Heading fontSize='2rem' pb={2}>Maths Quiz </Heading>
                    <Text fontSize='larger' color='accentBlack'>Scheduled on:</Text>
                    <Text fontSize='larger' color='accentBlack'>Created By:</Text>
                    <Text fontSize='larger' color='accentBlack'>Result published by:</Text>
                </VStack>
                </Box>
                <Spacer/>
                <Box width="15%" bg="rgba(235, 231, 242, 0.4)">
                <VStack alignItems='center' color='brand' pt={12}>
                    <Heading fontSize='3rem' pb={2}>1000</Heading>
                    <Text align='center' width="60%" pb={4}>Total Participants</Text>
                </VStack>
                </Box>
                <Spacer/>
                <Box width="15%" bg="rgba(235, 231, 242, 0.4)"> 
                <VStack alignItems='center' color='brand' pt={12}>
                    <Heading fontSize='3rem' pb={2}>1000</Heading>
                    <Text align='center' width="60%" pb={4}>Checks Completed</Text>
                </VStack></Box>  
            </Flex>
        </Box>
        </>
    )

}
export default Highlight