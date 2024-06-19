import { Navigate, useLocation } from "react-router-dom";
import useAdmin from "../hooks/useAdmin";
import { useContext } from "react";
import { AuthContext } from "../Providers/AuthProviders";
import PropTypes from "prop-types";

const AdminRoute = ({children}) => {
    
    const { user, loading } = useContext(AuthContext);
    const [isAdmin, isAdminLoading] = useAdmin();
    const location = useLocation();

    if(loading || isAdminLoading){
        return <progress className="progress w-56"></progress>
    }

    if (user && isAdmin) {
        return children;
    }
    return <Navigate to="/login" state={{from: location}} replace></Navigate>
};
AdminRoute.propTypes = {
    children: PropTypes.node,
  };
export default AdminRoute;