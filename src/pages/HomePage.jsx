import Hero from "../components/Hero";
import CategoryFilter from "../components/CategoryFilter";
import EventCard from "../components/EventCard";

function HomePage({ events, registeredIds, search, setSearch, category, setCategory, price, setPrice, sort, setSort, total, onView, onRegister }) {
  return (
    <>
      <Hero search={search} setSearch={setSearch} total={total} />
      <main className="container section">
        <div className="section-head">
          <h2>Upcoming events</h2>
          <span className="meta">{events.length} found</span>
        </div>
        <div className="toolbar">
          <CategoryFilter active={category} setActive={setCategory} />
          <div className="selects">
            <select value={price} onChange={(e) => setPrice(e.target.value)} aria-label="Price filter">
              <option value="all">Any price</option>
              <option value="free">Free only</option>
              <option value="paid">Paid only</option>
            </select>
            <select value={sort} onChange={(e) => setSort(e.target.value)} aria-label="Sort events">
              <option value="date">Soonest first</option>
              <option value="low">Price: low to high</option>
              <option value="high">Price: high to low</option>
            </select>
          </div>
        </div>
        {events.length === 0 ? (
          <div className="empty">
            <div>🔎</div>
            <h3>No events match your search</h3>
            <button className="btn btn-outline" onClick={() => { setSearch(""); setCategory("All"); }}>Reset filters</button>
          </div>
        ) : (
          <div className="grid">
            {events.map((ev) => (
              <EventCard key={ev.id} event={ev} registered={registeredIds.has(ev.id)} onView={onView} onRegister={onRegister} />
            ))}
          </div>
        )}
      </main>
    </>
  );
}

export default HomePage;
