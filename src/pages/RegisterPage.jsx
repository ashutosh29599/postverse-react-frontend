import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const Register = () => {
    const [registrationFormData, setRegistrationFormData] = useState({
        username: "",
        email: "",
        password1: "",
        password2: "",
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        setRegistrationFormData({
            ...registrationFormData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (registrationFormData.password1 != registrationFormData.password2) {
            toast.error("Passwords do not match.");
            return;
        }

        try {
            const response = await axios.post(
                "/api/accounts/register/",
                registrationFormData
            );

            toast.success("You have successfully registered. Please log in.");

            return navigate("/login");
        } catch (error) {
            if (error.response && error.response.data) {
                if (error.response.data.username) {
                    toast.error(error.response.data.username[0]);
                } else if (error.response.data.password1) {
                    toast.error(error.response.data.password1[0]);
                }
            } else {
                toast.error("Registration failed. Please try again later.");
            }
        }
    };

    return (
        <div className="register">
            <div className="h-screen flex items-center justify-center bg-blue-200">
                <div className="bg-white rounded-lg shadow-lg flex w-4/5 max-w-4xl overflow-hidden">
                    {/* Left Section */}
                    <div className="w-1/2 p-8 bg-blue-700/75 text-white flex flex-col justify-center">
                        <h1 className="text-6xl font-bold">
                            Welcome to PostVerse
                        </h1>
                        <p className="text-sm pt-3">
                            This is the Social Media that's always changing...
                        </p>
                        <p className="text-2xl pt-3 font-semibold">
                            Register to enter the PostVerse!
                        </p>
                        <p className="text-sm pt-6">
                            Already have an account?
                            <Link to={"/login"}>
                                <button className="text-sm bg-white ml-2 text-blue-700/75 py-1 px-1 rounded-lg">
                                    Login
                                </button>
                            </Link>
                        </p>
                    </div>

                    {/* Right Section */}
                    <div className="w-1/2 p-8 bg-blue-400/90 text-white flex flex-col justify-center">
                        <h1 className="text-2xl font-semibold">Register</h1>
                        <form
                            onSubmit={handleSubmit}
                            className="mt-4 space-y-4 text-black"
                        >
                            <div>
                                <label
                                    htmlFor="username"
                                    className="block text-gray-700"
                                >
                                    Username
                                </label>
                                <input
                                    type="text"
                                    name="username"
                                    className="w-full mt-1 p-1 border border-gray-300 rounded-md"
                                    placeholder="Choose a username"
                                    value={registrationFormData.username}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor="email"
                                    className="block text-gray-700"
                                >
                                    Email
                                </label>
                                <input
                                    type="Email"
                                    name="email"
                                    className="w-full mt-1 p-1 border border-gray-300 rounded-md"
                                    placeholder="Enter your email"
                                    value={registrationFormData.email}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor="password1"
                                    className="block text-gray-700"
                                >
                                    Password
                                </label>
                                <input
                                    type="password"
                                    name="password1"
                                    className="w-full mt-1 p-1 border border-gray-300 rounded-md"
                                    placeholder="Enter your password"
                                    value={registrationFormData.password1}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor="password2"
                                    className="block text-gray-700"
                                >
                                    Confirm Password
                                </label>
                                <input
                                    type="password"
                                    name="password2"
                                    className="w-full mt-1 p-1 border border-gray-300 rounded-md"
                                    placeholder="Enter your password again"
                                    value={registrationFormData.password2}
                                    onChange={handleChange}
                                />
                            </div>
                            {/* <button className="mt-3 bg-white text-blue-400 py-1 px-2 w-2/5"> */}
                            <div className="flex flex-col items-center">
                                <button className="w-3/6 bg-blue-700/75 text-white py-2 rounded-md">
                                    Sign Up
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
