import { create } from 'zustand'

export interface Section {
  id: string
  title?: string
  description?: string
  questions?: string[]
}

export interface SectionStore {
  sections: Section[]
  currentSectionIdx: number | null
  setCurrentSectionIdx: (idx: number) => void
  addSection: () => void
}

const useSectionStore = create<SectionStore>((set) => ({
  sections: [],
  currentSectionIdx: null,
  setCurrentSectionIdx: (idx) => set({ currentSectionIdx: idx }),
  addSection: () =>
    set((state) => ({
      currentSectionIdx: state.sections.length,
      sections: [...state.sections, { id: `${state.sections.length + 1}` }],
    })),
}))

export default useSectionStore
