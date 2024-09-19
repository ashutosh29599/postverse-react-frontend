import React from "react";
import { Link } from "react-router-dom";

const Register = () => {
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
                        </p>
                        <Link to={'/login'}>
                            <button className="text-sm mt-3 bg-white text-blue-700/75 py-2 px-4 rounded-lg">Login</button>
                        </Link>
                    </div>

                    {/* Right Section */}
                    <div className="w-1/2 p-8 bg-blue-400/90 text-white flex flex-col justify-center">
                        <h1 className="text-2xl font-semibold">Register</h1>
                        <form className="mt-4 space-y-4">
                            <div>
                                <label className="block text-gray-700">Username</label>
                                <input type="text" className="w-full mt-1 p-1 border border-gray-300 rounded-md" placeholder="Choose a username" />
                            </div>
                            <div>
                                <label className="block text-gray-700">Email</label>
                                <input type="Email" className="w-full mt-1 p-1 border border-gray-300 rounded-md" placeholder="Enter your email" />
                            </div>
                            <div>
                                <label className="block text-gray-700">Password</label>
                                <input type="password" className="w-full mt-1 p-1 border border-gray-300 rounded-md" placeholder="Enter your password" />
                            </div>
                            <div>
                                <label className="block text-gray-700">Confirm Password</label>
                                <input type="password" className="w-full mt-1 p-1 border border-gray-300 rounded-md" placeholder="Enter your password again" />
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
