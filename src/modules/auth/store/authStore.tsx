import { create } from 'zustand'

interface User {
  userId: number
  emailAdd: string
  role: string
}

interface authStore {
  user: User
  onboarded: boolean
  profileUrl: string
  setUser: (to: User) => void
  setOnboarded: (to: boolean) => void
  setProfileUrl: (to: string) => void
}

const useAuthStore = create<authStore>()((set) => ({
  user: {
    userId: 0,
    emailAdd: '',
    role: '',
  },
  onboarded: false,
  profileUrl: '',
  setUser: (to: User) => set({ user: to }),
  setOnboarded: (to: boolean) => set({ onboarded: to }),
  setProfileUrl: (to: string) => set({ profileUrl: to }),
}))

export default useAuthStore
