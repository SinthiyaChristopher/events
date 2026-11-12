import EventArt from "../components/EventArt";
import { EVENTS, CURRENCY } from "../data/events";
import { fmtDate } from "../utils/helpers";

function MyEventsPage({ registrations, onView, onCancel, goHome }) {
  return (
    <main className="container section">
      <div className="section-head"><h2>My Events</h2><span className="meta">{registrations.length} registered</span></div>
      {registrations.length > 0 && (
        <div className="stats-row">
          <div className="stat-card"><strong>{registrations.length}</strong><span className="meta">Events registered</span></div>
          <div className="stat-card"><strong>{registrations.reduce((s, r) => s + r.tickets, 0)}</strong><span className="meta">Total tickets</span></div>
          <div className="stat-card"><strong>{CURRENCY}{registrations.reduce((s, r) => s + r.tickets * EVENTS.find((e) => e.id === r.eventId).price, 0).toLocaleString("en-IN")}</strong><span className="meta">Total paid</span></div>
        </div>
      )}
      {registrations.length === 0 ? (
        <div className="empty">
          <div>🎟️</div>
          <h3>You haven't registered for any events yet</h3>
          <button className="btn btn-primary" onClick={goHome}>Browse events</button>
        </div>
      ) : (
        <div className="list">
          {registrations.map((r) => {
            const ev = EVENTS.find((e) => e.id === r.eventId);
            return (
              <div className="ticket" key={r.ref}>
                <div className="ticket-banner" style={{ background: ev.gradient }}><EventArt event={ev} /></div>
                <div className="ticket-info">
                  <h3>{ev.title}</h3>
                  <p className="meta">📅 {fmtDate(ev.date)} · {ev.time}</p>
                  <p className="meta">📍 {ev.venue}, {ev.city}</p>
                  <p className="meta">🎫 {r.tickets} ticket(s) · Ref <strong>{r.ref}</strong></p>
                </div>
                <div className="ticket-actions">
                  <button className="btn btn-outline" onClick={() => onView(ev.id)}>View</button>
                  <button className="btn btn-danger" onClick={() => onCancel(r.ref)}>Cancel</button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </main>
  );
}

export default MyEventsPage;
