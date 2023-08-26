import { Box, Center, Heading, Image } from '@chakra-ui/react'
import { REGISTRATION_STEPS } from '../constants'
import { RegistrationProgress } from './RegistrationProgress'

interface RegisterPageWrapperProps {
  imageUrl: string
  children: JSX.Element | null
  step: REGISTRATION_STEPS
  heading: string
}

export const RegisterPageWrapper = ({
  imageUrl,
  step,
  children,
  heading,
}: RegisterPageWrapperProps) => {
  return (
    <Box as='main' h='100vh' w='100vw' display='flex'>
      <Center bgColor='brand' w='40%' flexDirection='column'>
        <Heading color='white'>{heading}</Heading>
        <Image src={imageUrl} w='500px' h='500px' />
      </Center>
      <Center p={40}>
        {/* <RegistrationProgress step={step} /> */}
        {children}
      </Center>
    </Box>
  )
}
