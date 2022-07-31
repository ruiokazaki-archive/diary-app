import '../styles/globals.css'
import 'react-toastify/dist/ReactToastify.css'
import type { AppProps } from 'next/app'
import { IconContext } from 'react-icons'
import { ToastContainer } from 'react-toastify'
import { AuthProvider } from '../features/auth/store/AuthContext'
import iconConfig from '../libs/react-icons'

const MyApp = ({ Component, pageProps }: AppProps) => (
  <IconContext.Provider value={iconConfig}>
    <AuthProvider>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <Component {...pageProps} />
    </AuthProvider>
  </IconContext.Provider>
)

export default MyApp
