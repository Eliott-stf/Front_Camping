//==================================
// ROUTER PRINCIPAL DE L'APPLICATION
//==================================
//ce router determine quel router afficher selon l'etat de connexion 
//utilisateur connecté -> OnlineRouter (application complete)
//utilisateur pas connecté -> OfflineRouter (acces a login / register / home)

import React, { createContext, useContext, useEffect, useState } from 'react'
import { RouterProvider } from 'react-router-dom'
import OfflineRouter from './OfflineRouter'
import { USER_INFOS } from '../constants/appConstant'
import { useAuthContext } from '../contexts/AuthContext'
import PageLoader from '../components/Loader/PageLoader'
import OnlineRouter from './OnlineRouter'

//====================
// CONTEXTE DE SESSION
//====================
//Mini contexte pour partager l'état de connexion dans l'app
const SessionContext = createContext({ inSession: false })

//Hook personnalisé pour acceder au context de session
export const useSessionContext = () => useContext(SessionContext)

const AppRouter = () => {
    //state pour gérer l'état de connexion
    //null = chargement, true = connecté, false = déconnecté
    const [inSession, setInSession] = useState(null);

    //récupérer les fonctions du context d'authentification
    const { userId, setUserId, setEmail, setName, setRole } = useAuthContext();

    //récupèration des données utilisateur du localStorage
    const userInfos = JSON.parse(localStorage.getItem(USER_INFOS))

    //===================================
    // VERIFICATION DE SESSION AU MONTAGE
    //===================================
    useEffect(() => {
        const checkUserSession = async () => {
            if (userInfos) {
                //si des infos utilisateur existent, on les charge dans le contexte
                setUserId(userInfos.userId);
                setEmail(userInfos.email);
                setName(userInfos.name);
                setRole(userInfos.role || '');
                setInSession(true);
            } else {
                //aucune session utilisateur trouvée
                setInSession(false);
            }
        }

        checkUserSession();

    }, [userId])

    //=================================
    // AFFICHAGE DU LOADER PDT LA VERIF
    //=================================
    if (inSession === null) {
        return <PageLoader />;
    }

    return (
        <SessionContext.Provider value={{ inSession }}>
            <RouterProvider router={inSession ? OnlineRouter : OfflineRouter} />
        </SessionContext.Provider>
    )
}

export default AppRouter