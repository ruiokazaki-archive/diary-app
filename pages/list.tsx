import { Timestamp } from 'firebase/firestore'
import type { NextPage } from 'next'
import Link from 'next/link'
import { FC, useEffect, useState } from 'react'
import emotionEmoji from '../features/diary/const/emotion'
import { useGetAllData } from '../features/diary/hooks/useGetData'
import { FirestoreDiary } from '../features/diary/types/diary'

type ItmeProps = {
  diaryId: string
  title: string
  emotion: string
  date: Timestamp
}

const ListItem: FC<ItmeProps> = ({ title, emotion, date, diaryId }) => {
  const createdAt = date.toDate()

  return (
    <li className="py-3 sm:py-4">
      <Link href={diaryId}>
        <div className="flex items-center space-x-4">
          <div className="flex-shrink-0">
            <p className="text-3xl">{emotionEmoji[Number(emotion)]}</p>
            {/* <img className="w-8 h-8 rounded-full" src={imgUrl} alt="Neil" /> */}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
              {title}
            </p>
            <p className="text-sm text-gray-500 truncate dark:text-gray-400">
              {`${createdAt.getFullYear()}/${
                createdAt.getMonth() + 1
              }/${createdAt.getDate()}`}
            </p>
          </div>
        </div>
      </Link>
    </li>
  )
}

const List: NextPage = () => {
  const [items, setItems] = useState<FirestoreDiary[]>([])
  const { getAllData } = useGetAllData()

  useEffect(() => {
    const asyncFn = async () => {
      const data = await getAllData()
      setItems(data)
    }
    asyncFn()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  })

  return (
    <div className="p-4 max-w-md bg-white rounded-lg border shadow-md sm:p-8 dark:bg-gray-800 dark:border-gray-700">
      <div className="flex justify-between items-center mb-4">
        <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">
          Latest Diary
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
          {items.map(({ createdAt, emotion, title, id }) => (
            <ListItem
              date={createdAt}
              title={title}
              emotion={emotion}
              diaryId={id}
              key={createdAt.toString()}
            />
          ))}
        </ul>
      </div>
    </div>
  )
}

export default List
