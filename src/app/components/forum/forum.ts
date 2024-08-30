import { FThread } from '../fthread/fthread'
export interface Forum {
  id: number
  name: string
  description: string
  threads: FThread[]
}

