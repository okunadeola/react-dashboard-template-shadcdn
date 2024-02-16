
import ReactDOM from 'react-dom/client'
// import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import ToastProvider from './providers/ToastProvider.jsx'
import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core'

// ** React Perfect Scrollbar
import 'react-perfect-scrollbar/dist/css/styles.css'
import { Provider } from 'react-redux'
import { store } from './redux/store.js'
import { Suspense, lazy } from 'react'
import { SocketContextProvider } from './context/SocketContext';
// ** Lazy load app
const LazyApp = lazy(() => import('./App.jsx'))



ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
      <Provider store={store}>
        <Suspense fallback={<div>loading...</div>}>
          <ToastProvider/>
          <SocketContextProvider>
            <MantineProvider>
              <LazyApp />
            </MantineProvider>
          </SocketContextProvider>
        </Suspense>
      </Provider>
  </BrowserRouter>
)
