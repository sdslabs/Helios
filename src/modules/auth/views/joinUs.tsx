import { Button, Center, Heading, Image, Text, VStack } from '@chakra-ui/react'
import { useToggle, useUnmount } from 'react-use'
import JoinBg from '../../../assets/images/join-bg.png'
import JoinIllustration from '../../../assets/images/join-illustration.png'
import { JoinUsModal } from '../components/JoinUsModal'

const JoinUs = () => {
  const [isModalOpen, toggleIsModalOpen] = useToggle(false)

  useUnmount(() => {
    if (isModalOpen) {
      toggleIsModalOpen()
    }
  })

  return (
    <>
      <Center
        as='main'
        w='100vw'
        h='100vh'
        bgImage={JoinBg}
        bgRepeat='no-repeat'
        bgSize='contain'
        gap={20}
      >
        <Image src={JoinIllustration} alt='Join Us' />
        <VStack alignItems='flex-start' color='brand' gap={6}>
          <Heading fontSize='7xl'>Quizio</Heading>
          <Text pb={6}>Testing platform developed by SDSLabs.</Text>
          <Button colorScheme='purple' bgColor='brand' px={10} onClick={toggleIsModalOpen}>
            Join Us
          </Button>
        </VStack>
      </Center>
      <JoinUsModal open={isModalOpen} toggleIsOpen={toggleIsModalOpen} />
    </>
  )
}

export default JoinUs
