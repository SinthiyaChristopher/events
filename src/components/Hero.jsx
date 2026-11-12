function Hero({ search, setSearch, total }) {
  return (
    <section className="hero">
      <div className="container">
        <span className="eyebrow">Events · Workshops · Festivals</span>
        <h1>Discover events that <span>move you</span></h1>
        <p>Browse curated concerts, conferences and meetups, then register in seconds.</p>
        <div className="search-box">
          <span>🔍</span>
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search by event, venue or city…" />
          {search && <button className="clear" onClick={() => setSearch("")}>✕</button>}
        </div>
        <div className="stats">
          <div className="stat"><strong>{total}+</strong><span>Upcoming events</span></div>
          <div className="stat"><strong>6</strong><span>Categories</span></div>
          <div className="stat"><strong>1-click</strong><span>Registration</span></div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
