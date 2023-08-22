import {
    Modal,
    ModalContent,
    ModalOverlay,
  } from '@chakra-ui/react'

  interface RegisterModalProps {
    open: boolean
    toggleIsOpen: () => void
  }
  
  export const RegisterModal = ({ open, toggleIsOpen }: RegisterModalProps) => {
    return (
      <Modal isOpen={open} onClose={toggleIsOpen} isCentered>
        <ModalOverlay />
        <ModalContent>
            Registration page here
        </ModalContent>
      </Modal>
    )
  }
  