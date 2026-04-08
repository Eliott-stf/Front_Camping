import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { AuthContextProvider } from './contexts/AuthContext.jsx'
import AppRouter from './router/AppRouter.jsx'
import { Provider } from 'react-redux'
import store from './store/store.js'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* Context d'authentification - disponible dans toute l'app  */}
    <AuthContextProvider>
      {/* Store redux - gère l'atat global (album, artistes, player)*/}
      <Provider store={store}>
        {/* Router - Gère la navigation entre les pages*/}
        <AppRouter />
      </Provider>
    </AuthContextProvider>
  </StrictMode>,
)
