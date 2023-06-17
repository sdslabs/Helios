import { Square,Text,Stack,Box,Card, CardHeader, CardBody, CardFooter, Button, Heading } from '@chakra-ui/react'

const QuizCard=()=>{
    return(
        <Card  width="456px" height="208px" mr={20} >
            <Stack direction="row" spacing={2}>
                <Box bg="#EBE7F2" height={24} width={36} ml={2} mt={16}></Box>
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
                    <Button mt={-10} variant='solid' colorScheme='purple' bgColor='brand'>
                        Start Quiz
                    </Button>
                    </CardFooter>
                </Stack>
            </Stack>
        </Card>
    )
}

export default QuizCard