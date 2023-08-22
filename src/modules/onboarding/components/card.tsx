import {
    Modal,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
  } from '@chakra-ui/react'
  import React from 'react';

  interface QuizCardModalProps {
    open: boolean
    toggleIsOpen: () => void
  }
  
  export const QuizCardModal = ({ open, toggleIsOpen }: QuizCardModalProps) => {
    return (
      <Modal isOpen={open} onClose={toggleIsOpen} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <ModalCloseButton />
          </ModalHeader>
          lmao
        </ModalContent>
      </Modal>
    )
  }
  