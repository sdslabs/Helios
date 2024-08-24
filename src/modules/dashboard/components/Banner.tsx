import { Card, Flex, Heading, Text } from '@chakra-ui/react'
import useUserDetailsStore from '@dashboard/store/UserDetailsStore'

const Banner: React.FC = () => {
  const { firstName, lastName } = useUserDetailsStore((state) => {
    return { firstName: state.firstName, lastName: state.lastName }
  })
  return (
    <Card w='60vw' backgroundColor='#EBE7F2' boxShadow='none' padding='6.4vh'>
      <Flex flexDirection='column' gap='0.8vh'>
        <Heading color='#604195' fontSize='3.2vh' fontWeight='600'>
          Good luck, {firstName} {lastName}!
        </Heading>
        <Text color='#604195' fontSize='2vh'>
          You will have fun!
        </Text>
      </Flex>
    </Card>
  )
}

export default Banner
