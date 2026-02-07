import { Outlet, Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

export default function AuthRequired() {
  const location = useLocation();

  const { user, isLoading } = useAuth();
  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (!user) {
    return (
      <Navigate
        to="/login"
        state={{ message: "You must log in first", from: location.pathname }}
        replace
      />
    );
  }
  return <Outlet />;
}
