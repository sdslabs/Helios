export enum QuestionType {
  MCQ = 'Multiple Choice',
  SUB = 'Subjective',
}

export enum UserRoles {
  superAdmin = 'superAdmin',
  admin = 'admin',
  manager = 'manager',
  user = 'user',
}

export interface UserData {
  userId: string
  emailAdd: string
  role: UserRoles
}
