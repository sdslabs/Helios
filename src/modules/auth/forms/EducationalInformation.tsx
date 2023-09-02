import { Box, Grid, GridItem, Stack, Flex, Spacer, ButtonGroup, Heading } from '@chakra-ui/react'
import useStepStore from '../store/StepStore'
import CustomInputWithLabel from '../../../common/components/customInputFields/CustomInputWithLabel'
import BasicNavButton from '../../../common/components/sideNav/BasicNavButton'
import useEducationalInfoStore from '../store/EducationalInformationStore'

interface FormProps {
  nextStep: () => void
  prevStep: () => void
}

export const EducationalDetailsForm = (props: FormProps) => {
  const setStep = useStepStore((state) => state.setStep)
  const educationalInfo = useEducationalInfoStore()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    props.nextStep()
    setStep(3)
  }
  return (
    <>
      <Box sx={{ borderRadius: 'md', my: 8, boxSize: '26rem', minW: 'xl' }}>
        <Heading as='h1' size={'md'} py={6} color='accentBlack'>
          Educational Information
        </Heading>
        <form onSubmit={handleSubmit}>
          <Stack direction='column' spacing={4}>
            <Grid templateColumns='repeat(2, 1fr)' gap={4} width='100%'>
              <GridItem w='100%'>
                <CustomInputWithLabel
                  label='Country'
                  isRequired
                  inputProps={{
                    placeholder: 'Country',
                    type: 'text',
                    defaultValue: educationalInfo.country,
                    onChange: (e) => educationalInfo.updateCountry(e.target.value),
                  }}
                />
              </GridItem>
              <GridItem w='100%'>
                <CustomInputWithLabel
                  label='City'
                  isRequired
                  inputProps={{
                    placeholder: 'City',
                    type: 'text',
                    defaultValue: educationalInfo.city,
                    onChange: (e) => educationalInfo.updateCity(e.target.value),
                  }}
                />
              </GridItem>
            </Grid>
            <CustomInputWithLabel
              label='Institute or Organization Name'
              isRequired
              inputProps={{
                placeholder: 'Institute or Organization',
                type: 'text',
                defaultValue: educationalInfo.org,
                onChange: (e) => educationalInfo.updateOrg(e.target.value),
              }}
            />
          </Stack>
          <Flex alignItems='center' my='6'>
            <Spacer />
            <ButtonGroup gap={2}>
              <BasicNavButton
                variant='outline'
                onClick={() => {
                  props.prevStep()
                  setStep(1)
                }}
              >
                Back
              </BasicNavButton>
              <BasicNavButton
                variant='solid'
                type='submit'
              >
                Next
              </BasicNavButton>
            </ButtonGroup>
          </Flex>
        </form>
      </Box>
    </>
  )
}
