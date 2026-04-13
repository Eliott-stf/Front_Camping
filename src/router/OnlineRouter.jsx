import React from 'react'
import { createBrowserRouter } from 'react-router-dom';
import App from "../App";
import AdminLayout from '../components/Layouts/AdminLayout';
import ErrorPage from '../screens/ErrorScreens/ErrorPage';
import Home from '../screens/OfflineScreens/Home';
import BienListe from '../screens/OfflineScreens/BienListe';
import BienDetail from '../screens/OfflineScreens/BienDetail';
import Compte from '../screens/OnlineScreens/Compte';
import OwnerRoute from '../components/Guards/OwnerRoute';
import { OwnerPlanning } from '../screens/OnlineScreens/Owner/OwnerPlanning';
import OwnerRetribution from '../screens/OnlineScreens/Owner/OwnerRetribution';
import AdminRoute from '../components/Guards/AdminRoute';
import AdminDashboard from '../screens/OnlineScreens/Admin/AdminDashboard';
import AdminReservation from '../screens/OnlineScreens/Admin/AdminReservation';
import AdminReservationDetail from '../screens/OnlineScreens/Admin/AdminReservationDetail';
import AdminFacture from '../screens/OnlineScreens/Admin/AdminFacture';
import AdminBiens from '../screens/OnlineScreens/Admin/AdminBiens';
import AdminProprio from '../screens/OnlineScreens/Admin/AdminProprio';
import AdminPlanning from '../screens/OnlineScreens/Admin/AdminPlanning';
import AdminRetributions from '../screens/OnlineScreens/Admin/AdminRetribution';

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
                path: "/compte",   //Chemin de la vue 
                element: <Compte />,  //Element retourné
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
        ]
    },
    // ===========================
    // ROUTES ROLE_ADMIN with AdminLayout
    // ===========================
    {
        element: <AdminRoute />,
        errorElement: <ErrorPage />,
        children: [
            {
                element: <AdminLayout />,
                children: [
                    {
                        path: "/dashboard",   
                        element: <AdminRetributions/>,  
                    },
                    {
                        path: "/admin/planning",   
                        element: <AdminPlanning/>,  
                    },
                    {
                        path: "/admin/biens",   
                        element: <AdminBiens/>,  
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
                        path: "/admin/proprietaires",   
                        element: <AdminProprio/>,  
                    },
                ]
            }
        ]
    }
]);

export default OnlineRouter;