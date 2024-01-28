import { Button, Card, Flex, Heading, Image, Tag, Text, Stack, CardBody } from '@chakra-ui/react'
import defaultQuizBg from '@assets/images/default-quiz-bg.png'
import { useNavigate } from 'react-router-dom'

interface CreatedQuizCardProps {
  image: string
  quizId: string
  name: string
  tags: string[]
  content: string
  schedule: string
  edit: boolean
  id: string
}

const CreatedQuizCard: React.FC<CreatedQuizCardProps> = ({
  image,
  quizId,
  name,
  tags,
  content,
  schedule,
  edit,
  id,
}: CreatedQuizCardProps) => {
  let formattedTime
  if (schedule) {
    formattedTime = new Intl.DateTimeFormat('en-US', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
      timeZone: 'IST',
    }).format(new Date(schedule))
  } else {
    formattedTime = 'Invalid'
  }

  const navigate = useNavigate()

  return (
    <>
      <Card
        direction={{ base: 'column', sm: 'row' }}
        padding={4}
        overflow='hidden'
        variant='outline'
      >
        <Image
          src={image ? image : defaultQuizBg}
          alt='Quiz Banner'
          objectFit='cover'
          borderRadius={4}
        />
        <Stack>
          <CardBody>
            <Flex gap={2} alignItems='center'>
              <Heading size='sm' textTransform='capitalize'>
                {name}
              </Heading>
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
            <Text pt='2' color='n6'>
              {content}
            </Text>
            <Text pt='2' color='n6'>
              Schedule : <span style={{ color: '#191919' }}> {formattedTime} </span>
            </Text>
            <Button
              colorScheme='purple'
              bgColor='v6'
              px={6}
              borderRadius={3}
              size={'sm'}
              mt={4}
              onClick={() => navigate(`/check-quiz/${quizId}`)}
            >
              {edit ? 'Check Quiz' : 'Edit Quiz'}
            </Button>
          </CardBody>
        </Stack>
      </Card>
    </>
  )
}

export default CreatedQuizCard
