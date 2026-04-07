import { Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "../../contexts/AuthContext";
import { ROLES } from "../../constants/appConstant";
import ErrorPage from "../../screens/ErrorScreens/ErrorPage";

const OwnerRoute = () => {
    const { roles } = useAuthContext();

    return roles.includes(ROLES.OWNER)
        ? <Outlet />
        : <ErrorPage />;
};

export default OwnerRoute;