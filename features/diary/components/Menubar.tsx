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
import { Editor } from '@tiptap/react'
import { memo } from 'react'

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

export default memo(MenuBar)
