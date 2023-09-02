import { Box, Grid, GridItem, Stack, Flex, Spacer, ButtonGroup, Heading } from '@chakra-ui/react'
import useStepStore from '../store/StepStore'
import CustomInputWithLabel from '../../../common/components/customInputFields/CustomInputWithLabel'
import BasicNavButton from '../../../common/components/sideNav/BasicNavButton'
import usePersonalDetailsStore from '../store/PersonalDetailsStore'
interface FormProps {
  nextStep: () => void
}

export const PersonalDetailsForm = (props: FormProps) => {
  const setStep = useStepStore((state) => state.setStep)
  const personalDetails = usePersonalDetailsStore()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
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
                    onChange: (e) => personalDetails.updateFirstName(e.target.value)
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
                defaultValue: personalDetails.email,
                onChange: (e) => personalDetails.updateEmail(e.target.value),
              }}
            />
            <CustomInputWithLabel
              label='Phone Number'
              inputProps={{
                placeholder: 'Phone Number',
                type: 'number',
                defaultValue: personalDetails.phone,
                onChange: (e) => personalDetails.updatePhone(e.target.value)
              }}
            />
          </Stack>
          <Flex minWidth={'max-content'} alignItems='center' my='6'>
            <Spacer />
            <ButtonGroup>
              <BasicNavButton variant='solid' type='submit'>
                Next
              </BasicNavButton>
            </ButtonGroup>
          </Flex>
        </form>
      </Box>
    </>
  )
}
