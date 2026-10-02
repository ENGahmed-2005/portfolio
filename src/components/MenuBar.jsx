/* The top menu bar: name, section menus, Spotlight, availability and the time in Gaza. */
import { useEffect, useState } from "react";
import { Moon, Search, Sun } from "lucide-react";
import { useI18n } from "../i18n.jsx";

const gazaTime = () => new Intl.DateTimeFormat("en-GB", { timeZone: "Asia/Gaza", hour: "2-digit", minute: "2-digit" }).format(new Date());
const isMac = () => typeof navigator !== "undefined" && /Mac|iPhone|iPad/.test(navigator.platform || navigator.userAgent);

export default function MenuBar({ items, onSearch }) {
  const { c, t, lang, theme, toggleLang, toggleTheme } = useI18n();
  const m = t.menubar;
  const [time, setTime] = useState(gazaTime);
  useEffect(() => {
    const id = setInterval(() => setTime(gazaTime()), 30000);
    return () => clearInterval(id);
  }, []);

  return (
    <header className="menubar">
      <a href="#top" className="menubar-brand"><span className="menubar-logo" aria-hidden="true">AK</span>{c.profile.name}</a>
      <nav className="menubar-menu" aria-label="Sections">
        {items.map((i) => <a key={i.id} href={`#${i.id}`}>{i.label}</a>)}
      </nav>
      <div className="menubar-status">
        <button type="button" className="menubar-search" onClick={onSearch} aria-label={m.searchLabel} aria-keyshortcuts="Meta+K Control+K">
          <Search size={14} aria-hidden="true" /><span className="menubar-search-label">{m.search}</span><kbd dir="ltr">{isMac() ? "⌘K" : "Ctrl K"}</kbd>
        </button>
        <button type="button" className="menubar-toggle menubar-lang" onClick={toggleLang} aria-label={m.toOtherLang} lang={lang === "ar" ? "en" : "ar"}>{m.otherLang}</button>
        <button type="button" className="menubar-toggle" onClick={toggleTheme} aria-label={theme === "dark" ? m.toLight : m.toDark} title={theme === "dark" ? m.toLight : m.toDark}>
          {theme === "dark" ? <Sun size={15} aria-hidden="true" /> : <Moon size={15} aria-hidden="true" />}
        </button>
        <span className="menubar-available"><span className="dot" aria-hidden="true" />{m.available}</span>
        <span className="menubar-clock" title={m.cityTitle}>{m.city} <time dir="ltr">{time}</time></span>
      </div>
    </header>
  );
}
