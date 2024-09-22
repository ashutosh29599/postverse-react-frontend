import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";
import AuthContext from "../context/AuthContext";

const Login = () => {
    const [loginFormData, setLoginFormData] = useState({
        username: "",
        password: "",
    });

    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setLoginFormData({
            ...loginFormData,
            [e.target.name]: e.target.value,
        });
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        console.log("in handleLogin....")
        try {
            await login(loginFormData.username, loginFormData.password);

            toast.success("Welcome to PostVerse!");

            return navigate("/profile");
        } catch (error) {
            console.log(error);
            toast.error("Error logging in. Please try again later.");
        }
    };

    return (
        <div className="register">
            <div className="h-screen flex items-center justify-center bg-blue-200">
                <div className="bg-white rounded-lg shadow-lg flex w-4/5 max-w-4xl overflow-hidden">
                    {/* Left Section */}
                    <div className="w-1/2 p-8 bg-blue-400/90 text-white flex flex-col justify-center">
                        <h1 className="text-2xl font-semibold">Login</h1>
                        <form
                            onSubmit={handleLogin}
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
                                    placeholder="Enter your username"
                                    value={loginFormData.username}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor="password"
                                    className="block text-gray-700"
                                >
                                    Password
                                </label>
                                <input
                                    type="password"
                                    name="password"
                                    className="w-full mt-1 p-1 border border-gray-300 rounded-md"
                                    placeholder="Enter your password"
                                    value={loginFormData.password}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="flex flex-col items-center">
                                <button className="w-3/6 bg-blue-700/75 text-white py-2 rounded-md">
                                    Login
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* Right Section */}
                    <div className="w-1/2 p-8 bg-blue-700/75 text-white flex flex-col justify-center">
                        <h1 className="text-6xl font-bold">
                            Welcome to PostVerse
                        </h1>
                        <p className="text-sm pt-3">
                            This is the Social Media that's always changing...
                        </p>
                        <p className="text-2xl pt-3 font-semibold">
                            Login to enter the PostVerse!
                        </p>
                        <p className="text-sm pt-6">
                            Don't have an accounts?
                            <Link to={"/register"}>
                                <button className="text-sm ml-2 bg-white text-blue-700/75 py-1 px-1 rounded-lg">
                                    Register!
                                </button>
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
