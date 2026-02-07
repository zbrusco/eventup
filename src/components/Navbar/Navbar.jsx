import style from "./Navbar.module.css";
import avatarIcon from "../../assets/images/avatar-icon.png";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { logoutUser } from "../../api";
import { useAuth } from "../../contexts/AuthContext/";

export default function Navbar() {
  const navigate = useNavigate();
  const { user, setUser } = useAuth();

  async function handleLogout() {
    await logoutUser();
    setUser(null);
    navigate("/");
  }

  return (
    <div className={style.navbar_container}>
      <NavLink to="/" className={style.navbar_logo} end>
        <h1>#EVENTUP</h1>
      </NavLink>
      <nav className={style.navbar_nav}>
        <NavLink
          className={({ isActive }) =>
            isActive ? style.navbar_selected : null
          }
          to="/host"
        >
          Host
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive ? style.navbar_selected : null
          }
          to="/about"
        >
          About
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive ? style.navbar_selected : null
          }
          to="/events"
        >
          Events
        </NavLink>
        <Link to={user ? "host" : "login"} className={style.login_link}>
          <img src={avatarIcon} className={style.login_icon} />
        </Link>
        {user && (
          <button className={style.navbar_logout} onClick={handleLogout}>
            Logout
          </button>
        )}
      </nav>
    </div>
  );
}
