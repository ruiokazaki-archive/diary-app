import type { NextPage } from 'next'
import CreateForm from '../features/diary/components/CreateForm'

const Home: NextPage = () => (
  <div className="flex flex-col items-center min-h-screen md:justify-center sm:pt-0">
    <div className="w-full mt-6 overflow-hidden rounded-lg lg:max-w-4xl">
      <div className="w-full px-6 py-4 bg-white rounded shadow-md ring-1 ring-gray-900/10">
        <h1 className="mb-4 text-3xl font-bold decoration-gray-400">
          投稿する
        </h1>
        <CreateForm />
      </div>
    </div>
  </div>
)

export default Home
