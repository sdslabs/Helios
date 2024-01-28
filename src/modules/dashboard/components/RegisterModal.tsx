import CustomInputWithLabel from '@common/components/CustomInputWithLabel'
import { useEffect, useState } from 'react'
import { Modal, ModalContent, ModalOverlay, Button, Text, Flex } from '@chakra-ui/react'
import { CloseIcon } from '@chakra-ui/icons'
import { useRegisterUser } from '../../giveQuiz/api/useUser'
import { useQueryClient } from '@tanstack/react-query'
import useUserDetailsStore from '@dashboard/store/UserDetailsStore'

interface RegisterModalProps {
  open: boolean
  toggleIsOpen: () => void
  quizId: string
  additionalDetails?: { label: string; name: string; isRequired: boolean }[]
}

export const RegisterModal = ({
  open,
  toggleIsOpen,
  quizId,
  additionalDetails = [],
}: RegisterModalProps) => {
  const userDetails = useUserDetailsStore()
  const [detailsFilled, setDetailsFilled] = useState(false)
  const [additionalDetailsState, setAdditionalDetailsState] = useState(
    additionalDetails.map((detail) => ({
      label: detail.label,
      isRequired: detail.isRequired,
      value: '',
    })),
  )

  const { mutate } = useRegisterUser()
  const queryClient = useQueryClient()

  async function handleRegister() {
    const body = {
      customFields: [
        { name: 'Institute Name', value: userDetails.instituteName },
        ...additionalDetailsState.map((detail, index: number) => ({
          name: additionalDetails[index].label,
          value: detail.value,
        })),
      ],
    }
    mutate(
      { quizId, body },
      {
        onSuccess: () => {
          toggleIsOpen()
          queryClient.invalidateQueries({ exact: true, queryKey: ['dashboard'] })
        },
      },
    )
  }
  useEffect(() => {
    const filled = additionalDetailsState.every((detail) =>
      detail.isRequired ? detail.value !== '' : true,
    )
    setDetailsFilled(filled)
  }, [additionalDetailsState])

  return (
    <Modal isOpen={open} onClose={toggleIsOpen} isCentered size='4xl'>
      <ModalOverlay />
      <ModalContent padding={6} borderRadius={0} overflowY='auto'>
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
            isRequired
            inputProps={{ defaultValue: userDetails.firstName, isDisabled: true }}
          />
          <CustomInputWithLabel
            label='Last Name'
            inputProps={{ defaultValue: userDetails.lastName, isDisabled: true }}
          />
        </Flex>
        <Flex flexDirection='row' mb={4} gap='0.625rem'>
          <CustomInputWithLabel
            label='Email'
            isRequired
            inputProps={{ defaultValue: userDetails.emailAdd, isDisabled: true }}
          />
          <CustomInputWithLabel
            label='Contact No.'
            isRequired
            inputProps={{ defaultValue: userDetails.phoneNo, isDisabled: true }}
          />
        </Flex>
        <CustomInputWithLabel
          label='Institute or Organization Name'
          inputProps={{
            value: userDetails.instituteName,
            onChange: (e) => {
              userDetails.setInstituteName(e.target.value)
            },
          }}
        />
        {additionalDetails.length > 0 && (
          <Text fontSize='1.125rem' fontStyle='normal' fontWeight='700' mt={4} mb={4}>
            Additional Details
          </Text>
        )}
        <Flex flexDirection='column' gap='1.5rem'>
          {additionalDetails.map((detail, index: number) => (
            <CustomInputWithLabel
              key={index}
              label={detail.label}
              isRequired={detail.isRequired}
              inputProps={{
                placeholder: detail.name,
                onChange: (e) => {
                  const newAdditionalDetails = [...additionalDetailsState]
                  newAdditionalDetails[index].value = e.target.value
                  setAdditionalDetailsState(newAdditionalDetails)
                },
              }}
            />
          ))}
        </Flex>
        <Button
          colorScheme='purple'
          bgColor='brand'
          px={6}
          alignSelf='flex-end'
          mt={10}
          onClick={handleRegister}
          isDisabled={!detailsFilled}
        >
          Register
        </Button>
      </ModalContent>
    </Modal>
  )
}
