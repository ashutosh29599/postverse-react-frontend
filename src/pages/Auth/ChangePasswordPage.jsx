import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import BoxComponent from "../../components/Box/BoxComponent";
import { toast } from "react-toastify";
import AuthContext from "../../context/AuthContext";
import axios from "axios";

const ChangePasswordPage = () => {
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);
    const [changePasswordFormData, setChangePasswordFormData] = useState([]);

    useEffect(() => {
        setChangePasswordFormData({
            old_password: "",
            new_password1: "",
            new_password2: "",
        });
    }, []);

    const handleChange = (e) => {
        setChangePasswordFormData({
            ...changePasswordFormData,
            [e.target.name]: e.target.value,
        });
    };

    const handleReset = () => {
        setChangePasswordFormData({
            old_password: "",
            new_password1: "",
            new_password2: "",
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(
                `/api/accounts/change-password/`,
                changePasswordFormData
            );
            navigate(`/profile/${user}`);
            toast.success("Successfully changed password.");
        } catch (error) {
            console.log("Error change password, ", error);
        }
    };

    // TODO: Handle pwd validation in the frontend itself.
    return (
        <BoxComponent>
            <form className="max-w-sm mx-auto" onSubmit={handleSubmit}>
                {/* Title */}
                <div className="flex justify-center font-bold text-4xl my-3 dark:text-slate-500">
                    Change Password
                </div>

                {/* Old Password */}
                <div className="mb-5">
                    <label
                        htmlFor="old_password"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-slate-500"
                    >
                        Old Password
                    </label>
                    <input
                        type="password"
                        name="old_password"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-slate-300 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        value={changePasswordFormData.old_password}
                        onChange={handleChange}
                    />
                </div>

                {/* New Password 1 */}
                <div className="mb-5">
                    <label
                        htmlFor="new_password1"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-slate-500"
                    >
                        New Password
                    </label>
                    <input
                        type="password"
                        name="new_password1"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-slate-300 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        value={changePasswordFormData.new_password1}
                        onChange={handleChange}
                    />
                </div>

                {/* New Password 2 */}
                <div className="mb-5">
                    <label
                        htmlFor="new_password2"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-slate-500"
                    >
                        Confirm Password
                    </label>
                    <input
                        type="password"
                        name="new_password2"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-slate-300 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        value={changePasswordFormData.new_password2}
                        onChange={handleChange}
                    />
                </div>

                {/* Buttons */}
                <div>
                    <button
                        type="submit"
                        className="text-green-700 hover:text-white border border-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-600 dark:focus:ring-green-800"
                    >
                        Change Password
                    </button>

                    <button
                        type="button"
                        onClick={handleReset}
                        className="text-slate-700 hover:text-white border border-slate-700 hover:bg-slate-800 focus:ring-4 focus:outline-none focus:ring-slate-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-slate-300 dark:text-slate-300 dark:hover:text-white dark:hover:bg-slate-400 dark:focus:ring-slate-900"
                    >
                        Reset
                    </button>

                    <button
                        type="cancel"
                        className="text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
                        onClick={() => navigate(-1)}
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </BoxComponent>
    );
};

export default ChangePasswordPage;
