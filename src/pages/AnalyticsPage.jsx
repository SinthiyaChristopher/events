import { EVENTS, CURRENCY } from "../data/events";
import { BarChart, DonutChart, ColumnChart } from "../components/Charts";

const group = (arr, keyFn, valFn = () => 1) => {
  const m = {};
  arr.forEach((x) => { const k = keyFn(x); m[k] = (m[k] || 0) + valFn(x); });
  return Object.entries(m).map(([label, value]) => ({ label, value }));
};

function AnalyticsPage({ registrations }) {
  const paid = EVENTS.filter((e) => e.price > 0);
  const avg = Math.round(paid.reduce((s, e) => s + e.price, 0) / paid.length);
  const booked = registrations.reduce((s, r) => s + r.tickets, 0);
  const seats = EVENTS.reduce((s, e) => s + e.seats, 0);
  const sorted = [...EVENTS].sort((a, b) => a.date.localeCompare(b.date));

  const byCategory = group(EVENTS, (e) => e.category);
  const byMonth = group(sorted, (e) => new Date(e.date + "T00:00:00").toLocaleDateString("en-US", { month: "short", year: "2-digit" }));
  const byCity = group(EVENTS, (e) => e.city, (e) => e.seats).sort((a, b) => b.value - a.value);
  const prices = [...EVENTS].sort((a, b) => b.price - a.price).map((e) => ({ label: e.title.split(" ").slice(0, 2).join(" "), value: e.price }));

  const kpis = [
    ["Upcoming events", EVENTS.length],
    ["Total seats", seats.toLocaleString("en-IN")],
    ["Avg. ticket price", `${CURRENCY}${avg.toLocaleString("en-IN")}`],
    ["Your tickets booked", booked],
  ];

  return (
    <main className="container section">
      <div className="section-head"><h2>Analytics</h2><span className="meta">Live overview of all events</span></div>
      <div className="kpi-grid">
        {kpis.map(([label, value]) => (
          <div className="stat-card" key={label}><strong>{value}</strong><span className="meta">{label}</span></div>
        ))}
      </div>
      <div className="charts">
        <div className="chart-card"><h3>Events by category</h3><span className="meta">Share of upcoming events</span><DonutChart data={byCategory} center="events" /></div>
        <div className="chart-card"><h3>Events per month</h3><span className="meta">What's coming up</span><ColumnChart data={byMonth} /></div>
        <div className="chart-card"><h3>Ticket price by event</h3><span className="meta">Highest to lowest</span><BarChart data={prices} format={(v) => (v === 0 ? "Free" : `${CURRENCY}${v.toLocaleString("en-IN")}`)} /></div>
        <div className="chart-card"><h3>Seat capacity by city</h3><span className="meta">Total seats available</span><BarChart data={byCity} format={(v) => v.toLocaleString("en-IN")} /></div>
      </div>
    </main>
  );
}

export default AnalyticsPage;
