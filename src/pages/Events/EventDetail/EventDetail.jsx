import style from "./EventDetail.module.css";
import React from "react";
import { useParams, Link, useLocation, useNavigate } from "react-router-dom";
import {
  getEventWithSubscription,
  createEventParticipation,
  deleteEventParticipation,
} from "../../../api";
import { useAuth } from "../../../contexts/AuthContext";

export default function EventDetail() {
  const [event, setEvent] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const { user } = useAuth();
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  React.useEffect(() => {
    async function loadEvents() {
      setLoading(true);
      try {
        const data = await getEventWithSubscription({
          userId: user.$id,
          eventId: id,
        });
        setEvent(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }
    loadEvents();
  }, []);

  async function handleLeaveEvent() {
    try {
      await deleteEventParticipation({
        userId: user.$id,
        eventId: id,
      });
      // Update button
      setEvent((prev) => ({
        ...prev,
        isSubscribed: false,
      }));
    } catch (err) {
      console.error("Erro ao sair do evento:", err);
    }
  }
  async function handleJoinEvent() {
    if (!user) {
      navigate("/login", {
        state: {
          message: "You must log in first",
          from: location.pathname,
        },
      });
      return;
    }
    try {
      await createEventParticipation({ userId: user.$id, eventId: event.$id });
      // Update button
      setEvent((prev) => ({
        ...prev,
        isSubscribed: true,
      }));
    } catch (err) {
      console.error("Erro ao se inscrever no evento:", err);
    }
  }

  const search = location.state?.search || "";
  const status = location.state?.status || "all";

  if (loading || !event) {
    return <h1 aria-live="polite">Loading...</h1>;
  }
  if (error) {
    return <h1 aria-live="assertive">There was an error: {error.message}</h1>;
  }

  const isHost = user && event?.isHost;
  const isSubscribed = user && event?.isSubscribed;

  const renderButton = () => {
    if (isHost) {
      return (
        <Link
          to={`/host/events/${id}`}
          className={style["event-detail_btn_host"]}
        >
          View event
        </Link>
      );
    }

    if (isSubscribed) {
      return (
        <button
          onClick={handleLeaveEvent}
          className={style["event-detail_btn_leave"]}
        >
          Leave Event
        </button>
      );
    }

    if (event.status === "cancelled") {
      return (
        <button
          disabled
          className={style["event-detail_btn_leave"]}
          style={{ cursor: "not-allowed", backgroundColor: "#ccc", color: "#666" }}
        >
          Event Cancelled
        </button>
      );
    }

    if (!user) {
      return (
        <Link
          to="/login"
          state={{ message: "You must log in first", from: location.pathname }}
          className={style["event-detail_btn"]}
        >
          Login to Join
        </Link>
      );
    }

    return (
      <button onClick={handleJoinEvent} className={style["event-detail_btn"]}>
        Join this event
      </button>
    );
  };

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
        {renderButton()}
      </div>
    </div>
  );
}
