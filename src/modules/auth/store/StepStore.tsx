import { create } from 'zustand'
import { REGISTRATION_STEPS } from '../constants'

interface StepState {
  step: REGISTRATION_STEPS
  setStep: (to: REGISTRATION_STEPS) => void
}

const useStepStore = create<StepState>()((set) => ({
  step: 1,
  setStep: (to) => set(() => ({ step: to })),
}))

export default useStepStore
