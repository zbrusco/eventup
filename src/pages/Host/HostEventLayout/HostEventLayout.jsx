import style from "./HostEventLayout.module.css";
import React from "react";
import { useParams, NavLink, Outlet } from "react-router-dom";
import { getHostEvents } from "../../../api";

export default function HostVanDetail() {
  const [event, setEvent] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const { id } = useParams();
  React.useEffect(() => {
    async function loadEvents() {
      setLoading(true);
      try {
        const data = await getHostEvents(id);
        setEvent(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }
    loadEvents();
  }, [id]);

  const styles = {
    fontWeight: "bold",
    textDecoration: "underline",
    color: "#161616",
  };

  if (loading || !event) {
    return <h1 aria-live="polite">Loading...</h1>;
  }
  if (error) {
    return <h1 aria-live="assertive">There was an error: {error.message}</h1>;
  }

  return (
    <div className={style["host_event_detail_container"]}>
      <NavLink
        to=".."
        relative="path"
        className={style["host_event_detail_link"]}
      >
        ← Back to all events
      </NavLink>
      <div className={style["host_event_detail_content"]}>
        <div className={style["host_event_detail_title"]}>
          <img src={event.imageUrl} />
          <div className={style["host_event_detail_title_content"]}>
            <div
              className={`${style.host_event_detail_badge} ${style[event.status]}`}
            >
              {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
            </div>
            <h2>{event.name}</h2>
            <p className={style["host_event_detail_price"]}>
              <span>${event.price}</span>/day
            </p>
          </div>
        </div>
        <div className={style["host_event_detail_navbar"]}>
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
          <NavLink
            style={({ isActive }) => (isActive ? styles : null)}
            to="participants"
          >
            Participants
          </NavLink>
        </div>
        <Outlet context={{ event }} />
      </div>
    </div>
  );
}
