import {
    Modal,
    ModalContent,
    ModalOverlay,
  } from '@chakra-ui/react'

  interface StartModalProps {
    open: boolean
    toggleIsOpen: () => void
  }
  
  export const StartModal = ({ open, toggleIsOpen }: StartModalProps) => {
    return (
      <Modal isOpen={open} onClose={toggleIsOpen} isCentered>
        <ModalOverlay />
        <ModalContent>
            Start quiz modal here
        </ModalContent>
      </Modal>
    )
  }
  