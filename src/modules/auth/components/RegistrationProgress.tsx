import { Badge, BadgeProps, HStack } from '@chakra-ui/react'
import { REGISTRATION_STEPS } from '../constants'

interface RegistrationProgressProps {
  step: REGISTRATION_STEPS
}

export const RegistrationProgress = ({ step }: RegistrationProgressProps) => {
  return (
    <HStack>
      <CustomBadge isActive={step === 1}>1</CustomBadge>
      <CustomBadge isActive={step === 2}>2</CustomBadge>
      <CustomBadge isActive={step === 3}>3</CustomBadge>
    </HStack>
  )
}

interface CustomBadgeProps extends BadgeProps {
  isActive: boolean
}
const CustomBadge = ({ children, isActive, ...props }: CustomBadgeProps) => (
  <Badge px={2.5} py={1} rounded='full' bgColor='v1' color='brand' {...props}>
    {children}
  </Badge>
)
