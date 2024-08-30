export interface Post {
  id?: number
  threadId: number
  text: string
  userId: string
  dateCreated: Date
  locked: boolean
  score?: number
}
