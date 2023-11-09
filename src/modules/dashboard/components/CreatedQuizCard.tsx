import { Box, Button, Card, Flex, Heading, Image, Tag, Text } from '@chakra-ui/react'

const CreatedQuizCard: React.FC<any> = ({ image, name, tags, content, schedule, edit }) => {
  return (
    <Card padding='16px' height='200px'>
      <Flex gap='16px'>
        <Image
          width='144px'
          src='https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60'
        />
        <Box>
          <Flex flexDirection='column' gap='10px'>
            <Flex gap='8px' alignItems='center'>
              <Heading fontSize='14px'>{name}</Heading>
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
                  padding='4px, 10px'
                  key={i}
                >
                  {t}
                </Tag>
              ))}
            </Flex>
            <Flex flexDirection='column' gap='8px'>
              <Text color='#939393'>{content}</Text>
              <Flex color='#939393'>Scheduled:<Text color='black'>{schedule}</Text></Flex>
            </Flex>
            <Button height='32px' width='111px' bgColor='#593C8F' color='#FFFFFF'>{edit ? 'Edit Quiz' : 'Check Quiz'}</Button>
          </Flex>
        </Box>
      </Flex>
    </Card>
  )
}

export default CreatedQuizCard
