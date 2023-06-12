import { Text,Stack,Box,Card, CardHeader, CardBody, CardFooter, Button, Heading } from '@chakra-ui/react'

const QuizCard=()=>{
    return(
        <Card m={4} width="40%">
            <Stack direction="row" spacing={4}>
                <Box bgImage="url('https://www.google.com/url?sa=i&url=http%3A%2F%2Fwww.clker.com%2Fclipart-25196.html&psig=AOvVaw3DTNA7pZ-U_VVA2VVEN2Dm&ust=1686682736119000&source=images&cd=vfe&ved=0CBMQjhxqFwoTCLjPlZq1vv8CFQAAAAAdAAAAABAZ')" height="30%" width="30%">Component 2</Box>
                <Stack>
                    <CardBody>
                    <Heading size='md'>Recruitment Test</Heading>

                    <Text py='2'>
                        This test is for the recruitments of SDSLabs, PAG, DSG ans InfoSec.
                    </Text>
                    <Text py='2'>
                        Scheduled: 26 Jun, 2021 03:00 pm
                    </Text>
                    </CardBody>

                    <CardFooter>
                    <Button variant='solid' colorScheme='purple' bgColor='brand'>
                        Start Quiz
                    </Button>
                    </CardFooter>
                </Stack>
            </Stack>
        </Card>
    )
}

export default QuizCard