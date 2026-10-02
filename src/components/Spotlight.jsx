/* Spotlight: ⌘K / Ctrl+K (or the menu bar button) to jump to a section,
   open a project or get in touch, all from the keyboard. */
import { useEffect, useMemo, useRef, useState } from "react";
import { CornerDownLeft, Search } from "lucide-react";
import { useI18n } from "../i18n.jsx";

export default function Spotlight({ open, onClose, items }) {
  const { t: { spotlight: s } } = useI18n();
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const input = useRef(null);
  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return (q ? items.filter((i) => `${i.label} ${i.hint || ""}`.toLowerCase().includes(q)) : items).slice(0, 8);
  }, [query, items]);

  useEffect(() => {
    if (!open) return undefined;
    const previous = document.activeElement;
    setQuery(""); setActive(0);
    requestAnimationFrame(() => input.current?.focus());
    return () => previous?.focus?.();
  }, [open]);
  useEffect(() => { setActive(0); }, [query]);

  if (!open) return null;
  const run = (item) => { onClose(); item.run(); };
  const keys = (e) => {
    if (e.key === "Escape") { e.preventDefault(); onClose(); }
    else if (e.key === "ArrowDown") { e.preventDefault(); setActive((a) => Math.min(a + 1, results.length - 1)); }
    else if (e.key === "ArrowUp") { e.preventDefault(); setActive((a) => Math.max(a - 1, 0)); }
    else if (e.key === "Enter" && results[active]) { e.preventDefault(); run(results[active]); }
  };

  return (
    <div className="spotlight-backdrop" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div className="spotlight" role="dialog" aria-modal="true" aria-label={s.label}>
        <div className="spotlight-field">
          <Search size={18} aria-hidden="true" />
          <input
            ref={input}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={keys}
            placeholder={s.placeholder}
            aria-label={s.label}
            role="combobox"
            aria-expanded="true"
            aria-controls="spotlight-results"
            aria-activedescendant={results[active] ? `spot-${active}` : undefined}
          />
        </div>
        <ul id="spotlight-results" className="spotlight-results" role="listbox" aria-label={s.results}>
          {results.map((item, i) => {
            const Icon = item.icon;
            return (
              <li key={item.label} id={`spot-${i}`} role="option" aria-selected={i === active} className={i === active ? "is-active" : ""}
                onMouseEnter={() => setActive(i)} onClick={() => run(item)}>
                {Icon && <Icon size={17} aria-hidden="true" />}
                <span className="spot-label" dir={item.rtl ? "rtl" : undefined}>{item.label}</span>
                {item.hint && <span className="spot-hint">{item.hint}</span>}
                {i === active && <CornerDownLeft size={15} aria-hidden="true" className="spot-enter" />}
              </li>
            );
          })}
          {!results.length && <li className="spot-empty">{s.noMatch}</li>}
        </ul>
      </div>
    </div>
  );
}
