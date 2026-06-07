import { Navigate } from "react-router-dom";

function ProtectedRoute({ children}) {
    const hasRefreshToken = localStorage.getItem('refresh');

    if(hasRefreshToken) {
        return children;
    }

    return <Navigate to="/login" replace />;
}

export default ProtectedRoute