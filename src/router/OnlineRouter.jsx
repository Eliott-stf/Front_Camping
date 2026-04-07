import React from 'react'
import { createBrowserRouter } from 'react-router-dom';
import App from "../App";
import ErrorPage from '../screens/ErrorScreens/ErrorPage';
import Home from '../screens/OfflineScreens/Home';
import BienListe from '../screens/OfflineScreens/BienListe';
import BienDetail from '../screens/OfflineScreens/BienDetail';
import Reservation from '../screens/OnlineScreens/Reservation';
import Compte from '../screens/OnlineScreens/Compte';
import MesReservations from '../screens/OnlineScreens/MesReservations';
import OwnerRoute from '../components/Guards/OwnerRoute';
import { OwnerPlanning } from '../screens/OnlineScreens/Owner/OwnerPlanning';
import OwnerRetribution from '../screens/OnlineScreens/Owner/OwnerRetribution';
import AdminRoute from '../components/Guards/AdminRoute';
import AdminDashboard from '../screens/OnlineScreens/Admin/AdminDashboard';
import AdminBiensEdit from '../screens/OnlineScreens/Admin/AdminBiensEdit';
import AdminBiensNew from '../screens/OnlineScreens/Admin/AdminBiensNew';
import AdminReservation from '../screens/OnlineScreens/Admin/AdminReservation';
import AdminReservationDetail from '../screens/OnlineScreens/Admin/AdminReservationDetail';
import AdminFacture from '../screens/OnlineScreens/Admin/AdminFacture';
import AdminFactureDetail from '../screens/OnlineScreens/Admin/AdminFactureDetail';

const OnlineRouter = createBrowserRouter([

    {
        element: <App />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: "/",
                element: <Home />
            },
            {
                path: "/biens",   //Chemin de la vue 
                element: <BienListe />,  //Element retourné
            },
            {
                path: "/biens/:id",   //Chemin de la vue 
                element: <BienDetail />,  //Element retourné
            },
            {
                path: "/reservation",   //Chemin de la vue 
                element: <Reservation />,  //Element retourné
            },
            {
                path: "/compte",   //Chemin de la vue 
                element: <Compte />,  //Element retourné
            },
            {
                path: "/mes-reservations",   //Chemin de la vue 
                element: <MesReservations />,  //Element retourné
            },
            // ===========================
            // ROUTES ROLE_OWNER
            // ===========================
            {
                element: <OwnerRoute />,   // Guard vérifie ROLE_OWNER 
                children: [
                    {
                        path: "/owner/planning",   
                        element: <OwnerPlanning />,  
                    },
                    {
                        path: "/owner/retribution",   
                        element: <OwnerRetribution />,  
                    },
                ]
            },
            // ===========================
            // ROUTES ROLE_ADMIN
            // ===========================
            {
                element: <AdminRoute />,   // Guard vérifie ROLE_ADMIN
                children: [
                    {
                        path: "/admin",   
                        element: <AdminDashboard/>,  
                    },
                    {
                        path: "/admin/biens/edit/:id",   
                        element: <AdminBiensEdit/>,  
                    },
                    {
                        path: "/admin/biens/new",   
                        element: <AdminBiensNew/>,  
                    },
                    {
                        path: "/admin/reservations",   
                        element: <AdminReservation/>,  
                    },
                    {
                        path: "/admin/reservations/:id",   
                        element: <AdminReservationDetail/>,  
                    },
                    {
                        path: "/admin/facture",   
                        element: <AdminFacture/>,  
                    },
                    {
                        path: "/admin/facture/:id",   
                        element: <AdminFactureDetail/>,  
                    },
                ]
            },
        ]
    }
]);

export default OnlineRouter;