import { Link } from "react-router-dom";
import style from "./HostEvents.module.css";
import React from "react";
import { getHostEvents } from "../../../api";

export default function HostEvents() {
  const [events, setEvents] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    async function loadEvents() {
      setLoading(true);
      try {
        const data = await getHostEvents();
        setEvents(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }
    loadEvents();
  }, []);

  const eventEls = events.map((event) => (
    <Link
      to={`/host/events/${event.$id}`}
      key={event.$id}
      className={style.host_events_wrapper}
    >
      <img src={event.imageUrl} alt={`Photo of ${event.name}`} />
      <div className={style.host_events_info}>
        <h3>{event.name}</h3>
        <p>${event.price}/day</p>
      </div>
    </Link>
  ));

  if (loading) {
    return <h1 aria-live="polite">Loading...</h1>;
  }
  if (error) {
    return <h1 aria-live="assertive">There was an error: {error.message}</h1>;
  }

  return (
    <section className={style.host_events_section}>
      <h1 className={style.host_events_title}>Your listed events</h1>
      <div className={style.host_events_container}>{eventEls}</div>
    </section>
  );
}
