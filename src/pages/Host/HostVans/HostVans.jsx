import { Link } from "react-router-dom";
import style from "./HostVans.module.css";
import React from "react";
import { getHostVans } from "../../../api";

export default function HostVans() {
  const [vans, setVans] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    async function loadVans() {
      setLoading(true);
      try {
        const data = await getHostVans();
        setVans(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }
    loadVans();
  }, []);

  const vansEls = vans.map((van) => (
    <Link
      to={`/host/vans/${van.$id}`}
      key={van.$id}
      className={style.host_van_wrapper}
    >
      <img src={van.imageUrl} alt={`Photo of ${van.name}`} />
      <div className={style.host_van_info}>
        <h3>{van.name}</h3>
        <p>${van.price}/day</p>
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
    <section className={style.host_van_section}>
      <h1 className={style.host_van_title}>Your listed vans</h1>
      <div className={style.host_van_container}>{vansEls}</div>
    </section>
  );
}
