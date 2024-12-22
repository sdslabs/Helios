export interface Quiz {
  _id: string
  name: string
  description: string
  startDateTimestamp: Date
  bannerImage: string
  creator: string
  resultsPublished: string
  rank: number
  totalParticipants: number
}

export interface SocialHandle {
  type: string
  handle: string
}

export enum NumberCardType {
  hosted = 'hosted',
  attempted = 'attempted',
}

export enum ButtonType {
  unchecked = 'unchecked',
  view = 'View Report',
}
