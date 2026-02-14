import { Link } from "react-router-dom";
import { events } from "../../../data/events";
import "./Events.css";

const sortedEvents = [...events].sort(
  (a, b) => new Date(b.date) - new Date(a.date)
);

const Events = () => {
  return (
    <section className="events-list container">
      {sortedEvents.map((event) => (
        <article key={event.id} className="event-item">
          <h2>
            <Link to={`/evenimente/${event.id}`}>{event.title}</Link>
          </h2>
          <span className="event-date">{event.date}</span>
          <p>{event.excerpt}</p>
        </article>
      ))}
    </section>
  );
};

export default Events;
