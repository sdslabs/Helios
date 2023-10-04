import { Text, Stack, Box, Card, CardBody, CardFooter, Button, Heading } from '@chakra-ui/react'
import QuizCardProps from './QuizCardProps'

const QuizCard = ({ HeadingText, DescriptionText, StartTime, ButtonText }: QuizCardProps) => {
  return (
    <Card width='28rem' height='14rem' mr={4}>
      <Stack direction='row' spacing={2}>
        <Box bg='#EBE7F2' height={24} width={36} ml={12} mt={16}></Box>
        <Stack>
          <CardBody>
            <Heading size='md'>{HeadingText}</Heading>

            <Text py='2'>{DescriptionText}</Text>
            <Text py='2'>Scheduled: {StartTime}</Text>
          </CardBody>

          <CardFooter>
            <Button mt={-10} variant='solid' colorScheme='purple' bgColor='brand'>
              {ButtonText}
            </Button>
          </CardFooter>
        </Stack>
      </Stack>
    </Card>
  )
}

export default QuizCard
