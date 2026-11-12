import { CATEGORIES } from "../data/events";

function CategoryFilter({ active, setActive }) {
  return (
    <div className="chips">
      {CATEGORIES.map((c) => (
        <button key={c} className={`chip ${active === c ? "active" : ""}`} onClick={() => setActive(c)}>{c}</button>
      ))}
    </div>
  );
}

export default CategoryFilter;
