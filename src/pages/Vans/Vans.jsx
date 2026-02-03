import style from "./Vans.module.css";
import React from "react";
import { Link, useSearchParams } from "react-router-dom";
import { getVans } from "../../api";

export default function Vans() {
  const [vans, setVans] = React.useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);

  const typeFilter = searchParams.get("type") ? searchParams.get("type") : "";

  React.useEffect(() => {
    async function loadVans() {
      setLoading(true);
      try {
        const data = await getVans();
        setVans(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }
    loadVans();
  }, []);

  let types = [];
  let vansFiltered = null;
  if (vans) {
    types = Array.from(new Set(vans.map((van) => van.type)));
    vansFiltered = vans.filter((van) => van.type.includes(typeFilter));
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
    <div className={style.vans_container}>
      <h1>Explore our van options</h1>
      {vansFiltered && (
        <>
          <div className={style.vans_filters}>
            {types.map((type) => (
              <button
                key={type}
                className={`${style.vans_type_btn}
                  ${typeFilter === type ? style.vans_type_selected : ""}
                `}
                onClick={() => handleFilterChange("type", type)}
              >
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </button>
            ))}
            {typeFilter && (
              <button
                className={style.vans_filter_btn}
                onClick={() => handleFilterChange("type", null)}
              >
                Clear
              </button>
            )}
          </div>
          <div className={style.vanscard_container}>
            {vansFiltered.map((van) => (
              <Link
                to={van.$id}
                key={van.$id}
                className={style.vanscard_link}
                state={{
                  search: `?${searchParams.toString()}`,
                  type: typeFilter,
                }}
              >
                <div className={style.vanscard_card}>
                  <img
                    src={van.imageUrl}
                    alt={van.name}
                    className={style.vanscard_img}
                  />
                  <div className={style.vanscard_title}>
                    <h1>{van.name}</h1>
                    <h1>${van.price}</h1>
                  </div>
                  <p>/day</p>
                  <div className={`${style.vanscard_badge} ${style[van.type]}`}>
                    {van.type.charAt(0).toUpperCase() + van.type.slice(1)}
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
