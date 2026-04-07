import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "../screens/ErrorScreens/ErrorPage";
import Home from "../screens/OfflineScreens/Home";
import Login from "../screens/OfflineScreens/Login";
import Register from "../screens/OfflineScreens/Register";
import HomeOffline from "../screens/OfflineScreens/HomeOffline";

const OfflineRouter = createBrowserRouter([

    {
        element: <HomeOffline/>,
        errorElement: <ErrorPage/>,
        children: [
            {
                path: "/login",   //Chemin de la vue 
                element: <Login/>,  //Element retourné
            },
            {
                path: "/register",
                element: <Register/>,
            },
            {
                path: "/",
                element: <Home/>
            }
        ]
    }
]);

export default OfflineRouter