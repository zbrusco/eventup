import React from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import style from "./Register.module.css";
import { registerUser } from "../../api";
import { useAuth } from "../../contexts/AuthContext";

export default function Register() {
  const [registerFormData, setRegisterFormData] = React.useState({
    email: "",
    password: "",
    name: "",
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

    registerUser(registerFormData.email, registerFormData.password, registerFormData.name)
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
    setRegisterFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  return (
    <div className={style.register_container}>
      <h1>Create your account</h1>
      {error?.message && (
        <h3 className={style.register_error} aria-live="assertive">
          {error.message}
        </h3>
      )}
      <form onSubmit={handleSubmit} className={style.register_form}>
        <input
          name="name"
          onChange={handleChange}
          type="text"
          placeholder="Full Name"
          value={registerFormData.name}
          required
        />
        <input
          name="email"
          onChange={handleChange}
          type="email"
          placeholder="Email address"
          value={registerFormData.email}
          required
        />
        <input
          name="password"
          onChange={handleChange}
          type="password"
          placeholder="Password"
          value={registerFormData.password}
          required
        />
        <button
          disabled={status === "submitting"}
          className={status === "submitting" ? style.disabled : ""}
        >
          {status === "submitting" ? "Creating account..." : "Create Account"}
        </button>
      </form>
      <div style={{ marginTop: "20px", textAlign: "center" }}>
        <p>Already have an account?</p>
        <Link 
          to="/login"
          state={{ from: from }}
          style={{
            background: "none",
            border: "none",
            color: "#ff8c38",
            textDecoration: "underline",
            cursor: "pointer",
            fontWeight: "bold",
            display: "inline-block",
            padding: "5px"
          }}
        >
          Log in instead
        </Link>
      </div>
    </div>
  );
}
