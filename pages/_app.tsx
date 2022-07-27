import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { AuthProvider } from '../features/auth/store/AuthContext'

const MyApp = ({ Component, pageProps }: AppProps) => (
  <AuthProvider>
    {/* eslint-disable-next-line react/jsx-props-no-spreading */}
    <Component {...pageProps} />
  </AuthProvider>
)

export default MyApp
