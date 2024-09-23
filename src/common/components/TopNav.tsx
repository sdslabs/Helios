import { Button, Heading, HStack, Avatar, Text } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import { useHostQuiz } from '@createQuiz/api/useQuiz'
import useAuthStore from '@auth/store/authStore'

interface TopNavProps {
  isDashboard?: boolean
  isAdmin?: boolean
}

const TopNav = ({ isDashboard = false, isAdmin = false }: TopNavProps) => {
  const profileUrl = useAuthStore((state) => state.profileUrl)
  const navigate = useNavigate()
  const { mutate } = useHostQuiz()
  const handleHomeClick = () => {
    navigate('/dashboard')
  }
  const handleHostQuiz = () => {
    mutate(void 0, {
      onSuccess: (data) => {
        navigate(`/create-quiz/${data.quizId}`)
      },
    })
  }
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
      <Heading color='brand' fontSize='xl' fontWeight='700' onClick={handleHomeClick}>
        Quizio
      </Heading>
      <HStack spacing={4}>
        {isDashboard && isAdmin && (
          <Button colorScheme='purple' bgColor='brand' px={4} onClick={handleHostQuiz}>
            + Host Quiz
          </Button>
        )}
        {isDashboard && (
          <>
                        <Avatar name='User Name' src={profileUrl} size='sm' onClick={() => {navigate('/profile')}}/>
          </>
        )}
      </HStack>
    </HStack>
  )
}

export default TopNav
