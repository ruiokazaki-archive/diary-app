import { FC } from 'react'

const AuthForm: FC = () => (
  <div className="w-full max-w-sm p-6 m-auto bg-white rounded-md shadow-md dark:bg-gray-800">
    <h1 className="text-3xl font-semibold text-center text-gray-700 dark:text-white">
      Authentication
    </h1>

    <div className="flex items-center mt-6 -mx-2">
      <button
        type="button"
        className="flex items-center justify-center w-full px-6 py-2 mx-2 text-sm font-medium text-white transition-colors duration-200 transform bg-blue-500 rounded-md hover:bg-blue-400 focus:bg-blue-400 focus:outline-none"
      >
        <svg className="w-4 h-4 mx-2 fill-current" viewBox="0 0 24 24">
          <path d="M12.24 10.285V14.4h6.806c-.275 1.765-2.056 5.174-6.806 5.174-4.095 0-7.439-3.389-7.439-7.574s3.345-7.574 7.439-7.574c2.33 0 3.891.989 4.785 1.849l3.254-3.138C18.189 1.186 15.479 0 12.24 0c-6.635 0-12 5.365-12 12s5.365 12 12 12c6.926 0 11.52-4.869 11.52-11.726 0-.788-.085-1.39-.189-1.989H12.24z" />
        </svg>

        <span className="hidden mx-2 sm:inline">Sign in with Google</span>
      </button>
    </div>

    <p className="mt-8 text-xs font-light text-center text-gray-400">
      Don&apos;t have an account?
      <a
        target="_blank"
        href="https://accounts.google.com/signup/v2/webcreateaccount?continue=https%3A%2F%2Faccounts.google.com%2FManageAccount%3Fnc%3D1&dsh=S-1543265819%3A1658840018083227&biz=false&flowName=GlifWebSignIn&flowEntry=SignUp"
        className="font-medium text-gray-700 dark:text-gray-200 hover:underline"
        rel="noreferrer"
      >
        Create One
      </a>
    </p>
  </div>
)

export default AuthForm
