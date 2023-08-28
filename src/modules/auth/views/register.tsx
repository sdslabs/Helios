import { RegisterPageWrapper } from '../components/RegisterPageWrapper'
import Register1 from '@assets/images/register-1.png'
import Register2 from '@assets/images/register-2.png'
import Register3 from '@assets/images/register-3.png'
import { REGISTRATION_STEPS } from '../constants'
import { BasicStepper } from '../components/BasicStepper'
import useOnBoardStore from '../store/store'

export const Register = () => {
  // const [step, setStep] = useState<number>(1) // TODO: Move to a logic governed by backend
  const { step } = useOnBoardStore()

  const renderPageContent = () => {
    switch (step) {
      case 1:
        return <div>Step 1</div>
      default:
        return null
    }
  }

  const getImage = () => {
    switch (step) {
      case 1:
        return Register1
      case 2:
        return Register2
      case 3:
        return Register3
      default:
        return Register1
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
      default:
        return 'Finished!'
    }
  }

  return (
    <RegisterPageWrapper step={step} imageUrl={getImage()} heading={getPageHeading()}>
      <BasicStepper variant='circles' />
    </RegisterPageWrapper>
  )
}
