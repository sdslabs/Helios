import CustomInputWithLabel from '../../../common/components/CustomInputWithLabel'
import { useState } from 'react'
import { Modal, ModalContent, ModalOverlay, Button, Text, Flex } from '@chakra-ui/react'
import { CloseIcon } from '@chakra-ui/icons'

interface RegisterModalProps {
  open: boolean
  toggleIsOpen: () => void
}

export const RegisterModal = ({ open, toggleIsOpen }: RegisterModalProps) => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [contactNo, setContactNo] = useState('')
  const [organisationName, setOrganisationName] = useState('')
  const [codechefId, setCodechefId] = useState('')
  const [codechefId2, setCodechefId2] = useState('')
  const [codechefId3, setCodechefId3] = useState('')

  return (
    <Modal isOpen={open} onClose={toggleIsOpen} isCentered size='6xl'>
      <ModalOverlay />
      <ModalContent padding={6} borderRadius={0} overflowY='scroll'>
        <Flex flexDirection='row' justifyContent='space-between' mb={4}>
          <Text fontSize='1.125rem' fontStyle='normal' fontWeight='600'>
            Registration form
          </Text>
          <CloseIcon
            onClick={toggleIsOpen}
            color='#B3B3B3'
            w={'0.875rem'}
            h={'0.875rem'}
            alignSelf='center'
          />
        </Flex>
        <Flex flexDirection='row' mb={4} mt={4} gap='0.625rem'>
          <CustomInputWithLabel
            label='First Name'
            inputProps={{ value: firstName, onChange: (e) => setFirstName(e.target.value) }}
          />
          <CustomInputWithLabel
            label='Last Name'
            inputProps={{ value: lastName, onChange: (e) => setLastName(e.target.value) }}
          />
        </Flex>
        <Flex flexDirection='row' mb={4} gap='0.625rem'>
          <CustomInputWithLabel
            label='Email'
            inputProps={{ value: email, onChange: (e) => setEmail(e.target.value), type: 'email' }}
          />
          <CustomInputWithLabel
            label='Contact No.'
            inputProps={{
              value: contactNo,
              onChange: (e) => setContactNo(e.target.value),
              type: 'tel',
            }}
          />
        </Flex>
        <CustomInputWithLabel
          label='Organisation’s Name'
          inputProps={{
            value: organisationName,
            onChange: (e) => setOrganisationName(e.target.value),
          }}
        />
        <Text fontSize='1.125rem' fontStyle='normal' fontWeight='700' mt={4} mb={4}>
          Additional Details
        </Text>
        <CustomInputWithLabel
          isRequired={true}
          label='CodechefID'
          inputProps={{ value: codechefId, onChange: (e) => setCodechefId(e.target.value) }}
        />
        <CustomInputWithLabel
          label='CodechefID'
          inputProps={{ value: codechefId2, onChange: (e) => setCodechefId2(e.target.value) }}
        />
        <CustomInputWithLabel
          label='CodechefID'
          inputProps={{ value: codechefId3, onChange: (e) => setCodechefId3(e.target.value) }}
        />
        <Button colorScheme='purple' bgColor='brand' px={6} alignSelf='flex-end' mt={4}>
          Register
        </Button>
      </ModalContent>
    </Modal>
  )
}
