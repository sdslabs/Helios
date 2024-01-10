import CustomInputWithLabel from '@common/components/CustomInputWithLabel'
import { Modal, ModalContent, ModalOverlay, Text, Button, Flex } from '@chakra-ui/react'
import { CloseIcon } from '@chakra-ui/icons'
import { useState } from 'react'
<<<<<<< HEAD
import { useAutocheck } from '@checkQuiz/api/useAutocheck'
=======
>>>>>>> f5aa33c3c6e9943101028cb32e93be8d33e78daf

interface AutocheckModalProps {
  open: boolean
  toggleIsOpen: () => void
<<<<<<< HEAD
  totalMCQs: number
}

const AutocheckModal = ({ open, toggleIsOpen, totalMCQs }: AutocheckModalProps) => {

  const handleAutocheck = () => {
    // const {} = useAutocheck()
=======
}

const AutocheckModal = ({ open, toggleIsOpen }: AutocheckModalProps) => {
  const [TotalQuestions, setTotalQuestions] = useState<number>(60)

  const handleAutocheck = () => {
    // TODO: Autochek and route to result page
>>>>>>> f5aa33c3c6e9943101028cb32e93be8d33e78daf
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
<<<<<<< HEAD
            {totalMCQs}
=======
            {TotalQuestions}
>>>>>>> f5aa33c3c6e9943101028cb32e93be8d33e78daf
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
