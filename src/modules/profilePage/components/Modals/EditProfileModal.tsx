import CustomInputWithLabel from '@common/components/CustomInputWithLabel'
import React, { useState, useEffect } from 'react'
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
  Grid,
  GridItem,
  Stack,
} from '@chakra-ui/react'
import { Select } from 'chakra-react-select'
import { CloseIcon } from '@chakra-ui/icons'
import useUserDetailsStore from '../../store/UserDetailsStore'
import { useUpdateUser } from '../../api/useUser'
import { CustomOptionComponent, socialMediaOptions } from '@auth/forms/SocialHandles'
import useSocialHandlesStore from '@auth/store/SocialHandlesStore'
import useAuthStore from '@auth/store/authStore'

interface EditProfileModalProps {
  open: boolean
  close: () => void
  toggleIsOpen: () => void
  userID: string
}

interface SocialMedia {
  type: string
  handle: string
}

interface SocialMediaOption {
  value: string
  label: string
  icon?: JSX.Element
}

export const EditProfileModal = ({ open, close, toggleIsOpen, userID }: EditProfileModalProps) => {
  const [selectedOption, setSelectedOption] = useState<SocialMediaOption | null>()
  const { socialMediaHandles, updateHandle } = useSocialHandlesStore()
  const userDetails = useUserDetailsStore()
  const [detailsFilled, setDetailsFilled] = useState(true)
  const [isRankChecked, setIsRankChecked] = useState(true)
  const [isShowChecked, setIsShowChecked] = useState(true)
  const { user } = useAuthStore()
  const { mutate } = useUpdateUser()
  const handleEditProfile = () => {
    const socialHandles: SocialMedia[] = []
    socialMediaHandles.map((socialMedia, index) => {
      socialHandles.push({
        type: socialMedia.platformValue,
        handle: socialMedia.link,
      })
    })

    const personalDetails = {
      name: userDetails.firstName + ' ' + userDetails.lastName,
      emailAdd: userDetails.emailAdd,
      phoneNo: userDetails.phoneNo,
    }

    const educationalDetails = {
      instituteName: userDetails.instituteName,
      country: userDetails.country,
      city: userDetails.city,
    }

    mutate(
      {
        personalDetails,
        educationalDetails,
        socialHandles,
        user,
      },
      {
        onSuccess: () => {
          toggleIsOpen()
          window.location.reload()
        },
      },
    )
  }

  const [isFirstNameFilled, setIsFirstNameFilled] = useState(true)
  const [isEmailAddFilled, setIsEmailAddFilled] = useState(true)
  const [isCountry, setIsCountryFilled] = useState(true)
  const [isInstituteName, setIsInstituteNameFilled] = useState(true)
  const [isCity, setIsCityFilled] = useState(true)

  useEffect(() => {
    const filled = isFirstNameFilled && isEmailAddFilled && isCountry && isCity && isInstituteName
    setDetailsFilled(filled)
  })

  return (
    <Modal isOpen={open} onClose={close} isCentered size='4xl'>
      <ModalOverlay />
      <ModalContent padding={6} borderRadius={0} overflowY='auto' paddingTop='40vh'>
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
              onChange: (e) => {
                setIsFirstNameFilled(e.target.value !== '')
                userDetails.setFirstName(e.target.value)
              },
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
              onChange: (e) => {
                setIsEmailAddFilled(e.target.value !== '')
                userDetails.setEmailAdd(e.target.value)
              },
            }}
          />
        </Flex>
        <CustomInputWithLabel
          label='Institute or Organization Name'
          isRequired
          inputProps={{
            value: userDetails.instituteName,
            onChange: (e) => {
              setIsInstituteNameFilled(e.target.value !== '')
              userDetails.setInstituteName(e.target.value)
            },
          }}
        />
        <Flex flexDirection='row' mb={4} mt={4} gap='0.625rem'>
          <CustomInputWithLabel
            label='Country'
            isRequired
            inputProps={{
              value: userDetails.country,
              onChange: (e) => {
                setIsCountryFilled(e.target.value !== '')
                userDetails.setCountry(e.target.value)
              },
            }}
          />
          <CustomInputWithLabel
            label='City'
            isRequired
            inputProps={{
              value: userDetails.city,
              onChange: (e) => {
                setIsCityFilled(e.target.value !== '')
                userDetails.setCity(e.target.value)
              },
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
              isChecked={isShowChecked}
              onChange={(e) => setIsShowChecked(!isShowChecked)}
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
        <Text
          fontSize='1.125rem'
          fontStyle='normal'
          fontWeight='600'
          color='brand'
          paddingTop='2vh'
          paddingBottom='2vh'
        >
          My Handles
        </Text>
        <Stack direction='column' spacing={6}>
          <Grid templateColumns='1fr 1.8fr' gap={4} width='100%'>
            {socialMediaHandles.map((handle, index) => (
              <React.Fragment key={index}>
                <GridItem w='100%'>
                  <FormControl color={'gray.500'}>
                    <FormLabel fontSize={'sm'} color='gray.500'>
                      Public URL
                    </FormLabel>
                    <Select
                      value={{
                        label: handle.platformLabel,
                        value: handle.platformValue,
                      }}
                      components={{
                        Option: CustomOptionComponent,
                      }}
                      isSearchable
                      onChange={(option) => {
                        if (option) {
                          setSelectedOption(option)
                          handle.platformLabel = option.label
                          handle.platformValue = option.value
                        }
                      }}
                      options={socialMediaOptions}
                      defaultValue={{
                        label: handle.platformLabel,
                        value: handle.platformValue,
                      }}
                    />
                  </FormControl>
                </GridItem>
                <GridItem w='100%' paddingTop='3vh'>
                  <CustomInputWithLabel
                    inputProps={{
                      placeholder: 'Link',
                      type: 'text',
                      h: 10,
                      defaultValue: handle.link,
                      onChange: (e) => {
                        if (selectedOption) {
                          updateHandle(index, {
                            platformLabel: selectedOption.label,
                            platformValue: selectedOption.value,
                            link: e.target.value,
                          })
                        }
                      },
                    }}
                  />
                </GridItem>
              </React.Fragment>
            ))}
          </Grid>
        </Stack>
        <Flex justifyContent='space-between'>
          <Flex paddingTop='4vh' paddingLeft='1vh'>
            <Text fontSize='sm' color='gray.500' paddingTop='2vh' >
              Show best ranks on Public Profile:
            </Text>
            <Switch
              size='sm'
              paddingTop='2.5vh'
              paddingLeft='1vh'
              colorScheme='purple'
              isChecked={isRankChecked}
              onChange={(e) => setIsRankChecked(!isRankChecked)}
            />
          </Flex>
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
        </Flex>
      </ModalContent>
    </Modal>
  )
}
