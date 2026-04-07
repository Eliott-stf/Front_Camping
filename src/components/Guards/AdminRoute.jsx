import { Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "../../contexts/AuthContext";
import { ROLES } from "../../constants/appConstant";
import ErrorPage from "../../screens/ErrorScreens/ErrorPage";

const AdminRoute = () => {
    const { roles } = useAuthContext();

    return roles.includes(ROLES.ADMIN)
        ? <Outlet />
        : <ErrorPage />;
};

export default AdminRoute;