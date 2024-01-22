export enum GiveQuizSteps {
    AccessWindow = -1,
    Instructions = 0,
    Sections = 1,
    Questions = 2,
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
  FullScreenExit = 'fullScreenExit'
}