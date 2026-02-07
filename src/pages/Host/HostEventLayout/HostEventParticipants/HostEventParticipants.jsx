import { useOutletContext } from "react-router";
import style from "./HostEventParticipants.module.css";
import { getEventParticipants } from "../../../../api";
import React from "react";

export default function HostEventParticipants() {
  const [loading, setLoading] = React.useState(false);
  const [participants, setParticipants] = React.useState(false);
  const [error, setError] = React.useState(null);
  const { event } = useOutletContext();

  React.useEffect(() => {
    async function loadParticipants() {
      setLoading(true);
      try {
        const data = await getEventParticipants(event.$id);
        setParticipants(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }
    loadParticipants();
  }, []);

  if (loading || !participants) {
    return <h1 aria-live="polite">Loading...</h1>;
  }
  if (error) {
    return <h1 aria-live="assertive">There was an error: {error.message}</h1>;
  }

  return (
    <div className={style["host_participants"]}>
      {participants.map((p) => (
        <div className={style["host_participant"]} key={p.$id}>
          <img src={p.userAvatar} alt={`Avatar of ${p.userName}`} />
          <p>{p.userName}</p>
        </div>
      ))}
    </div>
  );
}
