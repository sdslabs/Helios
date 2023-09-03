import { create } from 'zustand'

interface Handle {
  platformLabel: string
  platformValue: string
  link: string
}

interface SocialHandlesState {
  socialMediaHandles: Handle[]
  updateHandle: (index: number, handle: Handle) => void
}

const useSocialHandlesStore = create<SocialHandlesState>((set) => ({
  socialMediaHandles: [
    { platformLabel: '', platformValue: '', link: '' },
    { platformLabel: '', platformValue: '', link: '' },
    { platformLabel: '', platformValue: '', link: '' },
  ],

  updateHandle: (index: number, handle: Handle) => {
    set((state) => {
      if (index >= 0 && index < state.socialMediaHandles.length) {
        const updatedHandles = [...state.socialMediaHandles]
        updatedHandles[index] = handle

        return { socialMediaHandles: updatedHandles }
      }
      return state
    })
  },
}))

export default useSocialHandlesStore
