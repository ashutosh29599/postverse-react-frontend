import {
    Route,
    createBrowserRouter,
    createRoutesFromElements,
    RouterProvider,
} from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./utils/ProtectedRoute";
import UnprotectedRoute from "./utils/UnprotectedRoute";

import Register from "./pages/RegisterPage";
import Login from "./pages/LoginPage";
import LandingPage from "./pages/LandingPage";
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";
import LandingPageLayout from "./layouts/LandingPageLayout";
import NavbarLayout from "./layouts/NavbarLayout";

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
                <Route path="/profile/:username" element={<ProfilePage />} />
                <Route path="/create-post" element={<CreatePostPage />} />
                <Route path="/edit-post/:post" element={<EditPostPage />} />
                <Route path="/delete-post/:post" element={<ConfirmDeletePostPage />} />
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
