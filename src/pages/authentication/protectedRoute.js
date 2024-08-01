import { Navigate } from "react-router-dom";
import { useAuth } from "./hooks/useAuth";
import { isTokenExpired } from "./hooks/useLocalStorage";

export const ProtectedRoute = ({ children }) => {
    const { user, logout } = useAuth();
    if (!user || isTokenExpired(user)) {
        logout(); // Clear user data and redirect
        return <Navigate to="/login" />;
    }
    return children
}