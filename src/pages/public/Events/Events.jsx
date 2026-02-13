import { useEffect, useState } from "react";
import { getEvents } from "../../../services/eventService";
import { Link } from "react-router-dom";

const Events = () => {
  const [events, setEvents] = useState([]);

  const loadEvents = async () => {
    const data = await getEvents();
    setEvents(data);
  };

  useEffect(() => {
    loadEvents();
  }, []);

  return (
    <div style={{ padding: "40px" }}>
      <h1>Evenimente</h1>

      {events.length === 0 ? (
        <p>Nu există evenimente momentan.</p>
      ) : (
        <div style={{ marginTop: "20px" }}>
          {events.map((event) => (
            <div
              key={event.id}
              style={{
                border: "1px solid #e5e7eb",
                padding: "20px",
                marginBottom: "20px",
                borderRadius: "8px",
              }}
            >
              <h3>{event.title}</h3>
              <p>{event.date}</p>
              <p>{event.description}</p>

              <Link to={`/evenimente/${event.id}`}>
                Vezi detalii
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Events;