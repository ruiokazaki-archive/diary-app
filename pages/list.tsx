import {
  collection,
  DocumentData,
  getDocs,
  getFirestore,
  QueryDocumentSnapshot,
  SnapshotOptions,
} from 'firebase/firestore'
import type { NextPage } from 'next'
import Link from 'next/link'
import { FC, useState } from 'react'
import useAuthContext from '../features/auth/store/AuthContext'

type ItmeProps = {
  title: string
  imgUrl: string
  date: string
}

const ListItem: FC<ItmeProps> = ({ title, imgUrl, date }) => (
  <li className="py-3 sm:py-4">
    <div className="flex items-center space-x-4">
      <div className="flex-shrink-0">
        <img className="w-8 h-8 rounded-full" src={imgUrl} alt="Neil" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
          {title}
        </p>
        <p className="text-sm text-gray-500 truncate dark:text-gray-400">
          {date}
        </p>
      </div>
    </div>
  </li>
)

type FirestorePost = {
  body: string
  emotion: string
  title: string
  uploadImage: string
  createdAt: Date
  updatedAt: Date
}

const userConverter = {
  toFirestore(post: FirestorePost): DocumentData {
    return []
  },
  fromFirestore(
    snapshot: QueryDocumentSnapshot,
    options: SnapshotOptions
  ): FirestorePost {
    const { body, emotion, title, uploadImage, createdAt, updatedAt } =
      snapshot.data(options)
    return {
      body,
      emotion,
      title,
      uploadImage,
      createdAt,
      updatedAt,
    }
  },
}

const List: NextPage = () => {
  const [items, setItems] = useState<ItmeProps[]>([])
  const { user } = useAuthContext()

  const getData = async () => {
    const db = getFirestore()
    const dt = user?.uid
      ? await getDocs(collection(db, user.uid).withConverter(userConverter))
      : undefined

    if (dt === undefined) return

    const hoge = dt.docs.map((d) => d.data())

    // eslint-disable-next-line no-console
    console.log(hoge)
  }
  getData()

  return (
    <div className="p-4 max-w-md bg-white rounded-lg border shadow-md sm:p-8 dark:bg-gray-800 dark:border-gray-700">
      <div className="flex justify-between items-center mb-4">
        <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">
          Latest Customers
        </h5>
        <Link
          href="/"
          className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500"
        >
          View all
        </Link>
      </div>
      <div className="flow-root">
        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
          <ListItem title="title" imgUrl="/favicon.ico" date="2022/02/06" />
          <ListItem title="title" imgUrl="/favicon.ico" date="2022/02/06" />
          <ListItem title="title" imgUrl="/favicon.ico" date="2022/02/06" />
          <ListItem title="title" imgUrl="/favicon.ico" date="2022/02/06" />
          <ListItem title="title" imgUrl="/favicon.ico" date="2022/02/06" />
        </ul>
      </div>
    </div>
  )
}

export default List
