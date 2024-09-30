import React from "react";
import { useLocation } from "react-router-dom";

import ProfileForm from "../../components/Profile/ProfileForm";

const EditProfilePage = () => {
    let { state } = useLocation();
    console.log(state.profile)

    return <ProfileForm profile={state.profile} />;
};

export default EditProfilePage;
