import { useOutletContext } from "react-router";
import style from "./HostEventPhotos.module.css";

export default function HostEventPhotos() {
  const { event } = useOutletContext();

  return (
    <div className={style["host_event_photo"]}>
      <img src={event.imageUrl} alt={`Photo of ${event.name}`} />
    </div>
  );
}
