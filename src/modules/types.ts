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
  userId: any
  emailAdd: string
  role: UserRoles
}
