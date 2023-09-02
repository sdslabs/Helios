import { create } from 'zustand'

interface EducationalInfoState {
  country: string
  city: string
  org: string

  updateCountry: (to: string) => void
  updateCity: (to: string) => void
  updateOrg: (to: string) => void
}

const useEducationalInfoStore = create<EducationalInfoState>()((set) => ({
  country: '',
  city: '',
  org: '',

  updateCountry: (to: string) => set({ country: to }),
  updateCity: (to: string) => set({ city: to }),
  updateOrg: (to: string) => set({ org: to }),
}))

export default useEducationalInfoStore
