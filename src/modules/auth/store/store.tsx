import { create } from 'zustand'

interface OnBoardState {
  step: number
  appendStep: (by: number) => void
  resetStep: () => void
}

const useOnBoardStore = create<OnBoardState>()((set) => ({
  step: 1,
  appendStep: (by) => set((state) => ({ step: state.step + by })),
  resetStep: () => set((state) => ({ step: 1 })),
}))

export default useOnBoardStore
