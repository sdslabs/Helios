import {  Button,
          Heading, 
          HStack,
          Spacer,
        Image } 
  from '@chakra-ui/react'

const TopNav = () => {
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
    >
      <Heading color='brand' fontSize='xl' fontWeight='700'>Quizio</Heading>
      <Spacer />
      <Button colorScheme='purple' bgColor='brand' px={4}> + Host Quiz </Button>
      <Image
        borderRadius='full'
        boxSize='40px'
        src='https://bit.ly/dan-abramov'
        alt='Dan Abramov'
        m='16px'
      />
    </HStack>
  )
}

export default TopNav
