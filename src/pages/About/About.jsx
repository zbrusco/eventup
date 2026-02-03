import styles from "./About.module.css";
import AboutEvent from "../../assets/images/about-hero.png";
import { Link } from "react-router-dom";

export default function About() {
  return (
    <div className={styles.container}>
      <img
        src={AboutEvent}
        alt="EventUp Community"
        className={styles.about_img}
      />
      <div className={styles.about_content}>
        <article className={styles.about_article}>
          <h1 className={styles.about_title}>
            Don't stay on the sidelines when you could collaborate with your
            neighbors.
          </h1>
          <p className={styles.about_paragraph}>
            Our mission is to simplify community event management through a
            collaborative platform. We want to ensure that workshops, fairs, and
            local projects are organized seamlessly, connecting those who want
            to act with those who want to participate.
          </p>
          <p className={styles.about_paragraph}>
            Our team believes in the power of local unity and in providing
            simple tools that help organizers and participants transform their
            surroundings.
          </p>
        </article>
        <div className={styles.about_card}>
          <h2 className={styles.about_title}>
            Your next event is waiting. <br />
            The community is ready.
          </h2>
          <Link to="/events" className={styles.about_button}>
            Explore events
          </Link>
        </div>
      </div>
    </div>
  );
}
