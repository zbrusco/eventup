import style from "./EventDetail.module.css";
import React from "react";
import { useParams, Link, useLocation } from "react-router-dom";
import { getEvents } from "../../../api";

export default function EventDetail() {
  const [event, setEvent] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);

  const { id } = useParams();
  const location = useLocation();

  React.useEffect(() => {
    async function loadEvents() {
      setLoading(true);
      try {
        const data = await getEvents(id);
        setEvent(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }
    loadEvents();
  }, [id]);

  const search = location.state?.search || "";
  const status = location.state?.status || "all";

  if (loading || !event) {
    return <h1 aria-live="polite">Loading...</h1>;
  }
  if (error) {
    return <h1 aria-live="assertive">There was an error: {error.message}</h1>;
  }

  return (
    <div className={style["event-detail_container"]}>
      <Link to={`..${search}`} relative="path">
        &larr; Back to {status} events
      </Link>
      <div className={style["event-detail_content"]}>
        <img src={event.imageUrl} />
        <div className={style["event-detail_badge"]}>
          {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
        </div>
        <h2>{event.name}</h2>
        <p className={style["event-detail_price"]}>
          <span>${event.price}</span>/day
        </p>
        <p>{event.description}</p>
        <button className={style["event-detail_btn"]}>Join this event</button>
      </div>
    </div>
  );
}
