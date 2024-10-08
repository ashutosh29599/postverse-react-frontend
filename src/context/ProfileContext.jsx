import { createContext, useContext, useEffect, useState } from "react";
import AuthContext from "./AuthContext";
import axios from "axios";

const ProfileContext = createContext();

const ProfileProvider = ({ children }) => {
    const { isAuthenticated, user } = useContext(AuthContext);
    const [profile, setProfile] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchProfile = async () => {
        try {
            if (!user) {
                return;
            }
            console.log(
                `Profile being fetched from ProfileContext: /api/profiles/profile/${user}`
            );
            const response = await axios.get(`/api/profiles/profile/${user}`);
            setProfile(response.data);
            // console.log(response.data);
            // console.log(user);
        } catch (error) {
            console.log("Error fetching user profile: ", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (isAuthenticated && user) {
            fetchProfile();
        }
    }, [user, isAuthenticated]);

    return (
        <ProfileContext.Provider value={{ profile: profile, loading, fetchProfile }}>
            {children}
        </ProfileContext.Provider>
    );
};

export { ProfileContext as default, ProfileProvider };
