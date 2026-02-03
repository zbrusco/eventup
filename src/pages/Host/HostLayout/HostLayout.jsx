import style from "./HostLayout.module.css";
import { NavLink, Outlet } from "react-router-dom";

export default function HostLayout() {
  const styles = {
    fontWeight: "bold",
    textDecoration: "underline",
    color: "#161616",
  };

  return (
    <>
      <div className={style["host-navbar_container"]}>
        <nav className={style["host-navbar_nav"]}>
          <NavLink
            style={({ isActive }) => (isActive ? styles : null)}
            to="."
            end
          >
            Dashboard
          </NavLink>
          <NavLink
            style={({ isActive }) => (isActive ? styles : null)}
            to="income"
          >
            Income
          </NavLink>
          <NavLink
            style={({ isActive }) => (isActive ? styles : null)}
            to="vans"
          >
            Vans
          </NavLink>
          <NavLink
            style={({ isActive }) => (isActive ? styles : null)}
            to="reviews"
          >
            Reviews
          </NavLink>
        </nav>
      </div>
      <Outlet />
    </>
  );
}
