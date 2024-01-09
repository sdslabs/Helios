import { create } from 'zustand'
import { useCreateSection } from '@createQuiz/api/useSection'
export interface Section {
  id: string
  name?: string
  instructions?: string
  questions?: string[]
}

export interface SectionStore {
  sections: Section[]
  currentSectionIdx: number | null
  setCurrentSectionIdx: (idx: number) => void
  addSection: () => void
  setSections: (sections: Section[]) => void
  setSectionMetadata: ( sectionIdx: number, key: string, value: string) => void
  addQuestion: (sectionIdx: number, questionId: string) => void
}

const useSectionStore = create<SectionStore>((set) => ({
  sections: [],
  currentSectionIdx: null,
  setSections: (sections: Section[]) => set({ sections }),
  setCurrentSectionIdx: (idx) => set({ currentSectionIdx: idx }),
  addSection: () =>{
    set((state) => ({
      currentSectionIdx: state.sections.length,
      sections: [...state.sections, { id: `${state.sections.length + 1}`, name: `Section ${state.sections.length + 1}`, instructions: '', questions: [] }],
    }))},
  setSectionMetadata: (sectionIdx, key, value) => {
    set((state) => {
      const sections = [...state.sections]
      sections[sectionIdx] = { ...sections[sectionIdx], [key]: value }
      return { sections }
    })
  },
  addQuestion: (sectionIdx, questionId) => {
    set((state) => {
      const sections = [...state.sections]
      sections[sectionIdx].questions?.push(questionId)
      return { sections }
    })
  }
}))

export default useSectionStore
