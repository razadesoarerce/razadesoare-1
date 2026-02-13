import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createEvent } from "../../../services/eventService";

const CreateEvent = () => {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    await createEvent({
      title,
      description,
      date,
    });

    navigate("/admin/events");
  };

  return (
    <div>
      <h1>Creează Eveniment</h1>

      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "15px", maxWidth: "400px" }}>
        <input
          type="text"
          placeholder="Titlu"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <textarea
          placeholder="Descriere"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />

        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />

        <button type="submit">Salvează</button>
      </form>
    </div>
  );
};

export default CreateEvent;