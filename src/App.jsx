import {
    Route,
    createBrowserRouter,
    createRoutesFromElements,
    RouterProvider,
} from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { ProfileProvider } from "./context/ProfileContext";

import ProtectedRoute from "./utils/ProtectedRoute";
import UnprotectedRoute from "./utils/UnprotectedRoute";

import LandingPageLayout from "./layouts/LandingPageLayout";
import LandingPage from "./pages/LandingPage";

// Authentication
import Register from "./pages/Auth/RegisterPage";
import Login from "./pages/Auth/LoginPage";

// Protected Pages
import NavbarLayout from "./layouts/NavbarLayout";
import HomePage from "./pages/HomePage";
import SearchPage from "./pages/Search/SearchPage";

// protected Auth
import ChangePasswordPage from "./pages/Auth/ChangePasswordPage";
import DeleteAccountPage from "./pages/Auth/DeleteAccountPage";

// Profile
import ProfilePage from "./pages/Profiles/ProfilePage";
import EditProfilePage from "./pages/Profiles/EditProfilePage";

import SettingsPage from "./pages/Settings/SettingsPage";

// Posts
import CreatePostPage from "./pages/Posts/CreatePostPage";
import EditPostPage from "./pages/Posts/EditPostPage";
import ConfirmDeletePostPage from "./pages/Posts/ConfirmDeletePostPage";

const router = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route
                element={
                    <UnprotectedRoute>
                        <LandingPageLayout />
                    </UnprotectedRoute>
                }
            >
                <Route index element={<LandingPage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
            </Route>
            <Route
                element={
                    <ProtectedRoute>
                        <NavbarLayout />
                    </ProtectedRoute>
                }
            >
                <Route path="/home" element={<HomePage />} />
                <Route path="/search" element={<SearchPage />} />
                
                // protected Auth
                <Route
                    path="/change-password"
                    element={<ChangePasswordPage />}
                />
                <Route path="/delete-account" element={<DeleteAccountPage />} />
                
                // profiles
                <Route path="/profile/:username" element={<ProfilePage />} />
                <Route path="/edit-profile/" element={<EditProfilePage />} />
                <Route path="/settings" element={<SettingsPage />} />
                
                // posts
                <Route path="/create-post" element={<CreatePostPage />} />
                <Route path="/edit-post/" element={<EditPostPage />} />
                <Route
                    path="/delete-post/"
                    element={<ConfirmDeletePostPage />}
                />
            </Route>
        </>
    )
);

const App = () => {
    return (
        <AuthProvider>
            <ProfileProvider>
                <RouterProvider router={router} />{" "}
            </ProfileProvider>
        </AuthProvider>
    );
};

export default App;
