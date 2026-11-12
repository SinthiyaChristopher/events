import { useState } from "react";
import { CATEGORIES } from "../data/events";

function Footer({ go, setCategory, onSubscribe }) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const subscribe = (e) => {
    e.preventDefault();
    if (!/^\S+@\S+\.\S+$/.test(email)) return setError("Enter a valid email address.");
    setError("");
    onSubscribe(email);
    setEmail("");
  };
  const browse = (c) => { setCategory(c); go("home"); };

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <h4 className="footer-brand">🎟️ Eventra</h4>
            <p>Discover, register and manage the events you care about, from concerts to conferences across India.</p>
            <div className="socials">
              <a href="https://www.linkedin.com" target="_blank" rel="noreferrer" aria-label="LinkedIn">in</a>
              <a href="https://www.instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram">ig</a>
              <a href="https://www.youtube.com" target="_blank" rel="noreferrer" aria-label="YouTube">▶</a>
            </div>
          </div>

          <div>
            <h4>Quick links</h4>
            <ul className="footer-links">
              <li><button onClick={() => browse("All")}>Discover events</button></li>
              <li><button onClick={() => go("stats")}>Analytics</button></li>
              <li><button onClick={() => go("my")}>My Events</button></li>
            </ul>
          </div>

          <div>
            <h4>Categories</h4>
            <ul className="footer-links">
              {CATEGORIES.filter((c) => c !== "All").map((c) => (
                <li key={c}><button onClick={() => browse(c)}>{c}</button></li>
              ))}
            </ul>
          </div>

          <div>
            <h4>Stay updated</h4>
            <p>Get new events in your inbox.</p>
            <form className="newsletter" onSubmit={subscribe} noValidate>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" aria-label="Email address" />
              <button type="submit">Subscribe</button>
            </form>
            {error && <small className="error">{error}</small>}
            <ul className="contact">
              <li>✉️ support@eventra.in</li>
              <li>📞 +91 9876543210</li>
              <li>📍 Salem, India</li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Eventra · All rights reserved</span>
          <span className="footer-legal">Privacy Policy · Terms of Service · Help Centre</span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
