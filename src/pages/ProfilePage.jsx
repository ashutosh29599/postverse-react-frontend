import React, { useEffect, useState } from "react";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import axios from "axios";
import { useParams } from "react-router-dom";

const ProfilePage = () => {
    // const { user } = useContext(AuthContext);
    const { username } = useParams();

    const [profile, setProfile] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchUserProfile = async () => {
        try {
            // const response = await axios.get(`/api/profiles/profile/${user}`)
            console.log(username);
            const response = await axios.get(
                `/api/profiles/profile/${username}`
            );
            setProfile(response.data);
            console.log(response.data);
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
            <h1 className="text-2xl font-black">ProfilePage</h1>

            <h2 className="mt-5">@{username}</h2>
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
        </div>
    );
};

export default ProfilePage;
