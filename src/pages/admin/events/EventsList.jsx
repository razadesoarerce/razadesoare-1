import { useEffect, useState } from "react";
import { getEvents, deleteEvent } from "../../../services/eventService";
import { Link } from "react-router-dom";

const EventsList = () => {
  const [events, setEvents] = useState([]);

  const loadEvents = async () => {
    const data = await getEvents();
    setEvents(data);
  };

  const handleDelete = async (id) => {
    await deleteEvent(id);
    loadEvents();
  };

  useEffect(() => {
    loadEvents();
  }, []);

  return (
    <div>
      <h1>Evenimente</h1>

      <Link to="/admin/events/create">
        <button style={{ marginBottom: "20px" }}>Adaugă Eveniment</button>
      </Link>

      {events.length === 0 ? (
        <p>Nu există evenimente.</p>
      ) : (
        <ul>
          {events.map((event) => (
            <li key={event.id} style={{ marginBottom: "15px" }}>
              <strong>{event.title}</strong> - {event.date}
              <button
                onClick={() => handleDelete(event.id)}
                style={{ marginLeft: "10px" }}
              >
                Șterge
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default EventsList;