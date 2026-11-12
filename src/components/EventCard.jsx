import EventArt from "./EventArt";
import { fmtDate, priceLabel } from "../utils/helpers";

function EventCard({ event, registered, onView, onRegister }) {
  return (
    <article className="card">
      <div className="banner" style={{ background: event.gradient }} onClick={() => onView(event.id)}>
        <EventArt event={event} />
        <span className="tag">{event.category}</span>
        <span className="price-pill">{priceLabel(event.price)}</span>
      </div>
      <div className="card-body">
        <h3 onClick={() => onView(event.id)}>{event.title}</h3>
        <p className="meta">📅 {fmtDate(event.date)} · {event.time}</p>
        <p className="meta">📍 {event.venue}, {event.city}</p>
        <div className="card-actions">
          <button className="btn btn-outline" onClick={() => onView(event.id)}>Details</button>
          {registered
            ? <button className="btn btn-success" disabled>✓ Registered</button>
            : <button className="btn btn-primary" onClick={() => onRegister(event.id)}>Register</button>}
        </div>
      </div>
    </article>
  );
}

export default EventCard;
