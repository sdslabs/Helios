import CustomInputWithLabel from '@common/components/CustomInputWithLabel'
import { useState } from 'react'
import {
  Modal,
  ModalContent,
  ModalOverlay,
  Button,
  Text,
  Flex,
  Switch,
  FormLabel,
  FormControl,
  Input,
} from '@chakra-ui/react'
import { CloseIcon } from '@chakra-ui/icons'
import useUserDetailsStore from '../../store/UserDetailsStore'
import { useUpdateUser } from '../../api/useUser'

interface EditProfileModalProps {
  open: boolean
  close: () => void
  toggleIsOpen: () => void
  userID: string
}

export const EditProfileModal = ({ open, close, toggleIsOpen, userID }: EditProfileModalProps) => {
  const userDetails = useUserDetailsStore()
  const [detailsFilled, setDetailsFilled] = useState(false)
  const [isRankChecked, setIsRankChecked] = useState(true)
  async function handleEditProfile() {
    const body = {
      customFields: [
        { name: 'First Name', value: userDetails.firstName },
        { name: 'Last Name', value: userDetails.lastName },
        { name: 'Email Address', value: userDetails.emailAdd },
        { name: 'Institute Name', value: userDetails.instituteName },
        { name: 'Constact No.', value: userDetails.phoneNo },
        { name: 'Country', value: userDetails.country },
        { name: 'City', value: userDetails.city },
        { name: 'Social Handles', value: userDetails.socialHandles },
      ],
    }
    const { mutate } = useUpdateUser()
    mutate(
      { userID, body },
      {
        onSuccess: () => {
          toggleIsOpen()
          window.location.reload()
        },
      },
    )
  }
  return (
    <Modal isOpen={open} onClose={close} isCentered size='4xl'>
      <ModalOverlay />
      <ModalContent padding={6} borderRadius={0} overflowY='auto'>
        <Flex flexDirection='row' justifyContent='space-between' mb={4}>
          <Text fontSize='1.125rem' fontStyle='normal' fontWeight='600'>
            Edit Profile
          </Text>
          <CloseIcon
            onClick={close}
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
            inputProps={{
              value: userDetails.firstName,
              onChange: (e) => userDetails.setFirstName(e.target.value),
            }}
          />
          <CustomInputWithLabel
            label='Last Name'
            inputProps={{
              value: userDetails.lastName,
              onChange: (e) => userDetails.setLastName(e.target.value),
            }}
          />
        </Flex>
        <Flex flexDirection='row' mb={4} gap='0.625rem'>
          <CustomInputWithLabel
            label='Email'
            isRequired
            inputProps={{
              value: userDetails.emailAdd,
              onChange: (e) => userDetails.setEmailAdd(e.target.value),
            }}
          />
        </Flex>
        <CustomInputWithLabel
          label='Institute or Organization Name'
          inputProps={{
            value: userDetails.instituteName,
            onChange: (e) => userDetails.setInstituteName(e.target.value),
          }}
        />
        <Flex flexDirection='row' mb={4} mt={4} gap='0.625rem'>
          <CustomInputWithLabel
            label='Country'
            isRequired
            inputProps={{
              value: userDetails.country,
              onChange: (e) => userDetails.setCountry(e.target.value),
            }}
          />
          <CustomInputWithLabel
            label='City'
            isRequired
            inputProps={{
              value: userDetails.city,
              onChange: (e) => userDetails.setCity(e.target.value),
            }}
          />
        </Flex>
        <Flex justifyContent='space-between'>
          <FormLabel fontWeight='500' fontSize='sm' color='gray.500'>
            Contact No.
          </FormLabel>
          <Flex>
            <Text fontSize='sm' color='gray.500' paddingTop='0.5vh'>
              Show on Public Profile:
            </Text>
            <Switch
              size='sm'
              padding='1vh'
              colorScheme='purple'
              isChecked={isRankChecked}
              onChange={(e) => setIsRankChecked(!isRankChecked)}
            />
          </Flex>
        </Flex>

        <Flex flexDirection='row' mb={4} gap='0.625rem'>
          <FormControl size='sm' color='gray.500'>
            <Input
              h={12}
              borderRadius={4}
              fontSize='sm'
              value={userDetails.phoneNo}
              onChange={(e) => userDetails.setCountry(e.target.value)}
            ></Input>
          </FormControl>
        </Flex>
        <Flex>
          <Text fontSize='sm' color='gray.500' paddingTop='0.5vh'>
            Show best ranks on Public Profile:
          </Text>
          <Switch
            size='sm'
            padding='1vh'
            colorScheme='purple'
            isChecked={isRankChecked}
            onChange={(e) => setIsRankChecked(!isRankChecked)}
          />
        </Flex>
        <Text fontSize='1.125rem' fontStyle='normal' fontWeight='600' color='purple'>
            Edit Profile
          </Text>
        <Button
          colorScheme='purple'
          bgColor='brand'
          px={6}
          alignSelf='flex-end'
          mt={10}
          onClick={handleEditProfile}
          isDisabled={!detailsFilled}
        >
          Save Changes
        </Button>
      </ModalContent>
    </Modal>
  )
}
