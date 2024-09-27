import {
    Route,
    createBrowserRouter,
    createRoutesFromElements,
    RouterProvider,
} from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./utils/ProtectedRoute";

import Register from "./pages/RegisterPage";
import Login from "./pages/LoginPage";
import LandingPage from "./pages/LandingPage";
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";
import MainLayout from "./layouts/MainLayout";
import NavbarLayout from "./layouts/NavbarLayout";

const router = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route element={<MainLayout />}>
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
                <Route path="/profile" element={<ProfilePage />} />
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
