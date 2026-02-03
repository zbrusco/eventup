import styles from "./About.module.css";
import AboutVan from "../../assets/images/about-hero.png";
import { Link } from "react-router-dom";

export default function About() {
  return (
    <div className={styles.container}>
      <img src={AboutVan} alt="Van Image" className={styles.about_img} />
      <div className={styles.about_content}>
        <article className={styles.about_article}>
          <h1 className={styles.about_title}>
            Don't squeeze in a sedan when you could relax in a van.
          </h1>
          <p className={styles.about_paragraph}>
            Our mission is to enliven your road trip with the perfect travel van
            rental. Our vans are recertified before each trip to ensure your
            travel plans can go off without a hitch. (Hitch costs extra 😉)
          </p>
          <p className={styles.about_paragraph}>
            Our team is full of vanlife enthusiasts who know firsthand the magic
            of touring the world on 4 wheels.
          </p>
        </article>
        <div className={styles.about_card}>
          <h2 className={styles.about_title}>
            Your destination is waiting. <br />
            Your van is ready.
          </h2>
          <Link to="/vans" className={styles.about_button}>
            Explore our vans
          </Link>
        </div>
      </div>
    </div>
  );
}
