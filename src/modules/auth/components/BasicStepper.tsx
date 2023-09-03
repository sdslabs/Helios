import { useColorModeValue } from '@chakra-ui/color-mode'
import { Box } from '@chakra-ui/layout'
import { Button, Flex, Heading } from '@chakra-ui/react'
import { Step, Steps, useSteps } from 'chakra-ui-steps'
import useOnBoardStore from '../store/store'

// import { REGISTRATION_STEPS } from "../constants";

const steps = [{ label: 'Step 1' }, { label: 'Step 2' }, { label: 'Step 3' }]

export const BasicStepper = ({
  variant,
}: {
  variant: 'circles' | 'circles-alt' | 'simple' | undefined
}) => {
  const { appendStep, resetStep } = useOnBoardStore()
  const { nextStep, prevStep, reset, activeStep } = useSteps({
    initialStep: 0,
  })
  const isLastStep = activeStep === steps.length - 1
  const hasCompletedAllSteps = activeStep === steps.length
  const bg = useColorModeValue('gray.200', 'gray.700')
  return (
    <Flex flexDir='column' width='100%'>
      <Steps variant={variant} colorScheme='purple' activeStep={activeStep}>
        {steps.map(({ label }, index) => (
          <Step label={label} key={label}>
            <Box sx={{ p: 8, bg, my: 8, rounded: 'md' }}>
              <Heading fontSize='xl' textAlign='center'>
                Step {index + 1}
              </Heading>
            </Box>
          </Step>
        ))}
      </Steps>
      {hasCompletedAllSteps && (
        <Box sx={{ bg, my: 8, p: 8, rounded: 'md' }}>
          <Heading fontSize='xl' textAlign={'center'}>
            Woohoo! All steps completed! 🎉
          </Heading>
        </Box>
      )}
      <Flex width='100%' justify='flex-end' gap={4}>
        {hasCompletedAllSteps ? (
          <Button
            size='sm'
            onClick={() => {
              reset()
              resetStep()
            }}
          >
            Reset
          </Button>
        ) : (
          <>
            <Button
              isDisabled={activeStep === 0}
              size='sm'
              variant='ghost'
              onClick={() => {
                prevStep()
                appendStep(-1)
              }}
            >
              Prev
            </Button>
            <Button
              size='sm'
              onClick={() => {
                nextStep()
                appendStep(1)
              }}
            >
              {isLastStep ? 'Finish' : 'Next'}
            </Button>
          </>
        )}
      </Flex>
    </Flex>
  )
}
