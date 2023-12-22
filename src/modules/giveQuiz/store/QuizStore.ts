import { create } from 'zustand'

interface Section {
    name: string;
    description: string;
    questions: any[];
   }

interface quizStore {
 currentQuestion: string;
 sections: Section[];
 currentQuestionIndex: number;
 currentSection: string;
 currentSectionIndex: number;
 totalQuestions: number;
 totalSections: number;

 setCurrentQuestion: (to: string) => void;
 setSections: (to: Section[]) => void;
 setCurrentQuestionIndex: (to: number) => void;
 setCurrentSection: (to: string) => void;
 setCurrentSectionIndex: (to: number) => void;
 setTotalQuestions: (to: number) => void;
 setTotalSections: (to: number) => void;
}

const useQuizStore = create<quizStore>((set) => ({
 sections: [],
 currentQuestion: '',
 currentQuestionIndex: 1,
 currentSection: '',
 currentSectionIndex: 1,
 totalQuestions: 0,
 totalSections: 0,

 setCurrentQuestion: (to: string) => set({ currentQuestion: to }),
 setSections: (to: Section[]) => set({ sections: to }),
 setCurrentQuestionIndex: (to: number) => set({ currentQuestionIndex: to }),
 setCurrentSection: (to: string) => set({ currentSection: to }),
 setCurrentSectionIndex: (to: number) => set({ currentSectionIndex: to }),
 setTotalQuestions: (to: number) => set({ totalQuestions: to }),
 setTotalSections: (to: number) => set({ totalSections: to }),
}))

export default useQuizStore
