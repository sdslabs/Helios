import CustomInputWithLabel from '../../../common/components/CustomInputWithLabel'
import { Modal, ModalContent, ModalOverlay, Text, Button, Flex } from '@chakra-ui/react'
import { CloseIcon } from '@chakra-ui/icons'

import { useState } from 'react'

interface StartModalProps {
  open: boolean
  toggleIsOpen: () => void
}

export const StartModal = ({ open, toggleIsOpen }: StartModalProps) => {
  const [accessCode, setAccessCode] = useState('')
  const [isAccessCodeNeeded, setIsAccessCodeNeeded] = useState(true)

  return (
    <Modal isOpen={open} onClose={toggleIsOpen} isCentered>
      <ModalOverlay />
      <ModalContent padding={6} borderRadius={0}>
        <Flex flexDirection='row' justifyContent='space-between' mb={4}>
          <Text fontSize='1.125rem' fontWeight='600'>
            Start Quiz
          </Text>
          <CloseIcon
            onClick={toggleIsOpen}
            color='#B3B3B3'
            w={'0.875rem'}
            h={'0.875rem'}
            alignSelf='center'
          />
        </Flex>
        <Text fontSize='1rem' fontWeight='400' mb={4}>
          Are you sure you want to start this quiz?
        </Text>
        {isAccessCodeNeeded ? (
          <CustomInputWithLabel
            label='Access Code'
            inputProps={{ value: accessCode, onChange: (e) => setAccessCode(e.target.value) }}
          />
        ) : null}
        <Button colorScheme='purple' bgColor='brand' alignSelf='flex-end' mt={4}>
          Start Quiz
        </Button>
      </ModalContent>
    </Modal>
  )
}
