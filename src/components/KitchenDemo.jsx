/* A working miniature of the menuPilot kitchen screen: build an order for a
   table, send it, and watch the ticket move new → preparing → ready.
   Status is derived from the time it was sent, so there are no stacked
   timers to clean up; one clock ticks only while a ticket is still cooking. */
import { useEffect, useMemo, useState } from "react";
import { useI18n } from "../i18n.jsx";

const MENU = [
  { id: "falafel", price: 4 },
  { id: "shakshuka", price: 6 },
  { id: "lemonade", price: 3 },
];
const COLUMNS = ["new", "preparing", "ready"];
const PREP_STARTS = 1500; // ms after sending
const READY_AT = 4500;
const MAX_OPEN = 4;

const statusAt = (elapsed) => (elapsed < PREP_STARTS ? "new" : elapsed < READY_AT ? "preparing" : "ready");
const clock = (ms) => {
  const s = Math.floor(ms / 1000);
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
};

export default function KitchenDemo() {
  const { t: { kitchen: k } } = useI18n();
  const [cart, setCart] = useState({ falafel: 1, lemonade: 1 });
  const [tickets, setTickets] = useState([]);
  const [nextNo, setNextNo] = useState(214);
  const [now, setNow] = useState(() => Date.now());
  const [announcement, setAnnouncement] = useState("");

  const cooking = tickets.some((t) => now - t.sentAt < READY_AT);
  useEffect(() => {
    if (!cooking) return undefined;
    const id = setInterval(() => setNow(Date.now()), 250);
    return () => clearInterval(id);
  }, [cooking]);

  const withStatus = useMemo(() => tickets.map((t) => ({ ...t, status: statusAt(now - t.sentAt) })), [tickets, now]);
  const readyCount = withStatus.filter((t) => t.status === "ready").length;
  useEffect(() => {
    const ready = withStatus.filter((t) => t.status === "ready").at(-1);
    if (ready) setAnnouncement(k.ready(ready.no));
  }, [readyCount]); // eslint-disable-line react-hooks/exhaustive-deps

  const lines = MENU.filter((m) => cart[m.id] > 0).map((m) => ({ ...m, qty: cart[m.id] }));
  const dish = (id) => k.dishes[id];
  const total = lines.reduce((sum, l) => sum + l.price * l.qty, 0);
  const full = tickets.length >= MAX_OPEN;

  const change = (id, delta) => setCart((c) => ({ ...c, [id]: Math.max(0, Math.min(9, (c[id] || 0) + delta)) }));

  function send() {
    if (!lines.length || full) return;
    const sentAt = Date.now();
    setTickets((list) => [...list, { no: nextNo, table: 4, items: lines.map(({ id, qty }) => ({ id, qty })), sentAt }]);
    setAnnouncement(k.sent(nextNo));
    setNextNo((n) => n + 1);
    setNow(sentAt);
    setCart({});
  }
  const serve = (no) => setTickets((list) => list.filter((t) => t.no !== no));

  return (
    <section className="kds" aria-label={k.aria}>
      <div className="kds-order">
        <div className="kds-order-head">
          <h2 className="kds-title">{k.table(4)}</h2>
          <span className="kds-hint">{k.hint}</span>
        </div>
        <ul className="kds-menu">
          {MENU.map((m) => (
            <li key={m.id} className="kds-dish">
              <span className="kds-dish-name">{dish(m.id)}</span>
              <span className="kds-price">€{m.price}</span>
              <span className="kds-stepper">
                <button type="button" onClick={() => change(m.id, -1)} disabled={!cart[m.id]} aria-label={k.remove(dish(m.id))}>−</button>
                <output aria-label={k.qty(dish(m.id))}>{cart[m.id] || 0}</output>
                <button type="button" onClick={() => change(m.id, 1)} aria-label={k.add(dish(m.id))}>+</button>
              </span>
            </li>
          ))}
        </ul>
        <button type="button" className="kds-send" onClick={send} disabled={!lines.length || full}>
          {full ? k.full : lines.length ? k.send(total) : k.addFirst}
        </button>
      </div>

      <div className="kds-board">
        {COLUMNS.map((col) => {
          const inCol = withStatus.filter((t) => t.status === col);
          return (
            <div key={col} className={`kds-col kds-col--${col}`}>
              <h3 className="kds-col-head">{k.columns[col]}<span className="kds-count">{inCol.length}</span></h3>
              <ol className="kds-tickets">
                {inCol.map((t) => (
                  <li key={t.no} className={`ticket ticket--${t.status}`}>
                    <div className="ticket-head">
                      <b className="ticket-no">#{t.no}</b>
                      <span className="ticket-time">{clock(now - t.sentAt)}</span>
                    </div>
                    <p className="ticket-table">{k.table(t.table)}</p>
                    <ul className="ticket-items">
                      {t.items.map((i) => <li key={i.id}><span className="ticket-qty">{i.qty}×</span> {dish(i.id)}</li>)}
                    </ul>
                    {t.status === "ready" && <button type="button" className="ticket-serve" onClick={() => serve(t.no)}>{k.serve}</button>}
                  </li>
                ))}
              </ol>
              {!inCol.length && <p className="kds-empty">{col === "new" ? k.emptyNew : k.empty}</p>}
            </div>
          );
        })}
      </div>
      <p className="sr-only" aria-live="polite">{announcement}</p>
    </section>
  );
}
