export type QuizDetails = {
  _id: number
  name: string
  description: string
  instructions: string
  startDateTimestamp: Date
  endDateTimestamp: Date
  bannerImage: string,
  isAcceptingAnswers: boolean
  registrationMetadata: object
  registered: boolean
  submitted: boolean
}

export enum NumberCardType {
  hosted='hosted',
  attempted='attempted'
}
