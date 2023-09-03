import { RegisterPageWrapper } from '../components/RegisterPageWrapper'
import Register1 from '@assets/images/register-1.png'
import Register2 from '@assets/images/register-2.png'
import Register3 from '@assets/images/register-3.png'
import { Stepper } from '@auth/components/Stepper'
import useStepStore from '@auth/store/StepStore'

export const Register = () => {
  // TODO: Move to a logic governed by backend
  const step = useStepStore((state) => state.step)

  const getImage = () => {
    switch (step) {
      case 1:
        return Register1
      case 2:
        return Register2
      case 3:
        return Register3
    }
  }

  const getPageHeading = () => {
    switch (step) {
      case 1:
        return 'Welcome to Quizio !'
      case 2:
        return 'Take a deep breath !'
      case 3:
        return 'Getting Started !'
    }
  }

  return (
    <RegisterPageWrapper imageUrl={getImage()} heading={getPageHeading()}>
      <Stepper variant='circles' />
    </RegisterPageWrapper>
  )
}
