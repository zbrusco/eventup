import { useOutletContext } from "react-router";
import style from "./HostEventPricing.module.css";

export default function HostEventPricing() {
  const { event } = useOutletContext();

  return (
    <p className={style["host_event_pricing"]}>
      <span>${parseFloat(event.price).toFixed(2)}</span>/day
    </p>
  );
}
