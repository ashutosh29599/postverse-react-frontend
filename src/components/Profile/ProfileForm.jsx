import React, { useContext, useRef, useState } from "react";
import AuthContext from "../../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const ProfileForm = ({ profile }) => {
    const { user } = useContext(AuthContext);
    const username_value = `@${user}`;
    const navigate = useNavigate();
    const [profileFormData, setProfileFormData] = useState({
        first_name: profile.first_name || "",
        last_name: profile.last_name || "",
        bio: profile.bio || "",
    });
    const [photo, setPhoto] = useState(null);
    const [photoPreview, setPhotoPreview] = useState(profile.photo || null);
    const fileInputRef = useRef(null);

    const handleReset = () => {
        setProfileFormData({
            first_name: profile.first_name || "",
            last_name: profile.last_name || "",
            bio: profile.bio || "",
        });
        setPhoto(null);
        setPhotoPreview(profile.photo || null);

        if (fileInputRef.current) {
            fileInputRef.current.value = ""
        }
    };

    const handleTextChange = (e) => {
        setProfileFormData({
            ...profileFormData,
            [e.target.name]: e.target.value,
        });
    };

    const handlePhotoChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setPhoto(e.target.files[0]);
            setPhotoPreview(URL.createObjectURL(e.target.files[0]));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("user", profile.user);
        formData.append("first_name", profileFormData.first_name);
        formData.append("last_name", profileFormData.last_name);
        formData.append("bio", profileFormData.bio);

        if (photo) {
            formData.append("photo", photo);
        }

        try {
            const response = await axios.patch(
                "/api/profiles/edit-profile/",
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                    withCredentials: true,
                }
            );
            toast.success("Profile updated!")
        } catch (error) {
            toast.error("Failed to update profile. Please try again later.");
            console.log("Failed to update profile, ", error);
        }
        navigate(`/profile/${user}`);
    };

    return (
        <form className="max-w-md mx-auto" onSubmit={handleSubmit}>
            <div className="my-5 font-bold text-4xl flex justify-center">
                Edit Profile
            </div>
            <div className="relative z-0 w-full mb-5 group">
                <input
                    type="text"
                    name="username"
                    id="username"
                    className="block py-2.5 px-0 w-full text-md text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    // placeholder="{user}"
                    value={username_value}
                    disabled
                />
            </div>
            <div className="relative z-0 w-full mb-5 group">
                <input
                    type="text"
                    name="first_name"
                    id="first_name"
                    className="block py-2.5 px-0 w-full text-md text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    value={profileFormData.first_name}
                    onChange={handleTextChange}
                />
                <label
                    htmlFor="first_name"
                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                    First Name
                </label>
            </div>
            <div className="relative z-0 w-full mb-5 group">
                <input
                    type="text"
                    name="last_name"
                    id="last_name"
                    className="block py-2.5 px-0 w-full text-md text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    value={profileFormData.last_name}
                    onChange={handleTextChange}
                />
                <label
                    htmlFor="last_name"
                    className="peer-focus:font-medium absolute text-md text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                    Last Name
                </label>
            </div>

            <div className="relative z-0 w-full mb-5 group">
                <textarea
                    type="text"
                    name="bio"
                    id="bio"
                    className="block py-2.5 px-0 w-full text-md text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    value={profileFormData.bio}
                    onChange={handleTextChange}
                />
                <label
                    htmlFor="bio"
                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                    Bio
                </label>
            </div>

            <div>
                {photoPreview && (
                    <div className="relative z-0 w-full mb-5 group">
                        <img
                            src={photoPreview}
                            alt="photo preview"
                            className="w-64 object-cover mx-auto"
                        />
                    </div>
                )}
            </div>

            <div className="relative z-0 w-full mb-5 group">
                <input
                    type="file"
                    name="photo"
                    id="photo"
                    className="block py-2.5 px-0 w-full text-md text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    onChange={handlePhotoChange}
                    ref={fileInputRef}
                />
                <label
                    htmlFor="photo"
                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                    Photo
                </label>
            </div>

            {/* <div className="relative z-0 w-full mb-5 group">
                <label
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    htmlFor="photo"
                    onChange={handlePhotoChange}
                >
                    Photo
                </label>
                <input
                    className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                    aria-describedby="photo"
                    id="photo"
                    type="file"
                />
            </div> */}

            <div className="mt-3 flex flex-row justify-center gap-3">
                <button
                    type="submit"
                    className="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800"
                >
                    Update
                </button>

                <button
                    type="button"
                    className="text-slate-700 hover:text-white border border-slate-700 hover:bg-slate-800  font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-slate-300 dark:text-slate-300 dark:hover:text-white dark:hover:bg-slate-400 " // for a focus ring, add: focus:ring-4 focus:outline-none focus:ring-slate-400 dark:focus:ring-slate-900
                    onClick={handleReset}
                >
                    Reset
                </button>

                <Link to={`/profile/${user}`}>
                    <button
                        type="button"
                        className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                    >
                        Cancel
                    </button>
                </Link>
            </div>
        </form>
    );
};

export default ProfileForm;
