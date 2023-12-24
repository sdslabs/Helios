import { Box, Button, Card, Flex, Heading, Image, Tag, Text } from '@chakra-ui/react'
interface CreatedQuizCardProps {
  image: string
  name: string
  tags: string[]
  content: string
  schedule: string
  edit: boolean
}

const CreatedQuizCard: React.FC<CreatedQuizCardProps> = ({ image, name, tags, content, schedule, edit }: CreatedQuizCardProps) => {
  return (
    <Card padding='1.6vh' height='20vh'>
      <Flex gap='1.6vh'>
        <Image width='7.5vw' src={image} />
        <Box>
          <Flex flexDirection='column' gap='1vh'>
            <Flex gap='0.76vh' alignItems='center'>
              <Heading fontSize='1.2vh'>{name}</Heading>
              {tags.map((t: any, i: any) => (
                <Tag
                  bgColor={
                    t === 'Completed'
                      ? 'rgba(255, 137, 0, 0.24)'
                      : t === 'Live'
                      ? 'rgba(39, 166, 36, 0.20)'
                      : '#EBE7F2'
                  }
                  color={t === 'Completed' ? '#FF8900' : t === 'Live' ? '#27A624' : '#775BA4'}
                  padding='0.4vh, 0.1vh'
                  key={i}
                >
                  {t}
                </Tag>
              ))}
            </Flex>
            <Flex flexDirection='column' gap='0.8vh'>
              <Text color='#939393'>{content}</Text>
              <Flex color='#939393'>
                Scheduled:<Text color='black'>{schedule}</Text>
              </Flex>
            </Flex>
            <Button height='3.2vh' width='5.2vw' bgColor='#593C8F' color='#FFFFFF'>
              {edit ? 'Check Quiz' : 'Edit Quiz'}
            </Button>
          </Flex>
        </Box>
      </Flex>
    </Card>
  )
}

export default CreatedQuizCard
