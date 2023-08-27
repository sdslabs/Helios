import { createContext, useState } from 'react'
// import { REGISTRATION_STEPS } from '../constants'

interface StepContextData {
    step: number
    setStep: React.Dispatch<React.SetStateAction<number>>
};

let sampleSetStep: React.Dispatch<React.SetStateAction<number>>

const StepContext = createContext<StepContextData>({
    step: 1,
    setStep: () => {
        sampleSetStep(0)
    }
})

export default StepContext;
