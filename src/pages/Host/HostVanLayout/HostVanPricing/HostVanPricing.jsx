import { useOutletContext } from "react-router";
import style from "./HostVanPricing.module.css";

export default function HostVanPricing() {
  const { van } = useOutletContext();

  return (
    <p className={style["host_van_pricing"]}>
      <span>${parseFloat(van.price).toFixed(2)}</span>/day
    </p>
  );
}
