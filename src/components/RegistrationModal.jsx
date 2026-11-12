import { useState } from "react";
import { CURRENCY } from "../data/events";
import { fmtDate } from "../utils/helpers";

function RegistrationModal({ event, seatsLeft, onClose, onSubmit }) {
  const [form, setForm] = useState({ name: "", email: "", phone: "", tickets: 1 });
  const [errors, setErrors] = useState({});

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const validate = () => {
    const er = {};
    if (form.name.trim().length < 2) er.name = "Please enter your full name.";
    if (!/^\S+@\S+\.\S+$/.test(form.email)) er.email = "Enter a valid email address.";
    if (!/^[0-9+\-\s]{7,15}$/.test(form.phone)) er.phone = "Enter a valid phone number.";
    if (form.tickets < 1 || form.tickets > Math.min(10, seatsLeft)) er.tickets = `Choose between 1 and ${Math.min(10, seatsLeft)} tickets.`;
    setErrors(er);
    return Object.keys(er).length === 0;
  };

  const submit = (e) => {
    e.preventDefault();
    if (validate()) onSubmit({ ...form, tickets: Number(form.tickets) });
  };

  const total = event.price * (Number(form.tickets) || 0);

  return (
    <div className="overlay" onClick={onClose}>
      <form className="modal" onClick={(e) => e.stopPropagation()} onSubmit={submit} noValidate>
        <div className="modal-head">
          <div>
            <h2>Register for event</h2>
            <p className="meta">{event.title} · {fmtDate(event.date)}</p>
          </div>
          <button type="button" className="icon-btn" onClick={onClose}>✕</button>
        </div>

        <label>Full name
          <input value={form.name} onChange={set("name")} placeholder="Jane Doe" />
          {errors.name && <small className="error">{errors.name}</small>}
        </label>
        <label>Email
          <input type="email" value={form.email} onChange={set("email")} placeholder="jane@example.com" />
          {errors.email && <small className="error">{errors.email}</small>}
        </label>
        <label>Phone
          <input value={form.phone} onChange={set("phone")} placeholder="+91 98765 43210" />
          {errors.phone && <small className="error">{errors.phone}</small>}
        </label>
        <label>Number of tickets
          <input type="number" min="1" max="10" value={form.tickets} onChange={set("tickets")} />
          {errors.tickets && <small className="error">{errors.tickets}</small>}
        </label>

        <div className="total"><span>Total</span><strong>{total === 0 ? "Free" : `${CURRENCY}${total.toLocaleString("en-IN")}`}</strong></div>
        <div className="modal-actions">
          <button type="button" className="btn btn-outline" onClick={onClose}>Cancel</button>
          <button type="submit" className="btn btn-primary">Confirm registration</button>
        </div>
      </form>
    </div>
  );
}

export default RegistrationModal;
