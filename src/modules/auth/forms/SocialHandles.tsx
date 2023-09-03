import {
  Box,
  Stack,
  Flex,
  Spacer,
  ButtonGroup,
  Heading,
  FormControl,
  FormLabel,
  Grid,
  GridItem,
  Text,
} from '@chakra-ui/react'
import useStepStore from '../store/StepStore'
import BasicNavButton from '../../../common/components/sideNav/BasicNavButton'
import CustomInputWithLabel from '../../../common/components/customInputFields/CustomInputWithLabel'
import React, { useState } from 'react'
import {
  BehanceIcon,
  GithubIconPurple,
  DribbleIcon,
  InstagramIcon,
  FacebookIcon,
  LinkedinIcon,
  CodeForcesIcon,
  CodeChefIcon,
} from '../../../common/components/Icons'

import { Select } from 'chakra-react-select'
import useSocialHandlesStore from '../store/SocialHandlesStore'

// Making the select
interface SocialMediaOption {
  value: string
  label: string
  icon?: JSX.Element
}

const socialMediaOptions: SocialMediaOption[] = [
  { value: '', label: 'Select...' },
  { value: 'github', label: 'GitHub', icon: <GithubIconPurple /> },
  { value: 'codeforces', label: 'Code Forces', icon: <CodeForcesIcon /> },
  { value: 'codechef', label: 'Code Chef', icon: <CodeChefIcon /> },
  { value: 'behance', label: 'Behance', icon: <BehanceIcon /> },
  { value: 'dribble', label: 'Dribble', icon: <DribbleIcon /> },
  { value: 'linkedin', label: 'LinkedIn', icon: <LinkedinIcon /> },
  { value: 'instagram', label: 'Instagram', icon: <InstagramIcon /> },
  { value: 'facebook', label: 'Facebook', icon: <FacebookIcon /> },
]

const CustomOptionComponent: React.FC<any> = ({ innerProps, label, data }) => (
  <Stack
    direction={'row'}
    px={2}
    py={1}
    align='center'
    _hover={{ bgColor: 'gray.100', cursor: 'pointer' }}
    {...innerProps}
  >
    {data.icon && (
      <Flex h={8} w={8} align={'center'} justify={'center'}>
        {data.icon}
      </Flex>
    )}
    <Text fontWeight={400}>{label}</Text>
  </Stack>
)

const SocialMediaSelect: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState<SocialMediaOption | null>()
  const { socialMediaHandles, updateHandle } = useSocialHandlesStore()

  return (
    <Grid templateColumns='1fr 1.8fr' gap={4} width='100%'>
      {socialMediaHandles.map((handle, index) => (
        <React.Fragment key={index}>
          <GridItem w='100%'>
            <FormControl color={'gray.500'}>
              <FormLabel fontSize={'sm'}>Platform</FormLabel>
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
                placeholder='Select...'
              />
            </FormControl>
          </GridItem>
          <GridItem w='100%'>
            <CustomInputWithLabel
              label='URL'
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
  )
}


// The actual form
interface FormProps {
  nextStep: () => void
  prevStep: () => void
  reset: () => void
}

export const SocialHandlesForm = (props: FormProps) => {
  const setStep = useStepStore((state) => state.setStep)
  return (
    <>
      <Box sx={{ borderRadius: 'md', my: 8, boxSize: '26rem', minW: 'xl' }}>
        <Heading as='h1' size={'md'} py={6} color='accentBlack'>
          Social Handles
        </Heading>
        <Stack direction='column' spacing={6}>
          <SocialMediaSelect />
        </Stack>
        <Flex alignItems='center' my='6'>
          <BasicNavButton>Skip Step</BasicNavButton>
          <Spacer />
          <ButtonGroup gap={2}>
            <BasicNavButton
              variant='outline'
              onClick={() => {
                props.prevStep()
                setStep(2)
              }}
            >
              Back
            </BasicNavButton>
            <BasicNavButton
              variant='solid'
              onClick={() => {
                // TODO: Change this as per backend requirements.
                props.reset()
                setStep(1)
              }}
            >
              Get Started
            </BasicNavButton>
          </ButtonGroup>
        </Flex>
      </Box>
    </>
  )
}
