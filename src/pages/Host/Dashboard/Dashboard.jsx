import React from "react";
import { Link } from "react-router-dom";
import { BsStarFill } from "react-icons/bs";
import { getHostEvents, getSubscribedEvents } from "../../../api";
import style from "./Dashboard.module.css";
import { useAuth } from "../../../contexts/AuthContext";

export default function Dashboard() {
  const [hosted, setHosted] = React.useState([]);
  const [subscribed, setSubscribed] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const { user } = useAuth();

  React.useEffect(() => {
    if (!user) return;
    setLoading(true);
    Promise.all([getHostEvents(), getSubscribedEvents(user.$id)])
      .then(([hostedEvents, subscribedEvents]) => {
        setHosted(hostedEvents);
        setSubscribed(subscribedEvents);
      })
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
  }, [user]);

  function EventCards({ events, type }) {
    if (!events || events.length === 0) return <p>No events found.</p>;

    return (
      <div className={style.host_events_list}>
        <section>
          {events.map((event) => {
            const linkPath =
              type === "host"
                ? `events/${event.$id}`
                : `subscriptions/${event.$id}`;

            return (
              <div className={style.host_event_single} key={event.$id}>
                <img src={event.imageUrl} alt={event.name} />
                <div className={style.host_event_info}>
                  <h3>{event.name}</h3>
                  <p>${event.price}/day</p>
                </div>
                <Link className={style.host_dashboard_link} to={linkPath}>
                  View
                </Link>
              </div>
            );
          })}
        </section>
      </div>
    );
  }

  if (error) {
    return <h1>Error: {error.message}</h1>;
  }

  return (
    <>
      <section className={style.host_dashboard_earnings}>
        <div className={style.info}>
          <h1>Welcome!</h1>
          <p>
            Income last <span>30 days</span>
          </p>
          <h2>$2,260</h2>
        </div>
        <Link className={style.host_dashboard_link} to="income">
          Details
        </Link>
      </section>
      <section className={style.host_dashboard_reviews}>
        <h2>Review score</h2>

        <BsStarFill className={style.star} />

        <p>
          <span>5.0</span>/5
        </p>
        <Link className={style.host_dashboard_link} to="reviews">
          Details
        </Link>
      </section>
      <section className={style.host_dashboard_events}>
        <div className={style.top}>
          <h2>Your hosted events</h2>
          <Link className={style.host_dashboard_link} to="events">
            View all
          </Link>
        </div>
        {loading && !hosted ? (
          <h1>Loading...</h1>
        ) : (
          <EventCards events={hosted} type="host" />
        )}
      </section>
      <section className={style.host_dashboard_events}>
        <div className={style.top}>
          <h2>Your subscriptions</h2>
          <Link className={style.host_dashboard_link} to="subscriptions">
            View all
          </Link>
        </div>
        {loading && !subscribed ? (
          <h1>Loading...</h1>
        ) : (
          <EventCards events={subscribed} type="participant" />
        )}
      </section>
    </>
  );
}
