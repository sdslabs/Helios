import { useState } from 'react';
import { Button, Center, Heading, Image, Text, VStack } from '@chakra-ui/react';
import {JoinUsModal} from '../modules/auth/components/JoinUsModal';
 
const JoinUs = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <>
      <Center
        as='main'
        w='100vw'
        h='100vh'
        bgImage='/assets/images/join-bg.png'
        bgRepeat='no-repeat'
        bgSize='contain'
        gap={20}
      >
        <Image src='/assets/images/join-illustration.png' alt='Join Us'/>
        <VStack alignItems='flex-start' color='brand' gap={6}>
          <Heading fontSize='7xl'>Quizio</Heading>
          <Text pb={6}>Testing platform developed by SDSLabs.</Text>
          <Button colorScheme='purple' bgColor='brand' px={10} onClick={toggleModal}>
            Join Us
          </Button>
        </VStack>
      </Center>
      <JoinUsModal open={isModalOpen} toggleIsOpen={toggleModal} />
    </>
  );
};

export default JoinUs;
