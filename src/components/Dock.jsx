/* The dock: section links that magnify on hover, a dot under the section in
   view, then external links. Works with keyboard; magnification is CSS only. */
import { useEffect, useState } from "react";

export default function Dock({ items, links }) {
  const [active, setActive] = useState(items[0]?.id);
  useEffect(() => {
    if (typeof window === "undefined" || !("IntersectionObserver" in window)) return undefined;
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-40% 0px -55% 0px" },
    );
    items.forEach((i) => { const el = document.getElementById(i.id); if (el) observer.observe(el); });
    return () => observer.disconnect();
  }, [items]);

  return (
    <nav className="dock" aria-label="Dock">
      {items.map(({ id, label, icon: Icon }) => (
        <a key={id} href={`#${id}`} className={`dock-item ${active === id ? "is-active" : ""}`} aria-current={active === id ? "location" : undefined}>
          <span className="dock-icon"><Icon size={22} strokeWidth={1.8} aria-hidden="true" /></span>
          <span className="dock-label">{label}</span>
        </a>
      ))}
      {links.length > 0 && <span className="dock-sep" aria-hidden="true" />}
      {links.map(({ href, label, icon }) => (
        <a key={label} href={href} target="_blank" rel="noreferrer" className="dock-item dock-item--ext">
          <span className="dock-icon dock-icon--ext">{icon}</span>
          <span className="dock-label">{label}</span>
        </a>
      ))}
    </nav>
  );
}
