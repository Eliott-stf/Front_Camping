import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "../screens/ErrorScreens/ErrorPage";
import Home from "../screens/OfflineScreens/Home";
import Login from "../screens/OfflineScreens/Login";
import Register from "../screens/OfflineScreens/Register";
import HomeOffline from "../screens/OfflineScreens/HomeOffline";
import BienListe from "../screens/OfflineScreens/BienListe";
import BienDetail from "../screens/OfflineScreens/BienDetail";

const OfflineRouter = createBrowserRouter([

    {
        element: <HomeOffline/>,
        errorElement: <ErrorPage/>,
        children: [
            {
                path: "/",
                element: <Home/>
            },
            {
                path: "/register",
                element: <Register/>,
            },
            {
                path: "/login",   //Chemin de la vue 
                element: <Login/>,  //Element retourné
            },
            {
                path: "/biens",   //Chemin de la vue 
                element: <BienListe/>,  //Element retourné
            },
            {
                path: "/biens/:id",   //Chemin de la vue 
                element: <BienDetail/>,  //Element retourné
            },
        ]
    }
]);

export default OfflineRouter