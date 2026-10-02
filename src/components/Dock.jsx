/* The dock: section links that magnify on hover (CSS only), the section in
   view highlighted, then external links. Works with the keyboard. */
import { useEffect, useState } from "react";

export default function Dock({ items, links }) {
  const [active, setActive] = useState(items[0]?.id);
  useEffect(() => {
    // The active section is the last one whose top has passed a third of the screen.
    let frame = 0;
    const spy = () => {
      frame = 0;
      const line = window.innerHeight / 3;
      let current = items[0]?.id;
      for (const { id } of items) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= line) current = id;
      }
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) current = items.at(-1)?.id;
      setActive(current);
    };
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(spy); };
    spy();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => { cancelAnimationFrame(frame); window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onScroll); };
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
