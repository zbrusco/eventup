import React from "react";
import { useNavigate } from "react-router-dom";
import style from "./HostEventCreate.module.css";
import { createEvent } from "../../../api";
import { useAuth } from "../../../contexts/AuthContext";

export default function HostEventCreate() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [eventFormData, setEventFormData] = React.useState({
    name: "",
    description: "",
    date: "",
    location: "",
    imageUrl: "",
    price: "",
    status: "active",
  });

  const [status, setStatus] = React.useState("idle");
  const [error, setError] = React.useState(null);

  function handleSubmit(e) {
    e.preventDefault();
    setStatus("submitting");

    const payload = {
      ...eventFormData,
      price: Number(eventFormData.price) || 0,
      hostId: user.$id,
    };

    createEvent(payload)
      .then((data) => {
        navigate("/host/events");
        setError(null);
      })
      .catch((error) => setError(error))
      .finally(() => setStatus("idle"));
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setEventFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  return (
    <div className={style.create_container}>
      <h1>Create a New Event</h1>
      {error?.message && (
        <h3 className={style.create_error} aria-live="assertive">
          {error.message}
        </h3>
      )}
      <form onSubmit={handleSubmit} className={style.create_form}>
        <input
          name="name"
          onChange={handleChange}
          type="text"
          placeholder="Event Name"
          value={eventFormData.name}
          required
        />
        <textarea
          name="description"
          onChange={handleChange}
          placeholder="Detailed Description"
          value={eventFormData.description}
          required
        />
        <input
          name="date"
          onChange={handleChange}
          type="date"
          placeholder="Event Date"
          value={eventFormData.date}
          required
        />
        <input
          name="location"
          onChange={handleChange}
          type="text"
          placeholder="Location"
          value={eventFormData.location}
          required
        />
        <input
          name="imageUrl"
          onChange={handleChange}
          type="url"
          placeholder="Image URL"
          value={eventFormData.imageUrl}
          required
        />
        <input
          name="price"
          onChange={handleChange}
          type="number"
          min="0"
          step="0.01"
          placeholder="Price (0 for free)"
          value={eventFormData.price}
        />
        <button
          disabled={status === "submitting"}
          className={status === "submitting" ? style.disabled : ""}
        >
          {status === "submitting" ? "Creating Event..." : "Create Event"}
        </button>
      </form>
    </div>
  );
}
