import styles from "./Home.module.css";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className={styles.home_container}>
      <div className={styles.home_content}>
        <h1 className={styles.home_title}>
          You have the initiative, we have the community.
        </h1>
        <p className={styles.home_paragraph}>
          Create, discover, and collaborate on local events to drive community
          engagement.
        </p>
        <Link to="/events" className={styles.home_button}>
          Find events
        </Link>
      </div>
    </div>
  );
}
