import React, { useContext } from "react";
import { Link } from "react-router-dom";
import ProfileContext from "../../context/ProfileContext";

import { Spinner } from "flowbite-react";
import LoadingComponent from "../../components/Loading/LoadingComponent";
import BoxComponent from "../../components/Box/BoxComponent";

const SettingsPage = () => {
    const { loading, profile } = useContext(ProfileContext);

    if (loading) {
        return <LoadingComponent />;
    }

    return (
        <BoxComponent>
            <div className="font-bold text-4xl my-6 dark:text-slate-500">
                Settings Page
            </div>
            <div className="flex flex-col justify-center items-center mb-5 w-4/5 gap-2">
                <button
                    type="button"
                    className="my-1 w-full text-slate-700 hover:text-white border border-slate-700 hover:bg-slate-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-slate-500 dark:text-slate-400 dark:hover:bg-gray-900 dark:hover:text-slate-400"
                >
                    <Link to={`/edit-profile/`} state={{ profile: profile }}>
                        Edit Profile
                    </Link>
                </button>
                {/* <button
                    type="button"
                    className="my-1 w-full text-slate-700 hover:text-white border border-slate-700 hover:bg-slate-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-slate-500 dark:text-slate-400 dark:hover:bg-gray-900 dark:hover:text-slate-400"
                >
                    Change Password
                </button> */}
                {/* <button
                            type="button"
                            className="my-1 w-4/5 text-white bg-red-700 hover:bg-red-800 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700"
                            >
                            Delete Account
                        </button> */}
            </div>
        </BoxComponent>
    );
};

export default SettingsPage;
