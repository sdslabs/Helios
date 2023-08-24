import { Button, Heading, HStack, Avatar } from '@chakra-ui/react';

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
      justifyContent='space-between'
    >
      <Heading color='brand' fontSize='xl' fontWeight='700'>
        Quizio
      </Heading>
      <HStack spacing={4}>
        <Button colorScheme='purple' bgColor='brand' px={4}>
          Host Quiz
        </Button>
        <Avatar name='User Name' src='/path-to-your-profile-picture.jpg' size='sm' />
      </HStack>
    </HStack>
  );
}

export default TopNav;
