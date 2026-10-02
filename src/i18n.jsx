/* Language and theme for the whole site. The first values come from the
   <html> attributes that index.html sets before React starts (saved choice,
   then the visitor's device), so the page never flashes the wrong one. */
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { content, ui } from "./content.js";

const I18n = createContext(null);
const root = () => (typeof document !== "undefined" ? document.documentElement : null);
const save = (key, value) => { try { localStorage.setItem(key, value); } catch { /* private mode */ } };

export function I18nProvider({ children }) {
  const [lang, setLang] = useState(() => (root()?.lang === "ar" ? "ar" : "en"));
  const [theme, setTheme] = useState(() => (root()?.dataset.theme === "dark" ? "dark" : "light"));

  useEffect(() => {
    const el = root();
    el.lang = lang;
    el.dir = lang === "ar" ? "rtl" : "ltr";
    document.title = ui[lang].pageTitle;
  }, [lang]);
  useEffect(() => {
    root().dataset.theme = theme;
    document.querySelector('meta[name="theme-color"]')?.setAttribute("content", theme === "dark" ? "#2a2a2d" : "#e4e4e7");
  }, [theme]);

  const value = useMemo(() => ({
    lang,
    theme,
    c: content[lang],
    t: ui[lang],
    toggleLang: () => setLang((l) => { const next = l === "ar" ? "en" : "ar"; save("lang", next); return next; }),
    toggleTheme: () => setTheme((x) => { const next = x === "dark" ? "light" : "dark"; save("theme", next); return next; }),
  }), [lang, theme]);

  return <I18n.Provider value={value}>{children}</I18n.Provider>;
}

export const useI18n = () => useContext(I18n);
