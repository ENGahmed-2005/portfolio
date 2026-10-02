import { Suspense, lazy, useEffect, useMemo, useRef, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Award, ChefHat, FileBadge, FolderOpen, House, Info, Mail, NotebookPen, QrCode, Smartphone, User } from "lucide-react";
import KitchenDemo from "./components/KitchenDemo.jsx";
import Window from "./components/Window.jsx";
import MenuBar from "./components/MenuBar.jsx";
import Dock from "./components/Dock.jsx";
import Spotlight from "./components/Spotlight.jsx";
import { GitHubIcon, LinkedInIcon } from "./components/BrandIcons.jsx";
import { caseStudy, principles, profile, projects, skills, training, trainingProvider } from "./content.js";

import PhoneView from "./components/PhoneView.jsx";

// three.js is downloaded only when the visitor gets close to Scan.app.
const QrCode3D = lazy(() => import("./components/QrCode3D.jsx"));

function WhenNear({ children, fallback }) {
  const ref = useRef(null);
  const [near, setNear] = useState(false);
  useEffect(() => {
    // Wait for the page to finish its first paint and go idle, then for the
    // window to come close, so three.js never competes with the first view.
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

const SECTIONS = [
  { id: "top", label: "Home", icon: House },
  { id: "try", label: "Try it", icon: QrCode },
  { id: "work", label: "menuPilot", icon: ChefHat },
  { id: "projects", label: "Projects", icon: FolderOpen },
  { id: "about", label: "About", icon: User },
  { id: "contact", label: "Contact", icon: Mail },
];
const EXTERNAL = [
  profile.github && { href: profile.github, label: "GitHub", icon: <GitHubIcon /> },
  profile.linkedin && { href: profile.linkedin, label: "LinkedIn", icon: <LinkedInIcon /> },
].filter(Boolean);

const external = (href) => (href.startsWith("http") ? { target: "_blank", rel: "noreferrer" } : {});
const totalHours = training.reduce((sum, t) => sum + t.hours, 0);

function Hero() {
  const facts = [
    ["Role", profile.role],
    ["Education", "Software Engineering, fourth year"],
    ["Training", `${totalHours} hours at ${trainingProvider.name}`],
    ["Location", profile.location],
    ["Status", profile.availability],
  ];
  return (
    <div id="top" className="desk desk--hero">
      <Window title="Ahmed Alkahlout — Get Info" icon={Info} className="info-window" bodyClassName="info">
        <div className="info-head">
          <img className="info-photo" src={profile.photo.src} alt={profile.photo.alt} width="720" height="720" />
          <div>
            <h1 className="info-name">{profile.name}</h1>
            <p className="info-role">{profile.role}</p>
          </div>
        </div>
        <p className="info-headline">{profile.headline}</p>
        <p className="info-intro">{profile.intro}</p>
        <dl className="info-facts">
          {facts.map(([k, v]) => (
            <div key={k}><dt>{k}</dt><dd>{v}</dd></div>
          ))}
        </dl>
        <div className="actions">
          {profile.email && <a className="btn btn--primary" href={`mailto:${profile.email}`}>Email me</a>}
          <a className="btn" href="#work">See my work</a>
        </div>
      </Window>

      <Window title="Kitchen.app — live demo" icon={ChefHat} className="demo-window" delay={150} bodyClassName="demo-body">
        <KitchenDemo />
        <p className="demo-note">A working miniature of the kitchen screen I built for menuPilot. Add a dish and send it.</p>
      </Window>
    </div>
  );
}

function TryIt() {
  const phoneShots = caseStudy.shots.filter((s) => !s.wide);
  const loading = <div className="stage-wrap"><div className="stage stage--loading">Loading the 3D code…</div></div>;
  return (
    <div id="try" className="desk desk--try">
      <Window title="Scan.app — open menuPilot on your phone" icon={QrCode} bodyClassName="stage-body">
        <WhenNear fallback={loading}><Suspense fallback={loading}><QrCode3D url={caseStudy.live || caseStudy.repo} /></Suspense></WhenNear>
      </Window>
      <Window title="Phone.app — what the guest sees" icon={Smartphone} delay={120} bodyClassName="stage-body">
        <PhoneView screens={phoneShots} />
      </Window>
    </div>
  );
}

const TABS = [
  { id: "overview", label: "Overview" },
  { id: "built", label: "What I built" },
  { id: "screens", label: "Screens" },
];

function Work() {
  const [tab, setTab] = useState("overview");
  const tabs = (
    <div className="segmented" role="tablist" aria-label="menuPilot sections">
      {TABS.map((t) => (
        <button key={t.id} type="button" role="tab" id={`tab-${t.id}`} aria-controls={`panel-${t.id}`} aria-selected={tab === t.id} onClick={() => setTab(t.id)}>{t.label}</button>
      ))}
    </div>
  );
  const [lead, ...rest] = caseStudy.shots;
  return (
    <div className="desk">
      <Window id="work" title={`${caseStudy.name} — case study`} icon={ChefHat} toolbar={tabs} className="work-window">
        {tab === "overview" && (
          <div role="tabpanel" id="panel-overview" aria-labelledby="tab-overview" className="overview">
            <div className="overview-text">
              <h2 className="section-title">{caseStudy.name}</h2>
              <p className="lead">{caseStudy.summary}</p>
              <h3>The problem</h3>
              <p>{caseStudy.problem}</p>
              <h3>My part</h3>
              <p>{caseStudy.role}</p>
              <ul className="chips" aria-label="Built with">{caseStudy.stack.map((s) => <li key={s}>{s}</li>)}</ul>
              <div className="actions">
                {caseStudy.live && <a className="btn btn--primary" href={caseStudy.live} {...external(caseStudy.live)}>Try menuPilot</a>}
                <a className="btn" href={caseStudy.repo} {...external(caseStudy.repo)}>Read the code</a>
                {caseStudy.instagram && <a className="btn" href={caseStudy.instagram} {...external(caseStudy.instagram)}>Instagram</a>}
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
            <h2 className="section-title">What I built</h2>
            <ul className="built">{caseStudy.built.map((b) => <li key={b}>{b}</li>)}</ul>
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

const FILTERS = [
  { id: "all", label: "All projects", test: () => true },
  { id: "live", label: "Live demos", test: (p) => Boolean(p.live) },
  { id: "code", label: "Open source", test: (p) => Boolean(p.repo) },
];

function Projects() {
  const [filter, setFilter] = useState("all");
  const shown = projects.filter(FILTERS.find((f) => f.id === filter).test);
  return (
    <div className="desk">
      <Window id="projects" title={`Projects — ${shown.length} items`} icon={FolderOpen} className="finder" bodyClassName="finder-body">
        <aside className="finder-side" aria-label="Filter projects">
          <p className="finder-side-title">Favourites</p>
          {FILTERS.map((f) => (
            <button key={f.id} type="button" className={filter === f.id ? "is-on" : ""} aria-pressed={filter === f.id} onClick={() => setFilter(f.id)}>
              {f.label}<span>{projects.filter(f.test).length}</span>
            </button>
          ))}
        </aside>
        <div className="finder-main">
          <h2 className="section-title">More work</h2>
          <div className="finder-table" role="table" aria-label="Projects">
            <div className="finder-row finder-row--head" role="row">
              <span role="columnheader">Name</span><span role="columnheader">About</span><span role="columnheader">Built with</span><span role="columnheader"><span className="sr-only">Links</span></span>
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
                  {p.live && <a href={p.live} {...external(p.live)}>Open</a>}
                  {p.repo && <a href={p.repo} {...external(p.repo)}>Code</a>}
                  {!p.live && !p.repo && <em>Soon</em>}
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
  return (
    <div id="about" className="desk desk--about">
      <Window title="About me" icon={User} className="about-window">
        <h2 className="section-title">About me</h2>
        {profile.about.map((p) => <p key={p} className="about-p">{p}</p>)}
        <h3>Tools I use</h3>
        <ul className="chips" aria-label="Tools">{skills.map((s) => <li key={s}>{s}</li>)}</ul>
      </Window>

      <Window title="Training" icon={Award} className="training-window" delay={100}>
        <p className="training-provider">At {trainingProvider.name}, the {trainingProvider.fullName}, with trainer {trainingProvider.trainer}.</p>
        <ul className="courses">
          {training.map((t) => (
            <li key={t.title}>
              <span className="course-hours"><b>{t.hours}</b> h</span>
              <span className="course-text">
                <b>{t.title}</b>
                <span>{t.topics}{t.dates ? `, ${t.dates}` : ""}</span>
                {t.certificate && <a href={t.certificate} target="_blank" rel="noreferrer">View certificate</a>}
              </span>
            </li>
          ))}
        </ul>
      </Window>

      <Window title="Notes — How I work" icon={NotebookPen} className="notes-window" delay={200} bodyClassName="notes">
        {principles.map((p) => (
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
  const subject = "Project inquiry";
  const reach = [
    profile.whatsapp && { href: profile.whatsapp, label: "WhatsApp" },
    profile.linkedin && { href: profile.linkedin, label: "LinkedIn" },
    profile.github && { href: profile.github, label: "GitHub" },
  ].filter(Boolean);
  return (
    <div className="desk">
      <Window id="contact" title="New Message" icon={Mail} className="mail-window" bodyClassName="mail">
        <dl className="mail-fields">
          <div><dt>To</dt><dd>{profile.email ? <a href={`mailto:${profile.email}`}>{profile.name} &lt;{profile.email}&gt;</a> : profile.name}</dd></div>
          <div><dt>Subject</dt><dd>{subject}</dd></div>
        </dl>
        <div className="mail-body">
          <h2 className="section-title">Have a product that needs a careful frontend?</h2>
          <p className="lead">Tell me what you are building and where it hurts.</p>
        </div>
        <div className="actions mail-actions">
          {profile.email && <a className="btn btn--primary" href={`mailto:${profile.email}?subject=${encodeURIComponent(subject)}`}>Send email</a>}
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
  const [spotlight, setSpotlight] = useState(false);
  useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") { e.preventDefault(); setSpotlight((s) => !s); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);
  const searchItems = useMemo(() => [
    ...SECTIONS.map((s) => ({ label: s.label, hint: "Section", icon: s.icon, run: () => go(s.id) })),
    caseStudy.live && { label: "Try menuPilot", hint: "Live product", icon: ChefHat, run: () => openTab(caseStudy.live) },
    ...projects.map((p) => ({ label: p.name, hint: p.kind, icon: FolderOpen, rtl: p.rtl, run: () => (p.live ? openTab(p.live) : p.repo ? openTab(p.repo) : go("projects")) })),
    profile.email && { label: "Email Ahmed", hint: profile.email, icon: Mail, run: () => { window.location.href = `mailto:${profile.email}`; } },
    profile.github && { label: "GitHub", hint: "Code", icon: FolderOpen, run: () => openTab(profile.github) },
    profile.linkedin && { label: "LinkedIn", hint: "Profile", icon: User, run: () => openTab(profile.linkedin) },
    ...training.filter((t) => t.certificate).map((t) => ({ label: "View certificate", hint: `${t.title}, ${t.hours} hours`, icon: FileBadge, run: () => openTab(t.certificate) })),
  ].filter(Boolean), []);

  useEffect(() => {
    AOS.init({
      duration: 500,
      easing: "ease-out-cubic",
      once: true,
      offset: 40,
      disable: () => window.matchMedia?.("(prefers-reduced-motion: reduce)").matches,
    });
  }, []);

  return (
    <>
      <a className="skip" href="#main">Skip to content</a>
      <MenuBar name={profile.name} items={SECTIONS.slice(1)} availability="Available for work" onSearch={() => setSpotlight(true)} />
      <main id="main">
        <Hero />
        <TryIt />
        <Work />
        <Projects />
        <About />
        <Contact />
      </main>
      <footer className="site-footer">
        <span>© {new Date().getFullYear()} {profile.name}</span>
        <a href="https://github.com/ENGahmed-2005/portfolio" target="_blank" rel="noreferrer">Built with React and Vite. Source on GitHub</a>
      </footer>
      <Dock items={SECTIONS} links={EXTERNAL} />
      <Spotlight open={spotlight} onClose={() => setSpotlight(false)} items={searchItems} />
    </>
  );
}
