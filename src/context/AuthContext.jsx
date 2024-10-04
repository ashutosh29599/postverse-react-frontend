import { createContext, useState } from "react";
import axios from "axios";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    function getCookie(name) {
        let cookieValue = null;
        if (document.cookie && document.cookie !== "") {
            const cookies = document.cookie.split(";");
            for (let i = 0; i < cookies.length; i++) {
                const cookie = cookies[i].trim();
                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) === name + "=") {
                    cookieValue = decodeURIComponent(
                        cookie.substring(name.length + 1)
                    );
                    break;
                }
            }
        }
        return cookieValue;
    }

    const csrftoken = getCookie("csrftoken");

    // TODO: REMOVE the httponly cookies etc when the user logs out. 
    axios.defaults.withCredentials = true; // Ensures credentials (cookies) are sent with requests
    axios.defaults.headers.common["X-CSRFToken"] = csrftoken; // Set the CSRF token for every request

    const checkAuthStatus = async () => {
        try {
            const response = await axios.get("/api/accounts/check-auth/", {
                withCredentials: true,
            });
            // console.log("Auth status response:", response);

            if (response.status === 200) {
                setIsAuthenticated(true);
                setUser(response.data.username);
            } else {
                setIsAuthenticated(false);
            }
        } catch (error) {
            setIsAuthenticated(false);
            setUser(null);
            console.log(`error -> ${error}`);
        } finally {
            setLoading(false);
        }
    };

    // We can call this from the ProtectedRoute
    // useEffect(() => {
    //     checkAuthStatus();
    // }, []);

    const login = async (username, password) => {
        try {
            await axios.post(
                "/api/accounts/login/",
                { username, password },
                // { withCredentials: true }
            );
            setIsAuthenticated(true);
            setUser(username);
        } catch (error) {
            console.log("failed to login, error, ", error);
            throw error;
        }
    };

    const logout = async () => {
        try {
            await axios.post(
                "/api/accounts/logout/",
                {},
                { withCredentials: true }
            );
        } catch (error) {
            console.log("Error logging out: ", error);
        } finally {
            setIsAuthenticated(false);
            setUser(null);
        }
    };

    const refreshAccessToken = async () => {
        console.log(document.cookie);
        try {
            const response = await axios.post(
                "/api/accounts/token/refresh/",
                {},
                { withCredentials: true }
            );
        } catch (error) {
            console.log("Error refreshing access token: ", error);
            // logout();
        }
    };

    axios.interceptors.response.use(
        (response) => response,
        async (error) => {
            const originalRequest = error.config;
            if (
                error.response &&
                error.response.status === 401 &&
                !originalRequest._retry
            ) {
                originalRequest._retry = true;
                await refreshAccessToken();
                return axios(originalRequest);
            }
            return Promise.reject(error);
        }
    );

    return (
        <AuthContext.Provider
            value={{
                isAuthenticated,
                user,
                login,
                logout,
                loading,
                checkAuthStatus,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext as default, AuthProvider };
