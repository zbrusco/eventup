import styles from "./Home.module.css";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className={styles.home_container}>
      <div className={styles.home_content}>
        <h1 className={styles.home_title}>
          You got the travel plans, we got the travel vans.
        </h1>
        <p className={styles.home_paragraph}>
          Add adventure to your life by joining the #vanlife movement. Rent the
          perfect van to make your perfect road trip.
        </p>
        <Link to="/vans" className={styles.home_button}>
          Find your van
        </Link>
      </div>
    </div>
  );
}
