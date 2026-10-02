/* The top menu bar: name, section menus, Spotlight, availability and the time in Gaza. */
import { useEffect, useState } from "react";
import { Search } from "lucide-react";

const gazaTime = () => new Intl.DateTimeFormat("en-GB", { timeZone: "Asia/Gaza", hour: "2-digit", minute: "2-digit" }).format(new Date());
const isMac = () => typeof navigator !== "undefined" && /Mac|iPhone|iPad/.test(navigator.platform || navigator.userAgent);

export default function MenuBar({ name, items, availability, onSearch }) {
  const [time, setTime] = useState(gazaTime);
  useEffect(() => {
    const id = setInterval(() => setTime(gazaTime()), 30000);
    return () => clearInterval(id);
  }, []);

  return (
    <header className="menubar">
      <a href="#top" className="menubar-brand"><span className="menubar-logo" aria-hidden="true">AK</span>{name}</a>
      <nav className="menubar-menu" aria-label="Sections">
        {items.map((i) => <a key={i.id} href={`#${i.id}`}>{i.label}</a>)}
      </nav>
      <div className="menubar-status">
        <button type="button" className="menubar-search" onClick={onSearch} aria-label="Search the portfolio" aria-keyshortcuts="Meta+K Control+K">
          <Search size={14} aria-hidden="true" /><kbd>{isMac() ? "⌘K" : "Ctrl K"}</kbd>
        </button>
        <span className="menubar-available"><span className="dot" aria-hidden="true" />{availability}</span>
        <span className="menubar-clock" title="Local time in Gaza">Gaza <time>{time}</time></span>
      </div>
    </header>
  );
}
