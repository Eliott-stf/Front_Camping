import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { AuthContextProvider } from './contexts/AuthContext.jsx'
import AppRouter from './router/AppRouter.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* Context d'authentification - disponible dans toute l'app  */}
    <AuthContextProvider>
      {/* Router - Gère la navigation entre les pages*/}
      <AppRouter />
    </AuthContextProvider>
  </StrictMode>,
)
