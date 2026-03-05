import { Navigate } from "react-router-dom";
import type { ReactNode } from "react";
import { useAuth } from "../context/AuthContext";

interface ProtectedRouteProps {
    children: ReactNode
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {

    //Checking for user
    const { user } = useAuth();

    //Redirecting to login if no user is found
    if(!user) {
        return <Navigate to="/login" replace />
    }

    return  <>{ children }</>
}

export default ProtectedRoute