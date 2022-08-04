import {
  DocumentData,
  QueryDocumentSnapshot,
  SnapshotOptions,
  collection,
  getDocs,
  getFirestore,
  limit,
  query,
} from 'firebase/firestore'
import useAuthContext from '../../auth/store/AuthContext'
import { FirestorePost } from '../types/diary'

const userConverter = {
  toFirestore(): DocumentData {
    return []
  },
  fromFirestore(
    snapshot: QueryDocumentSnapshot,
    options: SnapshotOptions
  ): FirestorePost {
    const { id, body, emotion, title, uploadImage, createdAt, updatedAt } =
      snapshot.data(options)
    return {
      id,
      body,
      emotion,
      title,
      uploadImage,
      createdAt,
      updatedAt,
    }
  },
}

export const useGetAllData = () => {
  const { user } = useAuthContext()

  const getAllData = async () => {
    const db = getFirestore()
    if (!user) return []
    const dt = await getDocs(
      query(collection(db, user.uid).withConverter(userConverter))
    )

    if (dt === undefined) return []
    return dt.docs.map((d) => d.data())
  }

  return { getAllData }
}

export const useGetThreeData = () => {
  const { user } = useAuthContext()

  const getThreeData = async () => {
    const db = getFirestore()
    if (!user) return []
    const dt = await getDocs(
      query(collection(db, user.uid).withConverter(userConverter), limit(3))
    )

    if (dt === undefined) return []
    return dt.docs.map((d) => d.data())
  }

  return { getThreeData }
}
