import { Button, Heading, HStack, Avatar } from '@chakra-ui/react'
import { Link } from 'react-router-dom'

interface TopNavProps {
  isDashboard?: boolean
  isAdmin?: boolean
}

const TopNav = ({ isDashboard = false, isAdmin = false }: TopNavProps) => {
  //add onclicks for the quizio button and the host quiz button
  //create a new quiz request to backend and then redirect to the quiz creation page
  return (
    <HStack
      px={12}
      py={3}
      boxShadow='lg'
      pos='sticky'
      top={0}
      left={0}
      id='top-nav'
      zIndex='banner'
      bg='white'
      justifyContent='space-between'
    >
      <Heading color='brand' fontSize='xl' fontWeight='700'>
        Quizio
      </Heading>
      <HStack spacing={4}>
        {isDashboard && isAdmin && (
          <Button colorScheme='purple' bgColor='brand' px={4}>
          <Link to={`/create/quizID`}>{
            //TODO:create a unique id in place of quizID
          }
          + Host Quiz
          </Link>
          </Button>
        )}
        {isDashboard && (
          <Avatar name='User Name' src='/path-to-your-profile-picture.jpg' size='sm' />
        )}
      </HStack>
    </HStack>
  )
}

export default TopNav
