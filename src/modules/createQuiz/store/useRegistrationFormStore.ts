import { create } from 'zustand'

export interface CustomFields {
  name: string
  label: string
  isRequired: boolean
}
export interface RegistrationForm {
  customFields: CustomFields[]
}

export interface RegistrationFormStore {
  registrationForm: RegistrationForm
  setRegistrationForm: (registrationForm: RegistrationForm) => void
}

const useRegistrationFormStore = create<RegistrationFormStore>((set) => ({
  registrationForm: {
    customFields: [],
  },
  setRegistrationForm: (registrationForm) => set({ registrationForm }),
}))

export default useRegistrationFormStore
