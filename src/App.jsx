import KitchenDemo from "./components/KitchenDemo.jsx";
import { caseStudy, principles, profile, projects, skills, training, trainingProvider } from "./content.js";

function ContactLinks({ large = false }) {
  const links = [
    profile.email && { href: `mailto:${profile.email}`, label: "Email me", primary: true },
    profile.whatsapp && { href: profile.whatsapp, label: "WhatsApp" },
    profile.github && { href: profile.github, label: "GitHub" },
    profile.linkedin && { href: profile.linkedin, label: "LinkedIn" },
    profile.cv && { href: profile.cv, label: "Download CV" },
  ].filter(Boolean);
  // Without an email, GitHub is the main way in.
  if (!profile.email && links[0]) links[0].primary = true;
  return (
    <div className={`links ${large ? "links--large" : ""}`}>
      {links.map((l) => (
        <a key={l.label} href={l.href} className={l.primary ? "button button--primary" : "button"} {...(l.href.startsWith("http") ? { target: "_blank", rel: "noreferrer" } : {})}>
          {l.label}
        </a>
      ))}
    </div>
  );
}

export default function App() {
  return (
    <>
      <a className="skip" href="#main">Skip to content</a>
      <header className="site-header">
        <a href="#top" className="wordmark">{profile.name}<span className="wordmark-role">{profile.role}</span></a>
        <nav aria-label="Sections">
          <a href="#work">Work</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>

      <main id="main">
        <section id="top" className="hero">
          <div className="hero-text">
            <h1>{profile.headline}</h1>
            <p className="lede">{profile.intro}</p>
            <p className="availability"><span className="dot" aria-hidden="true" />{profile.availability}</p>
            <ContactLinks />
          </div>
          <figure className="hero-demo">
            <KitchenDemo />
            <figcaption>A working miniature of the kitchen screen I built for menuPilot.</figcaption>
          </figure>
        </section>

        <section id="work" className="work" aria-labelledby="work-title">
          <div className="work-intro">
            <h2 id="work-title">{caseStudy.name}</h2>
            <p className="work-summary">{caseStudy.summary}</p>
          </div>
          <div className="work-body">
            <div>
              <h3>The problem</h3>
              <p>{caseStudy.problem}</p>
              <h3>My part</h3>
              <p>{caseStudy.role}</p>
              <p className="stack">{caseStudy.stack.join(", ")}</p>
              <div className="links">
                {caseStudy.live && <a className="button button--primary" href={caseStudy.live} target="_blank" rel="noreferrer">Try menuPilot</a>}
                <a className={caseStudy.live ? "button" : "button button--primary"} href={caseStudy.repo} target="_blank" rel="noreferrer">Read the code</a>
                {caseStudy.instagram && <a className="button" href={caseStudy.instagram} target="_blank" rel="noreferrer">Instagram</a>}
              </div>
            </div>
            <div>
              <h3>What I built</h3>
              <ul className="built">
                {caseStudy.built.map((item) => <li key={item}>{item}</li>)}
              </ul>
            </div>
          </div>
          <div className="gallery">
            {caseStudy.shots.map((s) => (
              <figure key={s.src} className={s.wide ? "shot shot--wide" : "shot shot--phone"}>
                <img src={s.src} alt={s.alt} width={s.w} height={s.h} loading="lazy" decoding="async" />
                <figcaption>{s.caption}</figcaption>
              </figure>
            ))}
          </div>
        </section>

        <section className="more" aria-labelledby="more-title">
          <h2 id="more-title">More work</h2>
          <ul className="more-list">
            {projects.map((p) => (
              <li key={p.name} className="more-item">
                <div className="more-head">
                  <h3 dir={p.rtl ? "rtl" : undefined} lang={p.rtl ? "ar" : undefined}>{p.name}</h3>
                  <p className="more-kind">{p.kind}</p>
                </div>
                <div className="more-body">
                  <p>{p.text}</p>
                  <p className="stack">{p.stack}</p>
                </div>
                <div className="more-links">
                  {p.live && <a href={p.live} target="_blank" rel="noreferrer">Open it</a>}
                  {p.repo && <a href={p.repo} target="_blank" rel="noreferrer">Code</a>}
                </div>
              </li>
            ))}
          </ul>
        </section>

        <section id="about" className="about" aria-labelledby="about-title">
          <img className="about-photo" src={profile.photo.src} alt={profile.photo.alt} width="720" height="720" loading="lazy" decoding="async" />
          <div className="about-text">
            <h2 id="about-title">About me</h2>
            {profile.about.map((para) => <p key={para}>{para}</p>)}
            {profile.location && <p className="about-place">Based in {profile.location}, working remotely.</p>}
            <h3>Training</h3>
            <p className="training-provider">
              At <abbr title={trainingProvider.fullName}>{trainingProvider.name}</abbr>, the {trainingProvider.fullName}, with trainer {trainingProvider.trainer}.
            </p>
            <dl className="training">
              {training.map((t) => (
                <div key={t.title}>
                  <dt>{t.title}</dt>
                  <dd>
                    {t.hours} hours of {t.topics}
                    {t.dates && <span className="training-dates">{t.dates}</span>}
                    {t.certificate && <a className="training-cert" href={t.certificate} target="_blank" rel="noreferrer">View certificate</a>}
                  </dd>
                </div>
              ))}
            </dl>
            <h3>Tools I use</h3>
            <p className="stack">{skills.join(", ")}</p>
          </div>
        </section>

        <section id="principles" className="principles" aria-labelledby="principles-title">
          <h2 id="principles-title">How I work</h2>
          <div className="principles-grid">
            {principles.map((p) => (
              <article key={p.title}>
                <h3>{p.title}</h3>
                <p>{p.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="contact" className="contact" aria-labelledby="contact-title">
          <h2 id="contact-title">Have a product that needs a careful frontend?</h2>
          <p className="lede">Tell me what you are building and where it hurts.</p>
          <ContactLinks large />
        </section>
      </main>

      <footer className="site-footer">
        <span>© {new Date().getFullYear()} {profile.name}</span>
        <a href="https://github.com/ENGahmed-2005/portfolio" target="_blank" rel="noreferrer">Built with React and Vite. Source on GitHub</a>
      </footer>
    </>
  );
}
