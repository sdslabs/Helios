import { create } from 'zustand'

interface PersonalDetailsState {
  firstName: string
  lastName: string
  email: string
  phone: string

  updateFirstName: (to: string) => void
  updateLastName: (to: string) => void
  updateEmail: (to: string) => void
  updatePhone: (to: string) => void
}

const usePersonalDetailsStore = create<PersonalDetailsState>()((set) => ({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',

  updateFirstName: (to: string) => set({ firstName: to }),
  updateLastName: (to: string) => set({ lastName: to }),
  updateEmail: (to: string) => set({ email: to }),
  updatePhone: (to: string) => set({ phone: to }),
}))

export default usePersonalDetailsStore
