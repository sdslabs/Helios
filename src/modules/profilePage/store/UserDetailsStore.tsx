import { create } from 'zustand'
import { SocialHandle } from '../types'

interface UserDetailsStore {
  userID: string
  firstName: string
  lastName: string
  emailAdd: string
  phoneNo: string
  instituteName: string
  country: string
  city: string
  profileImage: string
  socialHandles: SocialHandle[]
  setFirstName: (firstName: string) => void
  setLastName: (lastName: string) => void
  setEmailAdd: (emailAdd: string) => void
  setPhoneNo: (phoneNo: string) => void
  setInstituteName: (instituteName: string) => void
  setCountry: (country: string) => void
  setCity: (city: string) => void
  setProfileImage: (profileImage: string) => void
  setSocialHandles: (socialHandles: SocialHandle[]) => void
  setDetails: (details: UserDetailsStore) => void
}

const useUserDetailsStore = create<UserDetailsStore>((set) => ({
  userID: '',
  firstName: '',
  lastName: '',
  emailAdd: '',
  phoneNo: '',
  instituteName: '',
  country: '',
  city: '',
  profileImage: '',
  socialHandles: [],
  setFirstName: (firstName: string) => set({ firstName: firstName }),
  setLastName: (lastName: string) => set({ lastName: lastName }),
  setEmailAdd: (emailAdd: string) => set({ emailAdd: emailAdd }),
  setPhoneNo: (phoneNo: string) => set({ phoneNo: phoneNo }),
  setInstituteName: (instituteName: string) => set({ instituteName: instituteName }),
  setCountry: (country: string) => set({ country: country }),
  setCity: (city: string) => set({ city: city }),
  setProfileImage: (profileImage: string) => set({ profileImage: profileImage }),
  setSocialHandles: (socialHandles: SocialHandle[]) => set({ socialHandles: socialHandles }),
  setDetails: (details: UserDetailsStore) => set(details),
}))

export default useUserDetailsStore
