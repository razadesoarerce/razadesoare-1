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
        events.map((event) => {
          const excerpt = getExcerpt(event.content, 120);
          const coverUrl = event.coverImageUrl || event.coverImage || event.imageUrl;
          return (
            <div key={event.id} className="event-card">
              {coverUrl && (
                <div className="event-card-image-wrapper">
                  <img src={coverUrl} alt={event.title} />
                </div>
              )}
              <div className="event-card-content">
                <h2>{event.title}</h2>
                <span className="event-date">{formatDate(event.createdAt)}</span>
                <p>{excerpt}</p>
                <Link to={`/evenimente/${event.id}`} className="event-button">
                  Citește mai mult
                </Link>
              </div>
            </div>
          );
        })
      )}
    </section>
  );
};

export default Events;
