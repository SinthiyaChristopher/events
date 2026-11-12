import { useEffect, useMemo, useState } from "react";
import "./App.css";
import { EVENTS, SEED_REGISTRATIONS } from "./data/events";
import useLocalStorage from "./hooks/useLocalStorage";
import Navbar from "./components/Navbar";
import Toast from "./components/Toast";
import RegistrationModal from "./components/RegistrationModal";
import HomePage from "./pages/HomePage";
import DetailsPage from "./pages/DetailsPage";
import Footer from "./components/Footer";
import AnalyticsPage from "./pages/AnalyticsPage";
import MyEventsPage from "./pages/MyEventsPage";

export default function App() {
  const [page, setPage] = useState("home"); // home | details | my
  const [selectedId, setSelectedId] = useState(null);
  const [registerId, setRegisterId] = useState(null);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [registrations, setRegistrations] = useLocalStorage("eventra:registrations:v2", SEED_REGISTRATIONS);
  const [toast, setToast] = useState("");
  const [price, setPrice] = useState("all");
  const [sort, setSort] = useState("date");
  const [theme, setTheme] = useLocalStorage("eventra:theme", "dark");
  useEffect(() => { document.documentElement.setAttribute("data-theme", theme); }, [theme]);

  const registeredIds = useMemo(() => new Set(registrations.map((r) => r.eventId)), [registrations]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    const list = EVENTS.filter((e) =>
      (category === "All" || e.category === category) &&
      (price === "all" || (price === "free" ? e.price === 0 : e.price > 0)) &&
      (!q || [e.title, e.venue, e.city, e.category].some((f) => f.toLowerCase().includes(q)))
    );
    const by = { date: (a, b) => a.date.localeCompare(b.date), low: (a, b) => a.price - b.price, high: (a, b) => b.price - a.price };
    return [...list].sort(by[sort]);
  }, [search, category, price, sort]);

  const seatsLeft = (ev) => ev.seats - registrations.filter((r) => r.eventId === ev.id).reduce((s, r) => s + r.tickets, 0);

  const go = (p) => { setPage(p); window.scrollTo({ top: 0, behavior: "smooth" }); };
  const view = (id) => { setSelectedId(id); go("details"); };

  const handleRegister = (data) => {
    const ev = EVENTS.find((e) => e.id === registerId);
    const reg = { ...data, eventId: ev.id, ref: "EVT" + Math.random().toString(36).slice(2, 8).toUpperCase(), createdAt: Date.now() };
    setRegistrations([reg, ...registrations]);
    setRegisterId(null);
    setToast(`🎉 Registered for ${ev.title}`);
  };

  const cancel = (ref) => {
    setRegistrations(registrations.filter((r) => r.ref !== ref));
    setToast("Registration cancelled");
  };

  const selected = EVENTS.find((e) => e.id === selectedId);
  const registering = EVENTS.find((e) => e.id === registerId);

  return (
    <div className="app">
      <Navbar page={page} go={go} count={registrations.length} theme={theme} toggleTheme={() => setTheme(theme === "dark" ? "light" : "dark")} />

      {page === "home" && (
        <HomePage events={filtered} registeredIds={registeredIds} search={search} setSearch={setSearch}
          category={category} setCategory={setCategory} price={price} setPrice={setPrice} sort={sort} setSort={setSort} total={EVENTS.length} onView={view} onRegister={setRegisterId} />
      )}
      {page === "details" && selected && (
        <DetailsPage event={selected} seatsLeft={seatsLeft(selected)} registered={registeredIds.has(selected.id)}
          onBack={() => go("home")} onRegister={setRegisterId} />
      )}
      {page === "my" && (
        <MyEventsPage registrations={registrations} onView={view} onCancel={cancel} goHome={() => go("home")} />
      )}

      {page === "stats" && <AnalyticsPage registrations={registrations} />}

      <Footer go={go} setCategory={setCategory} onSubscribe={(em) => setToast(`📬 Subscribed: ${em}`)} />

      {registering && (
        <RegistrationModal event={registering} seatsLeft={seatsLeft(registering)}
          onClose={() => setRegisterId(null)} onSubmit={handleRegister} />
      )}
      <Toast message={toast} onClose={() => setToast("")} />
    </div>
  );
}
