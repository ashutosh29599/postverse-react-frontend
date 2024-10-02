import React, { useEffect, useState } from "react";
import { useContext } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import AuthContext from "../../context/AuthContext";

const ProfilePage = () => {
    const { user } = useContext(AuthContext); // user that is logged in
    const { username } = useParams(); // owner of the profile

    const [profile, setProfile] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchUserProfile = async () => {
        try {
            const response = await axios.get(
                `/api/profiles/profile/${username}`
            );
            setProfile(response.data);
            console.log(response.data);
            console.log(user);
        } catch (error) {
            console.log("Error fetching user profile: ", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUserProfile();
    }, [username]);

    // TODO: Fix all placeholder loading
    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <div className="flex flex-col items-center">
            <div className="my-5 font-bold text-4xl flex justify-center">
                Profile Page
            </div>

            <h2>@{username}</h2>
            {profile.first_name && <h3>{profile.first_name}</h3>}
            {profile.last_name && <h3>{profile.last_name}</h3>}
            {profile.bio && <h3>{profile.bio}</h3>}
            {profile.photo && (
                <img
                    className="max-w-96"
                    src={profile.photo}
                    alt="{profile.first_name}'s Profile Photo"
                />
            )}
            {username == user && (
                <div>
                    <Link to={`/edit-profile/`} state={{ profile: profile }}>
                        <button
                            type="button"
                            className="mt-5 text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800"
                        >
                            Edit Profile
                        </button>
                    </Link>
                    {/* <button
                        type="button"
                        className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                    >
                        DELETE ACCOUNT
                    </button> */}
                </div>
            )}
        </div>
    );
};

export default ProfilePage;
