import { create } from 'zustand'

interface UserDetailsStore {
  firstName: string
  lastName: string
  emailAdd: string
  phoneNo: string
  instituteName: string
  setInstituteName: (instituteName: string) => void
  setDetails: (details: UserDetailsStore) => void
}

const useUserDetailsStore = create<UserDetailsStore>((set) => ({
  firstName: '',
  lastName: '',
  emailAdd: '',
  phoneNo: '',
  instituteName: '',
  setInstituteName: (instituteName) => set({ instituteName }),
  setDetails: (details) => set(details),
}))

export default useUserDetailsStore
