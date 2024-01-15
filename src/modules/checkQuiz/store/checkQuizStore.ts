import { create, SetState } from 'zustand';
import { Question, Section } from '@checkQuiz/types';
import { set } from 'lodash';

interface CheckQuizStore {
  currentQuestion: string;
  sections: Section[];
  currentQuestionIndex: number;
  currentSection: Section;
  currentSectionIndex: number;
  totalQuestion: number;
  checkedQuestions: string[];
  checkedAnsweredQuestions: string[];
  isCurrentQuestionchecked: string;
  leaderboard: any;
  admin: string;
  quizName: string;
  totalAttempts: number;
  checksCompleted: number;
  scheduled: string;
  participants: string[];
  totalParticipants: number;
  quizID: string;
  sortStatus: string;
  currentResponse: string;
  currentResponseIndex: number;
  allResponsesID: string[];

  setCurrentQuestion: (to: string) => void;
  setSections: (to: Section[]) => void;
  setCurrentQuestionIndex: (to: number) => void;
  setCurrentSection: (to: Section) => void;
  setCurrentSectionIndex: (to: number) => void;
  setTotalQuestion: (to: number) => void;
  setcheckedQuestions: (to: string[]) => void;
  setcheckedAnsweredQuestions: (to: string[]) => void;
  setIsCurrentQuestionchecked: (to: string) => void;
  setLeaderboard: (to: any) => void;
  setAdmin: (to: string) => void;
  setQuizName: (to: string) => void;
  setTotalAttempts: (to: number) => void;
  setChecksCompleted: (to: number) => void;
  setScheduled: (to: string) => void;
  setParticipants: (to: string[]) => void;
  setTotalParticipants: (to: number) => void;
  setQuizID: (to: string) => void;
  setSortStatus: (to: string) => void;
  setcurrentResponse: (to: string) => void;
  setcurrentResponseIndex: (to: number) => void;
  setallResponsesID: (to: string[]) => void;

  nextQuestion: () => {
    currentQuestion: string;
    currentQuestionIndex: number;
    currentSectionIndex: number;
    currentSection?: Section;
  } | void;
}

const useCheckQuizStore = create<CheckQuizStore>((set: SetState<CheckQuizStore>) => {
  const initialState: CheckQuizStore = {
    sections: [],
    currentQuestion: '',
    currentQuestionIndex: 1,
    currentSection: { name: '', description: '', questions: [] },
    currentSectionIndex: 1,
    totalQuestion: 0,
    checkedQuestions: [],
    checkedAnsweredQuestions: [],
    isCurrentQuestionchecked: 'unchecked',
    leaderboard: [],
    admin: '',
    quizName: '',
    totalAttempts: 0,
    checksCompleted: 0,
    scheduled: '',
    participants: [],
    totalParticipants: 0,
    quizID: '',
    sortStatus: 'assending',
    currentResponse: '',
    currentResponseIndex: 0,
    allResponsesID: [],

    setCurrentQuestion: (to: string) => set({ currentQuestion: to }),
    setSections: (to: Section[]) => set({ sections: to }),
    setCurrentQuestionIndex: (to: number) => set({ currentQuestionIndex: to }),
    setCurrentSection: (to: Section) => set({ currentSection: to }),
    setCurrentSectionIndex: (to: number) => set({ currentSectionIndex: to }),
    setTotalQuestion: (to: number) => set({ totalQuestion: to }),
    setcheckedQuestions: (to: string[]) => set({ checkedQuestions: to }),
    setcheckedAnsweredQuestions: (to: string[]) => set({ checkedAnsweredQuestions: to }),
    setIsCurrentQuestionchecked: (to: string) => set({ isCurrentQuestionchecked: to }),
    setLeaderboard: (to: any) => set({ leaderboard: to }),
    setAdmin: (to: string) => set({ admin: to }),
    setQuizName: (to: string) => set({ quizName: to }),
    setTotalAttempts: (to: number) => set({ totalAttempts: to }),
    setChecksCompleted: (to: number) => set({ checksCompleted: to }),
    setScheduled: (to: string) => set({ scheduled: to }),
    setParticipants: (to: string[]) => set({ participants: to }),
    setTotalParticipants: (to: number) => set({ totalParticipants: to }),
    setQuizID: (to: string) => set({ quizID: to }),
    setSortStatus: (to: string) => set({ sortStatus: to }),
    setcurrentResponse: (to: string) => set({ currentResponse: to }),
    setcurrentResponseIndex: (to: number) => set({ currentResponseIndex: to }),
    setallResponsesID: (to: string[]) => set({ allResponsesID: to }),
   
    nextQuestion: () => {
      const { sections, currentQuestionIndex, currentSectionIndex } = useCheckQuizStore.getState();
      const currentSection = sections[currentSectionIndex - 1];

      if (currentSection && currentSection.questions) {
        const currentQuestion = currentSection.questions[currentQuestionIndex - 1];

        if (currentQuestionIndex === currentSection.questions.length) {
          if (currentSectionIndex === sections.length) {
            return;
          }
          return {
            currentQuestion: sections[currentSectionIndex].questions[0].description,
            currentQuestionIndex: 1,
            currentSectionIndex: currentSectionIndex + 1,
            currentSection: sections[currentSectionIndex],
          };
        }
        return {
          currentQuestion: currentQuestion.description,
          currentQuestionIndex: currentQuestionIndex + 1,
          currentSectionIndex: currentSectionIndex,
          currentSection: currentSection,
        };
      }

      return; 
    },
  };

  return initialState;
});

export default useCheckQuizStore;
