/* A macOS-style window. The red light folds it to its title bar (so does a
   double-click on the bar), the green one opens it full screen, Esc leaves. */
import { useEffect, useState } from "react";

export default function Window({ id, title, icon: Icon, toolbar, children, className = "", bodyClassName = "", delay = 0, aos = "fade" }) {
  const [folded, setFolded] = useState(false);
  const [full, setFull] = useState(false);
  useEffect(() => {
    if (!full) return undefined;
    const onKey = (e) => e.key === "Escape" && setFull(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [full]);
  const fold = () => { setFull(false); setFolded((f) => !f); };

  return (
    <section id={id} className={`window ${folded ? "window--folded" : ""} ${full ? "window--full" : ""} ${className}`} aria-label={title} data-aos={aos} data-aos-delay={delay}>
      <header className="window-bar" onDoubleClick={fold}>
        <span className="traffic">
          <button type="button" className="t-close" onClick={fold} aria-expanded={!folded} aria-label={folded ? `Open ${title}` : `Fold ${title}`} />
          <button type="button" className="t-min" onClick={fold} tabIndex={-1} aria-hidden="true" />
          <button type="button" className="t-zoom" onClick={() => { setFolded(false); setFull((f) => !f); }} aria-pressed={full} aria-label={full ? `Leave full screen` : `Open ${title} full screen`} />
        </span>
        <p className="window-title">{Icon && <Icon size={14} aria-hidden="true" />}{title}</p>
        <div className="window-tools">{toolbar}</div>
      </header>
      <div className={`window-body ${bodyClassName}`} hidden={folded}>{children}</div>
    </section>
  );
}
