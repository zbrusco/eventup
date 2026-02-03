import { useOutletContext } from "react-router";
import style from "./HostVanPhotos.module.css";

export default function HostVanPhotos() {
  const { van } = useOutletContext();

  return (
    <div className={style["host_van_photo"]}>
      <img src={van.imageUrl} alt={`Photo of ${van.name}`} />
    </div>
  );
}
