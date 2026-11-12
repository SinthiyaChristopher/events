export const PALETTE = ["#6366f1", "#ec4899", "#14b8a6", "#f59e0b", "#0ea5e9", "#22c55e", "#a855f7"];

export function BarChart({ data, format = (v) => v }) {
  const max = Math.max(...data.map((d) => d.value), 1);
  return (
    <div className="bars">
      {data.map((d, i) => (
        <div className="bar-row" key={d.label}>
          <span className="bar-label" title={d.label}>{d.label}</span>
          <div className="bar-track">
            <div className="bar-fill" style={{ width: `${(d.value / max) * 100}%`, background: PALETTE[i % PALETTE.length], animationDelay: `${i * 70}ms` }} />
          </div>
          <span className="bar-value">{format(d.value)}</span>
        </div>
      ))}
    </div>
  );
}

export function DonutChart({ data, center }) {
  const total = data.reduce((s, d) => s + d.value, 0) || 1;
  const R = 54, C = 2 * Math.PI * R;
  let offset = 0;
  return (
    <div className="donut-wrap">
      <svg viewBox="0 0 140 140" className="donut">
        <circle cx="70" cy="70" r={R} fill="none" stroke="var(--soft)" strokeWidth="18" />
        {data.map((d, i) => {
          const len = (d.value / total) * C;
          const el = (
            <circle key={d.label} cx="70" cy="70" r={R} fill="none" stroke={PALETTE[i % PALETTE.length]} strokeWidth="18"
              strokeDasharray={`${len} ${C - len}`} strokeDashoffset={-offset} transform="rotate(-90 70 70)" />
          );
          offset += len;
          return el;
        })}
        <text x="70" y="70" textAnchor="middle" className="donut-num">{total}</text>
        <text x="70" y="88" textAnchor="middle" className="donut-sub">{center}</text>
      </svg>
      <ul className="legend">
        {data.map((d, i) => (
          <li key={d.label}><i style={{ background: PALETTE[i % PALETTE.length] }} />{d.label}<b>{d.value}</b></li>
        ))}
      </ul>
    </div>
  );
}

export function ColumnChart({ data }) {
  const max = Math.max(...data.map((d) => d.value), 1);
  return (
    <div className="cols">
      {data.map((d, i) => (
        <div className="col" key={d.label}>
          <span className="col-val">{d.value}</span>
          <div className="col-wrap">
            <div className="col-bar" style={{ height: `${(d.value / max) * 100}%`, animationDelay: `${i * 90}ms` }} />
          </div>
          <span className="col-label">{d.label}</span>
        </div>
      ))}
    </div>
  );
}
