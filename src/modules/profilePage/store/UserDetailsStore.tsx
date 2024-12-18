import { create } from 'zustand'

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
  socialHandles: any
  setFirstName: (firstName: string) => void
  setLastName: (lastName: string) => void
  setEmailAdd: (emailAdd: string) => void
  setPhoneNo: (phoneNo: string) => void
  setInstituteName: (instituteName: string) => void
  setCountry: (country: string) => void
  setCity: (city: string) => void
  setProfileImage: (profileImage: string) => void
  setSocialHandles: (socialHandles: any) => void
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
  setFirstName: (firstName) => set({ firstName }),
  setLastName: (lastName) => set({ lastName }),
  setEmailAdd: (emailAdd) => set({ emailAdd }),
  setPhoneNo: (phoneNo) => set({ phoneNo }),
  setInstituteName: (instituteName) => set({ instituteName }),
  setCountry: (country) => set({ country }),
  setCity: (city) => set({ city }),
  setProfileImage: (profileImage) => set({ profileImage }),
  setSocialHandles: (socialHandles) => set({ socialHandles }),
  setDetails: (details) => set(details),
}))

export default useUserDetailsStore