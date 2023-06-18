import { VStack,Text,Flex, Spacer,Box,Heading } from '@chakra-ui/react'
import React from 'react'

interface HighlightWrapperProps {
    details: React.ReactNode,
    cardinfo1 : any,
    cardinfo2 : any,
}
const HighlightWrapper = ({details, cardinfo1, cardinfo2} : HighlightWrapperProps) => {
    return(
        <>
            <Box width="78%" margin={16} height={212}>
                <Flex height="100%">
                    <Box width="66%" bg="rgba(235, 231, 242, 0.4)">
                        <VStack alignItems='flex-start' color='brand' pt={12} pl={20}>
                            {details}
                        </VStack>
                    </Box>
                    <Spacer/>
                    <Box width="15%" bg="rgba(235, 231, 242, 0.4)">
                        <VStack alignItems='center' color='brand' pt={12}>
                            <Heading fontSize='3rem' pb={2}>{cardinfo1.value}</Heading>
                            <Text align='center' width="60%" pb={4}>{cardinfo1.key}</Text>
                        </VStack>
                    </Box>
                    <Spacer/>
                    <Box width="15%" bg="rgba(235, 231, 242, 0.4)"> 
                        <VStack alignItems='center' color='brand' pt={12}>
                            <Heading fontSize='3rem' pb={2}>{cardinfo2.value}</Heading>
                            <Text align='center' width="60%" pb={4}>{cardinfo2.key}</Text>
                        </VStack>
                    </Box>  
                </Flex>
            </Box>
        </>
    )

}
export default HighlightWrapper