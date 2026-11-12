import EventArt from "../components/EventArt";
import { fmtDate, priceLabel } from "../utils/helpers";

function DetailsPage({ event, seatsLeft, registered, onBack, onRegister }) {
  return (
    <main className="container section">
      <button className="btn btn-ghost" onClick={onBack}>← Back to events</button>
      <div className="details">
        <div className="details-banner" style={{ background: event.gradient }}>
          <EventArt event={event} />
          <div className="tag">{event.category}</div>
        </div>
        <div className="details-grid">
          <div>
            <h1>{event.title}</h1>
            <p className="meta">Organized by <strong>{event.organizer}</strong></p>
            <h3>About this event</h3>
            <p className="desc">{event.description}</p>
            <h3>Agenda</h3>
            <ul className="agenda">{event.agenda.map((a) => <li key={a}>{a}</li>)}</ul>
          </div>
          <aside className="side-card">
            <div className="side-price">{priceLabel(event.price)}</div>
            <p>📅 {fmtDate(event.date)}</p>
            <p>🕒 {event.time}</p>
            <p>📍 {event.venue}, {event.city}</p>
            <p>🎫 {seatsLeft} seats left</p>
            {registered
              ? <button className="btn btn-success block" disabled>✓ You're registered</button>
              : seatsLeft === 0
                ? <button className="btn btn-outline block" disabled>Sold out</button>
                : <button className="btn btn-primary block" onClick={() => onRegister(event.id)}>Register now</button>}
          </aside>
        </div>
      </div>
    </main>
  );
}

export default DetailsPage;
