export enum GiveQuizSteps {
  AccessWindow = -1,
  Instructions = 0,
  Sections = 1,
  Questions = 2,
}

export interface IQuizDetails {
  name?: string
  managers?: string[]
  description?: string
  instructions?: string
  startDate?: string
  startTime?: string
  endDate?: string
  endTime?: string
  duration?: string
  accessCode?: string
  bannerImage?: string
}

export interface IRegistrationForm {
  customFields: {
    name: string
    label: string
    isRequired: boolean
  }[]
}

export enum LogType {
  JoinQuiz = 'joinQuiz',
  LeftQuiz = 'leftQuiz',
  ServerDisconnect = 'server namespace disconnect',
  TabSwitch = 'tabSwitch',
  SusKey = 'susKey',
  RightClick = 'rightClick',
  IP = 'ip',
  Location = 'locationAccess',
  FullScreenExit = 'fullScreenExit',
}
