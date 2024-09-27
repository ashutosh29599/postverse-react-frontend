import { useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {
    const { checkAuthStatus, isAuthenticated, loading } =
        useContext(AuthContext);

    // console.log("calling checkAuthStatus from ProtectedRoute")
    checkAuthStatus();

    if (loading) {
        return <div>loading...</div>;
    }

    if (!isAuthenticated) {
        return <Navigate to="/" />;
    }

    return children;
};

export default ProtectedRoute;
