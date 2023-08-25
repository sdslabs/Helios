import {
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
} from '@chakra-ui/react'
import { GithubIcon, GoogleIcon } from '@common/components/Icons'
import { AUTH_TYPES } from '../constants'
import { AuthButton } from './AuthButton'

interface JoinUsModalProps {
  open: boolean
  toggleIsOpen: () => void
}

export const JoinUsModal = ({ open, toggleIsOpen }: JoinUsModalProps) => {
  return (
    <Modal isOpen={open} onClose={toggleIsOpen} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <Heading fontSize='lg' color='brand'>
            Join Us!
          </Heading>
          <ModalCloseButton />
        </ModalHeader>
        <ModalBody flexDirection='column' display='flex' gap={6} pb={8}>
          <Text color='accentBlack' pb={4}>
            To begin this journey, tell us via which platform you want to Log in !
          </Text>
          <AuthButton authType={AUTH_TYPES.Github} leftIcon={<GithubIcon h={10} w={10} />} />
          <AuthButton authType={AUTH_TYPES.Google} leftIcon={<GoogleIcon h={10} w={10} />} />
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
