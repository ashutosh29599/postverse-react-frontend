import React, { useContext } from "react";
import { Link } from "react-router-dom";
import ProfileContext from "../../context/ProfileContext";

const SettingsPage = () => {
    const { loading, profile } = useContext(ProfileContext);

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <div className="flex justify-center items-center mt-8">
            <div className="flex justify-center w-2/5 border border-2 border-slate-200 rounded-lg shadow-lg">
                <div className="flex flex-col justify-center">
                    <div className="font-bold text-4xl my-6">Settings Page</div>
                    <div className="flex flex-col justify-center items-center mb-5">
                        
                            <button
                                type="button"
                                className="my-1 w-4/5 text-slate-700 hover:text-white border border-slate-700 hover:bg-slate-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-slate-500 dark:text-slate-500 dark:hover:text-white dark:hover:bg-slate-500"
                            >
                                <Link
                            to={`/edit-profile/`}
                            state={{ profile: profile }}
                        >
                                Edit Profile
                        </Link>
                            </button>
                        {/* <button
                            type="button"
                            className="my-1 w-4/5 text-slate-700 hover:text-white border border-slate-700 hover:bg-slate-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-slate-500 dark:text-slate-500 dark:hover:text-white dark:hover:bg-slate-500"
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
                </div>
            </div>
        </div>
    );
};

export default SettingsPage;
