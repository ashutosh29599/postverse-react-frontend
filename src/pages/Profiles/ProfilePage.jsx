import React, { useEffect, useState } from "react";
import { useContext } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import ProfileContext from "../../context/ProfileContext";

const ProfilePage = () => {
    const { user } = useContext(AuthContext); // user that is logged in
    const { loading, profile } = useContext(ProfileContext);
    const { username } = useParams(); // owner of the profile

    // TODO: Fix all placeholder loading
    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <>
            <div className="flex flex-col justify-center items-center mt-8">
                <div className="flex justify-center w-2/5 border border-2 border-slate-200 rounded-lg shadow-lg">
                    <div className="flex flex-col justify-center my-3">
                        <div className="flex justify-center font-bold text-4xl my-6">
                            Profile Page
                        </div>
                        <div className="flex flex-col justify-center items-center mb-1">
                            <div className="flex flex-col justify-center items-center w-full my-1">
                                <div className="relative z-0  group w-4/5">
                                    <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                                        Username
                                    </label>
                                    <div className="flex flex-row justify-center items-center gap-1 my-1 w-full text-slate-700 border border-slate-200 hover:bg-slate-100 font-medium rounded-lg text-md px-5 py-2.5 text-center me-2 mb-2 dark:border-slate-500 dark:text-slate-500">
                                        @{username}
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col justify-center items-center w-full my-1">
                                <div className="relative z-0  group w-4/5">
                                    <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                                        Name
                                    </label>
                                    <div className="flex flex-row justify-center items-center gap-1 my-1 w-full text-slate-700 border border-slate-200 hover:bg-slate-100 font-medium rounded-lg text-md px-5 py-2.5 text-center me-2 mb-2 dark:border-slate-500 dark:text-slate-500">
                                        {profile.first_name && (
                                            <h3>{profile.first_name}</h3>
                                        )}
                                        {profile.last_name && (
                                            <h3>{profile.last_name}</h3>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col justify-center items-center w-full my-1">
                                <div className="relative z-0 mb-5 group w-4/5">
                                    <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                                        Bio
                                    </label>
                                    <div className="flex flex-row justify-center items-center gap-1 my-1 w-full text-slate-700 border border-slate-200 hover:bg-slate-100 font-medium rounded-lg text-md px-5 py-2.5 text-center me-2 mb-2 dark:border-slate-500 dark:text-slate-500">
                                        {profile.bio && <h3>{profile.bio}</h3>}
                                    </div>
                                </div>
                            </div>

                            {profile.photo && (
                                <img
                                    className="max-w-72 rounded rounded-md"
                                    src={profile.photo}
                                    alt="{profile.first_name}'s Profile Photo"
                                />
                            )}
                        </div>
                    </div>
                </div>
                {username == user && (
                    <div>
                        <Link
                            to={`/edit-profile/`}
                            state={{ profile: profile }}
                        >
                            <button
                                type="button"
                                className="mt-5 text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800"
                            >
                                Edit Profile
                            </button>
                        </Link>
                    </div>
                )}
            </div>
        </>
    );
};

export default ProfilePage;
