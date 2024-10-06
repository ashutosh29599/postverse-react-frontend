import React, { useContext, useState } from "react";
import BoxComponent from "../../components/Box/BoxComponent";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import { toast } from "react-toastify";
import axios from "axios";

const DeleteAccountPage = () => {
    // const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    // const [deleteAccountFormData, setDeleteAccountFormData] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.delete(`/api/accounts/delete-user/`);
        } catch (error) {
            if (error.response && error.response.status === 500) {
                toast.success("Successfully deleted account.");
                navigate("/");
            } else {
                console.log("Error deleting accounts, ", error);
                toast.error(
                    "Unable to delete account. Please try again later."
                );
            }
        }
    };

    return (
        <BoxComponent>
            {/* Title */}
            <div className="text-4xl font-bold dark:text-slate-500">
                Delete Account?
            </div>

            {/* Confirmation Message */}
            <div className="flex justify-center px-4">
                <p className=" mt-4 text-lg font-semibold dark:text-slate-500">
                    Are you sure you want to delete your accounts? This cannot
                    be undone.
                </p>
            </div>

            {/* Buttons */}
            <div className="mt-4 flex flex-row gap-2">
                <button
                    type="submit"
                    className="text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
                    onClick={handleSubmit}
                >
                    Delete Account
                </button>

                {/* <button
                        type="button"
                        className="text-slate-700 hover:text-white border border-slate-700 hover:bg-slate-800  font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2  dark:border-slate-300 dark:text-slate-300 dark:hover:text-white dark:hover:bg-slate-400 " // for a focus ring, add: focus:ring-4 focus:outline-none focus:ring-slate-400 dark:focus:ring-slate-900
                        onClick={handleReset}
                    >
                        Reset
                    </button> */}

                <button
                    type="button"
                    className="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800"
                    onClick={() => {
                        navigate(-1);
                    }}
                >
                    Cancel
                </button>
            </div>
        </BoxComponent>
    );
};

export default DeleteAccountPage;

{
    /*
    Username/pwd confirmation -- maybe the backend could have a url to confirm the user and pwd
    <form
                className="mt-4 max-w-sm mx-auto"
                //  onSubmit={handleSubmit}
            >

                <div className="relative z-0 w-full mb-4 group">
                    <input
                        type="text"
                        name="username"
                        id="username"
                        className="block py-2.5 px-0 w-full text-md text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-slate-300 dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        // value={profileFormData.first_name}
                        // onChange={handleTextChange}
                    />
                    <label
                        htmlFor="username"
                        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                        Username
                    </label>
                </div>


                <div className="relative z-0 w-full mb-4 group">
                    <input
                        type="password"
                        name="password"
                        id="password"
                        className="block py-2.5 px-0 w-full text-md text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-slate-300 dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        // value={profileFormData.first_name}
                        // onChange={handleTextChange}
                    />
                    <label
                        htmlFor="password"
                        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                        Password
                    </label>
                </div>
            </form>
            
    */
}
