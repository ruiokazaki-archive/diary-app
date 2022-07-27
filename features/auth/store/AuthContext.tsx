import {
  getAuth,
  onAuthStateChanged,
  signInAnonymously,
  User,
} from 'firebase/auth'
import {
  createContext,
  FC,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'
import app from '../../../libs/firebase'

export type UserType = User | null

export type AuthContextProps = {
  user: UserType
}

export type Props = {
  children: ReactNode
}

const AuthContext = createContext<Partial<AuthContextProps>>({})

export const AuthProvider: FC<Props> = ({ children }) => {
  const auth = getAuth(app)
  const [user, setUser] = useState<UserType>(null)

  useEffect(() => {
    const authStateChanged = onAuthStateChanged(auth, (currentUser) => {
      // userがnullの場合は匿名認証をする
      if (currentUser === null) {
        signInAnonymously(auth).catch((error) => {
          // 失敗した場合はerrorをthrowする
          throw new Error(error)
        })
        return
      }

      // userがnullでない場合はuserをsetする
      setUser(currentUser)
    })
    return () => authStateChanged()
  }, [auth])

  const value = useMemo(() => ({ user }), [user])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

const useAuthContext = () => useContext(AuthContext)
export default useAuthContext
