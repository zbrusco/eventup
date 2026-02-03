import style from "./HostEventDetail.module.css";
import { useOutletContext } from "react-router-dom";

export default function HostEventDetail() {
  const { event } = useOutletContext();
  return event ? (
    <div className={style["host_event_detail_description"]}>
      <p>
        <span>Name:</span> {event.name}
      </p>
      <p>
        <span>Status: </span>
        {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
      </p>
      <p>
        <span>Description:</span> {event.description}
      </p>
    </div>
  ) : null;
}
