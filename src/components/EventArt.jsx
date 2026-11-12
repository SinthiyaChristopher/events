import { useState } from "react";

// Illustrated banner per category. If an event has an `image` URL it is used instead
// (falls back to the illustration when the image fails to load).
const eq = [30, 55, 40, 75, 50, 90, 60, 80, 45, 70, 35, 60, 40, 50, 30];
const bars = [40, 70, 55, 100, 130, 160];

const SCENES = {
  Music: (
    <g fill="#fff">
      <polygon points="90,0 130,0 190,170 60,170" opacity=".12" />
      <polygon points="270,0 310,0 340,170 210,170" opacity=".12" />
      {eq.map((h, i) => <rect key={i} x={60 + i * 21} y={150 - h} width="12" height={h} rx="4" opacity=".6" />)}
      <rect x="40" y="165" width="320" height="14" rx="5" fill="#0f172a" opacity=".45" />
      {Array.from({ length: 11 }).map((_, i) => <circle key={i} cx={20 + i * 36} cy={214 - (i % 3) * 6} r="17" fill="#0f172a" opacity=".5" />)}
    </g>
  ),
  Tech: (
    <g fill="#fff">
      <rect x="70" y="30" width="260" height="150" rx="12" fill="#0f172a" opacity=".55" />
      {[0, 1, 2].map((i) => <circle key={i} cx={90 + i * 16} cy="48" r="4.5" opacity=".7" />)}
      {[[120, 0], [170, 20], [90, 20], [150, 0], [110, 20]].map(([w, x], i) => <rect key={i} x={92 + x} y={72 + i * 20} width={w} height="8" rx="4" opacity=".6" />)}
      <circle cx="320" cy="170" r="30" opacity=".15" />
      <circle cx="80" cy="190" r="22" opacity=".12" />
    </g>
  ),
  Business: (
    <g fill="#fff">
      {bars.map((h, i) => <rect key={i} x={60 + i * 50} y={195 - h} width="32" height={h} rx="5" opacity=".35" />)}
      <polyline points="76,140 126,115 176,125 226,85 276,60 326,30" stroke="#fff" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity=".9" />
      <circle cx="326" cy="30" r="8" />
    </g>
  ),
  Art: (
    <g fill="#fff">
      <circle cx="140" cy="110" r="72" opacity=".25" />
      <circle cx="225" cy="90" r="62" opacity=".2" />
      <circle cx="275" cy="135" r="48" opacity=".25" />
      <path d="M50 175 Q150 50 350 150" stroke="#fff" strokeWidth="7" strokeLinecap="round" fill="none" opacity=".75" />
      <rect x="30" y="25" width="340" height="170" rx="10" fill="none" stroke="#fff" strokeWidth="3" opacity=".4" />
    </g>
  ),
  Sports: (
    <g fill="#fff">
      <circle cx="320" cy="55" r="34" opacity=".35" />
      {[0, 18, 36].map((o) => <path key={o} d={`M-20 ${200 + o} Q200 ${90 + o} 420 ${200 + o}`} stroke="#fff" strokeWidth="4" fill="none" opacity=".45" />)}
      <circle cx="200" cy="100" r="10" />
      <path d="M200 115 L190 150 L168 172 M190 150 L216 166 M198 125 L174 137 M198 125 L226 118" stroke="#fff" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </g>
  ),
  Food: (
    <g fill="#fff">
      {Array.from({ length: 8 }).map((_, i) => <rect key={i} x={50 + i * 37.5} y="25" width="37.5" height="48" opacity={i % 2 ? 0.35 : 0.8} />)}
      <path d="M130 135 h140 a70 55 0 0 1 -140 0 z" opacity=".85" />
      {[165, 200, 235].map((x) => <path key={x} d={`M${x} 122 q-10 -18 0 -32 q10 -14 0 -28`} stroke="#fff" strokeWidth="5" strokeLinecap="round" fill="none" opacity=".6" />)}
    </g>
  ),
};

function EventArt({ event }) {
  const [bad, setBad] = useState(false);
  if (event.image && !bad) {
    return <img className="art" src={event.image} alt={event.title} loading="lazy" onError={() => setBad(true)} />;
  }
  const [c1, c2] = event.gradient.match(/#[0-9a-f]{6}/gi);
  return (
    <svg className="art" viewBox="0 0 400 220" preserveAspectRatio="xMidYMid slice" role="img" aria-label={event.title}>
      <defs>
        <linearGradient id={`g${event.id}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={c1} /><stop offset="1" stopColor={c2} />
        </linearGradient>
      </defs>
      <rect width="400" height="220" fill={`url(#g${event.id})`} />
      {SCENES[event.category] || SCENES.Music}
    </svg>
  );
}

export default EventArt;
