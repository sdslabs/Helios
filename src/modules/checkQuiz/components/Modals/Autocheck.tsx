import CustomInputWithLabel from '@common/components/CustomInputWithLabel'
import { Modal, ModalContent, ModalOverlay, Text, Button, Flex } from '@chakra-ui/react'
import { CloseIcon } from '@chakra-ui/icons'
import { useState } from 'react'

interface AutocheckModalProps {
  open: boolean
  toggleIsOpen: () => void
}

const AutocheckModal = ({ open, toggleIsOpen }: AutocheckModalProps) => {
  const [TotalQuestions, setTotalQuestions] = useState<number>(60)

  const handleAutocheck = () => {
    // TODO: Autochek and route to result page
  }

  return (
    <Modal isOpen={open} onClose={toggleIsOpen} isCentered size={'xl'}>
      <ModalOverlay />
      <ModalContent padding={6} borderRadius={0}>
        <Flex justifyContent='space-between' mb={4}>
          <Text fontSize='1.125rem' fontWeight='600'>
            Autocheck
          </Text>
          <CloseIcon
            onClick={toggleIsOpen}
            color='crossBlack'
            w='0.875rem'
            h='0.875rem'
            alignSelf='center'
          />
        </Flex>
        <Text fontSize='1rem' fontWeight='400' mb={4}>
          Are you sure you want to autocheck{' '}
          <Text as='span' fontWeight='bold'>
            {TotalQuestions}
          </Text>{' '}
          questions ?
        </Text>
        <Button
          colorScheme='purple'
          bgColor='brand'
          alignSelf='flex-end'
          mt={4}
          onClick={handleAutocheck}
        >
          Yes
        </Button>
      </ModalContent>
    </Modal>
  )
}

export default AutocheckModal
