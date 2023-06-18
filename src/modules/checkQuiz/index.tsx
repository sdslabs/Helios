import {
    VStack,
    Text,
    Flex,
    Spacer,
    Box,
    Grid,
    GridItem,
    Stack,
    Button,
    ButtonGroup,
    Heading,
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    ChakraProvider,
  } from '@chakra-ui/react'
import theme from '../../common/theme'
import TopNav from '../topNav'
import Highlight from './highlight'

const checkQuiz = () => {
    return(
        <>
            <Stack spacing={0}>
                <TopNav />
                <Box width='100%' display='flex' justifyContent='center' alignItems='center'>
                    <Highlight />
                </Box>
            </Stack>
        </>
    )
}

export default checkQuiz;