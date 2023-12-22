import CustomInputWithLabel from '@common/components/CustomInputWithLabel'
import { useState } from 'react'
import { Modal, ModalContent, ModalOverlay, Button, Text, Flex } from '@chakra-ui/react'
import { CloseIcon } from '@chakra-ui/icons'
import { StartModal } from './StartQuizModal';
import { useRegisterUser } from '../../api/UseRegister';

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
  const [additionalDetails, setAdditionalDetails] = useState([
    { label: 'Additional Detail1', placeholder: 'Label 1', isRequired: true },
    { label: 'Additional Detail2', placeholder: 'Label 2', isRequired: false },
    { label: 'Additional Detail3', placeholder: 'Label 3', isRequired: false },
  ])

  const quizId = '64f03422df4af65f96380c43';

  const { mutate } = useRegisterUser();

  async function handleRegister() {
    
     const body = {
        customFields: [
          { name: 'firstName', value: firstName },
          { name: 'lastName', value: lastName },
          { name: 'email', value: email },
          { name: 'contactNo', value: contactNo },
          { name: 'organisationName', value: organisationName },
          ...additionalDetails.map((detail, index) => ({
            name: detail.label,
            value: detail.placeholder,
          })),
        ],
      }
      mutate({quizId, body},
      {
        onSuccess: () => {
          toggleIsOpen();
          
        },
      },
      );
  }


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
            color='crossBlack'
            w='0.875rem'
            h='0.875rem'
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
        <Flex flexDirection='column' gap='1.5rem'>
          {additionalDetails.map((detail, index) => (
            <CustomInputWithLabel
              key={index}
              label={detail.label}
              inputProps={{ placeholder: detail.placeholder, isRequired: detail.isRequired }}
            />
          ))}
        </Flex>
        <Button colorScheme='purple' bgColor='brand' px={6} alignSelf='flex-end' mt={10} onClick={handleRegister}>
          Register
        </Button>
      </ModalContent>
    </Modal>
  )
}
