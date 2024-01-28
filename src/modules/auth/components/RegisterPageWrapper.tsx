import { Box, Center, Heading, Image } from '@chakra-ui/react'

interface RegisterPageWrapperProps {
  imageUrl: string
  children: JSX.Element | null
  heading: string
}

export const RegisterPageWrapper = ({ imageUrl, children, heading }: RegisterPageWrapperProps) => {
  return (
    <Box as='main' h='100vh' w='100vw' display='flex'>
      <Center bgColor='brand' w='40%' flexDirection='column'>
        <Heading color='white'>{heading}</Heading>
        <Image src={imageUrl} w='500px' h='500px' />
      </Center>
      <Center p={40}>{children}</Center>
    </Box>
  )
}
