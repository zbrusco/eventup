import { Link } from "react-router-dom";
import style from "./NotFound.module.css";

export default function NotFound() {
  return (
    <div className={style.notfound_container}>
      <h1>Sorry, the page you were looking for was not found.</h1>
      <Link to="/">Return to home</Link>
    </div>
  );
}
