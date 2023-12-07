import React from 'react'
import { Box, Flex, Heading, Button, Avatar } from '@chakra-ui/react'
import profilepic from '../views/profile.png'

const Navbar: React.FC = () => {
  return (
    <Flex
      as='nav'
      align='center'
      justify='space-between'
      wrap='wrap'
      bg='white'
      color='white'
      boxShadow='md'
      height='5.2vh'
      paddingLeft='2.2vw'
      paddingRight='2.2vw'
    >
      <Flex align='center' justifyItems='center'>
        <Heading as='h1' fontSize='20px' color='var(--V6, #604195)'>
          Quizio
        </Heading>
      </Flex>

      <Box display={{ base: 'none', md: 'block' }} mt={{ base: 4, md: 0 }}>
        <Button
          variant='solid'
          bg='var(--V6, #604195)'
          color='white'
          height='3.6vh'
          width='6.3vw'
          fontSize='14px'
        >
          + Host Quiz
        </Button>
        <Avatar size='sm' name='User' marginLeft='1.6vh' src={profilepic} />
      </Box>
    </Flex>
  )
}

export default Navbar
