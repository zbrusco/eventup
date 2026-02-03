import { Outlet, Navigate, useLocation } from "react-router-dom";
import React from "react";
import { account } from "../../appwrite";

export default function AuthRequired() {
  const [user, setUser] = React.useState("loading");
  const location = useLocation();

  React.useEffect(() => {
    account
      .get()
      .then((data) => setUser(data))
      .catch(() => setUser(null));
  }, []);

  if (user === "loading") {
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
