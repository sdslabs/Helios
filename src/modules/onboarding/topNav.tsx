import { Heading, HStack, Button } from '@chakra-ui/react';
import React from 'react';

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
      justifyContent="space-between" 
    >
        <Heading color='brand' fontSize='xl' fontWeight='700'>
            Quizio
        </Heading>
        <Button colorScheme='purple' bgColor='brand' px={10}>
            + Host Quiz
        </Button>
    </HStack>
  );
};

export default TopNav;
