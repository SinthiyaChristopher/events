import { CURRENCY } from "../data/events";

export const fmtDate = (d) =>
  new Date(d + "T00:00:00").toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric", year: "numeric" });
export const priceLabel = (p) => (p === 0 ? "Free" : `${CURRENCY}${p.toLocaleString("en-IN")}`);
