import React from "react";
import { Link } from "react-router-dom";
import { BsStarFill } from "react-icons/bs";
import { getHostEvents } from "../../../api";
import style from "./Dashboard.module.css";

export default function Dashboard() {
  const [events, setEvents] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  React.useEffect(() => {
    setLoading(true);
    getHostEvents()
      .then((data) => setEvents(data))
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
  }, []);

  function renderEventElements(events) {
    const hostEventsEls = events.map((event) => (
      <div className={style.host_event_single} key={event.id}>
        <img src={event.imageUrl} alt={`Photo of ${event.name}`} />
        <div className={style.host_event_info}>
          <h3>{event.name}</h3>
          <p>${event.price}/day</p>
        </div>
        <Link className={style.host_dashboard_link} to={`events/${event.$id}`}>
          View
        </Link>
      </div>
    ));

    return (
      <div className={style.host_events_list}>
        <section>{hostEventsEls}</section>
      </div>
    );
  }

  // if (loading) {
  //     return <h1>Loading...</h1>
  // }

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
          <h2>Your listed events</h2>
          <Link className={style.host_dashboard_link} to="events">
            View all
          </Link>
        </div>
        {loading && !events ? (
          <h1>Loading...</h1>
        ) : (
          <>{renderEventElements(events)}</>
        )}
        {/*<React.Suspense fallback={<h3>Loading...</h3>}>
                    <Await resolve={loaderData.events}>{renderEventElements}</Await>
                </React.Suspense>*/}
      </section>
    </>
  );
}
