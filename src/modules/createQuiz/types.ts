export enum QuizCreationSteps {
  info = 0,
  registrationForm = 1,
  questions = 2,
  sectionDetails = 3,
  questionDetails = 4,
  registrants = 5
}

export interface Option {
  id: string;
  label: string;
}