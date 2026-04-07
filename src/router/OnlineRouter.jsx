import React from 'react'
import Booking from '../screens/OnlineScreens/Booking';
import { createBrowserRouter } from 'react-router-dom';
import App from "../App";
import ErrorPage from '../screens/ErrorScreens/ErrorPage';
import Home from '../screens/OfflineScreens/Home';

const OnlineRouter = createBrowserRouter([

    {
        element: <App/>,
        errorElement: <ErrorPage/>,
        children: [
            {
                path: "/booking",   //Chemin de la vue 
                element: <Booking/>,  //Element retourné
            },
            {
                path: "/",
                element: <Home/>
            }
        ]
    }
]);

export default OnlineRouter;