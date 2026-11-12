import { useState } from "react";

function Navbar({ page, go, count, theme, toggleTheme }) {
  const [open, setOpen] = useState(false);
  const link = (id, label) => (
    <button className={`nav-link ${page === id ? "active" : ""}`} onClick={() => { go(id); setOpen(false); }}>
      {label}{id === "my" && count > 0 && <span className="badge">{count}</span>}
    </button>
  );
  return (
    <header className="navbar">
      <div className="container nav-inner">
        <button className="brand" onClick={() => go("home")}>🎟️ Eventra</button>
        <button className="burger" aria-label="Toggle menu" onClick={() => setOpen(!open)}>{open ? "✕" : "☰"}</button>
        <nav className={`nav-links ${open ? "open" : ""}`}>
          {link("home", "Discover")}
          {link("stats", "Analytics")}
          {link("my", "My Events")}
          <button className="theme-btn" onClick={toggleTheme} aria-label="Toggle theme">{theme === "dark" ? "☀️" : "🌙"}</button>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
