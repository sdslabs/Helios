import {
  Box,
  Grid,
  GridItem,
  Stack,
  Flex,
  Spacer,
  ButtonGroup,
  Heading,
  Button,
} from '@chakra-ui/react'
import useStepStore from '@auth/store/StepStore'
import CustomInputWithLabel from '@common/components/CustomInputWithLabel'
import usePersonalDetailsStore from '@auth/store/PersonalDetailsStore'
import useAuthStore from '@auth/store/authStore'
interface FormProps {
  nextStep: () => void
}

export const PersonalDetailsForm = (props: FormProps) => {
  const setStep = useStepStore((state) => state.setStep)
  const personalDetails = usePersonalDetailsStore()
  const authDetails = useAuthStore()
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    personalDetails.updateEmail(authDetails.user.emailAdd)
    e.preventDefault()
    props.nextStep()
    setStep(2)
  }
  return (
    <>
      <Box sx={{ borderRadius: 'md', my: 8, boxSize: '26rem', minW: 'xl' }}>
        <Heading as='h1' size={'md'} py={6} color='accentBlack'>
          Personal Details
        </Heading>
        <form onSubmit={handleSubmit}>
          <Stack direction='column' spacing={4}>
            <Grid templateColumns='repeat(2, 1fr)' gap={4} width='100%'>
              <GridItem w='100%'>
                <CustomInputWithLabel
                  label='First Name'
                  isRequired
                  inputProps={{
                    placeholder: 'First Name',
                    type: 'text',
                    defaultValue: personalDetails.firstName,
                    onChange: (e) => personalDetails.updateFirstName(e.target.value),
                  }}
                />
              </GridItem>
              <GridItem w='100%'>
                <CustomInputWithLabel
                  label='Last Name'
                  inputProps={{
                    placeholder: 'Last Name',
                    type: 'text',
                    defaultValue: personalDetails.lastName,
                    onChange: (e) => personalDetails.updateLastName(e.target.value),
                  }}
                />
              </GridItem>
            </Grid>
            <CustomInputWithLabel
              label='Email Address'
              isRequired
              inputProps={{
                placeholder: 'Email Address',
                type: 'email',
                defaultValue: authDetails.user.emailAdd,
                isReadOnly:true
              }}
            />
            <CustomInputWithLabel
              label='Phone Number'
              isRequired
              inputProps={{
                placeholder: 'Phone Number',
                type: 'number',
                defaultValue: personalDetails.phone,
                onChange: (e) => personalDetails.updatePhone(e.target.value),
              }}
            />
          </Stack>
          <Flex minWidth={'max-content'} alignItems='center' my='6'>
            <Spacer />
            <ButtonGroup>
              <Button type='submit' colorScheme='purple' bgColor='brand' px={6} borderRadius={3}>
                Next
              </Button>
            </ButtonGroup>
          </Flex>
        </form>
      </Box>
    </>
  )
}

