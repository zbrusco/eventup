import style from "./HostVanLayout.module.css";
import React from "react";
import { useParams, NavLink, Outlet } from "react-router-dom";
import { getHostVans } from "../../../api";

export default function HostVanDetail() {
  const [van, setVan] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const { id } = useParams();

  React.useEffect(() => {
    async function loadVans() {
      setLoading(true);
      try {
        const data = await getHostVans(id);
        setVan(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }
    loadVans();
  }, [id]);

  const styles = {
    fontWeight: "bold",
    textDecoration: "underline",
    color: "#161616",
  };

  if (loading || !van) {
    return <h1 aria-live="polite">Loading...</h1>;
  }
  if (error) {
    return <h1 aria-live="assertive">There was an error: {error.message}</h1>;
  }

  return (
    <div className={style["host_van_detail_container"]}>
      <NavLink
        to=".."
        relative="path"
        className={style["host_van_detail_link"]}
      >
        ← Back to all vans
      </NavLink>
      <div className={style["host_van_detail_content"]}>
        <div className={style["host_van_detail_title"]}>
          <img src={van.imageUrl} />
          <div className={style["host_van_detail_title_content"]}>
            <div
              className={`${style.host_van_detail_badge} ${style[van.type]}`}
            >
              {van.type.charAt(0).toUpperCase() + van.type.slice(1)}
            </div>
            <h2>{van.name}</h2>
            <p className={style["host_van_detail_price"]}>
              <span>${van.price}</span>/day
            </p>
          </div>
        </div>
        <div className={style["host_van_detail_navbar"]}>
          <NavLink
            style={({ isActive }) => (isActive ? styles : null)}
            index
            to=""
            end
          >
            Details
          </NavLink>
          <NavLink
            style={({ isActive }) => (isActive ? styles : null)}
            to="pricing"
          >
            Pricing
          </NavLink>
          <NavLink
            style={({ isActive }) => (isActive ? styles : null)}
            to="photos"
          >
            Photos
          </NavLink>
        </div>
        <Outlet context={{ van }} />
      </div>
    </div>
  );
}
