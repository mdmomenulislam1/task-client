import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "./AuthProvider";


const PrivateRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const location = useLocation();

    if (loading) {
        return <div className="mx-auto text-center my-30">
            <span className=" text-yellow-600 loading loading-dots loading-lg"></span>
        </div>
    }

    if (user) {
        return children;
    }

    return <Navigate state={location.pathname} to="/login" replace ></Navigate>;
};

export default PrivateRoute;