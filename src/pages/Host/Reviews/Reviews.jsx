import style from "./Reviews.module.css";
import React, { useState, useEffect } from "react";
import { BsStarFill } from "react-icons/bs";
import ReviewGraph from "../../../assets/images/reviews-graph.png";
export default function Reviews() {
  const [reviewsData, setReviewsData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchReviews() {
      try {
        const response = await fetch("/reviews.json");
        if (!response.ok) {
          throw new Error("Failed to fetch reviews");
        }
        const data = await response.json();
        setReviewsData(data);
      } catch (error) {
        console.error("Error fetching reviews data:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchReviews();
  }, []);

  if (loading) {
    return <h1 aria-live="polite">Loading...</h1>;
  }

  return (
    <section className={style.host_reviews}>
      <div className={style.top_text}>
        <h2>Your reviews</h2>
        <p>
          Last <span>30 days</span>
        </p>
      </div>
      <img className={style.graph} src={ReviewGraph} alt="Review graph" />
      <h3>Reviews (2)</h3>
      {reviewsData.map((review) => (
        <div key={review.id}>
          <div className={style.review}>
            {[...Array(review.rating)].map((_, i) => (
              <BsStarFill className={style.review_star} key={i} />
            ))}
            <div className={style.info}>
              <p className={style.name}>{review.name}</p>
              <p className={style.date}>{review.date}</p>
            </div>
            <p>{review.text}</p>
          </div>
          <hr />
        </div>
      ))}
    </section>
  );
}
