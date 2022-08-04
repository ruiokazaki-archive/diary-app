import { Timestamp } from 'firebase/firestore'

export type FirestoreDiary = {
  id: string
  body: string
  emotion: string
  title: string
  uploadImage: string
  createdAt: Timestamp
  updatedAt: Timestamp
}
