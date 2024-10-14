import React from "react";

import { Link } from "react-router-dom";

const UserCard = ({ user }) => {
    return (
        <>
            <div className="min-w-96 max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <div className="p-5 flex flex-col ">
                    <div className="relative flex items-center rounded-lg bg-purple-300 p-4 dark:bg-slate-500">
                        <Link
                            to={`/profile/${user.username}`}
                            className="flex-1"
                        >
                            <h5 className="text-center text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-900">
                                {user.username}
                            </h5>
                        </Link>
                    </div>

                    <div className="mt-2 flex flex-col gap-2 font-normal text-slate-700 dark:text-gray-600">
                        <div className="flex flex-col justify-center items-center w-full my-1 ">
                            <div className="relative z-0  group w-4/5">
                                <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                                    Name
                                </label>
                                <div className="flex flex-row justify-center items-center gap-1 my-2 w-full text-slate-700 border border-slate-200 hover:bg-slate-100 font-medium rounded-lg text-md px-5 py-2.5 text-center me-2 mb-2 dark:border-slate-500 dark:text-slate-500 dark:hover:bg-gray-900 dark:hover:text-slate-400">
                                    {user.first_name && (
                                        <h3>{user.first_name}</h3>
                                    )}
                                    {user.last_name && (
                                        <h3>{user.last_name}</h3>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col justify-center items-center w-full my-1 ">
                            <div className="relative z-0  group w-4/5">
                                <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                                    Email
                                </label>
                                <div className="flex flex-row justify-center items-center gap-1 my-2 w-full text-slate-700 border border-slate-200 hover:bg-slate-100 font-medium rounded-lg text-md px-5 py-2.5 text-center me-2 mb-2 dark:border-slate-500 dark:text-slate-500 dark:hover:bg-gray-900 dark:hover:text-slate-400">
                                    {user.email && <h3>{user.email}</h3>}
                                </div>
                            </div>
                        </div>
                    </div>

                    {user.photo && (
                        <img
                            className="rounded rounded-md my-2"
                            src={user.photo}
                        />
                    )}

                    <div className="flex flex-col justify-center items-center w-full my-2">
                        <div className="relative z-0  group w-4/5">
                            <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                                Date Joined
                            </label>
                            <div className="flex flex-row justify-center items-center gap-1 my-2 w-full text-slate-700 border border-slate-200 hover:bg-slate-100 font-medium rounded-lg text-md px-5 py-2.5 text-center me-2 mb-2 dark:border-slate-500 dark:text-slate-500 dark:hover:bg-gray-900 dark:hover:text-slate-400">
                                {user.date_joined && (
                                    <h3>{user.date_joined}</h3>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default UserCard;
