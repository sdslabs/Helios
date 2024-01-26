export enum QuestionType {
  MCQ = 'mcq',
  SUB = 'sub',
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
