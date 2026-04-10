import { Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "../../contexts/AuthContext";
import { ROLES } from "../../constants/appConstant";
import ErrorPage from "../../screens/ErrorScreens/ErrorPage";

const OwnerRoute = () => {
    const { role } = useAuthContext();

    // role peut être un string ou un array selon le backend
    const isArray = Array.isArray(role);
    const hasOwnerRole = isArray ? role.includes(ROLES.OWNER) : role === ROLES.OWNER;

    return hasOwnerRole
        ? <Outlet />
        : <ErrorPage />;
};

export default OwnerRoute;