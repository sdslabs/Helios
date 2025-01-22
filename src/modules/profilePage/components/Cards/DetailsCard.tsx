import React, { useState } from 'react'
import theme from '@common/theme'
import {
  Card,
  CardBody,
  Box,
  Text,
  Flex,
  useDisclosure,
  Avatar,
  Image,
  Link,
  Button,
} from '@chakra-ui/react'
import { SocialHandle } from '../../types'
import { EditProfileModal } from '../Modals/EditProfileModal'
import { useNavigate } from 'react-router-dom'
import {
  BehanceIcon,
  GithubIconPurple,
  DribbleIcon,
  InstagramIcon,
  FacebookIcon,
  LinkedinIcon,
  CodeForcesIcon,
  CodeChefIcon,
} from '@common/components/Icons'
import phone from '@assets/images/mdi_phone.svg'
import gmail from '@assets/images/mdi_gmail.svg'
import axios from '@auth/api/axiosInstance'

interface DetailsCardProps {
  userID: string
  firstName: string
  lastName: string
  instituteName: string
  city: string
  country: string
  emailAdd: string
  phoneNo: string
  profileImage: string
  socialHandles: SocialHandle[]
}

const DetailsCard: React.FC<DetailsCardProps> = ({
  userID,
  firstName,
  lastName,
  instituteName,
  city,
  country,
  emailAdd,
  phoneNo,
  profileImage,
  socialHandles,
}: DetailsCardProps) => {
  const {
    isOpen: isEditProfileModalOpen,
    onOpen: onEditProfileModalOpen,
    onClose: onEditProfileModalClose,
  } = useDisclosure()

  const navigate = useNavigate()

  const handleClick = () => {
    onEditProfileModalOpen()
  }

  const handleLogout = () => {
    axios.post('/auth/logout')
      .then(response => {
        if (response.status === 200) {
          console.log('Logout successful')
          navigate("/")
          navigate(0)
        } else {
          console.error('Logout failed')
        }
      })
      .catch(error => {
        console.error('An error occurred during logout', error)
      })
  }

  const SocialMediaSelector = (socialMedia: string, link: string, index: number) => {
    if (socialMedia == 'github')
      return (
        <GithubIconPurple
          key={index}
          w='3vw'
          h='4vh'
          onClick={() => {
            window.open(link)
          }}
          cursor='pointer'
        />
      )
    else if (socialMedia == 'codeforces')
      return (
        <CodeForcesIcon
          key={index}
          w='3vw'
          h='4vh'
          onClick={() => {
            window.open(link)
          }}
          cursor='pointer'
        />
      )
    else if (socialMedia == 'codechef')
      return (
        <CodeChefIcon
          key={index}
          w='3vw'
          h='4vh'
          onClick={() => {
            window.open(link)
          }}
          cursor='pointer'
        />
      )
    else if (socialMedia == 'behance')
      return (
        <BehanceIcon
          key={index}
          w='3vw'
          h='4vh'
          onClick={() => {
            window.open(link)
          }}
          cursor='pointer'
        />
      )
    else if (socialMedia == 'dribble')
      return (
        <DribbleIcon
          key={index}
          w='3vw'
          h='4vh'
          onClick={() => {
            window.open(link)
          }}
          cursor='pointer'
        />
      )
    else if (socialMedia == 'linkedin')
      return (
        <LinkedinIcon
          key={index}
          w='3vw'
          h='4vh'
          onClick={() => {
            window.open(link)
          }}
          cursor='pointer'
        />
      )
    else if (socialMedia == 'instagram')
      return (
        <InstagramIcon
          key={index}
          w='3vw'
          h='4vh'
          onClick={() => {
            window.open(link)
          }}
          cursor='pointer'
        />
      )
    else if (socialMedia == 'facebook')
      return (
        <FacebookIcon
          key={index}
          w='3vw'
          h='4vh'
          onClick={() => {
            window.open(link)
          }}
          cursor='pointer'
        />
      )
  }

  return (
    <>
      <Card
        flexShrink={0}
        direction={{ base: 'column', sm: 'row' }}
        padding={4}
        my={4}
        width='48vw'
        justifyContent='space-between'
        height='28vh'
        boxShadow='sm'
      >
        <Flex>
          <Flex gap={2} alignItems='center'>
            <Flex direction={{ base: 'row', sm: 'column' }} alignItems='center'>
              <Box borderRadius='full' overflow='hidden'>
                <Avatar
                  src={profileImage}
                  name={firstName}
                  size='2xl'
                  objectFit='cover'
                  borderRadius={4}
                  minW='36%'
                />
              </Box>
              <Text
                color={theme.colors.v6}
                fontSize='2vh'
                padding='1.5vh'
                onClick={handleClick}
                cursor='pointer'
              >
                Edit Details
                <EditProfileModal
                  open={isEditProfileModalOpen}
                  close={onEditProfileModalClose}
                  toggleIsOpen={onEditProfileModalOpen}
                  userID={userID}
                />
              </Text>
            </Flex>
          </Flex>
          <Flex gap={2} paddingLeft='2vw' alignItems='center'>
            <Flex direction={{ base: 'row', sm: 'column' }}>
              <Text color={theme.colors.v6} fontWeight='700' fontSize='xl'>
                {firstName} {lastName}
              </Text>
              <Text fontSize='2vh'>{instituteName}</Text>
              <Text color={theme.colors.v6} fontSize='2vh'>
                {city}, {country}
              </Text>
              <Flex alignItems={{ base: 'row', sm: 'column' }}>
                <Link href={`mailto:${emailAdd}`}>
                  <Image src={gmail} alt='gmail' paddingTop='2vh' width={8} height={10} />
                </Link>
                <Link href={`mailto:${emailAdd}`}>
                  <Text fontSize='2vh' paddingTop='2.5vh' paddingLeft='0.2vw'>
                    {emailAdd}
                  </Text>
                </Link>
              </Flex>
              <Flex alignItems={{ base: 'row', sm: 'column' }}>
                <Image src={phone} alt='phone' paddingTop='0.8vh' width={8} height={7} />
                <Text fontSize='2vh' paddingTop='0.8vh' paddingLeft='0.2vw'>
                  {phoneNo}
                </Text>
              </Flex>
              <Flex alignItems={{ base: 'row', sm: 'column' }}>
                <Button colorScheme='purple' bgColor='brand' px={4} onClick={handleLogout}>
                  Logout
                </Button>
              </Flex>
            </Flex>
          </Flex>
        </Flex>
        <Flex>
          <Flex gap={5} flexDirection={{ base: 'row', sm: 'column' }} paddingTop='4vh'>
            {socialHandles.map((socialMedia: SocialHandle, index: number) => {
              return SocialMediaSelector(socialMedia.type, socialMedia.handle, index)
            })}
          </Flex>
        </Flex>
      </Card>
    </>
  )
}

export default DetailsCard
