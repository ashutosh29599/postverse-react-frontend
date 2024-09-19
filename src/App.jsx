import {
    Route,
    createBrowserRouter,
    createRoutesFromElements,
    RouterProvider,
} from "react-router-dom";

import Register from "./pages/RegisterPage";
import Login from "./pages/LoginPage";

const router = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
        </>
    )
);

const App = () => {
    return <RouterProvider router={router} />;
};

export default App;
