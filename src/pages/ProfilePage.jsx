import React from "react";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";

const ProfilePage = () => {
    const { user } = useContext(AuthContext);

    return (
        <div className="flex flex-col items-center">
            <h1>ProfilePage</h1>
            <h2>@{user}</h2>
        </div>
    );
};

export default ProfilePage;
