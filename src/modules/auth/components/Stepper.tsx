import { useColorModeValue } from '@chakra-ui/color-mode'
import { Box } from '@chakra-ui/layout'
import { Flex, Heading } from '@chakra-ui/react'
import { Step, Steps, useSteps } from 'chakra-ui-steps'
import useStepStore from '../store/StepStore'
import { PersonalDetailsForm } from '../forms/PersonalDetails'
import { EducationalDetailsForm } from '../forms/EducationalInformation'
import { SocialHandlesForm } from '../forms/SocialHandles'

const steps = [{ label: 'Step 1' }, { label: 'Step 2' }, { label: 'Step 3' }]

export const Stepper = ({
  variant,
}: {
  variant: 'circles' | 'circles-alt' | 'simple' | undefined
}) => {
  const step = useStepStore((state) => state.step)
  const { nextStep, prevStep, reset, activeStep } = useSteps({
    initialStep: 0,
  })
  const renderForm = () => {
    switch (step) {
      case 1:
        return <PersonalDetailsForm nextStep={nextStep} />
      case 2:
        return <EducationalDetailsForm nextStep={nextStep} prevStep={prevStep} />
      case 3:
        return <SocialHandlesForm nextStep={nextStep} prevStep={prevStep} reset={reset} />
    }
  }
  return (
    <Flex flexDir='column' width='100%'>
      <Steps variant={variant} colorScheme='purple' activeStep={activeStep}>
        {steps.map(({ label }, index) => (
          <Step key={label}>{renderForm()}</Step>
        ))}
      </Steps>
    </Flex>
  )
}
