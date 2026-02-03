import style from "./Events.module.css";
import React from "react";
import { Link, useSearchParams } from "react-router-dom";
import { getEvents } from "../../api";

export default function Events() {
  const [events, setEvents] = React.useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);

  const typeFilter = searchParams.get("type") ? searchParams.get("type") : "";

  React.useEffect(() => {
    async function loadEvents() {
      setLoading(true);
      try {
        const data = await getEvents();
        setEvents(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }
    loadEvents();
  }, []);

  let statuses = [];
  let eventsFiltered = null;
  if (events) {
    statuses = Array.from(new Set(events.map((event) => event.status)));
    eventsFiltered = events.filter((event) =>
      event.status.includes(typeFilter),
    );
  }

  function handleFilterChange(key, value) {
    setSearchParams((prevParams) => {
      if (value === null) {
        prevParams.delete(key);
      } else {
        prevParams.set(key, value);
      }
      return prevParams;
    });
  }

  if (loading) {
    return <h1 aria-live="polite">Loading...</h1>;
  }
  if (error) {
    return <h1 aria-live="assertive">There was an error: {error.message}</h1>;
  }

  return (
    <div className={style.events_container}>
      <h1>Explore our event options</h1>
      {eventsFiltered && (
        <>
          <div className={style.events_filters}>
            {statuses.map((type) => (
              <button
                key={type}
                className={`${style.events_type_btn}
                  ${typeFilter === type ? style.events_type_selected : ""}
                `}
                onClick={() => handleFilterChange("type", type)}
              >
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </button>
            ))}
            {typeFilter && (
              <button
                className={style.events_filter_btn}
                onClick={() => handleFilterChange("type", null)}
              >
                Clear
              </button>
            )}
          </div>
          <div className={style.eventscard_container}>
            {eventsFiltered.map((event) => (
              <Link
                to={event.$id}
                key={event.$id}
                className={style.eventscard_link}
                state={{
                  search: `?${searchParams.toString()}`,
                  type: typeFilter,
                }}
              >
                <div className={style.eventscard_card}>
                  <img
                    src={event.imageUrl}
                    alt={event.name}
                    className={style.eventscard_img}
                  />
                  <div className={style.eventscard_title}>
                    <h1>{event.name}</h1>
                    <h1>${event.price}</h1>
                  </div>
                  <p>/day</p>
                  <div
                    className={`${style.eventscard_badge} ${style[event.status]}`}
                  >
                    {event.status.charAt(0).toUpperCase() +
                      event.status.slice(1)}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
