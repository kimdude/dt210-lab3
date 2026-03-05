import { createBrowserRouter } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { LoginPage } from "./pages/LoginPage"
import { Layout } from "./components/Layout";
import { ProfilePage } from "./pages/ProfilePage";
import ProtectedRoute from "./components/ProtectedRoute";
import { PostPage } from "./pages/PostPage";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                path: "/",
                element: <HomePage />
            },
            {
                path: "/post/:_id",
                element: <PostPage />
            },
            {
                path: "login",
                element: <LoginPage />
            },
            {
                path: "profile",
                element: (
                    <ProtectedRoute>
                        <ProfilePage />
                    </ProtectedRoute> 
                )
            }     
        ]
    }
]);

export default router; 