import {
    Route,
    createBrowserRouter,
    createRoutesFromElements,
    RouterProvider,
} from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
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
                
                // profiles
                <Route path="/profile/:username" element={<ProfilePage />} />
                <Route
                    path="/edit-profile/"
                    element={<EditProfilePage />}
                />

                <Route path="/settings" element={<SettingsPage />} />

                // posts
                <Route path="/create-post" element={<CreatePostPage />} />
                <Route path="/edit-post/:post" element={<EditPostPage />} />
                <Route
                    path="/delete-post/:post"
                    element={<ConfirmDeletePostPage />}
                />
            </Route>
        </>
    )
);

const App = () => {
    return (
        <AuthProvider>
            <RouterProvider router={router} />{" "}
        </AuthProvider>
    );
};

export default App;
