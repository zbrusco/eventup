import style from "./VanDetail.module.css";
import React from "react";
import { useParams, Link, useLocation } from "react-router-dom";
import { getVans } from "../../../api";

export default function VanDetail() {
  const [van, setVan] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);

  const { id } = useParams();
  const location = useLocation();

  React.useEffect(() => {
    async function loadVans() {
      setLoading(true);
      try {
        const data = await getVans(id);
        setVan(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }
    loadVans();
  }, [id]);

  const search = location.state?.search || "";
  const type = location.state?.type || "all";

  if (loading || !van) {
    return <h1 aria-live="polite">Loading...</h1>;
  }
  if (error) {
    return <h1 aria-live="assertive">There was an error: {error.message}</h1>;
  }

  return (
    <div className={style["van-detail_container"]}>
      <Link to={`..${search}`} relative="path">
        &larr; Back to {type} vans
      </Link>
      <div className={style["van-detail_content"]}>
        <img src={van.imageUrl} />
        <div className={style["van-detail_badge"]}>
          {van.type.charAt(0).toUpperCase() + van.type.slice(1)}
        </div>
        <h2>{van.name}</h2>
        <p className={style["van-detail_price"]}>
          <span>${van.price}</span>/day
        </p>
        <p>{van.description}</p>
        <button className={style["van-detail_btn"]}>Rent this van</button>
      </div>
    </div>
  );
}
