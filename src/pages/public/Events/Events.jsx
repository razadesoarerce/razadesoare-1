import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getEvents } from "../../../services/eventService";
import { getExcerpt } from "../../../utils/excerpt";
import "./Events.css";

const formatDate = (d) => {
  if (!d) return "";
  const date = d instanceof Date ? d : new Date(d);
  return date.toLocaleDateString("ro-RO", { day: "numeric", month: "long", year: "numeric" });
};

const Events = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getEvents()
      .then(setEvents)
      .catch(() => setEvents([]))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <section className="events-list container"><p>Se încarcă…</p></section>;

  return (
    <section className="events-list container">
      {events.length === 0 ? (
        <p>Nu există evenimente.</p>
      ) : (
        events.map((event) => (
          <article key={event.id} className="event-item">
            <h2>
              <Link to={`/evenimente/${event.id}`}>{event.title}</Link>
            </h2>
            <span className="event-date">{formatDate(event.createdAt)}</span>
            <p className="event-excerpt">{getExcerpt(event.content, 120)}</p>
            <Link to={`/evenimente/${event.id}`}>Citește mai mult</Link>
          </article>
        ))
      )}
    </section>
  );
};

export default Events;
