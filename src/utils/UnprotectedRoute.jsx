import { useContext } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const UnprotectedRoute = ({ children }) => {
    const { checkAuthStatus, isAuthenticated, loading } = useContext(AuthContext);

    checkAuthStatus();

    if (loading) {
        return <div>loading...</div>;
    }

    if (isAuthenticated) {
        return <Navigate to="/home" />;
    }

    return children;
};

export default UnprotectedRoute;
