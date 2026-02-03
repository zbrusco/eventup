import React from "react";
import { Link } from "react-router-dom";
import { BsStarFill } from "react-icons/bs";
import { getHostVans } from "../../../api";
import style from "./Dashboard.module.css";

export default function Dashboard() {
  const [vans, setVans] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  React.useEffect(() => {
    setLoading(true);
    getHostVans()
      .then((data) => setVans(data))
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
  }, []);

  function renderVanElements(vans) {
    const hostVansEls = vans.map((van) => (
      <div className={style.host_van_single} key={van.id}>
        <img src={van.imageUrl} alt={`Photo of ${van.name}`} />
        <div className={style.host_van_info}>
          <h3>{van.name}</h3>
          <p>${van.price}/day</p>
        </div>
        <Link className={style.host_dashboard_link} to={`vans/${van.$id}`}>
          View
        </Link>
      </div>
    ));

    return (
      <div className={style.host_vans_list}>
        <section>{hostVansEls}</section>
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
      <section className={style.host_dashboard_vans}>
        <div className={style.top}>
          <h2>Your listed vans</h2>
          <Link className={style.host_dashboard_link} to="vans">
            View all
          </Link>
        </div>
        {loading && !vans ? (
          <h1>Loading...</h1>
        ) : (
          <>{renderVanElements(vans)}</>
        )}
        {/*<React.Suspense fallback={<h3>Loading...</h3>}>
                    <Await resolve={loaderData.vans}>{renderVanElements}</Await>
                </React.Suspense>*/}
      </section>
    </>
  );
}
