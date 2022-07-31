import { FC } from 'react'
import { Editor, EditorContent } from '@tiptap/react'
import Menubar from './Menubar'

type Props = {
  editor: Editor | null
}

const RitchTextForm: FC<Props> = ({ editor }) => (
  <div className="w-full bg-gray-50 rounded-lg border border-gray-200 dark:bg-gray-700 dark:border-gray-600">
    <div className="flex justify-between items-center py-2 px-3 border-b dark:border-gray-600">
      <Menubar editor={editor} />
    </div>
    <div className="py-2 px-4 rounded-b-lg dark:bg-gray-800">
      <label htmlFor="editor" className="sr-only">
        Publish post
      </label>
      <EditorContent editor={editor} />
    </div>
  </div>
)

export default RitchTextForm
