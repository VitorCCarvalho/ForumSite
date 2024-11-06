import { Post } from '../post/post'
export interface FThread {
  id?: number
  forumID: number
  name: string
  text: string
  sticky?: boolean
  active?: boolean
  dateCreated?: Date
  userId?: string
  locked?: boolean
  posts?: Post[]
  score?: number
}
