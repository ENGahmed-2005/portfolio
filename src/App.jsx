import { Suspense, lazy, useEffect, useMemo, useRef, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Award, ChefHat, FileBadge, FolderOpen, House, Info, Languages, Mail, NotebookPen, QrCode, Smartphone, SunMoon, User } from "lucide-react";
import KitchenDemo from "./components/KitchenDemo.jsx";
import Window from "./components/Window.jsx";
import MenuBar from "./components/MenuBar.jsx";
import Dock from "./components/Dock.jsx";
import Spotlight from "./components/Spotlight.jsx";
import PhoneView from "./components/PhoneView.jsx";
import { GitHubIcon, LinkedInIcon } from "./components/BrandIcons.jsx";
import { useI18n } from "./i18n.jsx";

// three.js is downloaded only when the visitor gets close to Scan.app.
const QrCode3D = lazy(() => import("./components/QrCode3D.jsx"));

function WhenNear({ children, fallback }) {
  const ref = useRef(null);
  const [near, setNear] = useState(false);
  useEffect(() => {
    // Wait for the first paint and an idle moment, then for the window to
    // come close, so three.js never competes with the first view.
    const el = ref.current;
    let io, cancelled = false;
    const idle = window.requestIdleCallback || ((cb) => setTimeout(cb, 1200));
    const start = () => {
      if (cancelled) return;
      if (!el || !("IntersectionObserver" in window)) { setNear(true); return; }
      io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setNear(true); io.disconnect(); } }, { rootMargin: "150px 0px" });
      io.observe(el);
    };
    const id = idle(start, { timeout: 2500 });
    return () => { cancelled = true; io?.disconnect(); (window.cancelIdleCallback || clearTimeout)(id); };
  }, []);
  return <div ref={ref} className="near">{near ? children : fallback}</div>;
}

const SECTION_ICONS = { top: House, try: QrCode, work: ChefHat, projects: FolderOpen, about: User, contact: Mail };
const external = (href) => (href.startsWith("http") ? { target: "_blank", rel: "noreferrer" } : {});

function Hero() {
  const { c, t } = useI18n();
  const p = c.profile, i = t.info;
  const totalHours = c.training.reduce((sum, x) => sum + x.hours, 0);
  const facts = [
    [i.role, p.role],
    [i.education, i.educationValue],
    [i.training, i.trainingValue(totalHours, c.trainingProvider.name)],
    [i.location, p.location],
    [i.status, p.availability],
  ];
  return (
    <div id="top" className="desk desk--hero">
      <Window title={`${p.name} — ${i.title}`} icon={Info} className="info-window" bodyClassName="info">
        <div className="info-head">
          <img className="info-photo" src={p.photo} alt={p.photoAlt} width="720" height="720" />
          <div>
            <h1 className="info-name">{p.name}</h1>
            <p className="info-role">{p.role}</p>
          </div>
        </div>
        <p className="info-headline">{p.headline}</p>
        <p className="info-intro">{p.intro}</p>
        <dl className="info-facts">
          {facts.map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}
        </dl>
        <div className="actions">
          {p.email && <a className="btn btn--primary" href={`mailto:${p.email}`}>{i.email}</a>}
          <a className="btn" href="#work">{i.work}</a>
        </div>
      </Window>

      <Window title={t.kitchen.title} icon={ChefHat} className="demo-window" delay={150} bodyClassName="demo-body">
        <KitchenDemo />
        <p className="demo-note">{t.kitchen.note}</p>
      </Window>
    </div>
  );
}

function TryIt() {
  const { c, t } = useI18n();
  const phoneShots = c.caseStudy.shots.filter((s) => !s.wide);
  const loading = <div className="stage-wrap"><div className="stage stage--loading">{t.tryIt.loading}</div></div>;
  return (
    <div id="try" className="desk desk--try">
      <Window title={t.tryIt.scan} icon={QrCode} bodyClassName="stage-body">
        <WhenNear fallback={loading}><Suspense fallback={loading}><QrCode3D url={c.caseStudy.live || c.caseStudy.repo} /></Suspense></WhenNear>
      </Window>
      <Window title={t.tryIt.phone} icon={Smartphone} delay={120} bodyClassName="stage-body">
        <PhoneView screens={phoneShots} />
      </Window>
    </div>
  );
}

function Work() {
  const { c, t } = useI18n();
  const cs = c.caseStudy, w = t.work;
  const [tab, setTab] = useState("overview");
  const tabs = (
    <div className="segmented" role="tablist" aria-label={w.tabsLabel}>
      {Object.entries(w.tabs).map(([id, label]) => (
        <button key={id} type="button" role="tab" id={`tab-${id}`} aria-controls={`panel-${id}`} aria-selected={tab === id} onClick={() => setTab(id)}>{label}</button>
      ))}
    </div>
  );
  const [lead, ...rest] = cs.shots;
  return (
    <div className="desk">
      <Window id="work" title={w.title} icon={ChefHat} toolbar={tabs} className="work-window">
        {tab === "overview" && (
          <div role="tabpanel" id="panel-overview" aria-labelledby="tab-overview" className="overview">
            <div className="overview-text">
              <h2 className="section-title">{cs.name}</h2>
              <p className="lead">{cs.summary}</p>
              <p className="team-note">{cs.team}</p>
              <h3>{w.problem}</h3>
              <p>{cs.problem}</p>
              <h3>{w.part}</h3>
              <p>{cs.role}</p>
              <ul className="chips" aria-label={w.builtWith}>{cs.stack.map((s) => <li key={s} dir="ltr">{s}</li>)}</ul>
              <div className="actions">
                {cs.live && <a className="btn btn--primary" href={cs.live} {...external(cs.live)}>{w.try}</a>}
                <a className="btn" href={cs.repo} {...external(cs.repo)}>{w.code}</a>
                {cs.instagram && <a className="btn" href={cs.instagram} {...external(cs.instagram)}>{w.instagram}</a>}
              </div>
            </div>
            <figure className="overview-shot">
              <img src={lead.src} alt={lead.alt} width={lead.w} height={lead.h} loading="lazy" decoding="async" />
              <figcaption>{lead.caption}</figcaption>
            </figure>
          </div>
        )}
        {tab === "built" && (
          <div role="tabpanel" id="panel-built" aria-labelledby="tab-built">
            <h2 className="section-title">{w.builtTitle}</h2>
            <p className="team-note">{cs.team}</p>
            <ul className="built">{cs.built.map((b) => <li key={b}>{b}</li>)}</ul>
          </div>
        )}
        {tab === "screens" && (
          <div role="tabpanel" id="panel-screens" aria-labelledby="tab-screens" className="gallery">
            {rest.map((s) => (
              <figure key={s.src} className={s.wide ? "shot shot--wide" : "shot shot--phone"}>
                <img src={s.src} alt={s.alt} width={s.w} height={s.h} loading="lazy" decoding="async" />
                <figcaption>{s.caption}</figcaption>
              </figure>
            ))}
          </div>
        )}
      </Window>
    </div>
  );
}

function Projects() {
  const { c, t } = useI18n();
  const pr = t.projects;
  const filters = [
    { id: "all", label: pr.all, test: () => true },
    { id: "live", label: pr.live, test: (p) => Boolean(p.live) },
    { id: "code", label: pr.open, test: (p) => Boolean(p.repo) },
  ];
  const [filter, setFilter] = useState("all");
  const shown = c.projects.filter(filters.find((f) => f.id === filter).test);
  return (
    <div className="desk">
      <Window id="projects" title={pr.title(shown.length)} icon={FolderOpen} className="finder" bodyClassName="finder-body">
        <aside className="finder-side" aria-label={pr.filterLabel}>
          <p className="finder-side-title">{pr.favourites}</p>
          {filters.map((f) => (
            <button key={f.id} type="button" className={filter === f.id ? "is-on" : ""} aria-pressed={filter === f.id} onClick={() => setFilter(f.id)}>
              {f.label}<span>{c.projects.filter(f.test).length}</span>
            </button>
          ))}
        </aside>
        <div className="finder-main">
          <h2 className="section-title">{pr.heading}</h2>
          <div className="finder-table" role="table" aria-label={pr.heading}>
            <div className="finder-row finder-row--head" role="row">
              <span role="columnheader">{pr.name}</span><span role="columnheader">{pr.about}</span><span role="columnheader">{pr.stack}</span><span role="columnheader"><span className="sr-only">{pr.links}</span></span>
            </div>
            {shown.map((p) => (
              <div key={p.name} className="finder-row" role="row">
                <span role="cell" className="finder-name">
                  <FolderOpen size={18} aria-hidden="true" />
                  <span><b dir={p.rtl ? "rtl" : undefined} lang={p.rtl ? "ar" : undefined}>{p.name}</b><small>{p.kind}</small></span>
                </span>
                <span role="cell" className="finder-about">{p.text}</span>
                <span role="cell" className="finder-stack">{p.stack}</span>
                <span role="cell" className="finder-links">
                  {p.live && <a href={p.live} {...external(p.live)}>{pr.openLink}</a>}
                  {p.repo && <a href={p.repo} {...external(p.repo)}>{pr.codeLink}</a>}
                  {!p.live && !p.repo && <em>{pr.soon}</em>}
                </span>
              </div>
            ))}
          </div>
        </div>
      </Window>
    </div>
  );
}

function About() {
  const { c, t } = useI18n();
  const a = t.about;
  return (
    <div id="about" className="desk desk--about">
      <Window title={a.title} icon={User} className="about-window">
        <h2 className="section-title">{a.title}</h2>
        {c.profile.about.map((p) => <p key={p} className="about-p">{p}</p>)}
        {c.profile.location && <p className="about-p about-place">{a.place(c.profile.location)}</p>}
        <h3>{a.tools}</h3>
        <ul className="chips" aria-label={a.tools}>{c.skills.map((s) => <li key={s}>{s}</li>)}</ul>
      </Window>

      <Window title={a.training} icon={Award} className="training-window" delay={100}>
        <p className="training-provider">{a.provider(c.trainingProvider)}</p>
        <ul className="courses">
          {c.training.map((x) => (
            <li key={x.title}>
              <span className="course-hours"><b>{x.hours}</b> {a.hours}</span>
              <span className="course-text">
                <b>{x.title}</b>
                <span>{x.topics}{x.dates ? `${t.about.comma} ${x.dates}` : ""}</span>
                {x.certificate && <a href={x.certificate} target="_blank" rel="noreferrer">{a.certificate}</a>}
              </span>
            </li>
          ))}
        </ul>
      </Window>

      <Window title={a.notes} icon={NotebookPen} className="notes-window" delay={200} bodyClassName="notes">
        {c.principles.map((p) => (
          <article key={p.title}>
            <h3>{p.title}</h3>
            <p>{p.text}</p>
          </article>
        ))}
      </Window>
    </div>
  );
}

function Contact() {
  const { c, t } = useI18n();
  const p = c.profile, m = t.mail;
  const reach = [
    p.whatsapp && { href: p.whatsapp, label: m.whatsapp },
    p.linkedin && { href: p.linkedin, label: m.linkedin },
    p.github && { href: p.github, label: m.github },
  ].filter(Boolean);
  return (
    <div className="desk">
      <Window id="contact" title={m.title} icon={Mail} className="mail-window" bodyClassName="mail">
        <dl className="mail-fields">
          <div><dt>{m.to}</dt><dd>{p.email ? <a href={`mailto:${p.email}`}>{p.name} <span dir="ltr">&lt;{p.email}&gt;</span></a> : p.name}</dd></div>
          <div><dt>{m.subject}</dt><dd>{m.subjectValue}</dd></div>
        </dl>
        <div className="mail-body">
          <h2 className="section-title">{m.heading}</h2>
          <p className="lead">{m.lead}</p>
        </div>
        <div className="actions mail-actions">
          {p.email && <a className="btn btn--primary" href={`mailto:${p.email}?subject=${encodeURIComponent(m.subjectValue)}`}>{m.send}</a>}
          {reach.map((r) => <a key={r.label} className="btn" href={r.href} {...external(r.href)}>{r.label}</a>)}
        </div>
      </Window>
    </div>
  );
}

const go = (id) => {
  const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
  document.getElementById(id)?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
  window.history.replaceState(null, "", `#${id}`);
};
const openTab = (url) => window.open(url, "_blank", "noopener");

export default function App() {
  const { c, t, lang, toggleLang, toggleTheme } = useI18n();
  const [spotlight, setSpotlight] = useState(false);
  const sections = useMemo(() => Object.entries(t.sections).map(([id, label]) => ({ id, label, icon: SECTION_ICONS[id] })), [t]);
  const externalLinks = [
    c.profile.github && { href: c.profile.github, label: "GitHub", icon: <GitHubIcon /> },
    c.profile.linkedin && { href: c.profile.linkedin, label: "LinkedIn", icon: <LinkedInIcon /> },
  ].filter(Boolean);

  useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") { e.preventDefault(); setSpotlight((s) => !s); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const searchItems = useMemo(() => {
    const s = t.spotlight, p = c.profile;
    return [
      ...sections.map((x) => ({ label: x.label, hint: s.section, icon: x.icon, run: () => go(x.id) })),
      c.caseStudy.live && { label: t.work.try, hint: s.liveProduct, icon: ChefHat, run: () => openTab(c.caseStudy.live) },
      ...c.projects.map((x) => ({ label: x.name, hint: x.kind, icon: FolderOpen, rtl: x.rtl, run: () => (x.live ? openTab(x.live) : x.repo ? openTab(x.repo) : go("projects")) })),
      p.email && { label: s.emailMe, hint: p.email, icon: Mail, run: () => { window.location.href = `mailto:${p.email}`; } },
      p.github && { label: "GitHub", hint: s.code, icon: FolderOpen, run: () => openTab(p.github) },
      p.linkedin && { label: "LinkedIn", hint: s.profile, icon: User, run: () => openTab(p.linkedin) },
      ...c.training.filter((x) => x.certificate).map((x) => ({ label: s.certificate, hint: x.title, icon: FileBadge, run: () => openTab(x.certificate) })),
      { label: s.theme, hint: "", icon: SunMoon, run: toggleTheme },
      { label: s.language, hint: s.languageHint, icon: Languages, run: toggleLang },
    ].filter(Boolean);
  }, [c, t, sections, toggleLang, toggleTheme]);

  useEffect(() => {
    AOS.init({
      duration: 500,
      easing: "ease-out-cubic",
      once: true,
      offset: 40,
      disable: () => window.matchMedia?.("(prefers-reduced-motion: reduce)").matches,
    });
  }, []);
  useEffect(() => { AOS.refresh(); }, [lang]);

  return (
    <>
      <a className="skip" href="#main">{t.skip}</a>
      <MenuBar items={sections.slice(1)} onSearch={() => setSpotlight(true)} />
      <main id="main">
        <Hero />
        <TryIt />
        <Work />
        <Projects />
        <About />
        <Contact />
      </main>
      <footer className="site-footer">
        <span>© {new Date().getFullYear()} {c.profile.name}</span>
        <a href="https://github.com/ENGahmed-2005/portfolio" target="_blank" rel="noreferrer">{t.footer}</a>
      </footer>
      <Dock items={sections} links={externalLinks} />
      <Spotlight open={spotlight} onClose={() => setSpotlight(false)} items={searchItems} />
    </>
  );
}
