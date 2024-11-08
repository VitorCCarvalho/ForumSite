import { FThread } from "../fthread"

export interface FthreadImage{
    id?: number
    fThreadId: number
    imgId: string
    fThread?: FThread
}