import { useState } from 'react'
import { RegisterPageWrapper } from '../modules/auth/components/RegisterPageWrapper'
let Register1 = '/assets/images/register-1.png'
let Register2 = './assets/images/register-2.png'
let Register3 = '/assets/images/register-3.png'
import { REGISTRATION_STEPS } from '../modules/auth/constants'

const Register = () => {
  const [step, setStep] = useState<REGISTRATION_STEPS>(1) 
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
    <RegisterPageWrapper step={step} imageUrl={getImage()} heading={getPageHeading()}>
      {renderPageContent()}
    </RegisterPageWrapper>
  )
}

export default Register