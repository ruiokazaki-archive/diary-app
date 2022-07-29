import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { IconContext } from 'react-icons'
import { AuthProvider } from '../features/auth/store/AuthContext'
import config from '../libs/react-icons'

const MyApp = ({ Component, pageProps }: AppProps) => (
  <IconContext.Provider value={config}>
    <AuthProvider>
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <Component {...pageProps} />
    </AuthProvider>
  </IconContext.Provider>
)

export default MyApp
