import React from "react"
import { Box, Flex, Spacer, Link, Heading, Button, Avatar } from '@chakra-ui/react';
import profilepic from "../views/profile.png"


const Navbar:React.FC=()=> {
  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      bg="white"
      color="white"
      boxShadow='md'
      height='52px'
      paddingLeft='44px'
      paddingRight='44px'
    >
      <Flex align="center"  justifyItems='center'>
        <Heading as="h1" fontSize='20px' color="var(--V6, #604195)">
          Quizio
        </Heading>
      </Flex>

      <Box
        display={{ base: 'none', md: 'block' }}
        mt={{ base: 4, md: 0 }}
      >
        <Button variant="solid"
          bg="var(--V6, #604195)"
          color="white"
          height='36px'
          width='126px'
          fontSize='14px'>
          + Host Quiz
        </Button>
        <Avatar size="sm" name="User" marginLeft='16px' src={profilepic} />
      </Box>
    </Flex>
  )
}

export default Navbar