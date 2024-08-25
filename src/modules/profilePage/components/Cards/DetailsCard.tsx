import React, { useState } from 'react'
import {
  Card,
  CardBody,
  Box,
  Text,
  Flex,
  useDisclosure,
  Avatar,
  Image
} from '@chakra-ui/react'
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
  socialHandles: any
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
  console.log(socialHandles)
  const {
    isOpen: isEditProfileModalOpen,
    onOpen: onEditProfileModalOpen,
    onClose: onEditProfileModalClose,
  } = useDisclosure()

  const navigate = useNavigate()

  const handleClick = () => {
    onEditProfileModalOpen()
  }

  const handleSocialMediaClick = (link: string) => {
    navigate(link)
  }

  const SocialMediaSelector = {
    github: <GithubIconPurple />,
    codeforces: <CodeForcesIcon />,
    codechef: <CodeChefIcon />,
    behance: <BehanceIcon />,
    dribble: <DribbleIcon />,
    linkedin: <LinkedinIcon />,
    instagram: <InstagramIcon />,
    facebook: <FacebookIcon />,
  }

  return (
    <>
      <Card
        flexShrink={0}
        direction={{ base: 'column', sm: 'row' }}
        padding={4}
        my={4}
        width='xl'
        justifyContent='space-between'
        height='30vh'
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
              <Text color='#604195' fontSize='md' padding='1.5vh' onClick={handleClick}>
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
              <Text color='#604195' fontWeight='700' fontSize='xl'>
                {firstName} {lastName}
              </Text>
              <Text fontSize='md'>{instituteName}</Text>
              <Text color='#604195' fontSize='md'>
                {city}, {country}
              </Text>
              <Flex alignItems={{ base: 'row', sm: 'column' }}>
                <Image
                  src={gmail}
                  alt='gmail'
                  paddingTop='2vh'
                  width={8}
                  height={10}
                />
                <Text fontSize='md' paddingTop='2.5vh'>
                  {emailAdd}
                </Text>
              </Flex>
              <Flex alignItems={{ base: 'row', sm: 'column' }}>
                <Image
                  src={phone}
                  alt='phone'
                  paddingTop='0.8vh'
                  width={8}
                  height={8}
                />
                <Text fontSize='md' paddingTop='0.8vh'>
                  {phoneNo}
                </Text>
              </Flex>
            </Flex>
          </Flex>
        </Flex>
        <Flex gap={2} alignItems='center'>
          <CardBody>
            {socialHandles.map(
              (socialMedia: keyof typeof SocialMediaSelector, index: number) =>
                SocialMediaSelector[socialMedia],
            )}
          </CardBody>
        </Flex>
      </Card>
    </>
  )
}

export default DetailsCard
