import type { NextPage } from 'next'
import {
  BiUndo,
  BiRedo,
  BiBold,
  BiItalic,
  BiStrikethrough,
  BiCode,
  BiHeading,
  BiCodeBlock,
  BiListOl,
  BiListUl,
} from 'react-icons/bi'
import { BsBlockquoteLeft } from 'react-icons/bs'
import { FiChevronDown } from 'react-icons/fi'
import { useEditor, EditorContent, Editor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'

const MenuBar = ({ editor }: { editor: Editor | null }) => {
  if (!editor) {
    return null
  }

  return (
    <div className="flex gap-1 flex-wrap">
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={`opacity-60 hover:opacity-100 ${
          editor.isActive('bold') ? 'bg-gray-300' : ''
        }`}
      >
        <BiBold />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={`opacity-60 hover:opacity-100 ${
          editor.isActive('italic') ? 'bg-gray-300' : ''
        }`}
      >
        <BiItalic />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleStrike().run()}
        className={`opacity-60 hover:opacity-100 ${
          editor.isActive('strike') ? 'bg-gray-300' : ''
        }`}
      >
        <BiStrikethrough />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleCode().run()}
        className={`opacity-60 hover:opacity-100 ${
          editor.isActive('code') ? 'bg-gray-300' : ''
        }`}
      >
        <BiCode />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        className={`opacity-60 hover:opacity-100 ${
          editor.isActive('heading', { level: 3 }) ? 'bg-gray-300' : ''
        }`}
      >
        <BiHeading />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={`opacity-60 hover:opacity-100 ${
          editor.isActive('bulletList') ? 'bg-gray-300' : ''
        }`}
      >
        <BiListUl />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={`opacity-60 hover:opacity-100 ${
          editor.isActive('orderedList') ? 'bg-gray-300' : ''
        }`}
      >
        <BiListOl />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        className={`opacity-60 hover:opacity-100 ${
          editor.isActive('codeBlock') ? 'bg-gray-300' : ''
        }`}
      >
        <BiCodeBlock />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={`opacity-60 hover:opacity-100 ${
          editor.isActive('blockquote') ? 'bg-gray-300' : ''
        }`}
      >
        <BsBlockquoteLeft />
      </button>
      <button type="button" onClick={() => editor.chain().focus().undo().run()}>
        <BiUndo />
      </button>
      <button type="button" onClick={() => editor.chain().focus().redo().run()}>
        <BiRedo />
      </button>
    </div>
  )
}

const Home: NextPage = () => {
  const editor = useEditor({
    extensions: [StarterKit],
    editorProps: {
      attributes: {
        class:
          'rich-text prose prose-sm sm:prose lg:prose-lg xl:prose-2xl focus:outline-none m-0',
      },
    },
    content: '<p></p><p></p><p></p><p></p>',
  })

  return (
    <div className="flex flex-col items-center min-h-screen md:justify-center sm:pt-0">
      <div className="w-full md:px-16 md:py-20 mt-6 overflow-hidden rounded-lg lg:max-w-4xl">
        <div className="w-full px-6 py-4 bg-white rounded shadow-md ring-1 ring-gray-900/10">
          <h1 className="mb-4 text-3xl font-bold decoration-gray-400">
            投稿する
          </h1>
          <form className="flex flex-col gap-4">
            {/* title */}
            <div className="flex justify-between items-center">
              <label
                htmlFor="select"
                className="flex py-2.5 pl-2 pr-1 text-sm font-medium text-center text-gray-900 rounded-l-lg focus:ring-4 focus:outline-none focus:ring-gray-300 dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800 bg-gray-100 border border-gray-300 dark:border-gray-700 dark:text-white hover:bg-gray-200"
              >
                <select
                  id="select"
                  className="appearance-none outline-none focus:outline-none bg-gray-100 dark:text-white hover:bg-gray-200 border-0"
                >
                  <option value={1}>😖</option>
                  <option value={2}>😔</option>
                  <option value={3} selected>
                    🙂
                  </option>
                  <option value={4}>😚</option>
                  <option value={5}>🥳</option>
                  <option disabled>---</option>
                  <option value={6}>😡</option>
                  <option value={7}>😭</option>
                  <option disabled>---</option>
                  <option value={8}>✍️</option>
                </select>
                <FiChevronDown size="20px" />
              </label>
              <div className="relative w-full">
                <input
                  id="title"
                  className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-r-lg border-l-gray-100 border-l-2 border dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white focus:outline-0"
                  placeholder="タイトルを入力してください"
                  required
                />
              </div>
            </div>

            {/* Richtext */}
            <div className="w-full bg-gray-50 rounded-lg border border-gray-200 dark:bg-gray-700 dark:border-gray-600">
              <div className="flex justify-between items-center py-2 px-3 border-b dark:border-gray-600">
                <MenuBar editor={editor} />
              </div>
              <div className="py-2 px-4 rounded-b-lg dark:bg-gray-800">
                <label htmlFor="editor" className="sr-only">
                  Publish post
                </label>
                <EditorContent editor={editor} />
              </div>
            </div>

            {/* dropzone */}
            <div>
              <label
                htmlFor="dropzone-file"
                className="flex flex-col justify-center items-center w-full h-64 bg-gray-50 rounded-lg border-2 border-gray-300 border-dashed cursor-pointer dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
              >
                <div className="flex flex-col justify-center items-center pt-5 pb-6">
                  <svg
                    aria-hidden="true"
                    className="mb-3 w-10 h-10 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                    />
                  </svg>
                  <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                    <span className="font-semibold">Click to upload </span>
                    or drag and drop
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    SVG, PNG, JPG or GIF
                  </p>
                </div>
                <input id="dropzone-file" type="file" className="hidden" />
              </label>
            </div>

            {/* submit button */}
            <button
              type="submit"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              投稿する
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Home
