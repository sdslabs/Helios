import { useState } from 'react'
import { VStack,Text,Flex, Spacer,Box,Grid, GridItem,Stack,Button, ButtonGroup, Heading, Card, CardHeader, CardBody, CardFooter } from '@chakra-ui/react'
import { EmailIcon, PhoneIcon } from '@chakra-ui/icons';
const Highlight = () => {
    return(
        <>
        <Box width="78%" margin={16} height={200}>
            <Flex height="100%">
                <Box width="66%" display="flex" alignItems="center" justifyContent="justify">
                <VStack>
                    <Box width="9rem" height="9rem" bgColor="brand" borderRadius="50%"></Box>
                    <Text color="brand" fontSize='larger' pb={4}>Edit details</Text>
                </VStack>
                <VStack alignItems='flex-start' color='brand' pl="2rem" spacing={0}>
                    <Heading fontSize='2rem'>Somesh Solanki</Heading>
                    <Text fontSize='larger' color="black" >Indian Institute of Technology, Roorkee</Text>
                    <Text fontSize='larger' >Jaipur, Rajasthan</Text>
                    <Stack direction="row" alignItems="center" pt="1rem">
                        <EmailIcon height="100%"></EmailIcon>
                        <Text fontSize='larger' color="black" >someshmarider@gmail.com</Text>
                    </Stack>
                    <Stack direction="row" alignItems="center">
                        <PhoneIcon></PhoneIcon>
                        <Text fontSize='larger' color="black" >0123456789</Text>
                    </Stack>
                    
                    
                </VStack>
                </Box>
                <Spacer/>
                <Box width="15%" bg="rgba(235, 231, 242, 0.4)">
                <VStack alignItems='center' color='brand' pt={12}>
                    <Heading fontSize='3rem' pb={2}>3</Heading>
                    <Text align='center' width="60%" pb={4}>Attempted Quizes</Text>
                </VStack>
                </Box>
                <Spacer/>
                <Box width="15%" bg="rgba(235, 231, 242, 0.4)"> 
                <VStack alignItems='center' color='brand' pt={12}>
                    <Heading fontSize='3rem' pb={2}>10</Heading>
                    <Text align='center' width="60%" pb={4}>quizzes created</Text>
                </VStack>
                </Box>  
            </Flex>
        </Box>
        </>
    )

}
export default Highlight