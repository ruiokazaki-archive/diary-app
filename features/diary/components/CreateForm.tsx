import { FiChevronDown } from 'react-icons/fi'
import { AiOutlineLoading } from 'react-icons/ai'
import { GoCloudUpload } from 'react-icons/go'
import { useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import {
  ChangeEventHandler,
  FormEventHandler,
  memo,
  useRef,
  useState,
} from 'react'
import { getStorage, ref, uploadBytes } from 'firebase/storage'
import { doc, getFirestore, setDoc } from 'firebase/firestore'
import imageCompression from 'browser-image-compression'
import { toast } from 'react-toastify'
import Button from '../../../components/elements/Button'
import RitchTextForm from './RitchTextForm'
import useAuthContext from '../../auth/store/AuthContext'

const CreateForm = () => {
  const [image, setImage] = useState<string>()
  const titleRef = useRef<HTMLInputElement>(null)
  const emotionRef = useRef<HTMLSelectElement>(null)
  const imageFileRef = useRef<HTMLInputElement>(null)
  const now = new Date()

  const [isLoading, setIsLoading] = useState(false)

  const { user } = useAuthContext()

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

  const uploadImageHandler: ChangeEventHandler<HTMLInputElement> = () => {
    const files = imageFileRef.current?.files
    // eslint-disable-next-line no-console
    console.log(files)

    if (files === null || files === undefined || files.length === 0) return

    const reader = new FileReader()
    reader.readAsDataURL(files[0])
    reader.addEventListener('load', ({ target }) => {
      if (target === null) return

      setImage(String(target.result))
    })
  }

  const firebaseImageUploader = async (file: File) => {
    const storage = getStorage()
    const storageRef = ref(storage, `${user?.uid}-${now.getTime()}`)

    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 1000,
      useWebWorker: true,
    }
    const compressedFile = await imageCompression(file, options)
    const snapshot = await uploadBytes(storageRef, compressedFile)
    return snapshot.metadata.fullPath
  }

  const registerWithFirestore = async () => {
    const title = titleRef.current?.value
    const emotion = emotionRef.current?.value
    if (
      editor === null ||
      title === null ||
      title === undefined ||
      user === undefined ||
      user === null ||
      titleRef.current === null
    ) {
      return
    }

    try {
      setIsLoading(true)

      const body = editor.getHTML()

      const imageFiles = imageFileRef.current?.files
      const uploadImage =
        imageFiles?.length === 1
          ? await firebaseImageUploader(imageFiles[0])
          : null

      const submitData = {
        title,
        body,
        emotion,
        uploadImage,
      }

      const db = getFirestore()
      setDoc(doc(db, user.uid, String(now.getTime())), submitData)

      setImage(undefined)
      titleRef.current.value = ''
      editor.commands.setContent('<p></p><p></p><p></p><p></p>')

      setIsLoading(false)
    } catch (error) {
      setIsLoading(false)
      // eslint-disable-next-line no-console
      console.error(error)
      throw new Error()
    }
  }

  const submitHander: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
    toast.promise(registerWithFirestore, {
      pending: 'Promise is pending',
      success: 'Promise resolved 👌',
      error: 'Promise rejected 🤯',
    })
  }

  return (
    <form className="flex flex-col gap-4" onSubmit={submitHander}>
      {/* title */}
      <div className="flex justify-between items-center">
        <label
          htmlFor="select"
          className="flex py-2.5 pl-2 pr-1 text-sm font-medium text-center text-gray-900 rounded-l-lg focus:ring-4 focus:outline-none focus:ring-gray-300 dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800 bg-gray-100 border border-gray-300 dark:border-gray-700 dark:text-white hover:bg-gray-200"
        >
          <select
            id="select"
            ref={emotionRef}
            className="appearance-none outline-none focus:outline-none bg-gray-100 dark:text-white hover:bg-gray-200 border-0"
            defaultValue={3}
          >
            <option value={1}>😖</option>
            <option value={2}>😔</option>
            <option value={3}>🙂</option>
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
            ref={titleRef}
            className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-r-lg border-l-gray-100 border-l-2 border dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white focus:outline-0"
            placeholder="タイトルを入力してください"
            required
          />
        </div>
      </div>

      {/* Richtext */}
      <RitchTextForm editor={editor} />

      {/* dropzone */}
      <div>
        <label
          htmlFor="dropzone-file"
          className="flex flex-col justify-center items-center w-full min-h-[256px] bg-gray-50 rounded-lg border-2 border-gray-300 border-dashed cursor-pointer dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
        >
          {image ? (
            <img src={image} alt="" className="object-contain h-2/5" />
          ) : (
            <div className="flex flex-col justify-center items-center pt-5 pb-6">
              <GoCloudUpload size="48px" className="fill-gray-500" />
              <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                <span className="font-semibold">Click to upload </span>
                or drag and drop
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                SVG, PNG, JPG or GIF
              </p>
            </div>
          )}
          <input
            id="dropzone-file"
            type="file"
            accept="image/*"
            onChange={uploadImageHandler}
            className="hidden"
            ref={imageFileRef}
          />
        </label>
      </div>

      {/* submit button */}
      <Button htmlType="submit" htmlDisabled={isLoading}>
        {isLoading ? (
          <div className="flex justify-center items-center gap-2">
            <AiOutlineLoading className="animate-spin" size="16px" />
            登録中
          </div>
        ) : (
          '投稿する'
        )}
      </Button>
    </form>
  )
}

export default memo(CreateForm)
