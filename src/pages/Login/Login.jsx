import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import style from "./Login.module.css";
import { loginUser } from "../../api";
import { useAuth } from "../../contexts/AuthContext";

export default function Login() {
  const [loginFormData, setLoginFormData] = React.useState({
    email: "",
    password: "",
  });
  const [status, setStatus] = React.useState("idle");
  const [error, setError] = React.useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { setUser } = useAuth();
  const from = location.state?.from || "/host";

  function handleSubmit(e) {
    e.preventDefault();
    setStatus("submitting");
    loginUser(loginFormData)
      .then((data) => {
        setUser(data.user);
        navigate(from, { replace: true });
        setError(null);
      })
      .catch((error) => setError(error))
      .finally(() => setStatus("idle"));
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setLoginFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }
  const message = location.state?.message || "";

  return (
    <div className={style.login_container}>
      {message && <h3 className={style.login_first}>{message}</h3>}
      <h1>Sign in to your account</h1>
      {error?.message && (
        <h3 className={style.login_error} aria-live="assertive">
          {error.message}
        </h3>
      )}
      <form onSubmit={handleSubmit} className={style.login_form}>
        <input
          name="email"
          onChange={handleChange}
          type="email"
          placeholder="Email address"
          value={loginFormData.email}
        />
        <input
          name="password"
          onChange={handleChange}
          type="password"
          placeholder="Password"
          value={loginFormData.password}
        />
        <button
          disabled={status === "submitting"}
          className={status === "submitting" && style.disabled}
        >
          {status === "submitting" ? "Logging in..." : "Log in"}
        </button>
      </form>
    </div>
  );
}
