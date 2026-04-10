import { Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "../../contexts/AuthContext";
import { ROLES } from "../../constants/appConstant";
import ErrorPage from "../../screens/ErrorScreens/ErrorPage";

const AdminRoute = () => {
    const { role } = useAuthContext();
    
    // role peut être un string ou un array selon le backend
    const isArray = Array.isArray(role);
    const hasAdminRole = isArray ? role.includes(ROLES.ADMIN) : role === ROLES.ADMIN;

    return hasAdminRole
        ? <Outlet />
        : <ErrorPage />;
};

export default AdminRoute;