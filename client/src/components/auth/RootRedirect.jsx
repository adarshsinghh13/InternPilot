import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function RootRedirect() {
  const { user, isAuthenticated } = useAuth();

  if (user || isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Navigate to="/login" replace />;
}
