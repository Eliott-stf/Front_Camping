import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { AuthContextProvider } from './contexts/AuthContext.jsx'
import AppRouter from './router/AppRouter.jsx'
import { Provider } from 'react-redux'
import store from './store/store.js'
import axios from "axios";

axios.defaults.headers.post["Content-Type"] = "application/ld+json";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* Context d'authentification - disponible dans toute l'app  */}
    <AuthContextProvider>
      {/* Store redux - gère l'atat global*/}
      <Provider store={store}>
        {/* Router - Gère la navigation entre les pages*/}
        <AppRouter />
      </Provider>
    </AuthContextProvider>
  </StrictMode>,
)
