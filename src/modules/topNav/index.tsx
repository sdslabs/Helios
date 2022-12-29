import { Heading, HStack } from '@chakra-ui/react'

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
      <Heading color='brand' fontSize='xl' fontWeight='700'>
        Quizio
      </Heading>
    </HStack>
  )
}

export default TopNav
