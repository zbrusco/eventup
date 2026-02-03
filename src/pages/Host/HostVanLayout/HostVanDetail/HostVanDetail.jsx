import style from "./HostVanDetail.module.css";
import React from "react";
import { useParams, useOutletContext } from "react-router-dom";

export default function HostVanDetail() {
  const { van } = useOutletContext();
  return van ? (
    <div className={style["host_van_detail_description"]}>
      <p>
        <span>Name:</span> {van.name}
      </p>
      <p>
        <span>Category: </span>
        {van.type.charAt(0).toUpperCase() + van.type.slice(1)}
      </p>
      <p>
        <span>Description:</span> {van.description}
      </p>
      <p>
        <span>Visibility:</span> {}
      </p>
    </div>
  ) : null;
}
