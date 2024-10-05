import { useContext } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";

import LoadingComponent from "../components/Loading/LoadingComponent";

const ProtectedRoute = ({ children }) => {
    const { checkAuthStatus, isAuthenticated, loading } =
        useContext(AuthContext);

    // console.log("calling checkAuthStatus from ProtectedRoute")
    checkAuthStatus();

    if (loading) {
        // return <div>loading...</div>;
        return <LoadingComponent />;
       
    }

    if (!isAuthenticated) {
        return <Navigate to="/" />;
    }

    return children;
};

export default ProtectedRoute;
