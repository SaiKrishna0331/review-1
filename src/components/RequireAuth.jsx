import { Navigate, useLocation } from "react-router-dom";
import { currentSession } from "../utils/auth";

export default function RequireAuth({ children }) {
  const session = currentSession();
  const location = useLocation();
  if (!session) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
}
